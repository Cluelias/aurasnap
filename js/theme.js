
// Handles theme selection on index.html

// Key used for storing theme
const THEME_KEY = "aurasnap_theme";

/**
 * Save selected theme and go to menu page
 * @param {string} theme - cyberpunk | pixel | botanical
 */
function selectTheme(theme) {
  if (!theme) return;

  // Save theme choice
  localStorage.setItem(THEME_KEY, theme);

  // Redirect to menu page
  window.location.href = "menu.html";
}

// Get currently selected theme
function getSelectedTheme() {
  return localStorage.getItem(THEME_KEY);
}

/**
 * Optional safety check:
 * If user lands on menu/camera/editor without selecting a theme,
 * send them back to home
 */
function ensureThemeSelected() {
  const theme = getSelectedTheme();
  if (!theme) {
    window.location.href = "index.html";
  }
}
