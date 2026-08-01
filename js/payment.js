//================ PAYMENT FORM ELEMENTS =================//

const paymentForm = document.getElementById("paymentForm");

const paymentOptions = document.querySelectorAll(".option");

const cardPayment = document.getElementById("cardPayment");
const upiPayment = document.getElementById("upiPayment");
const bankPayment = document.getElementById("bankPayment");
const cashPayment = document.getElementById("cashPayment");

const payButton = document.querySelector(".pay-btn");


//================ HIDE ALL PAYMENT FORMS =================//

function hideAllForms(){

    cardPayment.classList.remove("active");
    upiPayment.classList.remove("active");
    bankPayment.classList.remove("active");
    cashPayment.classList.remove("active");

}


//================ CHANGE PAYMENT METHOD =================//

paymentOptions.forEach(option => {

    option.addEventListener("click", function(){

        // Remove active class
        paymentOptions.forEach(item => item.classList.remove("active"));

        // Add active class
        this.classList.add("active");

        // Select radio button
        this.querySelector("input").checked = true;

        // Hide all forms
        hideAllForms();

        const method = this.querySelector("input").value;

        switch(method){

            case "Card":

                cardPayment.classList.add("active");

                payButton.innerHTML =
                '<i class="fa-solid fa-lock"></i> Confirm Payment';

                break;


            case "UPI":

                upiPayment.classList.add("active");

                payButton.innerHTML =
                '<i class="fa-brands fa-google-pay"></i> Pay with UPI';

                break;


            case "Net Banking":

                bankPayment.classList.add("active");

                payButton.innerHTML =
                '<i class="fa-solid fa-building-columns"></i> Proceed to Bank';

                break;


            case "Cash":

                cashPayment.classList.add("active");

                payButton.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Confirm Booking';

                break;

        }

    });

});


//================ PAYMENT VALIDATION =================//

paymentForm.addEventListener("submit", function(event){

    event.preventDefault();

    const selectedMethod =
    document.querySelector("input[name='payment']:checked").value;


    //================ CARD =================//

    if(selectedMethod === "Card"){

        const holder =
        document.getElementById("cardHolder").value.trim();

        const number =
        document.getElementById("cardNumber").value.trim();

        const expiry =
        document.getElementById("expiry").value.trim();

        const cvv =
        document.getElementById("cvv").value.trim();


        if(holder === ""){

            alert("Please enter the Card Holder Name.");

            return;

        }

        if(number.length !== 16 || isNaN(number)){

            alert("Please enter a valid 16-digit Card Number.");

            return;

        }

        if(expiry === ""){

            alert("Please enter the Expiry Date.");

            return;

        }

        if(cvv.length !== 3 || isNaN(cvv)){

            alert("Please enter a valid 3-digit CVV.");

            return;

        }

    }


    //================ UPI =================//

    if(selectedMethod === "UPI"){

        const upi =
        document.getElementById("upiId").value.trim();

        if(upi === ""){

            alert("Please enter your UPI ID.");

            return;

        }

    }


    //================ NET BANKING =================//

    if(selectedMethod === "Net Banking"){

        const bank =
        document.getElementById("bank").value;

        if(bank === ""){

            alert("Please select your bank.");

            return;

        }

    }


    //================ SUCCESS =================//

    alert(
`🎉 Payment Successful!

Payment Method : ${selectedMethod}

Thank you for choosing StayEase.

Your booking has been confirmed successfully!`
    );


    //================ REDIRECT =================//

    window.location.href = "profile.html";

});