const CountryList = ({ countries, handleClick }) => {
    
    return (
        <div>
            {countries.map((country, index) => 
                    <div key={index}>
                        <p className="country_list">{country.name.common}</p> <button className="show_btn" onClick={() => handleClick(country.name.common)}>Show</button>
                    </div>
                )
            }
        </div>
    )
}

export default CountryList