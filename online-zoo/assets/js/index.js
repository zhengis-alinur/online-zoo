let searchInput = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-button");
let header = document.querySelector(".header");

searchButton.addEventListener("click", (e) => {
  searchInput.style = "transform: translateX(-250px);";
  console.log("sdfs");
});
header.addEventListener("mouseleave", (e) => {
  searchInput.style = "transform: translateX(0);";
  console.log("leave");
});

let toggle = document.querySelector("#toggle");
let menu = document.querySelector(".menu");
toggle.addEventListener("click", (e) => {
  const menuDisplay = getComputedStyle(menu).display;
  menuDisplay === "none" ? menu.style.display = "block" : menu.style.display = "none";
});

const btnMenu = document.querySelector('.i-menu');
const burberMenu = document.querySelector('.burber');

function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
};

const coverElem = document.getElementById('cover');
const formElem = document.getElementById('form-feedback');
const signUp = document.getElementById('signup');
const logIn = document.getElementById('login');
const userButton = document.getElementById('user-button');
const sendButton = document.getElementById('send');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const agreementField = document.getElementById('agreement');
const sendUserButton = document.getElementById('send-user');
const passwordUserField = document.getElementById('password-user');
const emailUserField = document.getElementById('email-user');
const userError = document.getElementById('user-error');
const accountButton = document.getElementById('account');
const logoutButton = document.getElementById('logout');
const authorizeButtons = document.querySelectorAll('.authorize');
const validate = () => {
  if (
    nameField.validity.valid &&
    emailField.validity.valid &&
    passwordField.validity.valid &&
    agreementField.validity.valid
  ) {
    sendButton.classList.remove('invalid');
  } else {
    sendButton.classList.add('invalid');
  }
}
const validateUser = () => {
  if (
    emailUserField.validity.valid && passwordUserField.validity.valid
  ) {
    sendUserButton.classList.remove('invalid');
  } else {
    sendUserButton.classList.add('invalid');
  }
  userError.classList.add('hidden');
}                                                                

function openModal(){
  document.body.classList.add('notScrollable');
  coverElem.classList.remove('hidden');
  formElem.classList.remove('hidden');
}

function hideModal(){
  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  formElem.classList.add('hidden');
  accountButton.parentNode.classList.remove('hidden');
  signUp.parentNode.classList.add('hidden');
  logIn.parentNode.classList.add('hidden');
}

userButton.addEventListener('click', () => {
  openModal();
  document.getElementById('signUpTab').click();
});

signUp.addEventListener('click', () => {
  openModal();
  document.getElementById('signUpTab').click();
});

logIn.addEventListener('click', () => {
  openModal();
  document.getElementById('logInTab').click();
});

coverElem.addEventListener('click', () => {
  document.body.classList.remove('notScrollable');
  coverElem.classList.add('hidden');
  formElem.classList.add('hidden');
});

sendButton.addEventListener('click', () => {
  if (sendButton.classList.contains('invalid')) return;
  hideModal();
  accountButton.title=nameField.value;
});

sendUserButton.addEventListener('click', () => {
  if (sendUserButton.classList.contains('invalid')) return;
  const password = "useruser";
  const email = "user@gmail.com";
  if(passwordUserField.value==password &&   emailUserField.value==email){
    userError.classList.add('hidden');
    hideModal();
    accountButton.title=email;
  }
  else{
    console.log("Wrong user data!");
    userError.classList.remove('hidden');
  }
  
});

nameField.addEventListener('input', () => {
  validate();
});

emailField.addEventListener('input', () => {
  validate();
});

passwordField.addEventListener('input', () => {
  validate();
});

agreementField.addEventListener('input', () => {
  validate();
});

passwordUserField.addEventListener('input', () => {
  validateUser();
});

emailUserField.addEventListener('input', () => {
  validateUser();
});


// logoutButton.addEventListener('click', () => {
//   signUp.parentNode.classList.remove('hidden');
//   logIn.parentNode.classList.remove('hidden');
//   accountButton.parentNode.classList.add('hidden');
//   document.getElementById('out').classList.add('hidden');
//   accountButton.title="";
//   nameField.value="";
//   emailField.value="";
//   passwordField.value="";
//   agreementField.checked = false;
//   passwordUserField.value="";
//   emailUserField.value="";
//   sendUserButton.classList.add('invalid');
//   sendButton.classList.add('invalid');
// })

authorizeButtons.forEach((elem) => {

  elem.addEventListener('click', (e) => {
    hideModal();
    accountButton.title="Log in with "+e.target.dataset.user;
    // console.log(e.target.dataset.user);
  })
});