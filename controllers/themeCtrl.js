const { getAllthemes, getThemeById, addTheme, createPost, addPostToTheme } = require('../services/themeService');

const themeController = require('express').Router();

themeController.get('/', async (req, res) => {
    try {
        const themes = await getAllthemes().populate('author').populate({ path: 'posts', populate: { path: 'author' } });
        res.status(200).send(themes);
    } catch (err) {
        res.send(err);
    }
});

themeController.get('/:themeId', async (req, res) => {
    try {
        const themeContent = await getThemeById(req.params.themeId).populate('author').populate({ path: 'posts', populate: { path: 'author' } });
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

themeController.post('/:themeId/comments', async (req, res) => {
    const postData = {
        comment: req.body.comment,
        author: req.user._id,
        theme: req.params.themeId
    }
    try {
        const post = await createPost(postData);
        const theme = await getThemeById(req.params.themeId);
        theme.posts.push(post._id);
        await addPostToTheme(theme._id, theme);
    } catch (err) {
        res.send(err);
        console.error(err);
    }
});

module.exports = themeController;