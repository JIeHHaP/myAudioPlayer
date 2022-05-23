window.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.querySelector("#audio-player"),
    playbtn = document.querySelector(".play"),
    progressBar = document.querySelector(".progress-bar"),
    currentProgress = document.querySelector(".current-progress"),
    curTime = document.querySelector(".current-time"),
    totalTime = document.querySelector(".total-time"),
    volumeRange = document.querySelector(".volume-input-div input"),
    voluemProgress = document.querySelector(".volume-progress"),
    volumeBtn = document.querySelector(".volume-btn i"),
    nextSegment = document.querySelector(".fa-arrow-rotate-right"),
    trackName = document.querySelector(".track-name"),
    authorName = document.querySelector(".author-name"),
    cover = document.querySelector(".cover-conteiner img"),
    prevSegment = document.querySelector(".fa-arrow-rotate-left");

  // database
  const trackList = {
    1: {
      authorName: "Artist_01",
      songName: "Track_01",
      src: "music/bensound-epic.mp3",
      cover: "img/epic.png",
    },
    2: {
      authorName: "Artist_02",
      songName: "Track_02",
      src: "music/bensound-energy.mp3",
      cover: "img/energy.png",
    },
    3: {
      authorName: "Artist_03",
      songName: "Track_03",
      src: "music/bensound-sunny.mp3",
      cover: "img/sunny.png",
    },
    4: {
      authorName: "Artist_04",
      songName: "Track_04",
      src: "music/bensound-dubstep.mp3",
      cover: "img/dubstep.png",
    },
  };

  function setInfo(info, num) {
    authorName.textContent = info[num].authorName;
    trackName.textContent = info[num].songName;
    cover.src = info[num].cover;
    audioPlayer.src = info[num].src;
  }

  setInfo(trackList, 1);
  // play / pause
  playbtn.addEventListener("click", () => {
    playbtn.classList.toggle("fa-circle-play");
    playbtn.classList.toggle("fa-circle-pause");
    if (playbtn.classList.contains("fa-circle-play")) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  });

  // seconds to hh:mm::ss format
  function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = Math.floor((seconds % 3600) / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let sec = Math.floor((seconds % 3600) % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${hours}:${minutes}:${sec}`;
  }

  //progress bar
  function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const percents = (currentTime / duration) * 100;
    currentProgress.style.width = `${percents}%`;
    curTime.textContent = formatTime(currentTime);
    totalTime.textContent = formatTime(duration);
  }

  audioPlayer.addEventListener("timeupdate", updateProgress);

  progressBar.addEventListener("click", (event) => {
    const position = event.pageX - progressBar.offsetLeft;
    const positionPercents = position / progressBar.offsetWidth;
    currentProgress.style.width = `${positionPercents * 100}%`;
    audioPlayer.currentTime = positionPercents * audioPlayer.duration;
  });

  // fragents btns
  function changeFragment(num) {
    audioPlayer.currentTime += num;
  }

  prevSegment.addEventListener("click", () => {
    changeFragment(-10);
  });
  nextSegment.addEventListener("click", () => {
    changeFragment(10);
  });

  // volume control

  function setVolumeLevel(inputValue) {
    audioPlayer.volume = inputValue / 100;
  }

  function setVolumeProgress(inputValue) {
    voluemProgress.style.width = `${inputValue}%`;
  }

  volumeRange.addEventListener("input", (e) => {
    setVolumeProgress(volumeRange.value);
    setVolumeLevel(volumeRange.value);
    if (volumeRange.value == 0) {
      volumeBtn.classList.remove("fa-volume-high");
      volumeBtn.classList.add("fa-volume-xmark");
    } else {
      volumeBtn.classList.add("fa-volume-high");
      volumeBtn.classList.remove("fa-volume-xmark");
    }
  });

  volumeBtn.addEventListener("click", (event) => {
    if (volumeRange.value > 0) {
      volumeBtn.setAttribute("data-volume-level", volumeRange.value);
    }
    if (event.target.classList.contains("fa-volume-high")) {
      volumeRange.value = 0;
      setVolumeProgress(volumeRange.value);
      setVolumeLevel(volumeRange.value);
      event.target.classList.remove("fa-volume-high");
      event.target.classList.add("fa-volume-xmark");
    } else {
      console.log(volumeBtn.getAttribute("data-volume-level"));
      volumeRange.value = volumeBtn.getAttribute("data-volume-level");
      setVolumeProgress(volumeRange.value);
      setVolumeLevel(volumeRange.value);
      event.target.classList.add("fa-volume-high");
      event.target.classList.remove("fa-volume-xmark");
    }
  });
});
