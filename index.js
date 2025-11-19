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

// Fungsi untuk mendapatkan users dari localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Fungsi untuk menyimpan users ke localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Toggle antara login dan register
toggleRegister.addEventListener("click", function(e) {
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

// Form submit (login atau register)
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const users = getUsers();

  if (isRegisterMode) {
    // Register
    const email = document.getElementById("email").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    if (pass !== confirmPass) {
      message.textContent = "Password tidak cocok!";
      message.className = "error";
      return;
    }
    if (users.find(u => u.username === user)) {
      message.textContent = "Username sudah ada!";
      message.className = "error";
      return;
    }
    users.push({ username: user, password: pass, email: email });
    saveUsers(users);
    message.textContent = "Registrasi berhasil! Silakan login.";
    message.className = "success";
    toggleRegister.click(); // Kembali ke mode login
  } else {
    // Login
    const foundUser = users.find(u => u.username === user && u.password === pass);
    if (foundUser) {
      message.textContent = "Login Successful!";
      message.className = "success";
      setTimeout(() => {
        alert("Welcome, " + user + "!");
        window.location.href = "dashboard.html"; // Ganti dengan halaman setelah login
      }, 1000);
    } else {
      message.textContent = "Incorrect username or password!";
      message.className = "error";
    }
  }
});

// Forgot password modal
forgotPasswordLink.addEventListener("click", function(e) {
  e.preventDefault();
  forgotModal.style.display = "flex";
});

closeModal.addEventListener("click", function() {
  forgotModal.style.display = "none";
  resetMessage.textContent = "";
});

resetBtn.addEventListener("click", function() {
  const email = resetEmail.value;
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (user) {
    resetMessage.textContent = "Password Anda: " + user.password + " (Simulasi - dalam produksi, kirim email)";
    resetMessage.className = "success";
  } else {
    resetMessage.textContent = "Email tidak ditemukan!";
    resetMessage.className = "error";
  }
});