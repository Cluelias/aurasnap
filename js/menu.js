// menu.js

const UPLOADED_PHOTOS_KEY = "aurasnap_uploaded_photos";
let uploadedImages = [];

/**
 * Go to camera page
 */
function goToCamera() {
  window.location.href = "camera.html";
}

/**
 * Upload photos one by one (max 3)
 */
function uploadPhoto() {
  window.location.href = "upload.html";
}

/**
 * Reset and go home
 */
function goHome() {
  uploadedImages = [];
  localStorage.clear();
  window.location.href = "index.html";
}
