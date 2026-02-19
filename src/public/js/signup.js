console.log("Signup frontend javascript file");

$(function() {
    const fileTarget = $(".file-box .upload-hidden");
    let filename;

    fileTarget.on("change", function () {
        if(window.FileReader) {
            const uploadfile = $(this) [0].files[0];
            console.log("uploadFile:", uploadfile);
            const fileType = uploadfile["type"];
            const validImageType = ["image/jpg", "image/jpeg", "image/png"];
            if(!validImageType.includes(fileType)) {
                alert("Please insert only jpeg, jpg and png!")
            } else {
                if(uploadfile) {
                    console.log(URL.createObjectURL(uploadfile))
                    $(".upload-img-frame")
                    .attr("src", URL.createObjectURL(uploadfile))
                    .addClass("success");
                }
                filename = $(this)[0].files[0].name;
              }
                $(this).siblings(".upload-name").val(filename)
            
        }
    })
}); 

function validateSignupForm() {
    const memberNick = $(".member-nick").val();
    const memberPhone = $(".member-phone").val();
     const memberPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();

    if( 
        memberNick === "" || 
        memberPhone === "" || 
        memberPassword === "" || 
        confirmPassword === ""
    ) {
        alert("insert all required inputs!")
        return false
    }

    if(memberPassword !== confirmPassword) {
        alert("Password differs, please check!");
        return false
    }

    const memberImage = $(".member-image").get(0).files[0] ?
     $(".member-image").get(0).files[0].name : null;
     if(!memberImage) {
        alert("Please insert restaurant image!");
        return false;
     }
}