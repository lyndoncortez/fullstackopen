const Filter = ({ handleChange, value }) => {
    return (
        <>
            filter shown with <input type="search" onChange={handleChange} value={value}/>
        </>
    )
}

export default Filter