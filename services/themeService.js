const Theme = require("../models/Theme");
const Post = require('../models/Post');

function getAllthemes() {
    return Theme.find({});
}

function getThemeById(id) {
    return Theme.findById(id);
}

function addTheme(data) {
    return Theme.create(data);
}
function createPost(content) {
    return Post.create(content);
}
function addPostToTheme(themeId, comment) {
    return Theme.findByIdAndUpdate(themeId, comment);
}

module.exports = {
    getAllthemes,
    getThemeById,
    addTheme,
    createPost,
    addPostToTheme
}