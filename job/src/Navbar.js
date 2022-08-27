import { NavLink } from "react-router-dom";
import { useContext } from "react";
import dataContext from "CreateContext"
import './Navbar.css'

export const Navbar = () => {
    const { currentUser } = useContext(dataContext);
    return (
        <div className="Navbar">
                {currentUser? <NavLink to={'/companies'}>Companies</NavLink> : null }
                <NavLink to={'/'}>Jobly</NavLink>
                
                <NavLink to={'/jobs'} >Jobs</NavLink>
                <NavLink to={'/profile'} >Profile</NavLink>
                <NavLink to={'/login'} >Login</NavLink>
                <NavLink to={'/sign-up'} >Sign Up</NavLink>
            
        </div>
    )
}


// <NavLink>Login</NavLink>
//                 <NavLink>Sign Up</NavLink>
//                 <NavLink>Logout</NavLink>