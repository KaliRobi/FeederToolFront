import { useContext } from "react"
import AlertModal from "../alert/Alert"
import AppContext from "../context/AppContext"

function InputPanelHeader ({title, numPad}){

const {setAlert} = useContext(AppContext)

    return  (
        <div>
          {setAlert === 1 && numPad ===1 ?<div className=" pt-2 pl-2 "> <AlertModal /> </div> : <div className=" pt-2 pl-2 "> <h1>{title}</h1></div>}
        </div>
    )

    }


    export default InputPanelHeader