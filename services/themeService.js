const Theme = require("../models/Theme");

function getAllthemes() {
    return Theme.find({});
}

function getThemeById(id) {
    return Theme.findById(id);
}

function addTheme(data) {
    return Theme.create(data);
}

function postComment(themeId, comment) {
    return Theme.findByIdAndUpdate(themeId, comment);
}

module.exports = {
    getAllthemes,
    getThemeById,
    addTheme,
    postComment
}