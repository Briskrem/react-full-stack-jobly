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

export const MainRoutes = () => {

    const [comp, setComp] = useState([])
    const [job, setJob] = useState([])

    useEffect(()=>{
        async function getComp(){
            // const req = await JoblyApi.request('companies')
            // setCompAndJob(req.companies)
            await Promise.all([JoblyApi.request('companies'), JoblyApi.request('jobs')])
            .then(data => {
                setComp(data[0])
                setJob(data[1])
            })
            
        }
        getComp()
    },[])

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
        console.log('inside registerUser')
        window.localStorage.setItem('token', JoblyApi.token)
        const req = await JoblyApi.request('auth/register', {username, password, firstName, lastName, email}, 'post')
        console.log(req)
    }

    const login = async (data) => {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
      }

    let companies = comp?.companies
    let jobies = job?.jobs
    // console.log(jobies, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
   
    // console.log(compAndJob[0])
    // console.log(compAndJob[0])
    // console.log(compAndJob[1])
    
    // let companies = compAndJob[0]

    // let x = compAndJob[0]? compAndJob[0]['companies'] : null;
    // let company = compAndJob[0]?.companies;
    console.log(companies)


    return (
        <div>
          <BrowserRouter>
            <dataContext.Provider value={{companies, getCompDetails, jobies, getCompCallBack, getJobCallBack, registerUser}}>
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
