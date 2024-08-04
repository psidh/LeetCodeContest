async function fetchLink() {
  const response = await fetch(
    "https://leetcodecontestserver.onrender.com/get-link"
  );
  const data = await response.json();
  if (data.link) {
    const btn = document.getElementById("btn");
    btn.innerHTML = "Join In";
    btn.disabled = false;
    btn.onclick = () => {
      window.open(data.link, "_blank");
    };
  }
}

async function startCountdown() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(18, 0, 0, 0);

  if (now.getTime() > targetTime.getTime()) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const interval = setInterval(async () => {
    const currentTime = new Date().getTime();
    const distance = targetTime - currentTime;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(
      "countdown"
    ).innerHTML = `${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").style.display = "none";
      await fetchLink();
    }
  }, 1000);
}

window.onload = startCountdown;
