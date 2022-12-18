const { getAllthemes, getThemeById, addTheme, postComment } = require('../services/themeService');

const themeController = require('express').Router();

themeController.get('/', async (req, res) => {
    try {
        const themes = await getAllthemes().populate('author');
        res.status(200).send(themes);
    } catch (err) {
        res.send(err);
    }
});

themeController.get('/:themeId', async (req, res) => {
    try {
        const themeContent = await getThemeById(req.params.themeId).populate('author');
        res.status(200).send(themeContent);
    } catch (err) {
        res.send(err);
    }
});

themeController.post('/', async (req, res) => {
    const data = { ...req.body };
    try {
        const newTheme = await addTheme(req.params.themeId, data);
        res.status(200).send(newTheme);
    } catch (err) {
        res.send(err);
    }
});

themeController.post('/:themeId/comment', async (req, res) => {
    const content = { ...req.body }
    try {
        const comment = await postComment(req.params.themeId, content);
        res.status(200).send(comment);
    } catch (err) {
        res.send(err);
    }
});

module.exports = themeController;