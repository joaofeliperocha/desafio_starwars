//Arquivo principal

//Carregando módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routes/admin");
const path = require("path");

//Ferramentas para ajudar na validação do formulário
const session = require("express-session");
const flash = require("connect-flash");

require("./models/Planeta");
const Planeta = mongoose.model("planetas");

//Configurações

//Sessão
app.use(
  session({
    secret: "joao",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
//Middlewarea
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-h4avq.mongodb.net/planets?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch(error => {
    console.log("Erro ao se conectar: " + error);
  });

//Public
app.use(express.static(path.join(__dirname, "public")));
//Rotas
//Rota Home
app.get("/", (req, res) => {
  res.render("planets/desafio");
});

app.get("/busca", (req, res) => {
  Planeta.find()
    .then(planetas => {
      res.render("index", { planetas: planetas });
    })
    .catch(err => {
      req.flash("error_msg", "Houve um erro interno");
    });
});
//Busca por nome
app.get("/busca/:nome", (req, res) => {
  Planeta.findOne({ nome: req.params.nome })
    .then(planeta => {
      if (planeta) {
        res.render("planets/index", { planeta: planeta });
      } else {
        req.flash("error_msg", "Este planeta não existe");
        res.redirect("/");
      }
    })
    .catch(err => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/");
    });
});
//Busca por ID
app.get("/busca/id/:id", (req, res) => {
  Planeta.findById(req.params.id)
    .then(planeta => {
      if (planeta) {
        res.render("planets/index", { planeta: planeta });
      } else {
        req.flash("error_msg", "Este planeta não existe");
        res.redirect("/");
      }
    })
    .catch(err => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/");
    });
});
app.use("/admin", admin);

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando! ");
});
