import { presetManager } from "./presetManager.js";
import {sounds,defaultPresets} from "./soundData.js";
import {soundManager} from "./soundManager.js";
import {UI} from "./ui.js";
class SoundMixer{
    //Initialize the dependencies and default values
 constructor(){
    this.soundManager = new soundManager();
    this.ui = new UI();
    this.timer = new presetManager();
    this.currentSoundState ={};
    this.masterVolume = 100;
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
      
       //initialized sound states after loading  sounds
       sounds.forEach((sound)=>{
         this.currentSoundState[sound.id]=0;
       })
       
       
     this.isInitialized=true;
    }catch(error){
       console.error("Error during initialization:",error);
    }
 }

 //setup all event listeners
 setupEventListeners(){
    //handle all clicks with event delegation
    document.addEventListener('click', async (e) => {
       //check if play button clicked
       const playBtn = e.target.closest('.play-btn');
       if(playBtn){
          const soundId = playBtn.dataset.sound;
          await this.toggleSound(soundId);
       }
       //check if preset button clicked
       if(e.target.classList.contains('preset-btn')){
          const presetKey = e.target.closest('.preset-btn').dataset.preset;
          this.loadPreset(presetKey);
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
      //handle master volume slider changes
    const masterVolumeSlider = document.getElementById('masterVolume');
    if(masterVolumeSlider){
         masterVolumeSlider.addEventListener('input',(e)=>{
            const volume = parseInt(e.target.value);
            this.setMasterVolume(volume);
         });
    }
    //handle master play/pause button 
    if(this.ui.playPauseButton){
       this.ui.playPauseButton.addEventListener('click',()=>{
          this.toggleAllSound();
       });
      }
      //handle reset button 
    if(this.ui.resetButton){
       this.ui.resetButton.addEventListener('click',()=>{
          this.resetAll();
       });
      }
      //handle save preset button
      const savePresetButton = document.getElementById('savePreset');
      if(savePresetButton){
         savePresetButton.addEventListener('click',()=>{
            this.showSavePresetModal();
         });
      }
      //conform save preset button
      const conformSaveButton = document.getElementById('confirmSave');
      if(conformSaveButton){
         conformSaveButton.addEventListener('click',()=>{
            this.SaveCurrentPreset();
         });
      }
      //handle cancle preset button
      const cancelSaveButton = document.getElementById('cancelSave');
      if(cancelSaveButton){
         cancelSaveButton.addEventListener('click',()=>{
            this.ui.hideModal();
         });
      }
      //close modal if backdroped is clicked
      if(this.ui.modal){
         this.ui.modal.addEventListener('click',(e) =>{
            if(e.target === this.ui.modal){
               this.ui.hideModal();
            }
         });
      }
 }

 //load all sounds from the sound data
 loadAllSounds(){sounds.forEach((sound)=>{
         const audioUrl = `audio/${sound.file}`;
         const success = this.soundManager.loadSound(sound.id, audioUrl);
         if(!success){
            console.error(`Failed to load sound: ${sound.id} from ${audioUrl}`);
         }
      });

      // hadlevolume slider
      document.addEventListener('input',(e)=>{
         if(e.target.classList.contains('volume-slider')){
            const soundId = e.target.dataset.sound;
            const volume = parseInt(e.target.value);
            this.setSoundVolume(soundId,volume);
           
         }
      });
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
   }
   //toggle play/pause for specific sound
   async toggleSound(soundId){
      const audio = this.soundManager.audioElements.get(soundId);
      if(!audio){
         console.error(`Audio element for ${soundId} not found`);
         return false;
      }
      if(audio.paused){
         //sound is off, turn it on
         this.soundManager.setVolume(soundId,50); //set default volume to 50
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