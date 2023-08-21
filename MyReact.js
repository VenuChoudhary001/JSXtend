let globalId=0;
const componentState=new Map();

let globalParent;
export function useState(initialState){
    let id=globalId;
    let parent=globalParent;
    globalId++;
    return (()=>{

        const {cache,props,component}=componentState.get(parent);
        console.log(componentState)
        if(cache[id]==null){
        cache[id]={value: typeof initialState === 'function'?initialState():initialState}
    }

    const setState=state=>{
        if( typeof state==='function'){
            cache[id].value=state(cache[id].value)
        }else cache[id].value=state

        render(component,props,parent)
    }
    
    return [cache[id].value,setState]
    })( )
}

export function useEffect(callback,dependencies){
    let id=globalId;
    let parent=globalParent;
    globalId++;
    

    return(()=>{
        const {cache}=componentState.get(parent);
        if(cache[id]==null){
            cache[id]={dependencies: undefined}
        }

        const dependenciesChanged=dependencies == null || dependencies.some((dependecy,index)=>{
            return cache[id].dependencies==null || cache[id].dependecy!==dependecy
        })
        if(dependenciesChanged){
            if(cache[id].cleanup!=null) cache[id].cleanup();
            cache[id].cleanup=callback();
            cache[id].dependencies=dependencies;
        }
    })()

}
export function render(component,props,parent,BtnEle){
    const state=componentState.get(parent)||{cache:[]}; //cache is where we are to store all info about hooks
    componentState.set(parent,{...state,component,props});
    globalParent=parent;
    const output=component(props,BtnEle);
    globalId=0;
    parent.textContent=output;
}