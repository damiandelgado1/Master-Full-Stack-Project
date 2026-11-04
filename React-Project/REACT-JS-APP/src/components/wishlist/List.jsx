const List = ({items, error}) => {
    return [
        <>
            <h2 className="text-xl font-bold nb-4"> Deseos de la comunidad ConquerBlocks </h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="list-disc">
                        <span className="font-bold"> {item.text} </span>
                        <span className="text-gray-400 ml-2 inline-block"> Escrito por: {item.author_name} </span>
                    </li>
                ))}
            </ul>

            {error && (
                <div className="text-red-500 mt-4"> {error} </div>
            )}
        </>
    ]
}

export default List;