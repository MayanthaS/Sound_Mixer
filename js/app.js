import {sounds,defaultPresets} from "./soundData.js";
import {soundManager} from "./soundManager.js";
import {UI} from "./ui.js";
class SoundMixer{
    //Initialize the dependencies and default values
 constructor(){
    this.soundManager = new soundManager();
    this.ui = new UI();
    this.timer = null;
    this.currentSoundState ={};
    this.isInitialized=false;
 }
 async init(){
    try{
      //Initialize UI
         this.ui.init();

      //Render sound cards
      this.ui.renderSoundCards(sounds);

      //load all sounds
       this.loadAllSounds();

       //Try to play rain
       this.soundManager.setVolume('rain',50);
       await this.soundManager.playSound('rain');
       
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


    //make app available for testing in browser
      window.app = app;
});

export default SoundMixer;