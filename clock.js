class Clock {
    constructor() {
      this.currentTime = new Date();
    }
  
    displayTime() {
      setInterval(() => {
        this.currentTime = new Date();
        console.log(this.currentTime.toLocaleTimeString());
      }, 1000);
    }
  }
  
  module.exports = Clock;
  