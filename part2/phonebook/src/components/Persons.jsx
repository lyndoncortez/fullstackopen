const Persons = ({ persons, handleDelete }) => {
    return (
        <>
            {persons.map((person, index) => {
                return (
                <div key={index}>
                    <span>{person.name}</span> <span>{person.number}</span> <button onClick={() => handleDelete(person)}>delete</button>
                </div>
                )
            })}
        </>
    )
}

export default Persons