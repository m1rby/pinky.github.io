document.addEventListener("DOMContentLoaded", () => {
    const supportForm = document.getElementById("supportForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Валидация имени
    nameInput.addEventListener("input", () => {
        toggleError(nameError, nameInput.value.trim().length < 2);
    });

    // Валидация email
    emailInput.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        toggleError(emailError, !emailRegex.test(emailInput.value));
    });

    // Валидация сообщения
    messageInput.addEventListener("input", () => {
        toggleError(messageError, messageInput.value.trim().length < 10);
    });

    // Обработчик отправки формы
    supportForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение отправки формы

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const isNameValid = name.length >= 2;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isMessageValid = message.length >= 10;

        if (isNameValid && isEmailValid && isMessageValid) {
            alert(`Ваше сообщение отправлено!
- Имя: ${name}
- Email: ${email}
- Сообщение: ${message}`);
            supportForm.reset(); // Сброс формы после успешной отправки
        } else {
            alert("Пожалуйста, исправьте ошибки в форме перед отправкой.");
        }
    });

    // Функция показа/скрытия ошибок
    function toggleError(errorElement, show) {
        if (show) {
            errorElement.classList.add("visible");
        } else {
            errorElement.classList.remove("visible");
        }
    }
});
