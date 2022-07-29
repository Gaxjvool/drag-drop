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
