const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
        res.render('project', { project });
    } else {
        res.render('error404');
    }
});

module.exports = router;
