export class soundManager{
    constructor(){
        this.audioElements = new Map();
        this.isPlaying = false;
        
    }
// Load a sound file

loadSound(soundId, filePath){
   
   try{

      const audio = new Audio(filePath);
       audio.src = filePath;
       audio.loop = true;
       audio.preload = 'metadata';
    //add sound to the map
         this.audioElements.set(soundId, audio);
         return true;
   }catch(error){
       console.error(`Error loading sound ${soundId} from ${filePath}:`, error);
       return false;
   }
}
   //play specific sound
   async playSound(soundId){
         const audio = this.audioElements.get(soundId);
         if(audio){
            try{
                await audio.play();
                console.log(`Playing: ${soundId}`);
                return true;
            }catch(error){
                console.log(`Error playing sound ${soundId}`, error);
                return false;
            }
         }
   }
   //pause specific sound
   pauseSound(soundId){
        const audio = this.audioElements.get(soundId);
        if(audio){
            audio.pause();
            console.log(`Paused: ${soundId}`);  
        }  
   }
    //set volume for specific sound
    setVolume(soundId, volume){
        const audio = this.audioElements.get(soundId);
        if(!audio){
            console.log(`Set volume for ${soundId} not found`);
            return false;
        }
        //convert volume 0-100 to 0.0-1.0
        audio.volume = volume/100;
       
        return true;
    }
    //play all sounds
    playAll(){
        for(const [soundId, audio] of this.audioElements){
            if(audio.paused){
                audio.play();

            }
        }
        this.isPlaying = true;
    }
    //pause all sounds
    pauseAll(){
        for(const [soundId, audio] of this.audioElements){
            if(!audio.paused){
                audio.pause();

            }
        }
        this.isPlaying = false;
    }
    //Stop all sounds
    stopAll(){
        for(const [soundId, audio] of this.audioElements){
            if(!audio.paused){
                audio.pause();

            }
            audio.currentTime =0;//Rest to begining
        }
        this.isPlaying = false;
    }
}