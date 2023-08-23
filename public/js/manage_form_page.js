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