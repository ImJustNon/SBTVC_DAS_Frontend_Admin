const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/view-all-form-history", check_login, async(req, res) =>{
    try{
        const response = await axios.post('https://sbtvc-das-backend-2.vercel.app/api/admin/form/get_home_form_history_data', {
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.render("index.ejs", {
            PAGE: "VIEW_ALL_FORM_HISTORY",
            session: {
                is_login: req.session.is_login,
                admin_id: req.session.admin_id,
            },
            data: {
                results: response.data.status === "SUCCESS" ? response.data.data.results : [],
            }
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            status: "FAIL",
            error: "FAIL to fetch data in this time",    
        });
    }
});

module.exports = router;