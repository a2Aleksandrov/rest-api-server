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
    const themeData = {
        title: req.body.title,
        content: req.body.content,
        author: req.user._id
    };
    console.log(themeData);
    try {
        const newTheme = await addTheme(themeData);
        console.log(newTheme);
        res.status(200).send(newTheme);
    } catch (err) {
        res.send(err);
        console.log(err);
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
        if (!theme.posts) {
            theme.posts = [];
        }
        theme.posts.push(post._id);
        await addPostToTheme(theme._id, theme);
    } catch (err) {
        res.send(err);
        console.error(err);
    }
});

module.exports = themeController;