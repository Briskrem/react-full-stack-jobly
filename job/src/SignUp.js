import { useState, useContext } from 'react'
import dataContext from './CreateContext'


import './SignUp.css'


export const SignUp = () => {

    let initial = { username: '', password: '', firstName: '', lastName:'', email:''}
    const [data, setData] = useState(initial)
    const { registerUser } = useContext(dataContext)

    function handleChange(e){
        const {name, value} = e.target
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        registerUser(data)
    }

    return (
        <div className='SignUp'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input name='username' value={data.username} onChange={handleChange} />

                <label htmlFor="password" >Password</label>
                <input name='password' value={data.password} onChange={handleChange} type='password' />

                <label htmlFor="firstName" >Firstname</label>
                <input name='firstName' value={data.firstName} onChange={handleChange} type='text' />

                <label htmlFor="lastName" >lastName</label>
                <input name='lastName' value={data.lastName} onChange={handleChange} type='text' />

                <label htmlFor="email" >Email</label>
                <input name='email' value={data.email} onChange={handleChange} type='email' />

                <button>Submit</button>
            </form>
           
        </div>
    )
}