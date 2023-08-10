console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let current_time =document.getElementById('current_time');
let total_time =document.getElementById('total_time');
let masterSongName = document.getElementById('masterSongName');
// let image=document.getElementsByTagName('songimage');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mere Bhole Nath", filePath: "songs/1.mp3", coverPath: "img/1.jpg"},
    {songName: "Hare Krishna", filePath: "songs/2.mp3", coverPath: "img/2.jpg"},
    {songName: "Lut Gaye", filePath: "songs/3.mp3", coverPath: "img/3.jpg"},
    {songName: "Raataan Lambiyan", filePath: "songs/4.mp3", coverPath: "img/4.jpg"},
    {songName: "Rabba Janda", filePath: "songs/5.mp3", coverPath: "img/5.jpg"},
    {songName: "Barsaat ki Dhun", filePath: "songs/6.mp3", coverPath: "img/6.jpg"},
    {songName: "Rim Jhim", filePath: "songs/7.mp3", coverPath: "img/7.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    
    var seconds = audioElement.currentTime % 60;
    var foo = audioElement.currentTime - seconds;
    var minutes = foo / 60;
    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }
    var fixedCurrentTime = Math.floor(minutes) + ":" + Math.floor(seconds);
    current_time.innerText=fixedCurrentTime;

    var seconds = audioElement.duration % 60;
    var foo = audioElement.duration - seconds;
    var minutes = foo / 60;
    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }
    var fixedDurationTime = Math.floor(minutes) + ":" + Math.floor(seconds);
    total_time.innerText= fixedDurationTime;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('button')).forEach((element)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
}

Array.from(document.getElementsByClassName('button')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
       //makeAllPlays();
        songIndex = parseInt(e.target.id);
        
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `assets/songs/${songIndex+1}.mp3`;

        document.getElementById("songimage").src=`assets/img/${songIndex+1}.jpg`;
        
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})



document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById("songimage").src=`assets/img/${songIndex+1}.jpg`;

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById("songimage").src=`assets/img/${songIndex+1}.jpg`;
})