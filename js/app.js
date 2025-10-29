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

      //setup all event listeners
      this.setupEventListeners();

      //load all sounds
       this.loadAllSounds();

       //Try to play rain
       this.soundManager.setVolume('rain',50);
       await this.soundManager.playSound('rain');
       
     this.isInitialized=true;
     console.log("SoundMixer initialized succesfully ")
    }catch(error){
       console.error("Error during initialization:",error);
    }
 }

 //setup event listeners
 setupEventListeners(){
    //handle all clicks with event delegation
    document.addEventListener('click', async (e) => {
       //check if play button clicked
       const playBtn = e.target.closest('.play-btn');
       if(playBtn){
          const soundId = playBtn.dataset.sound;
          await this.toggleSound(soundId);
       }
    });
    //handle volume slider changes
      document.addEventListener('input',(e)=>{
         if(e.target.classList.contains('volume-slider')){
            const soundId = e.target.dataset.sound;
            const volume = parseInt(e.target.value);
            this.setSoundVolume(soundId, volume);
            
         }
      });
 }

 //load all sounds from the sound data
 loadAllSounds(){sounds.forEach((sound)=>{
         const audioUrl = `audio/${sound.file}`;
         const success = this.soundManager.loadSound(sound.id, audioUrl);
         if(!success){
            console.error(`Failed to load sound: ${sound.id} from ${audioUrl}`);
         }
      });
      
 }

 //toggle play/pause for specific sound
 async toggleSound(soundId){
    const audio = this.soundManager.audioElements.get(soundId);
    if(!audio){
       console.error(`Audio element for ${soundId} not found`);
       return false;
    }
    if(audio.paused){
      //get current volume
      const card = document.querySelector(`[data-sound ="${soundId}"]`);
      const slider = card.querySelector('.volume-slider');
      let volume = parseInt(slider.value);
      //if volume is 0, set to default 50
      if(volume ===0){
         volume =50;
         this.ui.updateVolumeDisplay(soundId, volume);
      }
       //sound is off, turn it on
       this.soundManager.setVolume(soundId,volume); //set default volume to 50
       await this.soundManager.playSound(soundId);
       //todo playsound
      this.ui.updateSoundPlayButton(soundId,true );

    }else{
       //sound is on, turn it off
       this.soundManager.pauseSound(soundId);
       //todo update play button
       this.ui.updateSoundPlayButton(soundId,false);
    }

 }

 //set sound volume
 setSoundVolume(soundId, volume){
    //const sound volume in manager
    this.soundManager.setVolume(soundId,volume);
    //update volume value in UI
    this.ui.updateVolumeDisplay(soundId,volume);
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