const router = require("express").Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const cookieParser = require("cookie-parser");
const { createPage } = require("../render.js");
const sessions = require('express-session')


// Database Connection
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../db.db'),
    },
    useNullAsDefault: true,
});


router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json(`Missing ${!email ? "email" : 'password'}!`)
        }

        const hash = await bcrypt.hash(password, 10);
        await db('users').insert({email: email, hash: hash});
    
        res.status(200).json('Thanks for registering');
    } catch(e) {
        if(e.errno === 19) {
            res.status(400).json('A user with that email already exists!');
        } else {
            res.status(400).json('Something broke!');
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).json(`Missing ${!email ? "email" : 'password'}!`)
        }
        const user = await db('users').first('*').where({email: email});
        if(user) {
            const validPass = await bcrypt.compare(password, user.hash);
            if(validPass) {
                session=req.session;
                session.email=req.body.email;
                console.log(req.session)
                res.status(200);
            } else {
                res.status(400).json('Wrong password');
            }
        } else {
            res.status(404).json('Wrong email');
        }

    } catch(e) {
        res.status(400).json('Something broke!');
    }
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

var session;

const adminPage = createPage("admin/admin.html");
const dashboardPage = createPage("dashboard/dashboard.html");

router.get("/admin", (req, res) => {
    session=req.session;
    if (session.email) {
        res.send(dashboardPage)
    } else {
        res.send(adminPage)
    }
});

router.get("/dashboard", (req, res) => {
    session=req.session;
    if (session.email) {
        res.send(dashboardPage)
    } else {
        res.send(adminPage)
    }
});

module.exports = {
    router
};