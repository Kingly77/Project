let cityName = 'San Jose'
let key = '555cb8f86a8f9b99085c41f79016fb5a';

dayjs.extend(window.dayjs_plugin_utc)

function getData()
{
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`).then(data => data.json()).then(data =>
    {

        $('#current-weather')[0].textContent = data['weather']['0']['main'];
        $('#current-time')[0].textContent = dayjs.utc().utcOffset(data['timezone'] / 60).format('hh:mm');

    })
}

getData();

$(`#cityName`)[0].textContent = `${cityName}`;

$('#lookup').click(() =>
{
    cityName = $('#input')[0].value;
    $(`#cityName`)[0].textContent = `${cityName}`;
    getData();
})