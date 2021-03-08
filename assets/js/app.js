
let cityName= 'san jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';

fetch('https://worldtimeapi.org/api/ip').then(data=>data.json()).then(data=>{

    console.log(data['datetime']);
    let day = dayjs(data["datetime"]);
    $('#curTime')[0].textContent = day.format('hh:mm');

})

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data=>data.json()).then(data=>
{
    console.log(data['weather']['0']['main']);
    $('#weather')[0].textContent = data['weather']['0']['main'];
})

