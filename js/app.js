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
    //update main play/pause button state
      this.updateMainPlayButtonState();
 }

 //Toggle all sound
 toggleAllSound() {
    if (this.soundManager.isPlaying) {
       //toggle all sounds off
       this.soundManager.pauseAll();
       this.ui.updateMainPlayButton(false);
       sounds.forEach((sound) => {
          this.ui.updateSoundPlayButton(sound.id, false);
       })
    }else{
       //toggle all sounds on
       for(const [soundId,audio] of this.soundManager.audioElements){
          const card = document.querySelector(`[data-sound ="${soundId}"]`);
          const slider = card.querySelector('.volume-slider');
       if(slider){
         let volume = parseInt(slider.value);
         //if volume is 0, set to default 50
         if(volume ===0){
            volume =50;
            slider.value=50;
            this.ui.updateVolumeDisplay(soundId, 50);
         }
         this.currentSoundState[soundId]=volume;

         const  effectiveVolume = (volume * this.masterVolume)/100;
         audio.volume = effectiveVolume/100;
         this.ui.updateSoundPlayButton(soundId,true);
       }
       }
       //play all sounds
       this.soundManager.playAll();
         this.ui.updateMainPlayButton(true);
    }
 }

 //set sound volume
 setSoundVolume(soundId, volume){

   //set sound volume in  state
   this.currentSoundState[soundId]=volume;
   console.log(this.currentSoundState);
 //calculate effective volume based on master volume
    const effectiveVolume = (volume * this.masterVolume)/100;
 //update the sound  volume  with the scaled volume
    const audio = this.soundManager.audioElements.get(soundId);
    if(!audio){
      audio.volume = effectiveVolume/100;
    }
    //update volume value in UI
    this.ui.updateVolumeDisplay(soundId,volume);

    //Sync sounds
    this.updateMainPlayButtonState();
 }
   //set master volume
   setMasterVolume(volume){
      this.masterVolume = volume;
      //update the display
      const masterVolumeValue = document.getElementById('masterVolumeValue');
      if(masterVolumeValue){
         masterVolumeValue.textContent=`${volume}%`;
      }
      //apply master volume to all sounds
      this.applyMasterVolumeToAll();
   }
   //apply master volume to all sounds
        applyMasterVolumeToAll(){
         for(const[soundId,audio]of this.soundManager.audioElements){
            if(!audio.paused){
               const card = document.querySelector(`[data-sound ="${soundId}"]`);
               const slider = card?.querySelector('.volume-slider');
               if(slider){
                  const individualVolume = parseInt(slider.value);
                  //calculate new volume based on master volume
                  const effectiveVolume = (individualVolume * this.masterVolume)/100;

                  //apply to the actual audio element
                  audio.volume = effectiveVolume/100;
               }
         }
        }
      }
      //update main play button individually sound
      updateMainPlayButtonState(){
         //check if any sound is playing
         let anySoundsPlaying = false;
         for(const [soundId, audio] of this.soundManager.audioElements){
            if(!audio.paused){
               anySoundsPlaying = true;
               break;
            }
         }
         //update the main play/pause button and internal state
         this.soundManager.isPlaying = anySoundsPlaying;
         this.ui.updateMainPlayButton(anySoundsPlaying);
      }
      //reset everything to default state
      resetAll(){
         //stop all sounds
         this.soundManager.stopAll();
          // RESET MASTER 
         this.setMasterVolume(100);
       //Reset  sound state
       sounds.forEach((sound)=>{
         this.currentSoundState[sound.id]=0;
       })

         //reset UI
         this.ui.resetUI();

         

      }
      //load a preset config
      loadPreset(presetKey){
         const preset = defaultPresets[presetKey];
         if(!preset){
            console.error(`Preset ${presetKey} not found`);
            return false;
         }
         //First stop all sounds
         this.soundManager.stopAll();

         //Reset all  volumes to 0
        sounds.forEach((sound)=>{
          this.currentSoundState[sound.id]=0;
            this.ui.updateVolumeDisplay(sound.id,0);
            this.ui.updateSoundPlayButton(sound.id,false);
        });
        //apply preset volumes
        for(const[soundId, volume] of Object.entries(preset.sounds)){
               //set volume state
             this.currentSoundState[soundId]=volume;
             //update UI
             this.ui.updateVolumeDisplay(soundId,volume);
             this.ui.updateSoundPlayButton(soundId,true);

             //claculater effective volume
               const effectiveVolume = (volume * this.masterVolume)/100;
            
            //get audio element and set value
               const audio = this.soundManager.audioElements.get(soundId);
               if(audio){
                  audio.volume = effectiveVolume/100;
                  this.soundManager.playSound(soundId);
                  //play sound
                  audio.play();
                  this.ui.updateSoundPlayButton(soundId,true);

               }
         }
         //update main play button state
         this.soundManager.isPlaying = true;
         this.ui.updateMainPlayButton(true);
         
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