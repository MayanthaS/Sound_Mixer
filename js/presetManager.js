export class presetManager{
    constructor(){
        this.customPresets = this.loadCustomPresets();
    }
    // Load custom presets from localStorage
    loadCustomPresets(){
        const stored = localStorage.getItem('SoundMixerPresets');
        return stored ? JSON.parse(stored) : {};
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
        const presetId = `custom_${Date.now()}`;

        //Create preset object
        const preset = {
            name:name,
            icon:'fa-save',
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
        preset=>preset.name.toLowerCase()===name.toLowerCase()
        );
   }
}