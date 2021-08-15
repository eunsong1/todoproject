const clock = document.querySelector("#clock")


function getClock(){
    const date = new Date();
    const   hours  = String(date.getHours()%12).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")
    var h="오전"
    if(date.getHours()>=12){
        h = "오후"
    }
    clock.innerText= `${h+hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000)  