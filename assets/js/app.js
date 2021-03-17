let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';
let currentWeather;
let currentTime;

dayjs.extend(window.dayjs_plugin_utc)

function getData() {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data => {

        $('#cityName').text(data['name']);
        currentWeather = data['weather']['0']['main'];

        console.log(currentWeather);
        $('#current-weather').text(currentWeather);
        currentTime = dayjs.utc().utcOffset(data['timezone'] / 60).format('HH:mm');

        $('#current-time').text(currentTime);

        getIcon(currentWeather, currentTime);
    })
        .catch(function (error) {
            $('#exampleModal1').foundation('open');
            $(".lead").text(error);


        })
}

getData();
console.log(currentWeather);

$(`#cityName`)[0].textContent = `${cityName}`;

$('#lookup').click(() => {
    cityName = $('#input')[0].value;
    $(`#cityName`)[0].textContent = `${cityName}`;
    getData();
})

function getIcon(weather, time) {
    console.log(time);
    console.log(weather);
    let currentIcon = document.getElementById("forecast");
    switch (weather) {
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

// Currency Exchange from USD to any countries currency. (the api supports only from usd as it is the free version)
let fromCurrency = document.querySelector('#changeCurrencyFrom');
let toCurrency = document.querySelector('#changeCurrencyTo');
let searchCurrencyBtn = document.querySelector('#searchCurrency');
let currencyValue = document.querySelector('#currencyValue');
let toCurrencyName = document.querySelector('#toCurrencyName');
let fromCurrencyName = document.querySelector('#fromCurrencyName');
let display = document.querySelector("#display");
const API_key = 'b9abb88daff5a584e21b6adf06558544';

function getCurrencyData(search) {
    display.classList.remove("hidden");
    fetch(`http://api.currencylayer.com/live?access_key=${API_key}`)
        .then(response => response.json())
        .then(data => {
            let currencies = data.quotes;
            console.log(currencies[search]);
            currencyValue.textContent = currencies[search];

        })
        .catch(function (error) {
            $('#exampleModal1').foundation('open');
            $(".lead").text(error);
        })
}

searchCurrencyBtn.addEventListener("click", function () {
    let from = fromCurrency.value;
    let to = toCurrency.value;
    fromCurrencyName.textContent = from.toUpperCase();
    let search = from + to;
    search = search.toUpperCase();
    toCurrencyName.textContent = to.toUpperCase();
    getCurrencyData(search);
});


