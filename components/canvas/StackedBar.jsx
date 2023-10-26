import { useContext , useState} from 'react'; 
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import AppContext from '../context/AppContext';
import { BPAdata } from '../bpaData';

function StackedBar(){
       const {bpaIncidentGraph} = useContext(AppContext) 
    return    (
    <div className=' grid w-5/6 h-5/6 mx-10 ml-15 my-5 justify-item-center '>
    <Bar  data={bpaIncidentGraph} />
    
    </div>
    )
}

export default StackedBar