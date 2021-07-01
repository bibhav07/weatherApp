const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    // const cityCode = data.cityCode;
    // const weather = data.weather;

    // destructuring
    const {cityCode, weather} = data;

    details.innerHTML = `
    
    <h5 class="my-3">${cityCode.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4 center">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    
    `   
    
    // updating icon
    const icnoSrc = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', icnoSrc);

    // update the night/day
    let timeSrc =  null;

    timeSrc = weather.IsDayTime ?  "./img/day.svg"   :  "./img/night.svg" ;



    time.setAttribute('src', timeSrc);


    // display the cart, remove display none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }


};


const updateCity = async(city) => {
    // console.log(city);

    const cityCode = await getCity(city);
    const getCityWeth = await getWeather(cityCode['Key']);


    return {
        cityCode : cityCode,
        weather : getCityWeth,
    }

}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city).then( data => {
        
        // console.log(data);
        updateUI(data);

    }).catch( err => console.log(err));

});