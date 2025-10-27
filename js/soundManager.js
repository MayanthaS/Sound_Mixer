export class SoundManager{
    constructor(){
        this.audioElements = new Map();
        this.isPlaying = false;
        console.log('SoundManager created');
    }
// Load a sound file

loadSound(soundId, filePath){
    console.log(`Loading sound ${soundId} from ${filePath}`);
    return true;
}

}