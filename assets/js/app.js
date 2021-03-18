let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';
let currentWeather;
let currentTime;

dayjs.extend(window.dayjs_plugin_utc)

function getData() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data => {

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
    $('#weather').removeClass('hidden');
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

            if (/^../.exec(time) > 19) {
                currentIcon.setAttribute("src", "./assets/images/Night clear.png");
                break;
            }
            else if (/^../.exec(time) <= 19) {
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
            if (/^../.exec(time) > 19) {
                currentIcon.setAttribute("src", "./assets/images/Night rain.png");
                break;
            }
            else if (/^../.exec(time) <= 19) {
                currentIcon.setAttribute("src", "./assets/images/rain.png");
                break;
            }

    }


}
getIcon();

// Currency Exchange from USD to any countries currency. (the api supports only from usd as it is the free version)
let fromCurrency = $('#changeCurrencyFrom');
let toCurrency = $('#changeCurrencyTo');
let searchCurrencyBtn = $('#searchCurrency');
let currencyValue = $('#currencyValue');
let toCurrencyName = $('#toCurrencyName');
let fromCurrencyName = $('#fromCurrencyName');
let display = $("#display");
const API_key = '987fc53b7ae54560adc503005e61ccb9';

function getCurrencyData(search) {
    display.removeClass("hidden");
    console.log(search)
    fetch(`https://api.currencyfreaks.com/latest?apikey=${API_key}`)
        .then(response => response.json())
        .then(data => {
            let currencies = data.rates;

            if (!currencies[search]) {
                display.addClass("hidden");
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
    let to = toCurrency.val();
    if (from && to) { //checks if both fields are present
        fromCurrencyName.text(from.toUpperCase());
        let search = from + to;
        search = search.toUpperCase();
        toCurrencyName.text(to.toUpperCase());
        getCurrencyData(to.toUpperCase());
    }
    else {
        $('#exampleModal1').foundation('open');
        $(".lead").text("Please enter valid 3 letter country code");
    }
});