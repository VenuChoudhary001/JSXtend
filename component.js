import { useState,useEffect} from "./MyReact.js";

export default function Component({propCount,BtnEle}){
    const [count,setState]=useState(0);

    useEffect(()=>{
        const handler=()=>setState(state=>state+1);
        BtnEle.addEventListenr("click",handler);

        return ()=>BtnEle.removeEventListener("click",handler);
    },[])


    console.log(count)  
    return `State: ${count},
    Prop  : ${propCount}`
}