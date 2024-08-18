const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide")
})


btnSignUp.addEventListener("click", e => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide")
})
//inicio cesión
document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('sign-in');
    const signUpButton = document.getElementById('sign-up');

    const registerForm = document.querySelector('.container-form.register');
    const loginForm = document.querySelector('.container-form.login');

    signInButton.addEventListener('click', () => {
        registerForm.classList.add('hide');
        loginForm.classList.remove('hide');
    });

    signUpButton.addEventListener('click', () => {
        registerForm.classList.remove('hide');
        loginForm.classList.add('hide');
    });
});