// Package Imports
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const sessions = require('express-session')
const { createPage } = require("./render.js");
const { urlencoded } = require("express");
const cookieParser = require("cookie-parser");

// Database Connection
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './db.db'),
    },
    useNullAsDefault: true,
});

// App Definition
const app = express();

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "secret-key",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


// Routers
const adminRouter = require("./routers/adminRouter.js");
const projectRouter = require("./routers/projectRouter.js");
const contactRouter = require("./routers/contactRouter.js")

app.use(contactRouter.router);
app.use(adminRouter.router);
app.use(projectRouter.router);

// Ready the pages
const homePage = createPage("home/home.html", { 
    title: "Nodefolio | Welcome"
});
const cvPage = createPage("cv/cv.html", {
    title: "CV"
});
const projectsPage = createPage("projects/projects.html", {
    title: "Projects"
});
const contactPage = createPage("contact/contact.html", {
    title: "Contact"
});


// Serve pages
app.get("/", (req, res) => {
    res.send(homePage);
});

app.get("/cv", (req, res) => {
    res.send(cvPage);
});

app.get("/projects", (req, res) => {
    res.send(projectsPage);
});

app.get("/contact", (req, res) => {
    res.send(contactPage);
});


// PORT setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});