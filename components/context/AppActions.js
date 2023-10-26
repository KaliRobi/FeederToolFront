import {useEffect, useRef} from 'react'

//majd meg kell nezni h a deplojmentel van a a baj vagy a adat nem jo.

export const arrangeData =  () =>{
// itt valami nem ugy jon a szerverrol mint ahogy azt gondoltam.
                              

const resultObject =   fetch('http://localhost:8887/reprocessingTool/api/v3/typeHistory',
   {
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8"}
  })
           .then(response => response.json())
           .then(BPAdata => {
 
    const regexForDataDate = "[0-9]{4}-[0-9]{2}-[0-9]{2}"
      
    let uTypesSea = [...new Set(BPAdata.filter(element =>  (element.mot === 'SI' ||  element.mot === 'SE' )  ? element.mot : null ).map(e => e.typeId))]
    
    let uTypesAir = [...new Set(BPAdata.filter(element =>  (element.mot === 'AI' || element.mot ===  'AE' )  ? element.mot : null ).map(e => e.typeId))]
    
    // let seaDates = BPAdata.map(element =>   element.insertTime.match(regexForDataDate)  ).map(el => el[0])
    let airDates = BPAdata.map(element =>  (element.mot === 'AI' ||  element.mot ===  'AE' ) ? element.insertTime.match(regexForDataDate) : null ).filter(x => x).map(el => el[0]).sort()
    console.log(airDates)
    // 
    let seaDates = BPAdata.map(element =>  (element.mot === 'SI' ||  element.mot === 'SE' ) ? element.insertTime.match(regexForDataDate) : null ).filter(x => x).map(el => el[0]).sort()
    // .map(el => el[0]).sort()
    
    
    
    const allDates = [...new Set(seaDates.concat(airDates))]
    const airMainArray = [] 
    
    
    uTypesAir.forEach(OType => {
        return BPAdata.forEach(e => {e.typeId === OType ? airMainArray.push([e.typeId, e.insertTime.match(regexForDataDate)[0], e.typeCount]) : airMainArray.push("")})
    } )

    let airFinalDictionary = Object.assign( ...airDates.map((k,i) => ({[k]: airMainArray.filter(x => x).filter(e => e[1] === k).map(e => e[2]).reduce((count, num) => {return count + num } ) }) ))
    
    const seaMainArray = [] 
    
    uTypesSea.forEach(OType => {
        return BPAdata.forEach(e => {e.typeId === OType ? seaMainArray.push([e.typeId, e.insertTime.match(regexForDataDate)[0], e.typeCount]) : seaMainArray.push("")  } )
    } )

    let seaFinalDictionary = Object.assign( ...seaDates.map((k,i) => ({[k]: seaMainArray.filter(x => x).filter(e => e[1] === k).map(e => e[2]).reduce((count, num) => {return count + num } ) }) ))

    
// check if anything is 0 then do something to avoid crash 

    const bpaIncChartdata =  {datasets: [
            { 
              label: "reprocessed tasks / sea",
              backgroundColor : "#94C0D0",
              labels: Object.keys(seaFinalDictionary),       
              data: Object.values(seaFinalDictionary)
            },
            {
              label: "reprocessed tasks / air",
              backgroundColor : "#F8ECD1",
              labels: Object.keys(airFinalDictionary),       
              data: Object.values(airFinalDictionary)
            },             
          ],
          labels: allDates
        };
    
        /// cheak if all is good otherwise retrun null
    
    return bpaIncChartdata

}
           )
           return resultObject 

}


export const receiveProgresStatus = async () => {

  const progresState = await fetch('http://localhost:8887/reprocessingTool/api/v3/processingStatus',{
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8"}
  }).then(res => res.json())
  .then(data =>{
    return data
  })
    
  
    return progresState;
}


export const useInterval = (callback, delay) => {
  
  const thecallback =  useRef()

  useEffect(() => {
    thecallback.current = callback

  }, [callback]
  )
  useEffect(() => {
    function tick(){
       thecallback.current()
    }
    if(delay != null){
      const addInterval = setInterval(tick, delay)
      return () => {
        clearInterval(addInterval)
      }
    }

  },[callback, delay])

}




  export const validateInput = (inDict) => {
  let inKeys = Object.keys(inDict)
  let inValues = Object.values(inDict)
  let resultArr = []

  inValues.forEach(el => {inValues.filter(x => x).forEach(e => resultArr.push(inValues.indexOf(e)))})
  let exisistingIndexes = Array.from(new Set(resultArr) )

  let fullArrayIndexes = []

  inKeys.forEach(e => fullArrayIndexes.push(inKeys.indexOf(e)))


  if(exisistingIndexes.length === 0){
    return inKeys

  } else {
    let IndexOfNulls = (fullArrayIndexes.filter(item => exisistingIndexes.indexOf(item) < 0)).map(e=> inKeys[e] )

    return IndexOfNulls
  }

  }



export const sendBPA1IncidentsToBack = (username, password, uuidString) => {        
    const regexp = "\\w{8}\-\\w{4}\-\\w{4}\-\\w{4}\-\\w{12}"
    const regexpType = "(AE|SA|SI|AI)[A-Z0-9]{9}"
    const list = uuidString.split(" ").filter(e => e.match(regexp)) // this needs to be changed so the it wont be taken as one string
    const list1 = JSON.stringify(uuidString.split(" ").filter(e => e.match(regexpType)).reduce((base,element) => (base[element] = base[element] + 1 || 1, base),{})).replace(/\\"/g, '"')
    var dataToSend ={"operationValue" : {"processInstanceId" : `${list}`, "typeMap" : `${list1}`, "password" : `${password}`, "username": `${username}` }}
    fetch("http://localhost:8887/reprocessingTool/api/v3/processInput", {
        headers: {
            'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(dataToSend)
        // , headers: {'Content-Type': 'application/json'}
    }).then(res => console.log(res))
  
}
// make it changeable, if error happens does not need to remove the filed
export const sendAcknowledgement = async  () => {
  const theAcknowledgement = {"response":"ACK"}
  await fetch("http://localhost:8887/reprocessingTool/api/v3/processingStatus", {
    headers: {
        'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(theAcknowledgement)
    ,
}).then(data => console.log(data))

}
  

export const removeTextAreaContent = () => {
  
    document.getElementById('tempID').value = ""
}
