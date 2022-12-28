class AudioTool {
  constructor() {
    this.audioFile = "audio/three.mp3";
    this.audio = new Audio(this.audioFile);
  }

  play(mouse) {
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
    } else {
      // this.audio.pause();
      // this.isPlaying = false;
      let timeToStart =
        (mouse.clientX / window.innerWidth) * this.audio.duration;
      this.audio.currentTime = timeToStart;
    }
  }
}
