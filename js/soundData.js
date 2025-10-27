//Sound data config

export const sounds = [
    {
        id: 'rain',
        name: 'Rain',
        icon: 'fa-cloud-rain',
        file: 'rain.mp3',
        color:'from-blue-500 to-cyan-500',
        description: 'Gentle rainfall'
    },
    {
        id: 'ocean',
        name: 'Ocean Waves',
        icon: 'fa-water',
        color:'from-teal-400 to-blue-500',
        file: 'ocean.mp3',
        description: 'Relaxing ocean waves'
    },
    {
        id: 'forest',
        name: 'Forest',
        icon: 'fa-tree',
        color:'from-green-400 to-emerald-500',
        file:'birds.mp3',
        description: 'Birds and wind in trees'
    },
    {
        id:'fireplace',
        name:'Fireplace',
        icon:'fa-fire',
        color:'from-orange-500 to-red-500',
        file:'fireplace.mp3',
        description:'Crackling fireplace'
    },
    {
        id:'thunder',
        name:'Thunder',
        icon:'fa-bolt',
        color:'from-purple-500 to-indigo-500',
        file:'thunder.mp3',
        description:'Distant thunderstorm'
    },
    {
        id:'wind',
        name:'Wind',
        icon:'fa-wind',
        color:'from-gray-400 to-gray-600',
        file:'wind.mp3',
        description:'Soothing wind'
    },
    {
        id:'cafe',
        name:'Cafe',
        icon:'fa-mug-hot',
        color:'from-amber-600 to-yellow-600',
        file:'cafe.mp3',
        description:'Ambient cafe sounds'
    },
    {
        id:'night',
        name:'Night',
        icon:'fa-moon',
        color:'from-indigo-900 to-purple-600',
        file:'night.mp3',
        description:'Crickets and night sounds'
    }



];
//default presets config
export const defaultPresets ={
    focus:{
        name:'Focus',
        icon:'fa-brain',
        sounds:{
            rain:30,
            cafe:20,
            windo:10
        },
    },
    relax:{
        name:'Relax',
        icon:'fa-spa',
        sounds:{
            ocean:40,
            forest:30,
            wind:20
        },
    },
    sleep:{
        name:'Sleep',
        icon:'fa-bed',
        sounds:{
            rain:40,
            night:30,
            wind:30
        },
    },

};