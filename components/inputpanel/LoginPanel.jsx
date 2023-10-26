import { useContext } from 'react'
import AppContext from '../context/AppContext'



function LoginPanel () {

    const { dispatch} = useContext(AppContext)

const setUsername = (e) => {
    
    dispatch({type: 'SET_USERNAME', username: e.target.value })
    
}

const setPassword = (e) => {
    
    dispatch({type: 'SET_PASSWORD', password: e.target.value })
    
}



 return(
    <div className="grid grid-cols-2 gap-4  ">
        <div className="grid grid-cols-2 ">
        <label className="grid justify-end mx-3 "> Username</label>
            <input type="text" onChange={setUsername}    required={true} id="username"></input>
        </div>
        <div className="grid grid-cols-2 z-0" >
            <label className="grid justify-end mx-3 " >Password</label>
            <input type="password" onChange={setPassword}  required={true} id="password"></input>            
        </div>

    </div>

 )

}

export default LoginPanel