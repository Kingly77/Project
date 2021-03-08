
fetch('https://worldtimeapi.org/api/ip').then(data=>{

    return data.json();

}).then(data=>{

    console.log(data['datetime']);
    let day = dayjs(data["datetime"]);
    $('#curtime')[0].textContent = day.format('h:m');

})