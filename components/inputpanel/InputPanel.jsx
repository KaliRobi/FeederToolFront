import TextArea from "./TextArea"
import InputPanelHeader from "./InputPanelHeader"
import InputButton from "./Button"
import { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import { sendBPA1IncidentsToBack, arrangeData, validateInput, removeTextAreaContent, sendAcknowledgement} from "../context/AppActions"

import Notification from "../alert/Notification"


function InputPanel({panNum}){
 const {bpaIncidentExists, username, password, dispatch, isOngoingProcess, showNotification, notificationMessage } = useContext(AppContext)




const handleClick = async (e) =>{
    e.preventDefault()
    
    const thearrangedGrapDataSets = await arrangeData()
     
    dispatch({type : 'SET_BPA_INC_CHART', payload: thearrangedGrapDataSets })
    const missingInfo = validateInput({" Username" : username, " Password" : password, " Process instance ids": bpaIncidentExists})
    
    if (missingInfo.length > 0) {
        dispatch({type : 'SET_ALERT', payload : `${missingInfo}` })
        setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 5000)
    } else {

        sendBPA1IncidentsToBack(username, password, bpaIncidentExists)  
        dispatch({type: 'ONGOING_REPROCESS_START', payload: isOngoingProcess})
        dispatch({type: 'NOTIFICATION_MESSAGE'})
    }
    
 }

 const loadDataForchart = async ( ) => {
    const incChartData = await arrangeData()
    dispatch({type : 'SET_BPA_INC_CHART', payload: incChartData })
  
  }
  useEffect(() => {
    loadDataForchart();
  }, []);
 


 const  onChangeInput = (e) => {
    dispatch({type: 'SET_BPA_INC_DATA', bpaIncidentExists: e.target.value  })
    
 }

 
 const onclickACK =() => { 
    dispatch({type: 'REMOVE_ACK_NOTIFY'})
    sendAcknowledgement()
    removeTextAreaContent()
    
}

return (
<div id="inputAreaHeader"  className="grid grid-rows-8 h-full  " >
    
    <div  className="row-span-1 z-0 h-0.5 ">
        {panNum === 1 ? < InputPanelHeader numPad={1} title={'PROCESS INSTANCE IDS'} />  :  < InputPanelHeader title={'PLACE FOR THE OTHER TOOL'} />  }
        {  panNum === 1 &&  notificationMessage === 1 ? <div className="grid grid-cols-6 content-center justify-center z-10 ">
        <Notification funct={onclickACK} msg={' done'} />
        </div> : <></> }
    </div>

    <div id="inputAreaTextArea" className=" row-span-6  "   >
        <TextArea onChangeAct={onChangeInput} />
    </div>
    <div id="inputAreaButtons" className="row-span-1 h-4 ">
    {panNum === 1 ? < InputButton ToDo={handleClick} title={'START PROCESS'}/> : < InputButton title={'REPROCESS PROCESS SMT ELSE'}  /> }
    
    </div>
    

</div>



)



}


export default InputPanel