import React, { useContext } from 'react'
import { GoAlert } from "react-icons/go"
import AppContext from '../context/AppContext'

function AlertModal() {

    const {alertText} = useContext(AppContext)

  return (
    <div className='h-full w-full bg-opacity-30 bg-yellow-300'>
        <div className='grid  grid-cols-9 h-full w-full'>
            <div className='grid  col-span-1 justify-start content-center'><GoAlert/> </div>
            <div className='grid  col-span-8 justify-start content-center' > The following is missing: {alertText}</div>
        </div>
    </div>   
  )
}

export default AlertModal