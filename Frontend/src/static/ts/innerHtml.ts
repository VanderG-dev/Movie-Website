export function logBlockHTML() {
  const logBlock = document.querySelector(".log-block");
  logBlock.innerHTML = `
    <button class="js-exit-modal">🞨</button>

    <h1 class="log-text">
      <img src="../static/img/logo.png" width="32" />
      Movies
    </h1>

    <div class="log-reg">
      <div class="log-in">Вход</div>

      <div class="line"></div>

      <div class="reg-in">Регистрация</div>
    </div>
  
    <div class="js-log-reg-input">
      <input class="login-input" type="input" placeholder="Логин" />
      <input class="password-input" type="input" placeholder="Пароль" />
    </div>
    <h1 class="response-auth"></h1>
    <div class="auth-container">
      <div class="js-enter-account">Войти</div>
    </div>

  `;
}
