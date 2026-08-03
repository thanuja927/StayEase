/*======================================================
                SUPPORT CENTER
======================================================*/


/*======================================================
                SUPPORT BUTTONS
======================================================*/

const supportButtons = document.querySelectorAll(".support-btn");

supportButtons.forEach(button => {

    button.addEventListener("click", function () {

        const buttonText = this.innerText;

        if (buttonText === "Call Now") {

            alert("📞 Calling StayEase Support...\n\nPhone: +91 98765 43210");

        }

        else if (buttonText === "Send Email") {

            alert("📧 Opening your email application...\n\nsupport@stayease.com");

        }

        else if (buttonText === "Start Chat") {

            alert("💬 Live Chat is coming soon!");

        }

        else if (buttonText === "View FAQs") {

            alert("❓ FAQs page will be available soon.");

        }

    });

});


/*======================================================
                CONTACT FORM
======================================================*/

const supportForm = document.getElementById("supportForm");

supportForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const inputs = supportForm.querySelectorAll("input, textarea");

    let isValid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {

            isValid = false;

        }

    });

    if (!isValid) {

        alert("⚠ Please fill in all the fields.");

        return;

    }

    alert("✅ Thank you for contacting StayEase!\n\nOur support team will get back to you shortly.");

    supportForm.reset();

});


/*======================================================
                INPUT EFFECT
======================================================*/

const formInputs = document.querySelectorAll("input, textarea");

formInputs.forEach(input => {

    input.addEventListener("focus", function () {

        this.style.borderColor = "#d4af37";

    });

    input.addEventListener("blur", function () {

        this.style.borderColor = "#dcdcdc";

    });

});


/*======================================================
                PAGE LOADED
======================================================*/

window.addEventListener("load", function () {

    console.log("StayEase Support Center Loaded Successfully!");

});