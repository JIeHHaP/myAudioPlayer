window.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.querySelector("#audio-player"),
    playbtn = document.querySelector(".play"),
    currentProgress = document.querySelector(".current-progress"),
    curTime = document.querySelector(".current-time"),
    totalTime = document.querySelector(".total-time"),
    volumeRange = document.querySelector(".volume-input-div input"),
    voluemProgress = document.querySelector(".volume-progress"),
    volumeBtn = document.querySelector(".volume-btn i"),
    nextSegment = document.querySelector(".fa-arrow-rotate-right"),
    prevSegment = document.querySelector(".fa-arrow-rotate-left");

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
