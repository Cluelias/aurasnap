const CAPTURED_PHOTOS_KEY = "aurasnap_captured_photos";
let capturedImages = [];
let captureCount = 0;

const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");
const countdown = document.getElementById("countdown");
const slots = document.querySelectorAll(".capture-slot");

// Get selected theme from localStorage
const theme = localStorage.getItem("aurasnap_theme");

// Redirect to home if no theme selected
if (!theme) {
  alert("Please select a theme first!");
  window.location.href = "index.html";
}

// Set background image based on theme
let backgroundSrc;
switch(theme) {
  case "cyberpunk":
    backgroundSrc = "assets/backgrounds/cyberpunk-bg.png";
    break;
  case "pixel":
    backgroundSrc = "assets/backgrounds/pixel-bg.png";
    break;
  case "botanical":
    backgroundSrc = "assets/backgrounds/botanical-bg.png";
    break;
}

// Load background image if it exists
const backgroundImg = new Image();
if (backgroundSrc) {
  backgroundImg.src = backgroundSrc;
}

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Camera access denied or not available.");
    console.error(err);
  });

// Capture button click
captureBtn.addEventListener("click", () => {
  if (captureCount >= 3) return;

  let timeLeft = 3;
  countdown.innerText = timeLeft;
  countdown.classList.remove("hidden");

  const interval = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      countdown.innerText = timeLeft;
    } else {
      clearInterval(interval);
      countdown.classList.add("hidden");
      takePhoto();
    }
  }, 1000);
});

// Take photo function
function takePhoto() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  // Draw background first
  if (backgroundImg.complete) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  }

  // Draw video normally (no flip)
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/png");
  capturedImages.push(dataUrl);

  // Display in slot
  const slot = slots[captureCount];
  slot.innerHTML = "";
  slot.style.border = "none";

  const img = document.createElement("img");
  img.src = dataUrl;
  img.className = "w-full h-full object-cover rounded-lg";

  slot.appendChild(img);

  captureCount++;

  if (captureCount === 3) {
    captureBtn.disabled = true;
    captureBtn.innerText = "All Captures Done";

    localStorage.setItem(CAPTURED_PHOTOS_KEY, JSON.stringify(capturedImages));

    setTimeout(() => {
      window.location.href = "editor.html";
    }, 1000);
  }
}



