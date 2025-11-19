// =========================
// Element DOM
// =========================
const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const registerFields = document.getElementById("registerFields");
const toggleRegister = document.getElementById("toggleRegister");

const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotModal = document.getElementById("forgotModal");
const resetEmail = document.getElementById("resetEmail");
const resetBtn = document.getElementById("resetBtn");
const closeModal = document.getElementById("closeModal");
const resetMessage = document.getElementById("resetMessage");

let isRegisterMode = false;


// =========================
// LocalStorage Utilities
// =========================
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


// =========================
// Auto Login Jika Sudah Login
// =========================
window.addEventListener("load", () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    window.location.href = "dashboard.html"; 
  }
});


// =========================
// Toggle Login <-> Register
// =========================
toggleRegister.addEventListener("click", (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;

  if (isRegisterMode) {
    formTitle.textContent = "Register";
    submitBtn.textContent = "Daftar";
    registerFields.style.display = "block";
    toggleRegister.textContent = "Sudah punya akun? Login";
  } else {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Masuk";
    registerFields.style.display = "none";
    toggleRegister.textContent = "Belum punya akun? Daftar";
  }

  message.textContent = "";
});


// =========================
// Form Submit (Login & Register)
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const users = getUsers();

  if (isRegisterMode) {
    handleRegister(username, password, users);
  } else {
    handleLogin(username, password, users);
  }
});


// =========================
// REGISTER Handler
// =========================
function handleRegister(username, password, users) {
  const email = document.getElementById("email").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value;

  if (password !== confirmPass) {
    showMessage("Password tidak cocok!", "error");
    return;
  }

  if (users.find(u => u.username === username)) {
    showMessage("Username sudah ada!", "error");
    return;
  }

  users.push({ username, password, email });
  saveUsers(users);

  showMessage("Registrasi berhasil! Silakan login.", "success");

  toggleRegister.click(); 
}


// =========================
// LOGIN Handler
// =========================
function handleLogin(username, password, users) {
  const foundUser = users.find(
    u => u.username === username && u.password === password
  );

  if (!foundUser) {
    showMessage("Incorrect username or password!", "error");
    return;
  }

  showMessage("Login Successful!", "success");

  setTimeout(() => {
    alert("Welcome, " + username + "!");
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html";
  }, 800);
}


// =========================
// Forgot Password Modal
// =========================
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  forgotModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  forgotModal.style.display = "none";
  resetMessage.textContent = "";
});

resetBtn.addEventListener("click", () => {
  const email = resetEmail.value.trim();
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (user) {
    resetMessage.textContent = 
      "Password Anda: " + user.password + " (Simulasi - produksi harus via email)";
    resetMessage.className = "success";
  } else {
    resetMessage.textContent = "Email tidak ditemukan!";
    resetMessage.className = "error";
  }
});


// =========================
// Message Helper
// =========================
function showMessage(text, type) {
  message.textContent = text;
  message.className = type; // "success" or "error"
}
