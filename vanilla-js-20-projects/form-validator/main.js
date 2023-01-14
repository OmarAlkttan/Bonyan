const form = document.getElementById("form"); 

function checkUsername(){
  let input = document.getElementById("username");
  let validation = document.getElementById("username-check");
  if(input.value.length < 3){
    let p = "Username must be at least 3 characters"
    validation.innerHTML = p;
    validation.style.color = "red";
    input.style.borderColor = "red"
  }else{
    validation.innerHTML = "";
    input.style.borderColor = "lightgreen";
  }
}

function checkEmail(){
  let input = document.getElementById("email");
  let validation = document.getElementById("email-check");
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if(!pattern.test(input.value)){
    let p = "Email is not valid";
    validation.innerHTML = p;
    validation.style.color = "red";
    input.style.borderColor = "red";
  }else{
    validation.innerHTML = "";
    input.style.borderColor = "lightgreen";
  }
}


function checkPassword(){
  let input = document.getElementById("password");
  let validation = document.getElementById("password-check");
  if(input.value.length < 6){
    let p = "Password must be at least 6 characters"
    validation.innerHTML = p;
    validation.style.color = "red";
    input.style.borderColor = "red";
  }else{
    validation.innerHTML = "";
    input.style.borderColor = "lightgreen";
  }
}

function checkConfirmPassword(){
  let password = document.getElementById("password").value;
  let input = document.getElementById("confirm-password");
  let validation = document.getElementById("confirm-check");
  if(input.value.length === 0){
    let p = "password2 is required"
    validation.innerHTML = p;
    validation.style.color = "red";
    input.style.borderColor = "red";
  }
  else if(password !== input.value){
    let p = "Passwords don't match"
    validation.innerHTML = p;
    validation.style.color = "red";
    input.style.borderColor = "red";
    
  }else{
    validation.innerHTML = "";
    input.style.borderColor = "lightgreen";
  }
}

form.addEventListener("submit", validate)

function validate(e){
  e.preventDefault();

  checkUsername();
  checkEmail();
  checkPassword();
  checkConfirmPassword();
}

