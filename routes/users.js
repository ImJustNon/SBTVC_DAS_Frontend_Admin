const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/users", check_login, async(req, res) =>{
    const { branch } = req.query ?? {};

    if(!branch){
        return res.json({
            status: "FAIL",
            error: "Cant find branch",
        });
    }

    const { data } = await axios.get(`https://sbtvc-das-backend-2.vercel.app/api/users/branch/${branch}`);
    const users_data = data.status === "SUCCESS" ? data.data.results : [];


    return res.render("index.ejs", {
        PAGE: "USERS",
        data: {
            branch: branch,
            users_data: users_data,
        },  
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
});

module.exports = router;