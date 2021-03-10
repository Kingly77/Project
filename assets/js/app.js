let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';

function getLocalTime() {
    fetch('https://worldtimeapi.org/api/ip')
        .then(data => data.json())
        .then(data => {
            console.log(data);

            console.log(data['datetime']);
            let day = dayjs(data["datetime"]);
            $('#current-time')[0].textContent = day.format('hh:mm');

        })
}

function getWeather() {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data => {

        console.log(data['weather']['0']['main']);
        $('#current-weather')[0].textContent = data['weather']['0']['main'];
    })
}

getWeather();
getLocalTime();
$(`#cityName`)[0].textContent = `${cityName}`;

$('#lookup').click(() => {
    cityName = $('#input')[0].value;
    $(`#cityName`)[0].textContent = `${cityName}`;
    getWeather(cityName);
})