
async function UpdateOutLocationAuth(student_id, status){
    try{
        const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/admin/form/update_form/update_out_location_auth', {
            student_id: student_id,
            status: status,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return;
        }

        notyf.success('อัปเดตสำเร็จ');
        console.log("[Manage-Form-Page] Update Out Location Auth : SUCCESS");
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}

async function UpdateAllow(student_id, status){
    try{
        const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/admin/form/update_allow', {
            student_id: student_id,
            update_status: status,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return;
        }

        notyf.success('อัปเดตสำเร็จ');
        console.log("[Manage-Form-Page] Update Allow : SUCCESS");
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}

async function UpdateInLocationAuth(student_id, status){
    try{
        const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/admin/form/update_form/update_in_location_auth', { 
            student_id: student_id,
            status: status,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return;
        }

        notyf.success('อัปเดตสำเร็จ');
        console.log("[Manage-Form-Page] Update In Location Auth : SUCCESS");
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}

async function UpdateConfirmBackin(student_id, status){
    try{
        Swal.fire({
            title: 'คุณเเน่ใจใช่หรือไม่?',
            text: "ข้อมูลต่อไปนี้จะถูกย้ายถาวร",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/form/update_backin', {
                    student_id: student_id,
                }, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });

                if(response.data.status === "FAIL"){
                    notyf.error(response.data.error);
                    console.log(response.data.error);
                    return;
                }

                notyf.success('อัปเดตสำเร็จ');
                console.log("[Manage-Form-Page] Update Backin : SUCCESS");

                setTimeout(() =>{
                    window.location.reload();
                }, 3 * 1000); 
            }
        });
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}


async function exportPdf(student_id){
    const response = await axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/form/check_send_form_history?student_id=${student_id}`);
    if(response.data.status === "FAIL"){
        notyf.error(response.data.error);
        console.log(response.data.error);
        return;
    }
    window.open(
        `https://dorm-genpdf.fly.dev/generate/dorm-report` +
        `?prefix=${response.data.data.results[0].student_prefix}` +
        `&student_name=${response.data.data.results[0].student_name}` +
        `&student_lastname=${response.data.data.results[0].student_lastname}` +
        `&dorm_number=${response.data.data.results[0].student_dorm_number}` +
        `&room_number=${response.data.data.results[0].student_room_number}` +
        `&student_phone_number=${response.data.data.results[0].student_phone_number}` +
        `&reg_type=${response.data.data.results[0].student_reg_type}` +
        `&leave_date=${response.data.data.results[0].leave_date}` +
        `&leave_time=${response.data.data.results[0].leave_time}` +
        `&leave_for=${response.data.data.results[0].leave_for}` +
        `&come_date=${response.data.data.results[0].come_date}` +
        `&come_time=${response.data.data.results[0].come_time}` +
        `&total_leave_date=${response.data.data.results[0].leave_total}` +
        `&traveled_by=${response.data.data.results[0].travel_by}` +
        `&parent_name=${response.data.data.results[0].parent_name}` +
        `&parent_lastname=${response.data.data.results[0].parent_lastname}` +
        `&parent_phone_number=${response.data.data.results[0].parent_phone_number}` +
        `&student_id=${response.data.data.results[0].student_id}` +
        `&back_in=${response.data.data.results[0].backin}` +
        `&allow=${response.data.data.results[0].allow}` +
        `&grade=${response.data.data.results[0].student_year_level}`, 
        '_blank'
    );
}