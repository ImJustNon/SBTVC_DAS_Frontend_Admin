const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/login", async(req, res) =>{
    const { is_login } = req.session ?? {};

    if(is_login === true){
        return res.redirect("/p/overview");
    }

    return res.render("index.ejs", {
        PAGE: "LOGIN",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
});

module.exports = router;