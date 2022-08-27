import { useContext, useState } from "react"
import dataContext from './CreateContext'
import { Item } from "./Item"
import {v4 as uuid} from'uuid'
import { Link, useParams } from "react-router-dom"
import './GeneralDisplay.css'



export const GeneralDisplay = ({comp}) =>{

    const { companies , getCompCallBack} = useContext(dataContext)
    

    let initial = { name:'' }
    const [data, setData] = useState(initial)

    function handleChange(e){
        const {name, value} = e.target
        setData(data => ({
            ...data, 
            [name]:value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        getCompCallBack(data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input name='name' value={data.name} onChange={handleChange} type='text' placeholder='search companies' />
            <button>SUBMIT</button>
            </form>
            
            {comp.map(obj => (
                <Link key={uuid()} to={`/companies/${obj.handle}`} state={{obj: obj}}>
                    <Item   oba={obj} />
                </Link>
            ))}
        </div>
    )
}
