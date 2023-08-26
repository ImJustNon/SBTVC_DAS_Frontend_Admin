const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const { check_login } = require("../middleware/check_login.js");
const axios = require("axios");


router.get("/p/quick-allow", check_login, async(req, res) =>{
    const { student_id } =  req.query ?? {};

    if(!student_id){
        return res.render("quick_allow_status.ejs", {
            status: "FAIL",
            error: `student_id is not defind`,
        });
    }

    connection.execute(`SELECT * FROM send_form_table WHERE student_id=?`, [student_id], async(error, results, fields) =>{
        if(error){
            return res.render("quick_allow_status.ejs", {
                status: "FAIL",
                error: `Mysql error :: ${error}`,
            });
        }

        if(results.length === 0){
            return res.render("quick_allow_status.ejs", {
                status: "FAIL",
                error: `Cant find form from this student_id : ${student_id}`,
            });
        }

        if(results[0].allow === "true"){
            return res.render("quick_allow_status.ejs", {
                status: "FAIL",
                error: `เเบบบฟอร์มนี้ได้ถูก Allow ไปเเ้ลว`,
            });
        }

        if(results[0].out_location_auth === "false"){
            return res.render("quick_allow_status.ejs", {
                status: "FAIL",
                error: `เเบบฟอร์มนี้ยังไม่ทำการยืนยันสถานที่กับเครื่องยืนยัน`,
            });
        }

        connection.execute("UPDATE send_form_table SET allow=? WHERE student_id=?", ["true", student_id], async(error, results, fields) =>{
            if(error){
                return res.render("quick_allow_status.ejs", {
                    status: "FAIL",
                    error: `Mysql error :: ${error}`,
                });
            }

            return res.render("quick_allow_status.ejs", {
                status: "SUCCESS",
                error: null,
            });
        });
    });


});

module.exports = router;