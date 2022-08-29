import { NavLink } from "react-router-dom";
import { useContext } from "react";
import dataContext from "./CreateContext"
import './Navbar.css'

export const Navbar = () => {
    const { currentUser , logout} = useContext(dataContext);
    return (
        <div className="Navbar">
            <NavLink to={'/'}>Jobly</NavLink>
            {currentUser? <NavLink to={'/jobs'} >Jobs</NavLink> : null }
            {currentUser? <NavLink to={'/profile'} >Profile</NavLink>: null }
            {currentUser? <NavLink to={'/companies'}>Companies</NavLink> : null }
            {currentUser? <NavLink to={'/'} onClick={logout}>Logout {currentUser.first_name || currentUser.username}</NavLink> : null }
            {currentUser? null : <NavLink to={'/login'}>Login</NavLink> }
            {currentUser? null : <NavLink to={'/sign-up'}>Sign Up</NavLink> }
        </div>
    )
}


