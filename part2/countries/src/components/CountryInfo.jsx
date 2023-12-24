const CountryInfo = ({ country, currentWeather }) => {
    const weatherId = currentWeather.weather ? currentWeather.weather[0].id : ''
    let icon = ''

    switch (true) {
        case (weatherId >= 200 && weatherId <= 232):
            icon = '11d'
            break;
        case (weatherId >= 300 && weatherId <= 321):
        case (weatherId >= 520 && weatherId <= 531):
            icon = '09d'
            break;
        case (weatherId >= 500 && weatherId <= 504):
            icon = '10d'
            break;
        case (weatherId == 511):
        case (weatherId >= 600 && weatherId <= 622):
            icon = '13d'
            break;
        case (weatherId >= 701 && weatherId <= 781):
            icon = '50d'
            break;
        case (weatherId == 800):
            icon = '01d'
            break;
        case (weatherId == 801):
            icon = '02d'
            break;
        case (weatherId == 802):
            icon = '03d'
            break;
        case (weatherId == 803):
        case (weatherId == 804):
            icon = '04d'
            break;
        default:
            break;
    }
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div className="top_section">
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
            </div>
            <div className="languages">
                <p>languages</p>
                <ul>
                    {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Weather in {country.name.common}</h2>
            {currentWeather.weather 
                ? (
                    <>
                        <p>Temperature: {currentWeather.main.temp} Celsius </p>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                        <p>Wind: {currentWeather.wind.speed} m/s</p>
                    </>
                ) 
                : ''}
        </div>
    )
}

export default CountryInfo