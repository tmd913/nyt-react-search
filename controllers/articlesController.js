const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
    searchArticles: function (req, res) {
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931", { params: req.query })
            .then(({ data: { response } }) => res.json(response.docs))
            .catch(err => res.status(422).json(err));
    },
    getArticles: function (req, res) {
        db.Article
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Article
            .findOneAndUpdate({ title: req.body.title }, req.body, { upsert: true, setDefaultsOnInsert:true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Article
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
