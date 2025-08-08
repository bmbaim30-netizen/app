const BACKEND_URL = "https://your-backend-url.up.railway.app"; // ganti setelah backend live
let userId = null;

document.addEventListener("DOMContentLoaded", () => {
  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    userId = Telegram.WebApp.initDataUnsafe?.user?.id;
  }
  if (!userId) {
    userId = prompt("Masukkan User ID Telegram:");
  }
  loadBalance();
  document.getElementById("refLink").value = `https://t.me/YourBotUsername?start=${userId}`;
});

function loadBalance() {
  fetch(`${BACKEND_URL}/api/balance?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("balance").innerText = `💰 ${data.balance} Coins`;
    });
}

function completeTask(amount) {
  fetch(`${BACKEND_URL}/api/reward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, amount: amount })
  })
    .then(res => res.json())
    .then(() => loadBalance());
}

function withdraw() {
  const amount = parseInt(document.getElementById("withdrawAmount").value);
  const method = document.getElementById("withdrawMethod").value;
  fetch(`${BACKEND_URL}/api/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, amount, method })
  })
    .then(res => res.json())
    .then(data => alert(data.error || "Withdraw diajukan!"));
}

function copyRef() {
  const link = document.getElementById("refLink");
  link.select();
  document.execCommand("copy");
  alert("Link referral disalin!");
}
