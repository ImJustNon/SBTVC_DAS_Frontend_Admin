async function UpdateAllow(student_id, update_status){
    // axios.post("", )
    try{
        const response = await axios.post('http://127.0.0.1:808/api/admin/form/update_allow', {
            student_id: student_id,
            update_status: update_status, 
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.data.status === "FAIL"){
            console.log(response.data.error);
            notyf.error(response.data.error);
            return;
        }

        console.log("[Manage-Allow-Page] Update allow status success");
        Swal.fire("อัปเดตสถานะสำเร็จ");
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}