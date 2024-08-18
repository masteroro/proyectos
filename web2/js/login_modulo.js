import { validarCampo, emailRegex, passwordRegex, estadoValidacionCampos,enviarFormulario} from "./register.js";

const formLogin = document.querySelector(".form-login");
const inputPass = document.querySelector('.form-login input[type="password"]');
const inputEmail = document.querySelector('.form-login input[type="email"]');
const alertaErrorLogin = document.querySelector(".form-login .alerta-error");
const alertaExitoLogin = document.querySelector(".form-login .alerta-exito");

document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", (e) => {
      estadoValidacionCampos.userName = true;
      e.preventDefault();
      enviarFormulario(formLogin,alertaErrorLogin,alertaExitoLogin);
    });
  
    inputEmail.addEventListener("input", () => {
      validarCampo(emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
    });
  
    inputPass.addEventListener("input", () => {
      validarCampo(passwordRegex,inputPass,"La contraseña tiene que ser de 4 a 12 dígitos");
    });
});

document.querySelector('.form-login').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí deberías hacer la llamada AJAX al servidor para verificar las credenciales
  // Por simplicidad, vamos a asumir que la respuesta del servidor es exitosa.

  // Si el login es exitoso:
  alert('Iniciaste sesión correctamente');
  window.location.href = 'http://localhost/web2/index.html';
});