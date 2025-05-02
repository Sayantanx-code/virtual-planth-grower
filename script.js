let plants = JSON.parse(localStorage.getItem("plants")) || [{ growth: 0 }];
let activePlant = 0;

const plantImg = document.getElementById("plant");

function updatePlantImage() {
  const growth = plants[activePlant].growth;
  if (growth < 3) {
    plantImg.src = "images/seed.png";
  } else if (growth < 6) {
    plantImg.src = "images/sprout.png";
  } else {
    plantImg.src = "images/bloom.png";
  }
}

function waterPlant() {
  plants[activePlant].growth++;
  localStorage.setItem("plants", JSON.stringify(plants));
  updatePlantImage();
  playSound();
  triggerRain();
}

function triggerRain() {
  const container = document.getElementById('rain-container');
  container.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = `${Math.random() * 100}%`;
    container.appendChild(drop);
  }
  setTimeout(() => container.innerHTML = '', 1000);
}

function playSound() {
  const audio = document.getElementById('water-sound');
  audio.currentTime = 0;
  audio.play();
}

function addNewPlant() {
  plants.push({ growth: 0 });
  activePlant = plants.length - 1;
  localStorage.setItem("plants", JSON.stringify(plants));
  updatePlantImage();
}

function switchPlant() {
  activePlant = (activePlant + 1) % plants.length;
  updatePlantImage();
}

function autoGrow() {
  const lastGrowTime = localStorage.getItem("lastGrowTime");
  const now = Date.now();
  const timePassed = now - (lastGrowTime || 0);

  if (timePassed > 1000 * 60 * 60 * 24) {
    plants[activePlant].growth++;
    localStorage.setItem("plants", JSON.stringify(plants));
    localStorage.setItem("lastGrowTime", now);
    updatePlantImage();
  }
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => console.log("Logged in:", user))
    .catch(error => console.error(error.message));
}

function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => console.log("Signed up:", user))
    .catch(error => console.error(error.message));
}

updatePlantImage();
autoGrow();