import href1 from "./index.js";
import { autorization } from "./authorization"

export function exitPage() {
    history.pushState(null,"", href1);    
    const main = document.getElementById('main')
     main.innerHTML=''
     document.getElementById('header-btn-div').classList.remove('open')      
     autorization();
}
