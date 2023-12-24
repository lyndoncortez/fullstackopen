const PersonForm = ({ handleName, handleNumber, handleClick, name, number}) => {
    return (
        <>
            <form>
                <div>
                name: <input onChange={handleName} value={name} />
                </div>
                <div>
                number: <input onChange={handleNumber} value={number} />
                </div>
                <div>
                <button type="submit" onClick={handleClick}>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm