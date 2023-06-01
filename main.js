const _v = {
    hasError : false,
    isValidPassword : false,
    emailPattern : /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/,
}


function validaForm(form,notifica){
    _v.form = document.querySelector(`${form}`);
    _v.notificationItem = document.querySelector(`${notifica}`);
    _v.passwordStrenght = document.querySelectorAll(`#password > span`);
    _v.formItems = Array.from(_v.form.elements);
    submitForm();
    checkPasswordStrenght();
}

function submitForm(){
    _v.form.addEventListener("submit", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        checkValidation();
    }, true)
};

function checkValidation(){
    try{
        requiredField();
        isValidEmail();
        checkPassword();
        _v.notificationItem.textContent = "La Registrazione e' avvenuta correttamente.";
        resetForm();
    }catch(e){
        _v.notificationItem.textContent = e.message;
    }
};

function resetForm(){
    _v.form.reset();
    resetPasswordStrenght();
    _v.formItems.forEach((formItem)=>{
        formItem.classList.remove("error");
    })
}

function resetPasswordStrenght(){
    _v.passwordStrenght.forEach(span => {
        span.classList.remove("active");
    });
}


function requiredField(){
    let error;
    _v.hasError = false;
    _v.formItems.forEach((formItem)=>{
        error = false;
        if(formItem.type !== "checkbox" && formItem.required && formItem.value === ""){
            error = true;
        };
        if(formItem.type === "checkbox" && formItem.required && !formItem.checked){
            error = true;
        }
        if(error){
            _v.hasError = true;
            formItem.classList.add("error");
        }
    });

    if(_v.hasError){
        throw new Error("Compilare i campi obbligatori");
    }
}

function isValidEmail(){
    if(!_v.emailPattern.test(_v.form.email.value)){
        throw new Error("L'Email non e' valida");
    }
}

function checkPassword(){
    const pwd = _v.form.password.value;
    const re_pwd = _v.form.re_password.value;
    if(!_v.isValidPassword){
        throw new Error("La password indicata non e' valida");
    }
    if(pwd !== re_pwd){
        throw new Error("Le password non coincidono")
    }
}





function checkPasswordStrenght(){
    _v.form.password.addEventListener("keyup", (e) => {
        const isValid = {
            isLow : false,
            isHigh : false
        },
        pwd = e.target.value

        resetPasswordStrenght();

        if(pwd.length >= 8){
            _v.passwordStrenght[0].classList.add("active");
            if(regexCount(/[&%?!]/g, pwd) === 1){
                _v.passwordStrenght[1].classList.add("active");
            }
            isValid.isLow = true;
        };
        if(pwd.length >= 10 && regexCount(/[&%?!]/g, pwd) >= 2){
            _v.passwordStrenght[0].classList.add("active");
            _v.passwordStrenght[1].classList.add("active");
            _v.passwordStrenght[2].classList.add("active");
            isValid.isHigh = true;
        };
        _v.isValidPassword = (isValid.isLow || isValid.High) ? true : false;
     });
}


function regexCount(pattern,password){
    return (password.match(pattern) || []).length;
}



export default validaForm;