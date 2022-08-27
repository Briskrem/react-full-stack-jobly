import { useParams, useLocation} from "react-router-dom"
import dataContext from './CreateContext'
import { useContext, useEffect, useState } from "react"
import { Item } from "./Item"


export const CompanyDetails = () => {
    console.log('checking rendering count....inside companyDEtails')
    const {handle} = useParams()
    const [state, setState] = useState([])
    const { getCompDetails } = useContext(dataContext)

    let DATA;
    useEffect(()=>{
        async function dap(){
            DATA = await getCompDetails(handle)
            setState(DATA)
        }
        dap()
    },[])
   
    // console.log(state.company)
    // let newState = state.company
  
    // no need for local because local does not provide all of the info esp jobs property of company
    // const location = useLocation()
    // console.log(location.state)
    // const itemData = location.state?.obj
    // console.log(itemData, 'link state')

    return (
        <div>
            FLYY
            
            <Item  obz={state.company}  />
       
        </div>
    )
}