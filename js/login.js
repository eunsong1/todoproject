//const login_btton = document.querySelector("#login button")
const login_input = document.querySelector("#login input")
const hellouser = document.querySelector("#userHello")
const loginForm = document.querySelector("#login")
const saveUser = localStorage.getItem("userName");
// import {paintingalltodo} from './to.js';


function login_e(e){
    
    e.preventDefault()
    const userName =login_input.value; 
    localStorage.setItem("userName",userName);
    paintgreetings(userName);
    getAllTodos();
}
function paintgreetings(userName){
    hellouser.classList.remove("hidden");
    loginForm.classList.add("hidden");
    hellouser.innerText = `Hello ${userName}`;
    
}

if(saveUser == null){
    loginForm.classList.remove("hidden")//loginForm
    loginForm.addEventListener("submit",login_e)
    //login_btton.addEventListener("click", login_click)
}else{
    paintgreetings(saveUser);
}
