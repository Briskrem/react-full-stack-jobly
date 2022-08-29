import './Item.css'

export const Item = ({oba, obz}) => {

    const obj = oba? oba : obz;
    console.log(obj)
    return (
        <>
        <div className="Item">
            <div>
                <p>{obj?obj.name: null}</p>
                {obj && obj.title? <p>{obj.title}</p> : null}
                {obj && obj.equity? <p>{obj.equity}</p> : null}
                {obj && obj.salary? <p>{obj.salary}</p> : null}
                <p>{obj?obj.description: null}</p>
            </div>
            {obj? <img src={obj.logoUrl} />: null}
            <p>{obj?obj.numEmployees: null}</p> 
        </div >
        {obj && obj.jobs? obj.jobs.map(o => (
            <div className='Item-jobs'>
                <p>{o.title}</p>
                <p>Equity: {o.equity}</p>
                <p>Salary: {o.salary}</p>
            </div>
        )) : null}
     
        </>
    )
}

// {obj? obj.jobs.map(o => (
//     <div className='Item-jobs'>
//     <p>{o.title}</p>
//     <p>Equity: {o.equity}</p>
//     <p>Salary: {o.salary}</p>
// </div>
// )) : null}