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

router.get("/api/projects", async (req, res) => {
    const projects = await db.select().from('projects');
    res.send(projects);
});

router.post("/api/projects", async (req, res) => {
    try {
        const {name, technologies} = req.body;
        await db('projects').insert({name: name, technologies: technologies});
        res.status(200).json('project created');
        }catch(e) {
            res.status(400).json('Something broke')
        }
})

router.delete("/api/projects/:projectId", async (req, res) => {
    try {
    const id = req.params.projectId
    await db('projects')
    .where({ id: id })
    .del()
    res.status(200).json('project deleted');
    }catch(e) {
        res.status(400).json('Something broke')
    }
})

router.put("/api/projects/", async (req, res) => {
    try {
        const {id ,name, technologies} = req.body;
        await db('projects').where({id: id}).update({name: name, technologies: technologies});
        res.status(200).json('project updated');
        }catch(e) {
            res.status(400).json('Something broke')
        }
 
})

module.exports = {
    router
};