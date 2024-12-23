// Query selectors consolidated at top
const elements = {
  playBtn: document.querySelector(".play"),
  pauseBtn: document.querySelector(".pause"),
  nextBtn: document.querySelector(".next"),
  prevBtn: document.querySelector(".prev"),
  playPause: document.querySelector(".pause-play"),
  audioPlayer: document.querySelector(".audio-player"),
  volumeBar: document.querySelector(".volume-bar"),
  volumeFill: document.querySelector(".volume-fill"),
  progressBar: document.querySelector(".progress-bar"),
  progressFill: document.querySelector(".progress-fill"),
  progressPin: document.querySelector(".progress-pin"),
  navOpen: document.querySelector(".nav-open"),
  navClose: document.querySelector(".nav-close"),
  navMenu: document.querySelector(".nav-menu"),
  navControl: document.querySelector(".nav-control"),
};

// State management
const state = {
  isDragging: false,
  currentPlaylist: {
    songs: [],
    currentIndex: 0,
  },
};

// Navigation menu toggle
elements.navControl.addEventListener("click", () => {
  const { navMenu, navClose, navOpen } = elements;
  const isHidden = navMenu.classList.contains("hidden");

  navMenu.classList.toggle("hidden", !isHidden);
  navClose.classList.toggle("hidden", !isHidden);
  navOpen.classList.toggle("hidden", isHidden);
});

// Play/Pause functionality
elements.playPause.addEventListener("click", () => {
  const { audioPlayer, playBtn, pauseBtn } = elements;

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

// Volume control
function updateVolume(e) {
  if (!state.isDragging) return;

  const { volumeBar, volumeFill, audioPlayer } = elements;
  const barWidth = volumeBar.clientWidth;
  const newVolume = Math.min(Math.max(e.offsetX / barWidth, 0), 1);

  volumeFill.style.width = `${newVolume * 100}%`;
  audioPlayer.volume = newVolume;
}

elements.volumeBar.addEventListener("mousedown", (e) => {
  state.isDragging = true;
  updateVolume(e);
});

["mouseup", "mouseleave"].forEach((event) => {
  elements.volumeBar.addEventListener(event, () => {
    state.isDragging = false;
  });
});

elements.volumeBar.addEventListener("mousemove", updateVolume);

// Progress bar update
elements.audioPlayer.addEventListener("timeupdate", () => {
  const { audioPlayer, progressFill, progressPin } = elements;
  const progressPercent =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;

  progressFill.style.width = `${progressPercent}%`;
  progressPin.style.left = `${progressPercent}%`;
});

// Progress pin drag functionality
elements.progressPin.addEventListener("mousedown", () => {
  state.isDragging = true;
});

["mouseup", "mouseleave"].forEach((event) => {
  elements.progressPin.addEventListener(event, () => {
    state.isDragging = false;
  });
});

elements.progressPin.addEventListener("mousemove", (e) => {
  if (!state.isDragging) return;

  const { progressBar, audioPlayer, progressFill, progressPin } = elements;
  const barWidth = progressBar.clientWidth;
  const dragX = e.clientX - progressBar.getBoundingClientRect().left;
  const newTime = (dragX / barWidth) * audioPlayer.duration;

  if (newTime >= 0 && newTime <= audioPlayer.duration) {
    audioPlayer.currentTime = newTime;
    const progressPercent = (newTime / audioPlayer.duration) * 100;

    progressFill.style.width = `${progressPercent}%`;
    progressPin.style.left = `${progressPercent}%`;
  }
});

// Song management
function playSong(song) {
  const { audioPlayer, playBtn, pauseBtn } = elements;
  const songUrl = song.getAttribute("data-url");
  const songName = song.getAttribute("data-song-name");
  const songCover = song.getAttribute("data-image");
  const songArtist = song.getAttribute("data-artist");

  audioPlayer.innerHTML = `<source src="/media/${songUrl}" type="audio/mpeg">`;
  audioPlayer.load();

  document.querySelector(".song-name").textContent = songName;
  document.querySelector(".song-artist").textContent = songArtist;
  document.querySelector(".player-image").src = `/media/${songCover}`;

  audioPlayer.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
}

function playNextSong() {
  const { songs, currentIndex } = state.currentPlaylist;
  if (!songs.length) return;

  state.currentPlaylist.currentIndex = (currentIndex + 1) % songs.length;
  playSong(songs[state.currentPlaylist.currentIndex]);
}

function playPrevSong() {
  const { songs, currentIndex } = state.currentPlaylist;
  if (!songs.length) return;

  state.currentPlaylist.currentIndex =
    (currentIndex - 1 + songs.length) % songs.length;
  playSong(songs[state.currentPlaylist.currentIndex]);
}

function setupSongListeners() {
  const songs = document.querySelectorAll(".song");

  function songClickHandler() {
    const playlistSongs = Array.from(songs);
    const clickedSongIndex = playlistSongs.indexOf(this);

    state.currentPlaylist = {
      songs: playlistSongs,
      currentIndex: clickedSongIndex,
    };
    playSong(this);
  }

  // Remove existing and add new listeners
  songs.forEach((song) => {
    song.removeEventListener("click", songClickHandler);
    song.addEventListener("click", songClickHandler);
  });

  if (elements.nextBtn) {
    elements.nextBtn.removeEventListener("click", playNextSong);
    elements.nextBtn.addEventListener("click", playNextSong);
  }

  if (elements.prevBtn) {
    elements.prevBtn.removeEventListener("click", playPrevSong);
    elements.prevBtn.addEventListener("click", playPrevSong);
  }

  elements.audioPlayer.removeEventListener("ended", playNextSong);
  elements.audioPlayer.addEventListener("ended", playNextSong);
}

// Initialize
document.addEventListener("DOMContentLoaded", setupSongListeners);
document.body.addEventListener("htmx:afterOnLoad", setupSongListeners);

// Set initial volume
elements.volumeFill.style.width = "50%";
elements.audioPlayer.volume = 0.5;
