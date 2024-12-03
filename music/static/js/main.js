let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let playPause = document.querySelector(".pause-play");
let audioPlayer = document.querySelector(".audio-player");
let volumeBar = document.querySelector(".volume-bar");
let VolumeFill = document.querySelector(".volume-fill");
let progressBar = document.querySelector(".progress-bar");
let progressFill = document.querySelector(".progress-fill");
let progressPin = document.querySelector(".progress-pin");
const navOpen = document.querySelector(".nav-open");
const navClose = document.querySelector(".nav-close");
const navMenu = document.querySelector(".nav-menu");
const navControl = document.querySelector(".nav-control");
let songs = document.querySelectorAll(".song");
let songUrl = document.querySelector(".song-url");

navControl.addEventListener("click", () => {
  if (navMenu.classList.contains("hidden")) {
    navMenu.classList.remove("hidden");
    // navMenu.classList.add("scale-50")
    navClose.classList.remove("hidden");
    navOpen.classList.add("hidden");
  } else {
    navMenu.classList.add("hidden");
    navClose.classList.add("hidden");
    navOpen.classList.remove("hidden");
  }
});

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
// function PlaySong(song) {
//   const songUrl = song.getAttribute("data-url");
//   const songName = song.getAttribute("data-song-name");
//   const songCover = song.getAttribute("data-image");
//   const songArtist = song.getAttribute("data-artist");

//   audioPlayer.innerHTML = "";
//   audioPlayer.innerHTML = `<source src='../../media/${songUrl}' type='audio/mpeg'>`;
//   audioPlayer.load();

//   document.querySelector(".song-name").innerText = songName;
//   document.querySelector(".song-artist").innerText = songArtist;
//   document.querySelector(".player-image").src = `../../media/${songCover}`;

//   audioPlayer.play();
//   playBtn.classList.add("hidden");
//   pauseBtn.classList.remove("hidden");
// }

// let currentPlaylist = {
//   songs: [],
//   currentIndex: 0,
// };

// for (let song of songs) {
//   song.addEventListener("click", () => {
//     const playListSongs = Array.from(songs);
//     const clickedSongIndex = playListSongs.indexOf(song);

//     currentPlaylist = {
//       songs: playListSongs,
//       currentIndex: clickedSongIndex,
//     };
//     PlaySong(song);
//   });
// }

// playNextSong = () => {
//   if (currentPlaylist.songs.length === 0) return;

//   currentPlaylist.currentIndex =
//     (currentPlaylist.currentIndex + 1) % currentPlaylist.songs.length;
//   const nextSong = currentPlaylist.songs[currentPlaylist.currentIndex];
//   PlaySong(nextSong);
// };

// nextBtn.addEventListener("click", () => {
//   playNextSong();
// });

// prevBtn.addEventListener("click", () => {
//   if (currentPlaylist.songs.length === 0) return;

//   currentPlaylist.currentIndex =
//     (currentPlaylist.currentIndex - 1 + currentPlaylist.songs.length) %
//     currentPlaylist.songs.length;
//   const prevSong = currentPlaylist.songs[currentPlaylist.currentIndex];
//   PlaySong(prevSong);
// });
// audioPlayer.addEventListener("ended", () => {
//   playNextSong();
// });




// document.body.addEventListener("htmx:afterOnLoad", setupSongListeners);

function setupSongListeners() {
  let songs = document.querySelectorAll(".song");
  let audioPlayer = document.querySelector(".audio-player");
  let playBtn = document.querySelector(".play");
  let pauseBtn = document.querySelector(".pause");
  let nextBtn = document.querySelector(".next");
  let prevBtn = document.querySelector(".prev");

  let currentPlaylist = {
    songs: [],
    currentIndex: 0,
  };

  function PlaySong(song) {
    const songUrl = song.getAttribute("data-url");
    const songName = song.getAttribute("data-song-name");
    const songCover = song.getAttribute("data-image");
    const songArtist = song.getAttribute("data-artist");

    audioPlayer.innerHTML = "";
    audioPlayer.innerHTML = `<source src='../../media/${songUrl}' type='audio/mpeg'>`;
    audioPlayer.load();

    document.querySelector(".song-name").innerText = songName;
    document.querySelector(".song-artist").innerText = songArtist;
    document.querySelector(".player-image").src = `../../media/${songCover}`;

    audioPlayer.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  }

  function playNextSong() {
    if (currentPlaylist.songs.length === 0) return;

    currentPlaylist.currentIndex =
      (currentPlaylist.currentIndex + 1) % currentPlaylist.songs.length;
    const nextSong = currentPlaylist.songs[currentPlaylist.currentIndex];
    PlaySong(nextSong);
  }

  function playPrevSong() {
    if (currentPlaylist.songs.length === 0) return;

    currentPlaylist.currentIndex =
      (currentPlaylist.currentIndex - 1 + currentPlaylist.songs.length) %
      currentPlaylist.songs.length;
    const prevSong = currentPlaylist.songs[currentPlaylist.currentIndex];
    PlaySong(prevSong);
  }

  // Remove existing event listeners to prevent duplicates
  songs.forEach((song) => {
    song.removeEventListener("click", songClickHandler);
  });

  // Song click handler
  function songClickHandler() {
    const playListSongs = Array.from(songs);
    const clickedSongIndex = playListSongs.indexOf(this);

    currentPlaylist = {
      songs: playListSongs,
      currentIndex: clickedSongIndex,
    };
    PlaySong(this);
  }

  // Add click listeners to songs
  songs.forEach((song) => {
    song.addEventListener("click", songClickHandler);
  });

  // Remove existing event listeners on next and prev buttons
  if (nextBtn) {
    nextBtn.removeEventListener("click", playNextSong);
    nextBtn.addEventListener("click", playNextSong);
  }

  if (prevBtn) {
    prevBtn.removeEventListener("click", playPrevSong);
    prevBtn.addEventListener("click", playPrevSong);
  }

  // Auto-play next song when current song ends
  audioPlayer.removeEventListener("ended", playNextSong);
  audioPlayer.addEventListener("ended", playNextSong);
}

// Initial setup
document.addEventListener("DOMContentLoaded", setupSongListeners);

// HTMX-specific event to re-run setup after dynamic content load
document.body.addEventListener("htmx:afterOnLoad", setupSongListeners);