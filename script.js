var subscribed;
var emailVal;

// Get Form Values
function getInputValue() {
  emailVal = document.getElementById('email').value;
}

// Email Validation
var errorMsg = document.getElementById('email-validate');
function validateEmail(mail) {
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mailFormat.test(mail)){
    return true;
  } else {
    return false;
  }
}

// Modal Body
var modal = document.getElementById("myModal");

// Open Modal
var btn = document.getElementById("myBtn");
btn.onclick = function() {
  getInputValue();
  if (validateEmail(emailVal)){
    modal.style.display = "block";
    errorMsg.style.display = 'none';
  } else {
    errorMsg.style.display = 'block';
  }
}

// Close Modal
var cancel = document.getElementById("close");
cancel.onclick = function() {
  modal.style.display = "none";
  fail.style.display = "none";
  success.style.display = "none";
  subscribed = false;
  document.getElementById('email').value = "";
}

// Subscription Success
var no = document.getElementById("no");
var fail = document.getElementById("fail");
no.onclick = function() {
  fail.style.display = "none";
  modal.style.display = "none";
  subscribed = true;
  document.getElementById('email').value = "";
  success.style.display = "block";
  sendData();
}

// Subscription Failed
var yes = document.getElementById("yes");
var success = document.getElementById("success");
yes.onclick = function() {
  success.style.display = "none";
  modal.style.display = "none";
  subscribed = false;
  document.getElementById('email').value = "";
  fail.style.display = "block";
  sendData();
}

// Send Email to Database
function sendData(){
  fetch('https://mufasa-cc.herokuapp.com/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      email: emailVal,
      subscription: subscribed
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(function (response) {
    console.log(response.status)
  }).catch(function (error) {
    console.log('Something went wrong.', error);
  });
}