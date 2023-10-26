function TextArea ({onChangeAct}){
return (
<div  className="h-full " >
            <textarea 
            id="tempID"
            // wrap="off" 
            white-space="pre-wrap"
            autoFocus="off"
            autoCorrect="off" 
            autoCapitalize="off"
            onChange={onChangeAct}
            
            // id={id}
            className="border-4  resize-none w-full h-full bg-neutral-100 text-xl font-mono"
            // defaultValue={value}
            
            
            ></textarea>
        </div>)
}

export default TextArea