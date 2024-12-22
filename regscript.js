document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("authForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const birthdateInput = document.getElementById("birthdate");
    const toggleAuth = document.getElementById("toggleAuth");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authButton = document.getElementById("authButton");
    const birthdateGroup = document.getElementById("birthdateGroup");

    let isRegistration = true; // Указывает текущий режим (регистрация или вход)

    // Создаём элементы для отображения ошибок
    const emailError = createErrorElement(emailInput, "Введите корректный email.");
    const passwordError = createErrorElement(passwordInput, "Пароль должен быть длиной не менее 6 символов.");
    const birthdateError = createErrorElement(birthdateInput, "Вы должны быть старше 18 лет.");

    // Переключение между регистрацией и входом
    toggleAuth.addEventListener("click", () => {
        isRegistration = !isRegistration;

        if (isRegistration) {
            authTitle.textContent = "Регистрация";
            authSubtitle.textContent = "Создай свой аккаунт, чтобы начать общаться!";
            authButton.textContent = "Зарегистрироваться";
            birthdateGroup.style.display = "block";
            toggleAuth.textContent = "Уже есть аккаунт? Войти";
        } else {
            authTitle.textContent = "Вход";
            authSubtitle.textContent = "Войдите, чтобы продолжить!";
            authButton.textContent = "Войти";
            birthdateGroup.style.display = "none";
            toggleAuth.textContent = "Нет аккаунта? Зарегистрироваться";
        }
    });

    // Валидация email
    emailInput.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        toggleError(emailError, !emailRegex.test(emailInput.value));
    });

    // Валидация пароля
    passwordInput.addEventListener("input", () => {
        toggleError(passwordError, passwordInput.value.length < 6);
    });

    // Валидация даты рождения
    birthdateInput.addEventListener("input", () => {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const isOldEnough = age > 18 || (age === 18 && today >= new Date(birthdate.setFullYear(birthdate.getFullYear() + 18)));
        toggleError(birthdateError, !isOldEnough);
    });

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы

        const email = emailInput.value;
        const password = passwordInput.value;
        const birthdate = birthdateInput.value;

        const isEmailValid = email && !emailError.classList.contains("visible");
        const isPasswordValid = password && !passwordError.classList.contains("visible");
        const isBirthdateValid = isRegistration ? birthdate && !birthdateError.classList.contains("visible") : true;

        if (isEmailValid && isPasswordValid && isBirthdateValid) {
            // Если все данные валидны, показываем их в alert
            alert(`Ваши данные:
- Email: ${email}
- Пароль: ${password}
${isRegistration ? `- Дата рождения: ${birthdate}` : ''}`);
        } else {
            alert("Пожалуйста, исправьте ошибки в форме перед отправкой.");
        }
    });

    // Создание элемента ошибки
    function createErrorElement(input, errorMessage) {
        const errorElement = document.createElement("span");
        errorElement.className = "error-message";
        errorElement.textContent = errorMessage;
        input.parentElement.appendChild(errorElement);
        return errorElement;
    }

    // Показ или скрытие ошибки
    function toggleError(errorElement, show) {
        if (show) {
            errorElement.classList.add("visible");
        } else {
            errorElement.classList.remove("visible");
        }
    }
});
