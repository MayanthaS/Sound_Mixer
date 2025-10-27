import {sound,defaultPresent} from "./soundData.js";
import {SoundManager} from "./soundManager.js";
class SoundMixer{
    //Initialize the dependencies and default values
 constructor(){
    this.soundManager = new SoundManager();
    this.ui = null;
    this.timer = null;
    this.currentSoundState ={};
    this.isInitialized=false;
 }
 init(){
    try{
       this.soundManager.loadSound('rain','sounds/rain.mp3'); 
       this.isInitialized=true;
    }catch(error){
       console.error("Error during initialization:",error);
 }
 }

}

//Initialize the app
document.addEventListener("DOMContentLoaded",()=>{
    const app = new SoundMixer();
    app.init();
});

export default SoundMixer;