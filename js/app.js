import {sounds,defaultPresets} from "./soundData.js";
import {soundManager} from "./soundManager.js";
class SoundMixer{
    //Initialize the dependencies and default values
 constructor(){
    this.soundManager = new soundManager();
    this.ui = null;
    this.timer = null;
    this.currentSoundState ={};
    this.isInitialized=false;
 }
 init(){
    try{
       this.loadAllSounds();
       this.isInitialized=true;
    }catch(error){
       console.error("Error during initialization:",error);
 }
 }
//load all sounds from the sound data

   loadAllSounds(){
      sounds.forEach((sound)=>{
         const audioUrl = `audio/${sound.file}`;
         const success = this.soundManager.loadSound(sound.id, audioUrl);
         if(!success){
            console.error(`Failed to load sound: ${sound.id} from ${audioUrl}`);
         }
      });
   }
}

//Initialize the app
document.addEventListener('DOMContentLoaded',()=>{
    const app = new SoundMixer();
    app.init();
});

export default SoundMixer;