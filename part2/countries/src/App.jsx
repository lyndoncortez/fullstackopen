import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  },[])

  useEffect(() => {
    if(searchedCountries.length == 1) {
      weatherService.getWeather(searchedCountries[0].latlng[0], searchedCountries[0].latlng[1])
        .then(weatherData => setCurrentWeather(weatherData))
    }
  }, [searchedCountries])

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    if(e.target.value != '') {
      setSearchedCountries(allCountries.filter(country => country.name.common.indexOf(e.target.value) > -1));
    }
    else {
      setSearchedCountries([])
    }
  }

  const showCountry = (name) => {
    setSearchValue(name);

    setSearchedCountries(allCountries.filter(country => country.name.common === name));
  }

  return (
    <>
      <p>find countries</p> <input type="search" value={searchValue} onInput={handleSearch} />

      {searchedCountries.length > 10 
      ? (
        <div>
            <p>Too many matches, specify another filter</p>
        </div>
      ) 
      : searchedCountries.length > 1 && searchedCountries.length < 11 
        ? (
            <CountryList countries={searchedCountries} handleClick={showCountry} />
          )  
        : searchedCountries.length > 0
          ? (
              <CountryInfo country={searchedCountries[0]} currentWeather={currentWeather} />
            )
          : ('')
      }
    </>
  )
}

export default App
