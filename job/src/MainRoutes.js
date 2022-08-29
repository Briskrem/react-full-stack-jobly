import { BrowserRouter, Routes, Route } from 'react-router-dom'
import dataContext from './CreateContext'
import { useEffect, useState } from 'react'
import {Navbar} from './Navbar'
import { GeneralDisplay } from './GeneralDisplay'
import { CompanyDetails } from './CompanyDetails'
import {JobDisplay} from './JobDisplay'
import {Profile} from './Profile'
import { Home} from './Home'
import {Login} from './Login'
import {SignUp} from './SignUp'
import JoblyApi from './api'
import jwt from "jsonwebtoken";
import useLocalStorage from "./useLocalStorage";


export const MainRoutes = () => {

    const [comp, setComp] = useState([])
    const [job, setJob] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(null);

    useEffect(function loadUserInfo() {
        async function getCurrentUser() {      
          if (token) {
            try {
                console.log(token, 'lulululu')
              let { username } = jwt.decode(token.token);
              // put the token on the Api class so it can use it to call the API.
              JoblyApi.token = token.token;
              let currentUser = await JoblyApi.request(`users/${username}`);
            //   console.log(currentUser, 'currentusers')
              setCurrentUser(currentUser.user);
            //   setApplicationIds(new Set(currentUser.applications));
            } catch (err) {
              console.error("App loadUserInfo: problem loading", err);
              setCurrentUser(null);
            }
          }
        //   setInfoLoaded(true);
        }
        // setInfoLoaded(false);
        getCurrentUser();
      }, [token]);

    useEffect(()=>{
        async function getComp(){
            await Promise.all([JoblyApi.request('companies'), JoblyApi.request('jobs')])
            .then(data => {
                setComp(data[0])
                setJob(data[1])
            })
        }
        getComp()
    },[])

    async function loginUser(data) {
        console.log(data, 'logindata')
        try {
          let token = await JoblyApi.request(`auth/token`, data, "post");
          console.log(token, 'tokennnnnnnnnnnnnnnnn')
          setToken(token);
          return { success: true };
        } catch (errors) {
          console.error("login failed", errors);
          return { success: false, errors };
        }
    }
    

    const getCompDetails = async (handle) => {
        const req = await JoblyApi.request(`companies/${handle}`)
        return req
    }

    const getCompCallBack = async ({name}) => {
        const req = await JoblyApi.request('companies', {name})
        setComp(req)
    }

    const getJobCallBack = async ({title}) => {
        const req = await JoblyApi.request('jobs', {title})
        console.log(req)
        setJob(req)
    }

    const registerUser = async ({username, password, firstName, lastName, email}) => {
        // window.localStorage.setItem('token', JoblyApi.token)
        const token = await JoblyApi.request('auth/register', {username, password, firstName, lastName, email}, 'post')
        setToken(token);
        return { success: true };
    }

    function logout() {
        setCurrentUser(null);
        setToken(null);
      }

    let companies = comp?.companies
    let jobies = job?.jobs

    return (
        <div>
          <BrowserRouter>
            <dataContext.Provider value={{companies, getCompDetails, jobies, getCompCallBack, getJobCallBack, registerUser, currentUser, loginUser, logout}}>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Home />}  /> 
                <Route path={'/companies'} element={<GeneralDisplay comp={companies} />} />
                <Route path={'/companies/:handle'} element={<CompanyDetails />} />
                <Route path={'/jobs'} element={<JobDisplay comp={jobies}/>} />
                <Route path={'/profile/:username'} element={<Profile  />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/sign-up'} element={<SignUp  />} />
            </Routes>
            </dataContext.Provider>
         </BrowserRouter>
        </div>
    )
}
