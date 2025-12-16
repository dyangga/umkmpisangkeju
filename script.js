const form = document.getElementById("orderForm");
const nama = document.getElementById("nama");
const wa = document.getElementById("wa");
const menu = document.querySelectorAll('input[name="menu"]');
const jumlah = document.getElementById("jumlah");

const errNama = document.getElementById("errNama");
const errWa = document.getElementById("errWa");
const errMenu = document.getElementById("errMenu");
const errJumlah = document.getElementById("errJumlah");

const waRegex = /^\d{10,13}$/;

// REALTIME VALIDATION
nama.addEventListener("input", () => {
  errNama.classList.toggle("hidden", nama.value.trim() !== "");
});

wa.addEventListener("input", () => {
  // Hanya izinkan angka (hapus selain digit)
  wa.value = wa.value.replace(/[^0-9]/g, "");

  // Validasi 10–13 digit
  if (wa.value.length < 10 || wa.value.length > 13) {
    errWa.textContent = "Nomor WhatsApp harus 10–13 digit dan hanya angka";
    errWa.classList.remove("hidden");
  } else {
    errWa.classList.add("hidden");
  }
});

menu.forEach((cb) => {
  cb.addEventListener("change", () => {
    const checked = document.querySelectorAll('input[name="menu"]:checked');
    errMenu.classList.toggle("hidden", checked.length > 0);
  });
});

jumlah.addEventListener("input", () => {
  errJumlah.classList.toggle("hidden", jumlah.value >= 1);
});

// SUBMIT VALIDATION
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  if (nama.value.trim() === "") {
    errNama.classList.remove("hidden");
    valid = false;
  }

  if (!waRegex.test(wa.value.trim())) {
    errWa.classList.remove("hidden");
    valid = false;
  }

  const checkedMenu = document.querySelectorAll('input[name="menu"]:checked');

  if (checkedMenu.length === 0) {
    errMenu.classList.remove("hidden");
    valid = false;
  }

  if (jumlah.value < 1) {
    errJumlah.classList.remove("hidden");
    valid = false;
  }

  if (valid) {
    successModal.showModal();
    form.reset();
  }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});
