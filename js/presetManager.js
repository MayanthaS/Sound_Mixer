export class presetManager{
    constructor(){
        this.customPresets = this.loadCustomPresets();
    }
    // Load custom presets from localStorage
    loadCustomPresets(){
        const stored = localStorage.getItem('SoundMixerPresets');
        return stored ? JSON.parse(stored) : {};
    }
     //loadCustomPresets by ID
       loadPreset(presetId) {
    return this.customPresets[presetId] || null;
  }

    // Save custom presets to localStorage
    saveCustomPresets(){
        localStorage.setItem(
            'SoundMixerPresets',
            JSON.stringify(this.customPresets)
            );
    }
    //save current mix as preset
    savePreset(name, soundStates){
        const presetId = `custom-${Date.now()}`;

        //Create preset object
        const preset = {
            name:name,
            sounds:{}
    }

    for(const[soundId, volume] of Object.entries(soundStates)){
        if(volume>0){
            preset.sounds[soundId]=volume;
        }
    }

    // Save the preset
    this.customPresets[presetId] = preset;
    this.saveCustomPresets();

    return presetId;
   }
   //check if preset  name already exits
   presetNameExists(name){
    return Object.values(this.customPresets).some(
        (preset)=>preset.name === name
        );
   }
   //Delete custome presets
   deletePreset(presetId){
     if(this.customPresets[presetId]){
        delete this.customPresets[presetId];
        this.saveCustomPresets();
        return true;
     }
     return false;
   }

}