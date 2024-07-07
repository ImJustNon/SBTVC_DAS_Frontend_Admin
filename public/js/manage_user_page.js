// add user input
const input_add_student_id = document.getElementById("input_add_student_id");
const input_add_student_prefix = document.getElementById("input_add_student_prefix");
const input_add_student_name = document.getElementById("input_add_student_name");
const input_add_student_lastname = document.getElementById("input_add_student_lastname");
const input_add_student_branch = document.getElementById("input_add_student_branch");
const add_user_btn = document.getElementById("add_user_btn");

// remove user input
const input_remove_student_id = document.getElementById("input_remove_student_id");
const remove_user_btn = document.getElementById("remove_user_btn");

// add user
add_user_btn.addEventListener("click", async() =>{
    try{
        const response = await axios.post('http://127.0.0.1:808/api/users/add_student_user', {
            secret_key: "nonlnwza",
            student_prefix: input_add_student_prefix.value,
            student_id: input_add_student_id.value,
            student_name: input_add_student_name.value,
            student_lastname: input_add_student_lastname.value,
            student_reg_type: input_add_student_branch.value,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error)
            return;
        }

        console.log("[Admin | Manage-User-Page] Add user successful");
        swal("เพิ่มสำเร็จ", "คลิกเพื่อ reload หน้านี้", "success").then(() => {
            window.location.reload();
        });
    }
    catch(err){
        notyf.error(err);
        console.log(err);
    }
});


// remove user
remove_user_btn.addEventListener("click", async() =>{
    swal({
        title: `คุณเเน่ใจที่จะลบผู้ใช้ ${input_remove_student_id.value} หรือไม่ ?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(async confirm =>{
        if(confirm){
            try{
                const response = await axios.post('http://127.0.0.1:808/api/users/remove_student_user', {
                    secret_key: "nonlnwza",
                    student_id: input_remove_student_id.value,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if(response.data.status === "FAIL"){
                    notyf.error(response.data.error);
                    console.log(response.data.error)
                    return;
                }
        
                console.log("[Admin | Manage-User-Page] Add user successful");
                swal("นำออกสำเร็จ", "คลิกเพื่อ reload หน้านี้", "success").then(() => {
                    window.location.reload();
                });
            }
            catch(err){
                notyf.error(err);
                console.log(err);
            }
        }
    });
});