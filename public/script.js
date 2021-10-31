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
    // if (document.getElementById('auth-modal')) {
    //   document.getElementById('auth-modal').remove()
    // }
    if (document.getElementById('user-auth-modal')) {
      let authModal = document.getElementById('user-auth-modal')
      authModal.classList.remove('show')
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
let authButton = document.getElementById('login-button')
let authButtons = document.querySelectorAll('.auth')
console.log(authButton, authButtons)
function authClickHandler(event) {
  console.log(event.target.id)
  showBackDrop()
  // Show Modal
  let authModal = document.getElementById('user-auth-modal')
  authModal.classList.add('show')
  // Create modal
  // let authModal = document.createElement('div')
  // authModal.id = 'auth-modal'
  // document.body.appendChild(authModal)
}
authButtons.forEach((button) => {
  button.addEventListener('click', authClickHandler)
})
