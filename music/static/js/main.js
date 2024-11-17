let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");
let playPause = document.querySelector(".pause-play");
let audioPlayer = document.querySelector(".audio-player");
let volumeBar = document.querySelector(".volume-bar");
let VolumeFill = document.querySelector(".volume-fill");
let progressBar = document.querySelector(".progress-bar");
let progressFill = document.querySelector(".progress-fill");
let progressPin = document.querySelector(".progress-pin");
const navOpen = document.querySelector(".nav-open")
const navClose = document.querySelector(".nav-close")
const navMenu = document.querySelector(".nav-menu")
const navControl = document.querySelector(".nav-control")

navControl.addEventListener("click", () => {
  if (navMenu.classList.contains("hidden")){
    navMenu.classList.remove("hidden")
    // navMenu.classList.add("scale-50")
    navClose.classList.remove("hidden")
    navOpen.classList.add("hidden")
  }else{
    navMenu.classList.add("hidden")
    navClose.classList.add("hidden")
    navOpen.classList.remove("hidden")
  }
})

//Controls the playing and pausing of the player
playPause.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  } else {
    audioPlayer.pause();
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
  }
});

//This section allow the user to set volume
// volumeBar.addEventListener("click", (e) => {
//   const barWidth = volumeBar.clientWidth;
//   const clickPosition = e.offsetX;
//   const newVolume = clickPosition / barWidth;
//   VolumeFill.style.width = `${newVolume * 100}%`;
//   audioPlayer.volume = newVolume;
// });

// This set the volume to always be at 50%
VolumeFill.style.width = "50%";
audioPlayer.volume = 0.5;

let isDragging = false;

function addListeners(events, element, listener) {
  events.forEach((event) => {
    element.addEventListener(event, listener);
  });
}

const updateVolume = (e) => {
  if (isDragging) {
    const barWidth = volumeBar.clientWidth;
    const newVolume = Math.min(Math.max(e.offsetX / barWidth, 0), 1);
    VolumeFill.style.width = `${newVolume * 100}%`;
    audioPlayer.volume = newVolume;
  }
};

volumeBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateVolume(e);
});

addListeners(["mouseup", "mouseleave"], volumeBar, () => {
  isDragging = false;
});

volumeBar.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateVolume(e);
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercent = (currentTime / duration) * 100;

  progressFill.style.width = `${progressPercent}%`;
  progressPin.style.left = `${progressPercent}%`;
});

progressPin.addEventListener("click", () => {
  isDragging = true;
});

addListeners(["mouseup", "mouseleave"], progressPin, () => {
  isDragging = false;
});
// progressPin.addEventListener("mouseup", () => {
//   isDragging = false;
// });

addListeners(["mousemove"], progressPin, (e) => {
  if (isDragging) {
    const barWidth = progressBar.clientWidth;
    const dragX = e.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (dragX / barWidth) * audioPlayer.duration;

    if (newTime >= 0 && newTime <= audioPlayer.duration) {
      audioPlayer.currentTime = newTime;
      const progressPercent =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

      progressFill.style.width = `${progressPercent}%`;
      progressPin.style.left = `${progressPercent}%`;
    }
  }
});

// progressPin.addEventListener("mousemove", (e) => {
//   const barWidth = progressBar.clientWidth;
//   const dragX = e.clientX - progressBar.getBoundingClientRect().left;
//   const newTime = (dragX / barWidth) * audioPlayer.duration;

//   if (newTime >= 0 && newTime <= audioPlayer.duration) {
//     audioPlayer.currentTime = newTime;
//     const progressPercent =
//       (audioPlayer.currentTime / audioPlayer.duration) * 100;

//     progressFill.style.width = `${progressPercent}%`;
//     progressPin.style.left = `${progressPercent}%`;
//   }
// });

// const url = "http://127.0.0.1:8000/music/songs";
// async function getSongsData(url) {
//   const response = await fetch(url)
//   const data = await response.json()
//   let songs = data
// }

// getSongsData(url)