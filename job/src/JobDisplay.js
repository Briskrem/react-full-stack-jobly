import { useContext, useState } from "react"
import dataContext from './CreateContext'
import { Item } from "./Item"


export const JobDisplay = () => {

    const {jobies, getJobCallBack} = useContext(dataContext)
    // console.log(jobies, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    let initial = { title: ''}
    const [data, setData] = useState(initial)

    function handleChange(e){
        const {name, value} = e.target
        setData(data =>({
            ...data,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        getJobCallBack(data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='title' value={data.title} onChange={handleChange}  type='text' placeholder="job title"   />
                <button>SUBMIT</button>
            </form>
            {jobies.map(obj => (
                <Item obz={obj} />
            ))}
        </div>
    )
}

<p>hey</p>