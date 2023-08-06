const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const mongoose = require("mongoose");
const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");
const student_session = require("../models/student_session.js");

const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
});


router.post("/api/admin/page/overview/student_user_count", urlEncoded, async(req, res) =>{
    const { is_login } = req.session ?? {};

    if(!is_login){
        return res.json({
            status: "FAIL",
            error: "You have to login before request",
        });
    }
    // ********************************************************


    // current login student count , get from mongodb
    // const student_session_data = mongoose.model('session', new mongoose.Schema({
        
    // }));
    // const student_session_count = await student_session_data.countDocuments({});
    const student_session_count = await student_session.countDocuments({});


    // get data from mysql
    connection.execute('SELECT * FROM student_data_table', async(error, results, fields) =>{
        if(error){
            return res.json({
                status: "FAIL",
                error: `mysql Error : ${error}`
            });
        }

        try {
            const student_user_count = results.length;
            let information_technology_count = 0;
            let electrical_technology_count = 0;
            let electronic_count = 0;
            let mechatronic_count = 0;
            let premium_count = 0;
            let no_data_count = 0;
            await results.forEach(student_data => {
                let get_branch = student_data.student_reg_type;
                if(get_branch === 'INFORMATION_TECHNOLOGY'){
                    information_technology_count++;
                }
                else if(get_branch === 'ELECTRICAL_TECHNOLOGY'){
                    electrical_technology_count++;
                }
                else if(get_branch === 'ELECTRONIC'){
                    electronic_count++;
                }
                else if(get_branch === 'MECHATRONIC'){
                    mechatronic_count++;
                }
                else if(get_branch === 'PREMIUM'){
                    premium_count++;
                }
                else {
                    no_data_count++;
                }
            });

            return res.json({
                status: "SUCCESS",
                error: null,
                data: {
                    student_user_count: student_user_count,
                    current_login: student_session_count > 0 ? parseInt(student_session_count/2) : student_session_count,
                    information_technology_count: information_technology_count,
                    electrical_technology_count: electrical_technology_count,
                    electronic_count: electronic_count,
                    mechatronic_count: mechatronic_count,
                    premium_count: premium_count,
                    no_data_count: no_data_count
                }
            });
        }
        catch (err){
            return res.json({
                stauts: "FAIL",
                error: err
            });
        }
    });
});


router.post('/api/admin/page/overview/form_count', urlEncoded, async(req, res) =>{
    const { is_login } = req.session ?? {};

    if(!is_login){
        return res.json({
            status: "FAIL",
            error: "You have to login before request",
        });
    }
    // ********************************************************

    connection.execute(`SELECT * FROM send_form_table`, (error, results, fields) =>{
        if(error){
            return res.json({
                status: "FAIL",
                error: `Mysql Error :: ${error}`,
            });
        }

        try {
            const all_form_count = results.length;
            let not_allow_count = 0;
            let not_out_auth_count = 0;
            let not_in_auth_count = 0;
            let not_backin_count = 0;

            results.forEach(async form_data =>{
                if(form_data.allow == "false"){
                    not_allow_count++;
                }
                if(form_data.out_location_auth == "false"){
                    not_out_auth_count++;
                }
                if(form_data.in_location_auth == "false"){
                    not_in_auth_count++;
                }
                if(form_data.backin == "false"){
                    not_backin_count++;
                }
            }); 

            return res.json({
                status: "SUCCESS",
                error: null,
                data: {
                    all_form_count: all_form_count,
                    not_allow_count: not_allow_count,
                    not_out_auth_count: not_out_auth_count,
                    not_in_auth_count: not_in_auth_count,
                    not_backin_count: not_backin_count,
                }
            });
        }
        catch(err){
            return res.json({
                status: "FAIL",
                error: err,
            });
        }
    });

});

module.exports = router;