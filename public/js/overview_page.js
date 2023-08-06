// student user info element
const card_student_count = document.getElementById("card_student_count");
const card_current_login = document.getElementById("card_current_login");
const card_student_information_technology = document.getElementById("card_student_information_technology");
const card_student_electrical_technology = document.getElementById("card_student_electrical_technology");
const card_student_electronic = document.getElementById("card_student_electronic");
const card_student_mechatronic = document.getElementById("card_student_mechatronic");
const card_student_premium = document.getElementById("card_student_premium");

// form info element
const card_current_form_count = document.getElementById("card_current_form_count");
const card_not_out_auth_count = document.getElementById("card_not_out_auth_count");
const card_not_allow_count = document.getElementById("card_not_allow_count");
const card_not_in_auth_count = document.getElementById("card_not_in_auth_count");
const card_not_backin_count = document.getElementById("card_not_backin_count");

(async () =>{ // Load updater when page first load
    await UpdateStudentInfo();
    await UpdateFormInfo();
})(); 

setInterval(async() =>{
    await UpdateStudentInfo();
    await UpdateFormInfo();
}, 60 * 1000 /* will update every 1 minute */ );

async function UpdateStudentInfo(){
    try {
        const response = await axios.post('/api/admin/page/overview/student_user_count', {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return "FAIL";
        }

        card_student_count.innerHTML = response.data.data.student_user_count;
        card_current_login.innerHTML = response.data.data.current_login;
        card_student_information_technology.innerHTML = response.data.data.information_technology_count;
        card_student_electrical_technology.innerHTML = response.data.data.electrical_technology_count;
        card_student_electronic.innerHTML = response.data.data.electronic_count;
        card_student_mechatronic.innerHTML = response.data.data.mechatronic_count;
        card_student_premium.innerHTML = response.data.data.premium_count;

        notyf.success("อัปเดตจำนวนข้อมูลสำเร็จ");
        console.log("[Admin | Overview-Page] Update student info successful");
        console.log(response.data.data);
        return "SUCCESS";
    }
    catch(err){
        notyf.error(err);
        console.log(err);
        return "FAIL";
    }
}


async function UpdateFormInfo(){
    try{
        const response = await axios.post('/api/admin/page/overview/form_count', {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return "FAIL";
        }

        card_current_form_count.innerHTML = response.data.data.all_form_count;
        card_not_out_auth_count.innerHTML = response.data.data.not_out_auth_count;
        card_not_allow_count.innerHTML = response.data.data.not_allow_count;
        card_not_in_auth_count.innerHTML = response.data.data.not_in_auth_count;
        card_not_backin_count.innerHTML = response.data.data.not_backin_count;

        notyf.success("อัปเดตจำนวนเเบบฟอร์มสำเร็จ");
        console.log("[Admin | Overview-Page] Update form info successful");
        console.log(response.data.data);
        return "SUCCESS";
    }   
    catch(err) {
        notyf.error(err);
        console.log(err);
        return "FAIL";
    }
}