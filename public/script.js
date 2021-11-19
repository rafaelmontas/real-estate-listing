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
function authClickHandler(event) {
  event.preventDefault()
  event.stopPropagation()
  console.log(event.target.id)
  if (!document.getElementById('backdrop')) {
    showBackDrop() 
  }
  if (document.getElementById('side-drawer')) {
    document.getElementById('side-drawer').classList.remove('open')
  }
  // Show Modal
  // let authModal = document.getElementById('user-auth-modal')
  // authModal.classList.add('show')
  // Create modal
  let authModal = document.createElement('div')
  authModal.id = 'user-auth-modal'
  let authContainer = document.createElement('div')
  authContainer.className = 'container'
  // let userTypeSwitch = document.createElement('div')
  // userTypeSwitch.className = 'user-type-switch'
  let authHeader = document.createElement('div')
  authHeader.className = 'auth-header'
  let authActionText = document.createElement('div')
  authActionText.className = 'action-text'
  let loginText = document.createElement('h2')
  loginText.innerText = 'Inicia Sesión'
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
  // Switch to signup/login
  let switchToSignup = document.createElement('span')
  switchToSignup.className = 'auth-switch'
  switchToSignup.id = 'switch-to-signup'
  switchToSignup.textContent = 'Registrate'
  switchToSignup.addEventListener('click', () => {
    loginText.remove()
    loginSubText.remove()
    authActionText.append(signupText, signupSubText)
    signupSubText.appendChild(switchToLogin)
    if (document.getElementById('error-msg-text')) {
      loginContainer.removeChild(document.getElementsByClassName('error-msg')[0])
    }
    authContainer.removeChild(document.querySelector('.login-container'))
    authContainer.appendChild(signupContainer)
    signupContainer.appendChild(signupForm)
    signupForm.innerHTML = signupFormData
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
    if (document.getElementById('error-msg-text')) {
      signupContainer.removeChild(document.getElementsByClassName('error-msg')[0])
    }
    authContainer.removeChild(document.querySelector('.signup-container'))
    authContainer.appendChild(loginContainer)
    loginContainer.appendChild(loginForm)
    loginForm.innerHTML = loginFormData
  })
  
  let loginContainer = document.createElement('div')
  loginContainer.className = 'form-container login-container'
  let loginForm = document.createElement('form')
  loginForm.className = 'login-form'
  loginForm.id = 'login-form'
  loginForm.addEventListener('submit', handleLogin)

  let loginFormData = `
  <div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Dirección de email"/>
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" name="password" id="password" placeholder="Constraseña"/>
    </div>
    <div class="form-group">
      <button type="submit" id="login-button">Iniciar sesión</button>
    </div>
    <div class="forgot-pss">
      <a href="/forgot-password">Olvidaste tu contraseña?</a>
    </div>
  </div>
  `

  let signupContainer = document.createElement('div')
  signupContainer.className = 'form-container signup-container'
  let signupForm = document.createElement('form')
  signupForm.className = 'register-form'
  signupForm.id = 'register-form'
  signupForm.addEventListener('submit', handleSignup)

  let signupFormData = `
<div>
  <div class="form-group">
    <label for="name">Nombre</label>
    <input type="text" name="name" id="name" placeholder="Nombre"/>
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="Dirección de email"/>
  </div>
  <div class="form-group">
    <label for="password">Contraseña</label>
    <input type="password" name="password" id="password" placeholder="Constraseña"/>
  </div>
  <div class="form-group">
    <button type="submit" id="signup-button">Registrarse</button>
  </div>
</div>
`

  authModal.appendChild(authContainer)
  authContainer.append(authHeader)
  authHeader.append(authActionText, closeArea)
  if (event.target.id === 'login-button' || event.target.id === 'login-button-mobil') {
    authContainer.appendChild(loginContainer)
    loginContainer.appendChild(loginForm)
    loginForm.innerHTML = loginFormData
    // authContainer.insertAdjacentHTML('beforeend', loginForm)
    // let loginFormSubmit = document.getElementsByClassName('login-form')
    // console.log(loginFormSubmit)
    // loginFormSubmit.addEventListener('submit', (e) => {
    //   e.preventDefault()
    //   console.log('body')
    // })
    authActionText.append(loginText, loginSubText)
    loginSubText.appendChild(switchToSignup)
  } else {
    // authContainer.insertAdjacentHTML('beforeend', signupForm)
    authContainer.appendChild(signupContainer)
    signupContainer.appendChild(signupForm)
    signupForm.innerHTML = signupFormData
    authActionText.append(signupText, signupSubText)
    signupSubText.appendChild(switchToLogin)
  }

  document.body.appendChild(authModal)
}
let authButtons = document.querySelectorAll('.auth')
authButtons.forEach((button) => {
  button.addEventListener('click', authClickHandler)
})

// Handle Login
function handleLogin(event) {
  event.preventDefault()
  const body = {email: document.getElementById('email').value, password: document.getElementById('password').value}
  console.log('body', body)
  fetch('http://localhost:5000/user-auth', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    if (data.msg) {
      authError(data.msg)
      console.log(data.msg)
    } else {
      console.log(data, 'data')
      localStorage.setItem('user-jwt', data.token)
      if (data.user.name) {
        authReplace(data.user.name) 
      } else {
        authReplace(data.user.email)
      }
    }
  })
  .catch(err => {
    console.log(err)
  })
}

// Handle Signup
function handleSignup(event) {
  event.preventDefault()
    const body = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    console.log('body', body)
    fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    if (data.msg) {
      authError(data.msg)
      console.log(data.msg)
    } else {
      console.log(data)
      localStorage.setItem('user-jwt', data.token)
      if (data.user.name) {
        authReplace(data.user.name) 
      } else {
        authReplace(data.user.email)
      }
    }
  })
  .catch(err => console.log(err))
}

// function getUser() {
//   console.log('getUser called!!!')
//   console.log(`${localStorage.getItem('user-jwt')}`)
//   const userJwt = localStorage.getItem('user-jwt')
//   fetch('http://localhost:5000/user-auth/user', {headers: {'user-auth': userJwt}})
//   .then(res => {
//     if (res.ok) {
//       return res.json()
//     } else {
//       throw new Error('Something went wrong getting user');
//     }
//   })
//   .then(data => {
//     console.log(data, 'user')
//   })
// }

function authError(errorMsg) {
  let errorDiv = ''
  let errorExist = document.getElementById('error-msg-text')
  if (errorExist) {
    console.log(errorExist)
    errorExist.innerText = `${errorMsg}`
  } else {
    errorDiv = `
    <div class="error-msg">
      <i class="fas fa-exclamation-circle"></i>
      <span id="error-msg-text">${errorMsg}</span>
    </div>
    ` 
  }
  let formCont = document.getElementsByClassName('form-container')
  formCont[0].insertAdjacentHTML('afterbegin', errorDiv)
}

function authReplace(name) {
  // Desktop
  let userDataButton = `
  <div class="hover-class" id="info-button-hover">
    <div class="user-info-button">
      <i class="fas fa-user-circle"></i>
      <div class="name-email">
        ${name}
      </div>
    </div>
    <div class="user-dropdown">
      <a href="/my-hauzzy/profile">
        <i class="fas fa-user-circle"></i>
        <span>Perfil</span>
      </a>
      <a href="/my-hauzzy/favorites">
        <i class="far fa-heart"></i>
        <span>Favoritos</span>
      </a>
      <a href="/logout" id="logout-button">
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar sesión</span>
      </a>
    </div>
  </div>
  `
  let authButtonsCont = document.getElementById('user-login-cont')
  authButtonsCont.innerHTML = userDataButton
  let logoutButton = document.getElementById('logout-button')
  logoutButton.addEventListener('click', handleLogout)
  // Mobil
  let mobilDataButtons = `
  <a href="/my-hauzzy/profile">
    <i class="fas fa-user-circle"></i>${name}
  </a>
  <a href="/logout" id="mobil-logout-button">
    <i class="fas fa-sign-out-alt"></i>Cerrar sesión
  </a>
  `
  let authMobilButtonsCont = document.getElementById('auth-bottom-div')
  authMobilButtonsCont.innerHTML = mobilDataButtons
  let mobilLogoutButton = document.getElementById('mobil-logout-button')
  mobilLogoutButton.addEventListener('click', handleLogout)

  let backDrop = document.getElementById('backdrop')
  let authModal = document.getElementById('user-auth-modal')
    backDrop.remove()
    authModal.remove()
}

// Add logout event handler
if (document.getElementById('logout-button') || document.getElementById('mobil-logout-button')) {
  document.getElementById('logout-button').addEventListener('click', handleLogout)
  document.getElementById('mobil-logout-button').addEventListener('click', handleLogout)
}

function handleLogout(e) {
  e.preventDefault()
  console.log('logout clicked')
  document.cookie = 'userJwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  localStorage.removeItem('user-jwt');
  console.log(document.cookie)
  logoutReplace()
}
function logoutReplace(e) {
  let desktopAuthButton = `
  <div class="user-login-button" id="user-login-cont">
    <span class="menu-item button secondary auth" id="login-button">Iniciar Sesión</span>
    <span class="menu-item button primary auth" id="signup-button">Registrarse</span>
  </div>
  `
  let authButtonsCont = document.getElementById('user-login-cont')
  authButtonsCont.innerHTML = desktopAuthButton
  // Mobil
  let mobilAuthButtons = `
  <a href="/login" class="auth" id="login-button-mobil">
    <i class="far fa-arrow-alt-circle-right"></i>Iniciar sesión
  </a>
  <a href="/signup" class="auth" id="signup-button-mobil">
    <i class="fas fa-user-plus"></i>Registrarse
  </a>
  `
  let authMobilButtonsCont = document.getElementById('auth-bottom-div')
  authMobilButtonsCont.innerHTML = mobilAuthButtons

  // Add event listeners to auth buttons
  let authButtons = document.querySelectorAll('.auth')
  authButtons.forEach((button) => {
    button.addEventListener('click', authClickHandler)
  })
}