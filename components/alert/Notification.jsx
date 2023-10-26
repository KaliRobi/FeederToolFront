import React, { useContext } from 'react'
import { sendAcknowledgement,  receiveProgresStatus, useInterval } from '../context/AppActions'
import { BsCheckCircleFill, BsGearFill } from "react-icons/bs"
import {MdNearbyError} from "react-icons/md"
import AppContext from '../context/AppContext'




function Notification({msg, funct}) {
    const {showNotification, isOngoingProcess, loginFailed, errorMessage, dispatch} = useContext(AppContext)

       
    

    const checkProcessState = async () => {
      const progresStatus =  await receiveProgresStatus().then(data =>  {
      if(data['state'] === 'DONE' ) {
        dispatch({type: 'ONGOING_REPROCESS_END', payload: isOngoingProcess})
        dispatch({type: 'SHOW_ACK_NOTIFY', payload: showNotification })
        
      }  else if (data['state'] === 'ERR' ) {
        dispatch({type: 'ONGOING_REPROCESS_END', payload: isOngoingProcess})
        dispatch({type: 'ERROR_NOTIFY', payload: "Login failed! Check your password / username!"})
      }  
      else if (data['state'] === 'ERRT' ) {
        dispatch({type: 'ONGOING_REPROCESS_END', payload: isOngoingProcess})
        dispatch({type: 'ERROR_NOTIFY', payload: "Request timeout, wait 10 mins and try again."})
      }          
      })
    }
 
    useInterval(checkProcessState, 5000)


   

  return (
    <>
    <div className="  col-span-4 col-start-2 z-20  grid grid-cols-1">
    { isOngoingProcess === 1 && showNotification === -1 ? <div className=' z-20 my-20 alert alert-info shadow-lg'>
        <BsGearFill/><p className='  content-center '>
            Processing... </p> 
            <div className="flex-none">
            <progress className="progress progress-success w-56 m-3" ></progress>
  </div>
    </div> : <></> }
    { isOngoingProcess === -1 && showNotification === 1 ?      
      <div className=' z-10 my-20 alert alert-success shadow-lg'>
        <BsCheckCircleFill/ ><p className='  content-center '>
            {msg}</p> 
            <div className="flex-none">
    <button  onClick={funct} className="btn btn-sm btn-ghost">OK</button>
  </div>
    </div> : <></> }
    { loginFailed === 1 ?      
      <div className=' z-10 my-20 alert alert-error shadow-lg'>
        <MdNearbyError/ ><p className=' content-center '>
            {errorMessage}</p> 
            <div className="flex-none">
    <button  onClick={() => {dispatch({type: 'ERROR_NOTIFY_OFF'}); sendAcknowledgement() } } className="btn btn-sm btn-ghost">OK</button>
  </div>
    </div> : <></> }
    
    </div> 
    </>
  )
}

export default Notification


