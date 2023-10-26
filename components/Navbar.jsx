import LoginPanel from './inputpanel/LoginPanel'
import { useContext } from 'react'
import AppContext from "./context/AppContext"
import { FaUnlockAlt } from "react-icons/fa"

function Navbar({ title }) {
  const {isLoginShown, areCredsSet,  password, username,  dispatch} = useContext(AppContext)
  const clicked = () => { 
    
    dispatch({type:'CHANGE_LOGIN_VISIBILITY'})

    if(username != "" && password != "") {
      dispatch({type: 'CREDS_SET'})
    } else if (username == "" || password == "") {
      dispatch({type: 'CREDS_NOT_SET'})
    }

  }
  const removeCreds = () => {
    dispatch({type: 'SET_USERNAME', username: ""})     
    dispatch({type: 'SET_PASSWORD', password: "" })
    dispatch({type: 'CREDS_NOT_SET'})
  }

    return (
      <nav className='navbar shadow-lg bg-teal-200 '>
          <div className='grid grid-cols-3 w-full gap-2 px-2 mx-2'>
          <div className="grid col-span-2 justify-start transition transition-opacity">
            {isLoginShown > 0 ? <LoginPanel/> : <></>  } 
           </div>
           <div className="grid grid-cols-2 col-span-1 w-full  justify-end ">
           <button onClick={clicked} className="grid w-full  justify-end bg-teal-200">FEEDER TOOL - CLICK TO ENTER CREDS</button>
           <div className='grid col-span-1 justify-start content-center mx-1'>
           
            {areCredsSet == 1 ? <button onClick={removeCreds} className=" bg-teal-200 "><FaUnlockAlt/></button>  : <></> }
          </div>
          
           </div>
           
            
          </div>
        
      </nav>
    )
  }
  
  
  
  export default Navbar