const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/overview", check_login, async(req, res) =>{
    return res.render("index.ejs", {
        PAGE: "LOGIN",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
});

module.exports = router;