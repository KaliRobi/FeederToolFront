import { useContext, useEffect, useState } from 'react'; 
import './App.css';
import InputPanel from './components/inputpanel/InputPanel';
import Navbar from './components/Navbar';
import StackedBar from './components/canvas/StackedBar';
import AppContext, { AppConProvider } from './components/context/AppContext';
import Notification from './components/alert/Notification';


// bg-cyan-50   bg-emerald-50 bg-teal-50
 

function App() {
 
  return (
    
    <div className='z-0'>
    <AppConProvider>
    <div className='h-16 z-0' >
    <Navbar />
    </div> 
    <div className='grid grid-rows-2 gap-2 h-screen z-0'>   
      <div   className='grid grid-cols-5 gap-3 z-0 mb-1 '>   
        <div className='col-span-2 bg-emerald-50 py-4  z-0 px-4 justify-between'>  
          <InputPanel panNum={1} />
        </div>
        <div className='grid col-span-3 bg-emerald-50 py-4 px-4 z-0' >   
        <div className='grid justify-items-center w-full h-full z-0'   >
          <StackedBar />
        </div>   
     
        </div>
      </div>      
      <div className='grid grid-cols-5 gap-3 z-0' >   
        <div className='col-span-3  bg-emerald-50 py-4 px-4 z-0' >      
        </div>
        <div className='col-span-2 bg-emerald-50 py-4 px-2 4-0'>  
        {/* <InputPanel/> */}
        </div>
      </div>

    </div>
    
    </AppConProvider>
    </div>
  );
}

export default App;
