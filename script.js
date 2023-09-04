const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box svg"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => { 
        if(option.checked) {
            if(option.id !== "no-duplicates" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") { 
                staticPassword += `  ${staticPassword}  `;
            } else { 
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {

        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { 
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
    upadatePassIndicator();
}

const upadatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); 
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);