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
  let loginForm = `
  <form class="login-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Dirección de email"/>
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" name="password" id="password" placeholder="Constraseña"/>
    </div>
    <div class="form-group">
      <button type="submit">Iniciar sesión</button>
    </div>
    <div class="forgot-pss">
      <a href="/forgot-password">Olvidaste tu contraseña?</a>
    </div>
  </form>
  `
  authModal.innerHTML = `
  <div class="container">
    <div class="auth-header">
      <div class="action-text">
        <h2>${event.target.id === 'login-button' ? 'Inicia Sesión' : 'Registrate'}</h2>
        <p>${event.target.id === 'login-button' ? 'Necesitas una cuenta? ' : 'Tienes una cuenta? '}
          <span>${event.target.id === 'login-button' ? 'Registrate' : 'Inicia Sesión'}</span>
        </p>
      </div>
      <div>
        <span class="close-button">
          <i class="far fa-times-circle"></i>
        </span>
      </div>
    </div>
    <div class="auth-body">
      ${loginForm}
    </div>
  </div>
  `
  document.body.appendChild(authModal)
  let closeButton = document.getElementsByClassName('close-button')[0]
  closeButton.addEventListener('click', () => {
    let backDrop = document.getElementById('backdrop')
    backDrop.remove()
    authModal.remove()
  })
}
authButtons.forEach((button) => {
  button.addEventListener('click', authClickHandler)
})
