import { fromEvent, animationFrameScheduler, interval } from 'rxjs';
import {
  map,
  switchMap,
  takeUntil,
  subscribeOn,
  mergeMap,
} from 'rxjs/operators';
const moveContent = document.querySelector('.box');
console.log(moveContent);
const os = {
  next(pos) {
    console.log(pos);
  },
};

const mousedown = fromEvent(window, 'mousedown');
const mousemove = fromEvent(moveContent, 'mousemove');
const mouseup = fromEvent(window, 'mouseup');
console.log(window.innerWidth);
const move = mousedown.pipe(
  switchMap((start) =>
    mousemove.pipe(
      map((moveEvent) => ({
        originalEvent: moveEvent,
        deltaX: moveEvent.pageX - start.pageX,
        deltaY: moveEvent.pageY - start.pageY,
        startOffsetX: start.offsetX,
        startOffsetY: start.offsetY,
      })),
      takeUntil(mouseup)
    )
  )
);

move.subscribe((moving) => {
  const offsetX = moving.originalEvent.x - moving.startOffsetX;
  const offsetY = moving.originalEvent.y - moving.startOffsetY;
  moveContent.style.left = offsetX + 'px';
  moveContent.style.top = offsetY + 'px';
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

// let x = 0,
//   y = 0,
//   dirX = 1,
//   dirY = 1;
// let speedX = 2,
//   speedY = 2;
// const moveContentWidth = 800 + 'px';
// const moveContentHeight = 720 + 'px';

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }

// function animate() {
//   const screenHeight = document.body.clientHeight;
//   const screenWidth = document.body.clientWidth;
//   if (y + moveContentHeight >= screenHeight || y < 0) {
//     dirY *= -1;
//     speedY = getRandomIntInclusive(1, 4);
//   }
//   if (x + moveContentWidth >= screenWidth || x < 0) {
//     dirX *= -1;
//     speedX = getRandomIntInclusive(1, 4);
//   }
//   x += dirX * speedX;
//   y += dirY * speedY;
//   moveContent.style.left = x + 'px';
//   moveContent.style.top = y + 'px';
//   window.requestAnimationFrame(animate);
// }

// window.requestAnimationFrame(animate);
