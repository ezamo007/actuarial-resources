document.addEventListener("DOMContentLoaded", function() {
    const annuityEquation = document.querySelector(".annuity-equation");
    const nInput = document.getElementById("n-input");
    const iInput = document.getElementById("i-input");
    const notationOutput = document.getElementById("notation-output");

    const iError = document.getElementById("iError");
    const nError =  document.getElementById("nError");
    const calculateButton = document.getElementById("calculate");
    const notationOutputDiv = document.getElementById("notation-output");


    const dotsOffButton = document.getElementById("dots-off");
    const dotsOnButton = document.getElementById("dots-on");
    const notationSButton = document.getElementById("notation-s");
    const notationAButton = document.getElementById("notation-a");

    function updateEquation() {
        let equationText = "";
        const notation = notationSButton.classList.contains("active-notation") ? "s" : "a";
        equationText = `
            \\[
            \\require{enclose}
            ${notation}_{\\enclose{actuarial}{${nInput.value}}${iInput.value}}
            \\]
        `;
        if (dotsOnButton.classList.contains("active-dots")) {
            equationText = equationText.replace(`${notation}_`, "\\ddot{" + notation + "}_");
        }
        annuityEquation.innerHTML = equationText;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, annuityEquation]);

        
    }

    
    dotsOffButton.addEventListener("click", function() {
        dotsOffButton.classList.add("active-dots");
        dotsOnButton.classList.remove("active-dots");

        if(validatePositiveNumber() && validateNaturalNumber()){
            updateEquation();
            updateNotationOutput();
        }


    });

    dotsOnButton.addEventListener("click", function() {
        dotsOnButton.classList.add("active-dots");
        dotsOffButton.classList.remove("active-dots");
        if(validatePositiveNumber() && validateNaturalNumber()){
            updateEquation();
            updateNotationOutput();
        }    
    });

    notationSButton.addEventListener("click", function() {
        notationSButton.classList.add("active-notation");
        notationAButton.classList.remove("active-notation");
        if(validatePositiveNumber() && validateNaturalNumber()){
            updateEquation();
            updateNotationOutput();
        }   
     });

    notationAButton.addEventListener("click", function() {
        notationAButton.classList.add("active-notation");
        notationSButton.classList.remove("active-notation");
        if(validatePositiveNumber() && validateNaturalNumber()){
            updateEquation();
            updateNotationOutput();
        }  
      });


    function updateNotationOutput() {
        const isDue = dotsOnButton.classList.contains("active-dots")
        const isCumulative = notationSButton.classList.contains("active-notation")
        
        i = Number(iInput.value);
        n = Number(nInput.value);
        v = (1/(1+i))
        tempValue = 0;
        
        if(isCumulative){
            tempValue = ((1+i)**n - 1)/i
        }else{
            tempValue =(1-v**n)/i
        }

        if(isDue){
            result = (tempValue*(1+i)).toFixed(4)
        }else{
            result = tempValue.toFixed(4);
        }

        notationOutput.innerText = "=" + result.toString();
    

    }

    // Calculate Button Output
calculateButton.addEventListener("click", function() {
   
    updateNotationOutput();
});



    nInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if(validateNaturalNumber() && validatePositiveNumber()){;
                updateEquation();
                updateNotationOutput();
            }
        }
    });

    iInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if(validatePositiveNumber() && validateNaturalNumber()){
                updateEquation();
                updateNotationOutput();
            }
        }
    });




    function validateNaturalNumber() {
        const inputValue = parseFloat(nInput.value);
        if (isNaN(inputValue) || !Number.isInteger(inputValue) || inputValue < 1) {
            if (isNaN(inputValue)) {
                nError.innerText = "Enter a valid number.";
            } else {
                nError.innerText = "Enter a natural number greater than zero.";
            }
            return false;
        }
        nInput.value = Math.round(inputValue); // Round to the nearest integer
        nError.innerText = "";
        return true;
    }
    
    function validatePositiveNumber() {
        const inputValue = parseFloat(iInput.value);
        if (isNaN(inputValue) || inputValue <= 0) {
            if (isNaN(inputValue)) {
                iError.innerText = "Enter a valid number.";
            } else {
                iError.innerText = "Enter a number greater than zero.";
            }
            return false;
        }
        iError.innerText = "";
        return true;
    }

    





    updateEquation();

});


