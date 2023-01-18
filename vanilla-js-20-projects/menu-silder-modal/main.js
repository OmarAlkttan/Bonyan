const menuButton = document.getElementById("menu");

const collapsedMenu = document.getElementById("collapsed-menu");

const main = document.getElementById("main");

const modal = document.getElementById("sign-up-modal");

var modalFlag = true;

const signUpButton = document.getElementById("sign-up-btn");

const closeButton = document.getElementById("sign-up-close");

menuButton.addEventListener('click', function(event){
  displayMenu();
  event.stopPropagation();
});

signUpButton.addEventListener('click', function(event){
  toggleModal();
  event.stopPropagation();
}); 

closeButton.addEventListener('click', toggleModal, false);

document.addEventListener('click', (event)=>{
  console.log(modalFlag);
  if(modalFlag){
    let targetElement = event.target;
    do{
      if(targetElement == modal){
        console.log("click inside modal!");
        return;
      }
      targetElement = targetElement.parentNode;
    }while(targetElement);
    if(modal.style.left === "40%"){
      toggleModal();
      console.log("click outside!");
    }
  }
})

function displayMenu(){
  console.log("inside menu")
  if(collapsedMenu.style.left === "0px"){
    collapsedMenu.style.left = "-200%";
    menuButton.style.left = "0"
  }else{
    collapsedMenu.style.left = "0";
    menuButton.style.left = "15%"
  }
}

function toggleModal(){
  console.log("inside toggle")
  if(modalFlag){
    modal.style.left = "-200%";
    main.style.backdropFilter = "none";
    main.style.backgroundColor = "inherit";
    modalFlag = false;
  }else{
    console.log("a7a")
    modal.style.left = "40%";
    main.style.backdropFilter = "blur(15px)";
    main.style.backgroundColor = " rgba(0,0,0,0.5)";
    modalFlag = true;
  }
}
