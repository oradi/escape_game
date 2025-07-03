function checkPassword() {
  const password = document.getElementById("password").value;
  if (password === "REVIE232") {
    window.location.href = "secret.html";
  } else {
    document.getElementById("error").textContent = "Mot de passe incorrect.";
  }
}

const TIMER_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

function getRemainingTime() {
  const startTime = localStorage.getItem("startTime");
  if (!startTime) {
    const now = Date.now();
    localStorage.setItem("startTime", now);
    return TIMER_DURATION;
  }
  const elapsed = Date.now() - parseInt(startTime);
  return Math.max(TIMER_DURATION - elapsed, 0);
}

function updateTimerDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  document.getElementById("timer").textContent =
    timeLeft > 0
      ? `⏳ Temps restant : ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : "💥 Temps écoulé !";
}

function startPersistentTimer() {
  function tick() {
    const timeLeft = getRemainingTime();
    updateTimerDisplay(timeLeft);
    if (timeLeft > 0) {
      setTimeout(tick, 1000);
    }
  }
  tick();
}

function resetTimer() {
  localStorage.setItem("startTime", Date.now());
  startPersistentTimer();
  alert("Le timer a été réinitialisé.");
}

function adminLogin() {
  document.getElementById("adminModal").style.display = "flex"; // ça active le flex et donc l’affichage centré
  const adminPassword = prompt("Mot de passe admin :");
  if (adminPassword === "32591996") {
    document.getElementById("resetButton").style.display = "inline-block";
    alert("Accès admin accordé. Bouton de réinitialisation activé.");
  } else {
    alert("Mot de passe incorrect.");
  }
}
function closeAdminModal() {
  document.getElementById("adminModal").style.display = "none";
  document.getElementById("adminPasswordInput").value = "";
  document.getElementById("adminError").textContent = "";
}

startPersistentTimer();