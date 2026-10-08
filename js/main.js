// Модальное окно, подстановка выбранного товара и базовая обработка форм
var successMessage = document.getElementById('success-message');
var timer;

function showSuccess() {
  successMessage.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(function () { successMessage.hidden = true; }, 4000);
}

// Открытие: кнопки «Заказать» передают название товара в скрытое поле и в тему
document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var dialog = document.getElementById(btn.dataset.modalOpen);
    if (!dialog) return;
    var product = btn.dataset.product;
    if (product) {
      dialog.querySelector('input[name="selected-product"]').value = product;
      var topic = dialog.querySelector('select[name="topic"]');
      topic.value = product;
    }
    dialog.showModal();
  });
});

// Закрытие: крестик, «Отмена», клик по затемнению
document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
  btn.addEventListener('click', function () { btn.closest('dialog').close(); });
});
document.querySelectorAll('dialog').forEach(function (dialog) {
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
});

// Отправка всех форм: проверка, сообщение, очистка, закрытие модалки
document.querySelectorAll('form.form').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.reset();
    var dialog = form.closest('dialog');
    if (dialog) dialog.close();
    showSuccess();
  });
});
