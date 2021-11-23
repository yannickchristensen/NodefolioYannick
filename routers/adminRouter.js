const router = require("express").Router();
const bcrypt = require('bcryptjs');
const path = require('path');


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
                console.log("user logged in")
                req.session.loggedIn = true;
                res.status(200).json('Succesful login');
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

router.get("/admin/logout", (req, res) => {
    req.session.loggedIn = false;
    res.redirect("/")
})

module.exports = {
    router
};