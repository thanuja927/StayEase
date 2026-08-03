/*======================================================
                SETTINGS PAGE
======================================================*/


/*======================================================
                SAVE BUTTONS
======================================================*/

const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("✅ Your settings have been saved successfully!");

    });

});


/*======================================================
                PASSWORD VALIDATION
======================================================*/

const passwordInputs = document.querySelectorAll(
    'input[type="password"]'
);

if(passwordInputs.length >= 3){

    const updateButton = passwordInputs[2].nextElementSibling;

    updateButton.addEventListener("click", function(e){

        e.preventDefault();

        const currentPassword = passwordInputs[0].value.trim();
        const newPassword = passwordInputs[1].value.trim();
        const confirmPassword = passwordInputs[2].value.trim();

        if(currentPassword === "" ||
           newPassword === "" ||
           confirmPassword === ""){

            alert("Please fill all password fields.");
            return;
        }

        if(newPassword !== confirmPassword){

            alert("New Password and Confirm Password do not match.");
            return;
        }

        alert("🔒 Password updated successfully!");

        passwordInputs.forEach(input => {

            input.value = "";

        });

    });

}


/*======================================================
                CHECKBOX EFFECT
======================================================*/

const checkboxes = document.querySelectorAll(
    '.setting-item input[type="checkbox"]'
);

checkboxes.forEach(box => {

    box.addEventListener("change", function(){

        console.log(this.checked);

    });

});


/*======================================================
                DROPDOWN CHANGE
======================================================*/

const selects = document.querySelectorAll(".setting-select select");

selects.forEach(select => {

    select.addEventListener("change", function(){

        console.log(this.value);

    });

});