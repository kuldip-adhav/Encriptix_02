const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsEl = document.getElementById('laps');

let time = 0;
let intervalId;
let lapTime = [];

function updateTime() {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  timeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startTime() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      time += 10;
      updateTime();
    }, 10);
  }
}

function pauseTime() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTime() {
  clearInterval(intervalId);
  intervalId = null;
  time = 0;
  updateTime();
  lapTime = [];
  lapsEl.innerHTML = '';
}

function takeLap() {
  lapTime.push(time);
  const li = document.createElement('li');
  li.textContent = `Lap ${lapTime.length}: ${lapTime[lapTime.length - 1]}`;
  lapsEl.appendChild(li);
}

startBtn.addEventListener('click', startTime);
pauseBtn.addEventListener('click', pauseTime);
resetBtn.addEventListener('click', resetTime);
lapBtn.addEventListener('click', takeLap);

updateTime();