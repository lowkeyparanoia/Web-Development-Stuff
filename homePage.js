import { reserve } from 'https://personal.cs.cityu.edu.hk/~cs2204/cs2204cw3.js';

//Declare an array for promotion messages
const promotions = ["DISNEY PREMIER ACCESS & 1-DAY TICKET COMBO, STARTING FROM HK $798", "DISNEY PREMIER ACCESS & 8-ATTRACTIONS WITH 1 SHOW, STARTING FROM HK $379", "DISNEY PREMIER ACCESS - 1-ATTRACTION, STARTING FROM HK $79"];

//Select a message at random from the array and display it
const promoInfo = document.querySelector('#promo_info');
const promoMsg1 = document.querySelector('.message');
const promoMsg2 = promoMsg1.nextElementSibling;
promoMsg1.textContent = promotions[Math.floor(Math.random() * promotions.length)];

//Cycle through messages every 3 seconds
setInterval(() => {
  let currentMsg = promoMsg1.textContent;
  let currentIndex = promotions.indexOf(currentMsg);
  let nextIndex = (currentIndex + 1) % promotions.length;
  promoMsg1.textContent = promotions[nextIndex];
  promoMsg2.textContent = "MAIN ATTRACTIONS AT CHEAP RATES"; //reset secondary message
}, 3000);

//Toggle between two videos continuously
const video = document.querySelector('#video1');
video.addEventListener('ended', (event) => {
  if (video.src.includes("Castle")) {
    video.src = "https://personal.cs.cityu.edu.hk/~cs2204/video/Musical_Journey.mp4";
  } else {
    video.src = "https://personal.cs.cityu.edu.hk/~cs2204/video/Castle.mp4";
  }
  video.load();
  video.play();
});

//Form validation and reservation
const form = document.querySelector('#home_form');
const submitBtn = document.querySelector('input[type="submit"]');
const errorText = document.createElement('p');
errorText.style.color = 'red';
errorText.style.fontWeight = 'bold';
errorText.style.marginTop = '6px';
form.insertBefore(errorText, submitBtn);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  errorText.textContent = "";
  const date = document.querySelector('#Date').value;
  const time = document.querySelector('#Time').value;
  const visitors = document.querySelector('#visitor').value.trim();
  const isNotBlank = (str) => !!str.trim();
  if (!isNotBlank(date) || !isNotBlank(time) || !isNotBlank(visitors)) {
    errorText.textContent = "Data not completed, please re-enter";
  } else {
    const isSuccess = reserve(date, time, visitors);
    if (isSuccess) {
      alert("Reservation done. Thank you.");
    } else {
      alert("Disneyland has reached the maximum number of visitors for the day");
    }
    form.reset(); //reset form when reservation is complete
  }
});