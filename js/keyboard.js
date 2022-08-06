var hits = 0;
var hitElement = document.querySelector(".hits");
document.body.onkeyup = function (e) {
  if ((e.keyCode == 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)) {
    addHit();
  }
};
var addHit = function () {
  hits++;
  renderHits();
};
var renderHits = function () {
  hitElement.innerHTML = hits;
};
const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const timestamps = [];
timestamps.unshift(getTimestamp());
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}
function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now();
}
function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}
document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  keyElement.classList.add("hit");
  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });
  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];
    console.log(`Character per minute ${60 / elapsedTime}`);
    highlightedKey.classList.remove("selected");
    targetRandomKey();
  }
});
targetRandomKey();
