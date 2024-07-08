async function showMore(id){
    if(!id) return;
    try{
        const response = await axios.post(`https://sbtvc-das-backend-2.vercel.app/api/admin/form/get_home_form_history_data`, {
            form_id: id,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(response.data.status === "FAIL"){
            console.log(response.data.error);
            notyf.error(response.data.error);
        }

        Swal.fire({
            imageUrl: response.data.data.results[0].image_link,
            imageAlt: `${response.data.data.results[0].image_link}`,
            html:   `*************************************** <br /><strong>ข้อมูลเเบบฟอร์มทั้งหมด</strong><br /> *************************************** <br />`
                    + `ID  :: <strong>${response.data.data.results[0].id}</strong> <br />`
                    + `OLD ID :: <strong>${response.data.data.results[0].old_id}</strong> <br />`
                    + `เลขนักเรียน  :: <strong>${response.data.data.results[0].student_id}</strong> <br />`
                    + `ชื่อ  ::  <strong>${response.data.data.results[0].student_prefix} ${response.data.data.results[0].student_name} ${response.data.data.results[0].student_lastname}</strong> <br />`
                    + `ปี  :: <strong>${response.data.data.results[0].student_year_level}</strong> <br />`
                    + `หอ  :: <strong>${response.data.data.results[0].student_dorm_number}</strong> <br />`
                    + `ห้อง  :: <strong>${response.data.data.results[0].student_room_number}</strong> <br />`
                    + `เบอร์นักเรียน  :: <strong>${response.data.data.results[0].student_phone_number}</strong> <br />`
                    + `สาขา  :: <strong>${response.data.data.results[0].student_reg_type}</strong> <br />`
                    + `วันออก  :: <strong>${response.data.data.results[0].leave_date}</strong> <br />`
                    + `เวลาออก  :: <strong>${response.data.data.results[0].leave_time}</strong> <br />`
                    + `วันเข้า  :: <strong>${response.data.data.results[0].come_date}</strong> <br />`
                    + `เวลาเข้า  :: <strong>${response.data.data.results[0].come_time}</strong> <br />`
                    + `รวมวัน  :: <strong>${response.data.data.results[0].leave_total}</strong> <br />`
                    + `เดินทางโดย  :: <strong>${response.data.data.results[0].travel_by}</strong> <br />`
                    + `ชื่อผู้ปกครอง  :: <strong>${response.data.data.results[0].parent_name} ${response.data.data.results[0].parent_lastname}</strong> <br />`
                    + `เบอร์ผู้ปกครอง  :: <strong>${response.data.data.results[0].parent_phone_number}</strong> <br />`
                    + `Timestamp  :: <strong>${response.data.data.results[0].timestamp}</strong> <br />`
                    + `*************************************** <br /><strong>การยืนยัน</strong><br /> *************************************** <br />`
                    + `สถานที่ยืนยัน (ออก)  :: <strong>${response.data.data.results[0].out_location_auth === "true" ? "✅ ยืนยันเเล้ว" : "❌ ยังไม่ได้ยืนยัน"}</strong> <br />`
                    + `อนุมัติ  :: <strong>${response.data.data.results[0].allow === "true" ? "✅ อนุมัติเเล้ว" : "❌ ยังไม่อนุมัติ"}</strong> <br />`
                    + `สถานที่ยืนยัน (เข้า)  :: <strong>${response.data.data.results[0].in_location_auth === "true" ? "✅ ยืนยันเเล้ว" : "❌ ยังไม่ได้ยืนยัน"}</strong> <br />`
                    + `กลับเเล้ว  :: <strong>${response.data.data.results[0].backin === "true" ? "✅ ใช่" : "❌ ไม่"}</strong> <br />`
        }); 
        console.log("Show more form data : success");
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}


async function deleteForm(id){
    if(!id) return;
    try{
        Swal.fire({
            title: 'คุณเเน่ใจใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await axios.post(`https://sbtvc-das-backend-2.vercel.app/api/admin/form/delete_home_form_history_data`, {
                    form_id: id,
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

                return Swal.fire('ทำการลบเเบบฟอร์มสำเร็จ', null, 'success').then(() => window.location.reload());
            }
        });
    }
    catch(err){
        console.log(err);
        notyf.error(err);
    }
}