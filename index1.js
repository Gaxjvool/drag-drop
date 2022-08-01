import {
  fromEvent,
  animationFrameScheduler,
  interval,
  combineLatest,
} from 'rxjs';
import {
  tap,
  map,
  switchMap,
  takeUntil,
  last,
  switchMap,
} from 'rxjs/operators';
const moveContent = document.querySelector('.box');
console.log(moveContent);
const os = {
  next(pos) {
    console.log(pos);
  },
};

const mousedown$ = fromEvent(moveContent, 'mousedown');
const mousemove$ = fromEvent(moveContent, 'mousemove');
const mouseup$ = fromEvent(moveContent, 'mouseup');

const dragMove$ = mousedown$.pipe(
  switchMap((start) =>
    mousemove$.pipe(
      map((moveEvent) => ({
        originalEvent: moveEvent,
        deltaX: moveEvent.pageX - start.pageX,
        deltaY: moveEvent.pageY - start.pageY,
        startOffsetX: start.offsetX,
        startOffsetY: start.offsetY,
      })),
      takeUntil(mouseup$)
    )
  )
);

dragMove$.subscribe((move) => {
  const offsetX = move.originalEvent.x - move.startOffsetX;
  const offsetY = move.originalEvent.y - move.startOffsetY;
  moveContent.style.left = offsetX + 'px';
  moveContent.style.top = offsetY + 'px';
});
// const dragEnd$ = mousedown$.pipe(
//   switchMap((start) =>
//     mousemove$.pipe(
//       map((moveEvent) => ({
//         originalEvent: moveEvent,
//         deltaX: moveEvent.pageX - start.pageX,
//         deltaY: moveEvent.pageY - start.pageY,
//         startOffsetX: start.offsetX,
//         startOffsetY: start.offsetY,
//       })),
//       takeUntil(mouseup$),
//       last()
//     )
//   )
// );

// combineLatest([
//   mousedown$.pipe(
//     tap((event) => {
//       moveContent.dispatchEvent(
//         new CustomEvent('mymousedown', { detail: event })
//       );
//     })
//   ),
//   dragMove$.pipe(
//     tap((event) => {
//       moveContent.dispatchEvent(
//         new CustomEvent('mydragmove', { detail: event })
//       );
//     })
//   ),
//   dragEnd$.pipe(
//     tap((event) => {
//       moveContent.dispatchEvent(
//         new CustomEvent('mydragend', { detail: event })
//       );
//     })
//   ),
// ]).subscribe();
