

let finalApiResults;
let apiResults;
async function display(term = 'cairo') {
    apiResults = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bcb84c196bc04e869d0144424221708&q=${term}&days=3`);
    if (apiResults.ok && apiResults.status != null) {
        finalApiResults = await apiResults.json();
        let currentLocation = finalApiResults.location.name;
        console.log(finalApiResults)
        let currentStatus = finalApiResults.current;
        let forecastStatus = finalApiResults.forecast.forecastday;
        let currentdate = new Date(currentStatus.last_updated);
        let forecastDate1 = new Date(forecastStatus[1].date);
        let forecastDate2 = new Date(forecastStatus[2].date);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let content =
            `
            <div class="col-lg-4 col-md-12 col-sm-12 forcast-card first-forcast-card">
                <div class="card-header d-flex justify-content-between">
                    <span>${days[currentdate.getDay()]}</span>
                    <span>${currentdate.getDate()+" "+months[currentdate.getMonth()]}</span>
                </div>
                <div class="card-body">
                    <p class="fs-5">${currentLocation}</p>
                    <div class="weather-status d-flex justify-content-around align-items-center">
                        <p class="temp">${currentStatus.temp_c}<sup>o</sup>C</p>
                        <img src="${currentStatus.condition.icon}" alt="" srcset="">
                    </div>
                    <p class="sky-status">${currentStatus.condition.text}</p>
                    <div class="rain-Wind-status d-flex">
                        <div>
                            <img src="images/icon-umberella@2x.png" alt="">
                            <span>${currentStatus.precip_in}%</span>
                        </div>                        <div>
                            <img src="images/icon-wind@2x.png" alt="">
                            <span>${currentStatus.wind_kph} km/h</span>
                        </div>                        <div>
                            <img src="images/icon-compass@2x.png" alt="">
                            <span>${currentStatus.wind_dir}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 forcast-card mid-forcast-card sub-forcast-card text-center">
                <div class="card-header">
                    <span>${days[forecastDate1.getDay()]}</span>
                </div>
                <div class="card-body">
                    <img src="${forecastStatus[1].day.condition.icon}" alt="" srcset="">
                    <p class="max-temp">${forecastStatus[1].day.maxtemp_c}<sup>o</sup>C</p>
                    <p class="min-temp">${forecastStatus[1].day.mintemp_c}<sup>o</sup></p>
                    <p class="sky-status">${forecastStatus[1].day.condition.text}</p>
                </div>
            </div>    
            <div class="col-lg-4 col-md-12 col-sm-12 forcast-card last-forcast-card sub-forcast-card text-white text-center">
            <div class="card-header">
                <span>${days[forecastDate2.getDay()]}</span>
            </div>
            <div class="card-body">
            <img src="${forecastStatus[2].day.condition.icon}" alt="" srcset="">
            <p class="max-temp">${forecastStatus[2].day.maxtemp_c}<sup>o</sup>C</p>
            <p class="min-temp">${forecastStatus[2].day.mintemp_c}<sup>o</sup></p>
            <p class="sky-status">${forecastStatus[2].day.condition.text}</p>
            </div>
        </div>
            `
    $('#forcastContainer').html(content);
    }
}
display();

$('#searchInp').keyup(function(){
    if(this.value.length > 3)
    {
    display(this.value);
    }
    else
    {
        display();
    }
})




let copyRightsYear = new Date().getFullYear();
$('#copyRightsYear').text(copyRightsYear);