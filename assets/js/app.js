let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';
let currentWeather;
let currentTime;

dayjs.extend(window.dayjs_plugin_utc)

function getData() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data => {
        console.log(data);
        if (data['name']) {
            $('#cityName').text(data['name']);
            currentWeather = data['weather']['0']['main'];

            console.log(currentWeather);
            $('#current-weather').text(currentWeather);
            currentTime = dayjs.utc().utcOffset(data['timezone'] / 60).format('HH:mm');

            $('#current-time').text(currentTime);

            getIcon(currentWeather, currentTime);
        }
        else {
            $("#weather").addClass('hide');
            $('#exampleModal1').foundation('open');
            $(".lead").text("Please enter a valid city name");

        }
    })
        .catch(function (error) {
            $('#exampleModal1').foundation('open');
            $(".lead").text(error);


        })
}

getData();

$(`#cityName`)[0].textContent = `${cityName}`;

$('#lookup').click(() => {
    $('#weather').removeClass('hide');
    cityName = $('#input')[0].value;
    $(`#cityName`)[0].textContent = `${cityName}`;
    getData();
})

function getIcon(weather, time) {
    console.log(time);
    console.log(weather);
    let currentIcon = document.getElementById("forecast");
    let currentTime = /^../.exec(time);
    switch (weather) {
        case "Clouds":

            if (currentTime > 19 || currentTime < 5) {
                currentIcon.setAttribute("src", "./assets/images/clouds-night-icon.png");
                document.body.style.backgroundImage = "url('./assets/images/cloudy-new.jpg')";
                break;
            }
            else {
                currentIcon.setAttribute("src", "./assets/images/cloudy_daytime.png");
                document.body.style.backgroundImage = "url('./assets/images/cloud-d.jpg')";

                break;

            }
        case "Clear":

            if (currentTime > 19 || currentTime < 5) {
                currentIcon.setAttribute("src", "./assets/images/clear-night-icon.png");
                document.body.style.backgroundImage = "url('./assets/images/night.jpg')"
                document.body.style.color = 'white';
                break;
            }
            else {
                currentIcon.setAttribute("src", "./assets/images/clear-dayicon.png");
                document.body.style.backgroundImage = "url('./assets/images/clear-d.jpg')";
                break;

            }
        case "Snow":

            if (currentTime > 19 || currentTime < 5) {
                currentIcon.setAttribute("src", "./assets/images/snowy-night-icon.jpg");
                document.body.style.backgroundImage = "url('./assets/images/snow-d.jpg')";
                break;
            }
            else {
                currentIcon.setAttribute("src", "./assets/images/snowy-dayicon.jpg");
                document.body.style.backgroundImage = "url('./assets/images/snow-d.jpg')";
                break;

            }
        case "Hail":

            if (currentTime > 19 || currentTime < 5) {
                currentIcon.setAttribute("src", "./assets/images/hail-icon.png");
                document.body.style.backgroundImage = "url('./assets/images/hail-n.jpg')";
                break;
            }
            else {
                currentIcon.setAttribute("src", "./assets/images/hail-icon.png");
                document.body.style.backgroundImage = "url('./assets/images/hail-d.jpg')";
                break;

            }
        case "Rain":
            if (currentTime > 19 || currentTime < 5) {
                currentIcon.setAttribute("src", "./assets/images/rainy-dayicon.png");
                document.body.style.backgroundImage = "url('./assets/images/rainy-d.jpg')";


                break;
            }
            else {
                currentIcon.setAttribute("src", "./assets/images/rainy-dayicon.png");
                document.body.style.backgroundImage = "url('./assets/images/rainy-d.jpg)";
                document.body.style.color = "white";
                break;
            }

    }



}
getIcon();

// Currency Exchange from USD to any countries currency. (the api supports only from usd as it is the free version)
let fromCurrency = $('#changeCurrencyFrom');
$('#changeCurrencyFrom').val("USD");
let toCurrency = $('#changeCurrencyTo');
let searchCurrencyBtn = $('#searchCurrency');
let currencyValue = $('#currencyValue');
let toCurrencyName = $('#toCurrencyName');
let fromCurrencyName = $('#fromCurrencyName');
let display = $("#display");
const API_key = '987fc53b7ae54560adc503005e61ccb9';

function getCurrencyData(search) {
    display.removeClass("hide");
    console.log(search)
    fetch(`https://api.currencyfreaks.com/latest?apikey=${API_key}`)
        .then(response => response.json())
        .then(data => {
            let currencies = data.rates;

            if (!currencies[search]) {
                display.addClass("hide");
                $('#exampleModal1').foundation('open');
                $(".lead").text("Invalid Country code");
            }
            else {
                currencyValue.text(` ${currencies[search]} `);
            }
        })
        .catch(function (error) {
            $('#exampleModal1').foundation('open');
            $(".lead").text(error);
        })
}

searchCurrencyBtn.click("click", () => {
    let from = fromCurrency.val();
    console.log(from);
    let to = toCurrency.val();
    if (from && to) { //checks if both fields are present
        fromCurrencyName.text(from.toUpperCase());
        toCurrencyName.text(to.toUpperCase());
        getCurrencyData(to.toUpperCase());
    }
    else {
        $('#exampleModal1').foundation('open');
        $(".lead").text("Please enter valid 3 letter country code");
    }
});