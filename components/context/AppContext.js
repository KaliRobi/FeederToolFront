import { createContext, useReducer } from "react";
import appReducer from "./AppReducer";


const AppContext =  createContext()

export const AppConProvider = ({children}) => {
 const initalState = {
    isLoginShown: -1,
    username: "",
    areCredsSet: -1,
    password: "",
    incidentExists: "",
    incidentGraph:  
    {"datasets": [
      { 
        "label": "reprocessed tasks / air",
        "backgroundColor" : "#F8ECD1",
        "labels":[] ,       
        "data": []
      },
      {
        "label": "reprocessed tasks / sea",
        "backgroundColor" : "#94C0D0",
        "labels": [],       
        "data": []
      }
    ],
    "labels": []
  }
    ,    
    statusValue: "",
    setAlert: -1,
    alertText: "",
    progressStatus: 0,
    showNotification: -1,
    isOngoingProcess: -1,
    notificationMessage : -1,
    loginFailed: -1, 
    errorMessage : ""   
}

 const [state, dispatch] = useReducer(appReducer, initalState)

 return(
    <AppContext.Provider
        value={{
            ...state,
            dispatch

        }}>{children}

        </AppContext.Provider>

 )

}

export default AppContext

