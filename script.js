console.log("welcome to spotify");
// initialize the variable
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay =  document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar')
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Beete Lamhein", filePath:"songs/1.mp3", coverpath:"img/1.jpg"},
    {songName:"dhire dhir", filePath:"songs/2.mp3", coverpath:"img/2.jpg"},
    {songName:"Heija Mo", filePath:"songs/3.mp3", coverpath:"img/3.jpg"},
    {songName:"Mana Khojuthila Gote ", filePath:"songs/4.mp3", coverpath:"img/4.jpg"},
    {songName:"Masakali Delhi 6", filePath:"songs/5.mp3", coverpath:"img/5.jpg"},
    {songName:"Mohini", filePath:"songs/6.mp3", coverpath:"img/6.jpg"},
    {songName:"Roop Ke Jaadu", filePath:"songs/7.mp3", coverpath:"img/7.jpg"},
    {songName:"Tike Tike Barsha Hela", filePath:"songs/8.mp3", coverpath:"img/8.jpg"},
    {songName:"Urvashi", filePath:"songs/9.mp3", coverpath:"img/9.jpg"},
    {songName:"Senorita", filePath:"songs/10.mp3", coverpath:"img/10.jpg"},
    {songName:"No Lie", filePath:"songs/11.mp3", coverpath:"img/11.jpg"},
]
// audio element.play();

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//hand play pause
masterPlay.addEventListener ('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate',()=>{
// update seek bar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressbar.value = progress;

})
myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressbar.value * audioElement.duration)/100);
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

