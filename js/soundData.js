//Sound data config

export const sound = [
    {
        id: 'rain',
        name: 'Rain',
        icon: 'fa-cloud-rain',
        file: 'rain.mp3',
        description: 'Gentle rain'
    },
    {
        id: 'ocean',
        name: 'Ocean Waves',
        icon: 'fa-water',
        file: 'ocean.mp3',
        description: 'Relaxing ocean waves'
    },
    {
        id: 'forest',
        name: 'Forest',
        icon: 'fa-tree',
        color:'from-green-400 to-emerald-500',
        file:'birds.mp3',
        description: 'Birds chirping in forest'
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
        color:'from-yellow-400 to-red-400',
        file:'cafe.mp3',
        description:'Ambient cafe sounds'
    },
    {
        id:'night',
        name:'Night',
        icon:'fa-moon',
        color:'from-blue-900 to-black',
        file:'night.mp3',
        description:'Calm night ambience'
    }



];
//default present config
export const defaultPresent ={
    focus:{
        name:'Focus',
        icon:'fa-brain',
        sounds:{
            rain:30,
            cafe:30,
            windo:40
        },
    },
    relax:{
        name:'Relax',
        icon:'fa-spa',
        sounds:{
            ocean:40,
            forest:30,
            wind:30
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