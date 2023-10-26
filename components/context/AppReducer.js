const appReducer = (state, action) => {
    
    switch (action.type){
        case 'CHANGE_LOGIN_VISIBILITY':  
            return {
                ...state,
                isLoginShown: state.isLoginShown * -1  }
        case 'SET_PASSWORD':  
        return {
            ...state,
            password: action.password}
        case 'SET_USERNAME': 
        return {
            ...state,
            username: action.username}
        case 'CREDS_SET':
            return{
                ...state,
                areCredsSet : state.areCredsSet = 1} 
        case 'CREDS_NOT_SET':
            return{
                ...state,
                areCredsSet : state.areCredsSet = -1}
        case 'SET_ALERT': 
            return{
                ...state,
                setAlert : state.setAlert = 1,
                alertText: action.payload}  
        case 'REMOVE_ALERT': 
            return{
                ...state,
                setAlert : state.setAlert = -1,
                alertText: ""}         
        case 'SET_BPA_INC_DATA':  
            return {
                ...state,
                bpaIncidentExists: action.bpaIncidentExists}
        case 'SET_PROGRESS_STATUS':  
        return {
            ...state,
            progressStatus: action.progressStatus}
        case 'SET_BPA_INC_CHART':  
            return {
                ...state,
                bpaIncidentGraph: action.payload}
        case 'REMOVE_ACK_NOTIFY':  
            return {
                ...state,
                showNotification : state.showNotification = -1,
                notificationMessage  : state.notificationMessage = -1,
                bpaIncidentExists: action.bpaIncidentExists = "" }
        case 'SHOW_ACK_NOTIFY':  
            return {
                ...state,
                showNotification : state.showNotification = 1}
        case 'ONGOING_REPROCESS_START':  
            return {
                ...state,
                isOngoingProcess : state.isOngoingProcess = 1}
        case 'ONGOING_REPROCESS_END':  
            return {
                ...state,
                isOngoingProcess : state.isOngoingProcess = -1,
                }
        case 'NOTIFICATION_MESSAGE':  
            return {
                ...state,
                notificationMessage  : state.notificationMessage = 1,
                }
        case 'ERROR_NOTIFY':  
            return {
                ...state,
                loginFailed  : state.loginFailed = 1, 
                errorMessage : action.payload            
                    }
        case 'ERROR_NOTIFY_OFF':  
            return {
                ...state,
                loginFailed  : state.loginFailed = -1,
                notificationMessage  : state.notificationMessage = -1
                    }
        
        default:
            return state
    }



}

export default appReducer