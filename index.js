document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
  });

  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");
  let currentIndex = 0;

  function showItem(index) {
    items.forEach((item) => item.classList.remove("active"));
    items[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  }

  const autoSlide = setInterval(nextSlide, 5000);

  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    prevSlide();
  });

  const phoneInput = document.querySelector("#phone");

  if (phoneInput) {
    const phoneMask = IMask(phoneInput, {
      mask: "(00) 00000-0000",
    });
  }

  const form = document.querySelector("form");
  if (form) {
    const validator = new JustValidate(form, {
      errorFieldCssClass: "is-invalid",
      errorLabelStyle: {
        fontSize: "14px",
        color: "#dc3545",
      },
      focusInvalidField: true,
      lockForm: true,
    });

    validator
      .addField("#name", [
        {
          rule: "required",
          errorMessage: "Nome é obrigatório",
        },
        {
          rule: "minLength",
          value: 3,
          errorMessage: "Nome deve ter pelo menos 3 caracteres",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Email é obrigatório",
        },
        {
          rule: "email",
          errorMessage: "Email inválido",
        },
      ])
      .addField("#phone", [
        {
          rule: "required",
          errorMessage: "Telefone é obrigatório",
        },
        {
          validator: (value) => {
            const phoneNumber = value.replace(/\D/g, "");
            return phoneNumber.length === 11;
          },
          errorMessage: "Telefone inválido",
        },
      ])
      .addField("#date", [
        {
          rule: "required",
          errorMessage: "Data é obrigatória",
        },
      ])
      .addField("#time", [
        {
          rule: "required",
          errorMessage: "Horário é obrigatório",
        },
      ])
      .addField("#service", [
        {
          rule: "required",
          errorMessage: "Serviço é obrigatório",
        },
      ])
      .onSuccess((event) => {
        console.log("Form submitted successfully");
      });
  }
  function updateShopStatus() {
    const statusButton = document.querySelector(".status-button");
    const statusText = statusButton.querySelector(".status-text");
    const now = new Date();
    const hours = now.getHours();
    const isFirstShift = hours >= 8 && hours < 13;
    const isSecondShift = hours >= 14 && hours < 18;
    const isOpen = isFirstShift || isSecondShift;

    if (isOpen) {
      statusButton.classList.remove("closed");
      statusButton.classList.add("open");
      statusText.textContent = "ABERTO";
    } else {
      statusButton.classList.remove("open");
      statusButton.classList.add("closed");
      statusText.textContent = "FECHADO";
    }
  }
  updateShopStatus();
  setInterval(updateShopStatus, 60000);
});
