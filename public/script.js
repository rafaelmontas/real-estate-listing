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
    sideDrawer.classList.toggle('open')
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
