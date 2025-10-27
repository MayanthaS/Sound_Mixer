export class soundManager{
    constructor(){
        this.audioElements = new Map();
        this.isPlaying = false;
        console.log('SoundManager created');
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
   
}