
export const Cell = ({id, name, year, color}) => {


    return (
        <tr style={{backgroundColor: color}}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{year}</td>
        </tr>
    )
}