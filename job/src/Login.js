import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import dataContext from './CreateContext'


export const Login = () => {

    let initial = { username: '', password: ''}
    
    const [data, setData] = useState(initial)
    const { loginUser } = useContext(dataContext)
    const navigate = useNavigate()

    function handleChange(e){
        const {name, value} = e.target
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()
        let result = await loginUser(data)
        console.log(result, 'RESULTS')
        if (result.success) {
          navigate("/companies");
        }
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username' >Username</label>
                <input name='username' value={data.username} onChange={handleChange} type='text' />
               
                <label htmlFor='password'>Password</label>
                <input name='password' value={data.password} onChange={handleChange}  type='text'  />
                
                <button >SUBMIT</button>
            </form>
         
        </div>
    )
}