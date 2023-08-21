import { render } from "./MyReact.js";
import Component from "./component.js";

let propCount=0;
document.getElementById("btn").addEventListener("click",()=>{
    propCount++;
    renderComponent();
})

function renderComponent(){
    render(Component,{propCount},document.getElementById('root'),document.getElementById("btn"));
}

renderComponent();