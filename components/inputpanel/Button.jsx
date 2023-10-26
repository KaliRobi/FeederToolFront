import { useContext } from "react"
import App from "../../App"
import AppContext from "../context/AppContext";


function InputButton({ToDo, title}){
 
const {notificationMessage} = useContext(AppContext)
let yesOrNo = false
notificationMessage > 0 ? yesOrNo = true : yesOrNo = false;

    return(
        <div className="py-2 px-2 ">
            <button 
            disabled={yesOrNo}
            onClick={ToDo}
            className="btn btn-primary btn-md btn-wide  bg-teal-100 hover:bg-teal-200 ">
               <p>{title}</p> 
            </button>
        </div>
        


    )

    
}

export default InputButton