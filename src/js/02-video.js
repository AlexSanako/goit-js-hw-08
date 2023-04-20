import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

console.log(Player);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const THROTTLE_DELAY = 1000; // інтервал для збереження часу в сховище
const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, THROTTLE_DELAY);

player.on('timeupdate', event => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}
