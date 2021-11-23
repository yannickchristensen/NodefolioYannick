// Package Imports
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session')
const { createPage } = require("./render.js");

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
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}))

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
const adminPage = createPage("admin/admin.html");

const dashboardPage = createPage("dashboard/dashboard.html");

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

app.get("/admin", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.send(adminPage)
    }
});

app.get("/dashboard", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.send(adminPage)
    }
});

// PORT setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});