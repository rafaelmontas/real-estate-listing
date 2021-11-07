console.log('script loaded')
console.log(document.body)

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});

// Burger menu button
let burgerMenu = document.getElementById('burger-menu')
function showBackDrop() {
  console.log('backdrop active')
  // Create backdrop
  let backDrop = document.createElement('div')
  backDrop.id = 'backdrop'
  // Handle backdrop click
  backDrop.addEventListener('click', () => {
    console.log('backdrop and side drawer removed')
    backDrop.remove()
    let sideDrawer = document.getElementById('side-drawer')
    sideDrawer.classList.remove('open')
    if (document.getElementById('user-auth-modal')) {
      document.getElementById('user-auth-modal').remove()
    }
  })
  // Insert backdrop after header
  let header = document.getElementById('header')
  header.insertAdjacentElement('afterend', backDrop)
}
function showSideMenu() {
  console.log('side menu active')
  let sideDrawer = document.getElementById('side-drawer')
  sideDrawer.classList.toggle('open')
}
function burgerMenuClickHandler() {
  console.log('menu clicked')
  showBackDrop()
  showSideMenu()
}
burgerMenu.addEventListener('click', burgerMenuClickHandler)


// Handle login/signup buttons
// let authButton = document.getElementById('login-button')
let authButtons = document.querySelectorAll('.auth')
console.log(authButtons)
function authClickHandler(event) {
  console.log(event.target.id)
  showBackDrop()
  // Show Modal
  // let authModal = document.getElementById('user-auth-modal')
  // authModal.classList.add('show')
  // Create modal
  let authModal = document.createElement('div')
  authModal.id = 'user-auth-modal'
  let authContainer = document.createElement('div')
  authContainer.className = 'container'
  let authHeader = document.createElement('div')
  authHeader.className = 'auth-header'
  let authActionText = document.createElement('div')
  authActionText.className = 'action-text'
  let loginText = document.createElement('h2')
  loginText.innerText = 'Inicia Sesíon'
  let loginSubText = document.createElement('p')
  loginSubText.textContent = 'Necesitas una cuenta? '
  let signupText = document.createElement('h2')
  signupText.innerText = 'Registrate'
  let signupSubText = document.createElement('p')
  signupSubText.textContent = 'Tienes una cuenta? '
  // Close button
  let closeArea = document.createElement('div')
  let closeSpan = document.createElement('span')
  closeSpan.className = 'close-button'
  closeSpan.addEventListener('click', () => {
    let backDrop = document.getElementById('backdrop')
    backDrop.remove()
    authModal.remove()
  })
  let closeButton = document.createElement('i')
  closeButton.className = 'far fa-times-circle'
  closeArea.appendChild(closeSpan)
  closeSpan.appendChild(closeButton)
  
  let switchToSignup = document.createElement('span')
  switchToSignup.className = 'auth-switch'
  switchToSignup.id = 'switch-to-signup'
  switchToSignup.textContent = 'Registrate'
  switchToSignup.addEventListener('click', () => {
    loginText.remove()
    loginSubText.remove()
    authActionText.append(signupText, signupSubText)
    signupSubText.appendChild(switchToLogin)
  })
  let switchToLogin = document.createElement('span')
  switchToLogin.className = 'auth-switch'
  switchToLogin.id = 'switch-to-login'
  switchToLogin.textContent = 'Inicia Sesión'
  switchToLogin.addEventListener('click', () => {
    signupText.remove()
    signupSubText.remove()
    authActionText.append(loginText, loginSubText)
    loginSubText.appendChild(switchToSignup)
  })
  
  authModal.appendChild(authContainer)
  authContainer.appendChild(authHeader)
  authHeader.append(authActionText, closeArea)
  if (event.target.id === 'login-button') {
    authActionText.append(loginText, loginSubText)
    loginSubText.appendChild(switchToSignup)
  } else {
    authActionText.append(signupText, signupSubText)
    signupSubText.appendChild(switchToLogin)
  }
  

  // let loginForm = `
  // <form class="login-form">
  //   <div class="form-group">
  //     <label for="email">Email</label>
  //     <input type="email" name="email" id="email" placeholder="Dirección de email"/>
  //   </div>
  //   <div class="form-group">
  //     <label for="password">Contraseña</label>
  //     <input type="password" name="password" id="password" placeholder="Constraseña"/>
  //   </div>
  //   <div class="form-group">
  //     <button type="submit">Iniciar sesión</button>
  //   </div>
  //   <div class="forgot-pss">
  //     <a href="/forgot-password">Olvidaste tu contraseña?</a>
  //   </div>
  // </form>
  // `
  // authModal.innerHTML = `
  // <div class="container">
  //   <div class="auth-header">
  //     <div class="action-text">
  //       ${event.target.id === 'login-button' ? loginHeader : signupHeader}
  //     </div>
  //     <div>
  //       <span class="close-button">
  //         <i class="far fa-times-circle"></i>
  //       </span>
  //     </div>
  //   </div>
  //   <div class="auth-body">
  //     ${loginForm}
  //   </div>
  // </div>
  // `
  document.body.appendChild(authModal)
  // let closeButton = document.getElementsByClassName('close-button')[0]
  // closeButton.addEventListener('click', () => {
  //   let backDrop = document.getElementById('backdrop')
  //   backDrop.remove()
  //   authModal.remove()
  // })
  // Handle Auth Switch
  // let switchButtons = document.querySelectorAll('.auth-switch')
  // let authHeader = document.getElementsByClassName('action-text')
  // // console.log(switchButtons)
  // switchButtons[0].addEventListener('click', (event) => {
  //   console.log('clicked', event.target.id)
  //   if (event.target.id === 'switch-to-signup') {
  //     authHeader[0].innerHTML = signupHeader
  //     switchButtons = document.querySelectorAll('.auth-switch')
  //     // console.log(switchButtons)
  //     // switchButtons[0].addEventListener('click', () => {
  //     //   authHeader[0].innerHTML = loginHeader
  //     // })
  //   } else {
  //     authHeader[0].innerHTML = loginHeader
  //     switchButtons = document.querySelectorAll('.auth-switch')
  //     // switchButtons[0].addEventListener('click', () => {
  //     //   authHeader[0].innerHTML = signupHeader
  //     // })
  //   }
  // })
}
authButtons.forEach((button) => {
  button.addEventListener('click', authClickHandler)
})
