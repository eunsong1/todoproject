
const API_key = "bc829a80dce8069cd113d63536ed8126";

const city = document.querySelector("#city");
const weather = document.querySelector("#weather")

let isTemp = true;

function getWearther(){
    const coords = localStorage.getItem("coords")
    const lat = JSON.parse(coords).latitude;
    const lon = JSON.parse(coords).longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`


    fetch(url)
        .then((res)=>res.json())
        .then((date)=>{
            //화면에 출력


            const temp = date.main.temp;
            const d_weather = date.weather[0].main;
            const d_city = date.name;

            
            if(isTemp){
                weather.innerText = `${temp}℃`
                isTemp = false;
            }else{
                
                weather.innerText= `${d_weather}`
                isTemp = true;
            }
            city.innerText = `in ${d_city}`
        })
}
function onGeoPositionSuccess(position){
    console.log(position);
    console.log(`latiude : ${position.coords.latitude}`);
    console.log(`longitude : ${position.coords.longitude}`)
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    localStorage.setItem("coords",JSON.stringify({
        latitude : lat,
        longitude : lon
    }));
    getWearther();
    
}
function onGeopositionError(){
    console.log("에러");
}

navigator.geolocation.getCurrentPosition(onGeoPositionSuccess   , onGeopositionError)


if(localStorage.getItem("coords")!==null){
    setInterval(getWearther,2000);
}else{
    navigator.geolocation.getCurrentPosition(onGeoPositionSuccess,onGeopositionError);
}

