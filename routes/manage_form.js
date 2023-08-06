const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/manage-form", check_login, async(req, res) =>{
    const { filter } = req.query ?? {};

    if(!filter){
        await NoFilter();
    }
});


async function NoFilter(){
    return res.render("index.ejs", {
        PAGE: "MANAGE_FORM",  
        filter: "NO_FILTER",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
}

async function FilterNotOutAuth(){
    return res.render("index.ejs", {
        PAGE: "MANAGE_FORM",  
        filter: "FILTER_NOT_OUT_AUTH",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
}

async function FilterNotAllow(){
    return res.render("index.ejs", {
        PAGE: "MANAGE_FORM",  
        filter: "FILTER_NOT_ALLOW",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
}

async function FilterNotInAuth(){
    return res.render("index.ejs", {
        PAGE: "MANAGE_FORM",  
        filter: "FILTER_NOT_IN_AUTH",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
}

async function FilterNotBackIn(){
    return res.render("index.ejs", {
        PAGE: "MANAGE_FORM",  
        filter: "FILTER_NOT_BACKIN",
        session: {
            is_login: req.session.is_login,
            admin_id: req.session.admin_id,
        },
    });
}

module.exports = router;