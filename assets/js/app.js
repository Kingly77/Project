let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';
let currentWeather;
let currentTime;

dayjs.extend(window.dayjs_plugin_utc)

function getData()
{

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data =>
    {
        
        $('#cityName').text(data['name']);
        currentWeather = data['weather']['0']['main'];
        
        console.log(currentWeather);
        $('#current-weather').text(currentWeather);
        currentTime = dayjs.utc().utcOffset(data['timezone'] / 60).format('HH:mm');
         $('#current-time').text(currentTime);
        getIcon(currentWeather, currentTime);
    })
    .catch(function(error) {
        $('#exampleModal1').foundation('open');
        $(".lead").text(error);
        

    })
}

getData();
console.log(currentWeather);

$(`#cityName`)[0].textContent = `${cityName}`;

$('#lookup').click(() =>
{
    cityName = $('#input')[0].value;
    $(`#cityName`)[0].textContent = `${cityName}`;
    getData();
})

function getIcon(weather, time) 
{   
    console.log(time); 
    console.log(weather);
    let currentIcon = document.getElementById("forecast");
    switch(weather) {
        case "Clouds":
            currentIcon.setAttribute("src", "./assets/images/wind.png");
            //document.appendChild(currentIcon);
            console.log(currentIcon);
            break;
        case "Clear":
            if(/^../.exec(time) > 19) {
                currentIcon.setAttribute("src", "./assets/images/Night clear.png");
                break;
            }
            else if(/^../.exec(time) <= 19) {
            currentIcon.setAttribute("src", "./assets/images/sunny.png");
            break;
            }
        case "Snow":
            currentIcon.setAttribute("src", "./assets/images/snow.png");
            break;
        case "Hail":
            currentIcon.setAttribute("src", "./assets/images/hail.png");
            break;
        case "Rain":
            if(/^../.exec(time) > 19) {
                currentIcon.setAttribute("src", "./assets/images/Night rain.png");
                break;
            }
            else if(/^../.exec(time) <= 19) {
            currentIcon.setAttribute("src", "./assets/images/rain.png");
            break;
            }       
            
    }



}
getIcon();