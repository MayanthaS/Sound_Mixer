import {sound,defaultPresent} from "./soundData.js";

class SoundMixer{
    //Initialize the dependencies and default values
 constructor(){
    console.log("Sound Mixer App Initialized");
    this.soundManager = null;
    this.ui = null;
    this.timer = null;
    this.currentSoundState ={};
    this.isInitialized=false;
 }
 init(){
    try{
       console.log("Initializing Sound Mixer App..."); 
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