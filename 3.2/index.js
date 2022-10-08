// =====page-color======
const color = ['red', 'pink', 'green', 'blue', 'grey', 'black'];
let next = 0;
const changePageColor = () => {
  document.querySelector('.page-color').style.color = color[next++];
  if (next > color.length) {next = 0;};
};
setInterval(changePageColor, 1000);

//  ==============  Registration  ===============
const register = [];

if (JSON.parse(localStorage.getItem('register')) === null) {
  localStorage.setItem('register', JSON.stringify(register));
};
  const reg = JSON.parse(localStorage.getItem('register'));


function newRegister() {
  const name = document.querySelector('#register-fname').value;
  const email = document.querySelector('#register-email').value;
  const pass = document.querySelector('#register-psw').value;
  const passR = document.querySelector('#register-psw-repeat').value;
  
  const registerEmail = JSON.parse(localStorage.getItem('register')).map(pp => pp.email);

  if (pass !== passR) {
    return alert('Password not repeated!');
  };
  // for (let e of registerEmail) {
  //   if (e === email) {
  //     return alert('This mail is already exist in register')
  //   }
  // }
  if (registerEmail.find(e => e === email)) {
    return alert('This mail is already exist in register');
  };
    
  reg[reg.length] = {'name': name, 'email': email, 'psw': pass};
    
  console.log(reg);
  localStorage.setItem('register', JSON.stringify(reg));

};

// localStorage.clear()

//   ==========  Price change =========

const orderChangePrice = () => {
  const bike = document.querySelector('#bike-model').value;
  document.querySelector('#bike-price').innerHTML = document.querySelector('#price-' + bike).innerHTML;
  document.querySelector('#bike-price-check').innerHTML = document.querySelector('#price-' + bike).innerHTML;
};
document.querySelector('#bike-model').addEventListener('change', orderChangePrice);

//  ===============  Delivery adress in order =================

const sameAsBillingAdress = () => {
  document.querySelector('#fname-order-delivery').value = document.querySelector('#fname-order').value;
  document.querySelector('#lname-order-delivery').value = document.querySelector('#lname-order').value;
  document.querySelector('#country-order-delivery').value = document.querySelector('#country-order').value;
  document.querySelector('#adress-order-delivery').value = document.querySelector('#adress-order').value;
  document.querySelector('#phone-order-delivery').value = document.querySelector('#phone-order').value;
};
document.querySelector('#delivery-checkbox').addEventListener('change', function() {
  if (this.checked) {
    sameAsBillingAdress();
  };
});


//  ===============  Date default in order  ===========

const dateDefault = () => {
  let year = new Date().getFullYear().toString();
  let month = new Date().getMonth() + 1;
  month < 10 ? month = '0' + month.toString() : month = month.toString();
  let date = new Date().getDate().toString();
  date < 10 ? date = '0' + date.toString() : date = date.toString();
  document.querySelector('#date-order').value = year + '-' + month + '-' + date;
};
dateDefault();


// ======== Required input ======

// const requiredInput = () => {
//   this.value ? this.style.border = '5px solid green' : this.style.border = '5px solid red';
// };    // Not Working

// this.value ? this.style.borderBottom = '5px solid green' : this.style.borderBottom = '5px solid red';
// this.style.borderBottom = this.value ? '2px solid green' :  '2px solid red';

function requiredInput() {
  const idOfThis = this.id;
  if (!this.value) {
    this.style.borderBottom = '2px solid red';
    if (document.querySelector(`#add-required${idOfThis}`) === null) {
      const requiredText = document.createElement("div");
      const newContent = document.createTextNode('Required');
      requiredText.appendChild(newContent);
      requiredText.style.position = 'absolute';
      requiredText.style.bottom = '0px';
      requiredText.style.fontSize = '12px';
      requiredText.style.color = 'red';
      requiredText.style.padding = '5px 5px';
      requiredText.setAttribute('id', `add-required${idOfThis}`);
      this.parentElement.appendChild(requiredText);
    };
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};

document.querySelector('#fname-order').addEventListener("blur", requiredInput);
document.querySelector('#lname-order').addEventListener("blur", requiredInput);
document.querySelector('#adress-order').addEventListener("blur", requiredInput);
document.querySelector('#fname-order-delivery').addEventListener("blur", requiredInput);
document.querySelector('#lname-order-delivery').addEventListener("blur", requiredInput);
document.querySelector('#adress-order-delivery').addEventListener("blur", requiredInput);

function requiredInputPhone() {
  const idOfThis = this.id;
  if (!this.value || this.value.length !== 10 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    if (document.querySelector(`#add-required${idOfThis}`) === null) {
      const requiredText = document.createElement("div");
      const newContent = document.createTextNode('Enter 10 digits of phone number');
      requiredText.appendChild(newContent);
      requiredText.style.position = 'absolute';
      requiredText.style.bottom = '0px';
      requiredText.style.fontSize = '12px';
      requiredText.style.color = 'red';
      requiredText.style.padding = '5px 5px';
      requiredText.setAttribute('id', `add-required${idOfThis}`);
      this.parentElement.appendChild(requiredText);
    };
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};

document.querySelector('#phone-order').addEventListener("blur", requiredInputPhone);
document.querySelector('#phone-order-delivery').addEventListener("blur", requiredInputPhone);

// register input check
document.querySelector('#register-fname').addEventListener("blur", requiredInput);
document.querySelector('#register-email').addEventListener("blur", requiredInput);
document.querySelector('#register-psw').addEventListener("blur", requiredInput);
document.querySelector('#register-psw-repeat').addEventListener("blur", requiredInput);

// contact input check
document.querySelector('#contact-fname').addEventListener("blur", requiredInput);
document.querySelector('#contact-lname').addEventListener("blur", requiredInput);
document.querySelector('#contact-subject').addEventListener("blur", requiredInput);


// ========  Continue btn to second step   ========

const newOrderContinue = () => {
  const a = document.querySelector('#fname-order').value;
  const b = document.querySelector('#lname-order').value;
  const c = document.querySelector('#fname-order').value;
  const d = document.querySelector('#adress-order').value;
  const e = document.querySelector('#fname-order-delivery').value;
  const g = document.querySelector('#lname-order-delivery').value;
  const h = document.querySelector('#fname-order').value;
  const j = document.querySelector('#adress-order-delivery').value;
  const i = document.querySelector('#phone-order-delivery').value;
  if (a && b && c && d && e && g && h && j && i) {
    document.querySelector('#a-to-second-step').href = "#order-second-step";
    document.querySelector('#bike-model-check').innerHTML = document.querySelector('#bike-model').value;
    document.querySelector('#fname-order-check').innerHTML = document.querySelector('#fname-order').value;
    document.querySelector('#lname-order-check').innerHTML = document.querySelector('#lname-order').value;
    document.querySelector('#country-order-check').innerHTML = document.querySelector('#country-order').value;
    document.querySelector('#adress-order-check').innerHTML = document.querySelector('#adress-order').value;
    document.querySelector('#fname-order-delivery-check').innerHTML = document.querySelector('#fname-order-delivery').value;
    document.querySelector('#lname-order-delivery-check').innerHTML = document.querySelector('#lname-order-delivery').value;
    document.querySelector('#country-order-delivery-check').innerHTML = document.querySelector('#country-order-delivery').value;
    document.querySelector('#adress-order-delivery-check').innerHTML = document.querySelector('#adress-order-delivery').value;
    document.querySelector('#phone-order-delivery-check').innerHTML = document.querySelector('#phone-order-delivery').value;
    document.querySelector('#date-order-delivery-check').innerHTML = document.querySelector('#date-order').value.split('-').reverse().join('.');
  } else {
    alert("Please fill all the inputs");
    document.querySelector('#a-to-second-step').href = "#order";
  }
}


// =========    Payment card check    =========

function checkCardNumber() {
  const idOfThis = this.id;
  if (!this.value || this.value.length !== 16 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    if (document.querySelector(`#add-required${idOfThis}`) === null) {
      const requiredText = document.createElement("div");
      const newContent = document.createTextNode('Enter 16 digits of card number');
      requiredText.appendChild(newContent);
      requiredText.style.position = 'absolute';
      requiredText.style.bottom = '0px';
      requiredText.style.fontSize = '12px';
      requiredText.style.color = 'red';
      requiredText.style.padding = '5px 20px';
      requiredText.setAttribute('id', `add-required${idOfThis}`);
      this.parentElement.appendChild(requiredText);
    };
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};
function checkExpiration() {
  const idOfThis = this.id;
  if (!this.value || this.value.length !== 2 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    if (document.querySelector(`#add-required${idOfThis}`) === null) {
      const requiredText = document.createElement("div");
      const newContent = document.createTextNode('Required 2 digits');
      requiredText.appendChild(newContent);
      requiredText.style.position = 'absolute';
      requiredText.style.bottom = '0px';
      requiredText.style.fontSize = '12px';
      requiredText.style.color = 'red';
      requiredText.style.padding = '5px 5px';
      requiredText.setAttribute('id', `add-required${idOfThis}`);
      this.parentElement.appendChild(requiredText);
    };
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};
function checkCvv() {
  const idOfThis = this.id;
  if (!this.value || this.value.length !== 3 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    if (document.querySelector(`#add-required${idOfThis}`) === null) {
      const requiredText = document.createElement("div");
      const newContent = document.createTextNode('Required 3 digits');
      requiredText.appendChild(newContent);
      requiredText.style.position = 'absolute';
      requiredText.style.bottom = '-10px';
      requiredText.style.fontSize = '12px';
      requiredText.style.color = 'red';
      requiredText.style.padding = '5px 5px';
      requiredText.setAttribute('id', `add-required${idOfThis}`);
      this.parentElement.appendChild(requiredText);
    };
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};

document.querySelector('#card-number').addEventListener('blur', checkCardNumber);
document.querySelector('#expiration-dd').addEventListener('blur', checkExpiration);
document.querySelector('#expiration-mm').addEventListener('blur', checkExpiration);
document.querySelector('#card-cvv').addEventListener('blur', checkCvv);


//  ========    Order registration  ========

if (JSON.parse(localStorage.getItem('orderList')) === null) {
  localStorage.setItem('orderList', JSON.stringify(register));
};
  const orderList = JSON.parse(localStorage.getItem('orderList'));

  function padLeadingZeros(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function newOrder() {

  const visa = document.querySelector('#visa');
  const masterCard = document.querySelector('#master-card');
  const cash = document.querySelector('#cash');
  document.querySelector('#a-to-result').setAttribute('href', 'result.html');
  
  if (cash.checked) {
    // Saving the order
  const product = document.querySelector('#bike-model').value;
  const fName = document.querySelector('#fname-order').value;
  const lName = document.querySelector('#lname-order').value;
  const country = document.querySelector('#country-order').value;
  const adress = document.querySelector('#adress-order').value;
  const phone = document.querySelector('#phone-order').value;
  const fNameD = document.querySelector('#fname-order-delivery').value;
  const lNameD = document.querySelector('#lname-order-delivery').value;
  const countryD = document.querySelector('#country-order-delivery').value;
  const adressD = document.querySelector('#adress-order-delivery').value;
  const phoneD = document.querySelector('#phone-order-delivery').value;
  const dateOfDelivery = document.querySelector('#date-order').value;
  const dateOfOrder = new Date();

    
  orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': cash.value, 'dateOfOrder': dateOfOrder.toString()};
    
  console.log(orderList);
  localStorage.setItem('orderList', JSON.stringify(orderList));

  let hours = dateOfOrder.getHours();
  hours < 10 ? hours = '0' + hours.toString() : hours = hours.toString();
  let minutes = dateOfOrder.getMinutes();
  minutes < 10 ? minutes = '0' + minutes.toString() : minutes = minutes.toString();
  let seconds = dateOfOrder.getSeconds();
  seconds < 10 ? seconds = '0' + seconds.toString() : seconds = seconds.toString();
  let year = dateOfOrder.getFullYear().toString();
  let month = dateOfOrder.getMonth() + 1;
  month < 10 ? month = '0' + month.toString() : month = month.toString();
  let date = dateOfOrder.getDate().toString();
  date < 10 ? date = '0' + date.toString() : date = date.toString();

  const lastOrderResult = {orderNumber: padLeadingZeros(orderList.length + 1, 16), model: product, orderTime: hours + ':' + minutes + ':' + seconds, orderDate: date + '.' + month + '.' + year};

  localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
  };
  
  if (visa.checked) {
    if (!document.querySelector('#card-number').value || document.querySelector('#card-number').value.length !== 16 || isNaN(Number(document.querySelector('#card-number').value)) || !document.querySelector('#expiration-dd').value || document.querySelector('#expiration-dd').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-dd').value)) || !document.querySelector('#expiration-mm').value || document.querySelector('#expiration-mm').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-mm').value)) || !document.querySelector('#card-cvv').value || document.querySelector('#card-cvv').value.length !== 3 || isNaN(Number(document.querySelector('#card-cvv').value))) {
      document.querySelector('#a-to-result').setAttribute('href', '#order-payment');
      return alert('Fill card information to pay.')
    } else {
      // Saving the order
    const product = document.querySelector('#bike-model').value;
    const fName = document.querySelector('#fname-order').value;
    const lName = document.querySelector('#lname-order').value;
    const country = document.querySelector('#country-order').value;
    const adress = document.querySelector('#adress-order').value;
    const phone = document.querySelector('#phone-order').value;
    const fNameD = document.querySelector('#fname-order-delivery').value;
    const lNameD = document.querySelector('#lname-order-delivery').value;
    const countryD = document.querySelector('#country-order-delivery').value;
    const adressD = document.querySelector('#adress-order-delivery').value;
    const phoneD = document.querySelector('#phone-order-delivery').value;
    const dateOfDelivery = document.querySelector('#date-order').value;
    const dateOfOrder = new Date();
  
      
    orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': visa.value, 'dateOfOrder': dateOfOrder.toString()};
      
    console.log(orderList);
    localStorage.setItem('orderList', JSON.stringify(orderList));
  
    let hours = dateOfOrder.getHours();
    hours < 10 ? hours = '0' + hours.toString() : hours = hours.toString();
    let minutes = dateOfOrder.getMinutes();
    minutes < 10 ? minutes = '0' + minutes.toString() : minutes = minutes.toString();
    let seconds = dateOfOrder.getSeconds();
    seconds < 10 ? seconds = '0' + seconds.toString() : seconds = seconds.toString();
    let year = dateOfOrder.getFullYear().toString();
    let month = dateOfOrder.getMonth() + 1;
    month < 10 ? month = '0' + month.toString() : month = month.toString();
    let date = dateOfOrder.getDate().toString();
    date < 10 ? date = '0' + date.toString() : date = date.toString();
  
    const lastOrderResult = {orderNumber: padLeadingZeros(orderList.length + 1, 16), model: product, orderTime: hours + ':' + minutes + ':' + seconds, orderDate: date + '.' + month + '.' + year};
  
    localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
    };
  };

  if (masterCard.checked) {
    if (!document.querySelector('#card-number').value || document.querySelector('#card-number').value.length !== 16 || isNaN(Number(document.querySelector('#card-number').value)) || !document.querySelector('#expiration-dd').value || document.querySelector('#expiration-dd').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-dd').value)) || !document.querySelector('#expiration-mm').value || document.querySelector('#expiration-mm').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-mm').value)) || !document.querySelector('#card-cvv').value || document.querySelector('#card-cvv').value.length !== 3 || isNaN(Number(document.querySelector('#card-cvv').value))) {
      document.querySelector('#a-to-result').setAttribute('href', '#order-payment');
      return alert('Fill card information to pay.')
    } else {
      // Saving the order
    const product = document.querySelector('#bike-model').value;
    const fName = document.querySelector('#fname-order').value;
    const lName = document.querySelector('#lname-order').value;
    const country = document.querySelector('#country-order').value;
    const adress = document.querySelector('#adress-order').value;
    const phone = document.querySelector('#phone-order').value;
    const fNameD = document.querySelector('#fname-order-delivery').value;
    const lNameD = document.querySelector('#lname-order-delivery').value;
    const countryD = document.querySelector('#country-order-delivery').value;
    const adressD = document.querySelector('#adress-order-delivery').value;
    const phoneD = document.querySelector('#phone-order-delivery').value;
    const dateOfDelivery = document.querySelector('#date-order').value;
    const dateOfOrder = new Date();
  
      
    orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': masterCard.value, 'dateOfOrder': dateOfOrder.toString()};
      
    console.log(orderList);
    localStorage.setItem('orderList', JSON.stringify(orderList));
  
    let hours = dateOfOrder.getHours();
    hours < 10 ? hours = '0' + hours.toString() : hours = hours.toString();
    let minutes = dateOfOrder.getMinutes();
    minutes < 10 ? minutes = '0' + minutes.toString() : minutes = minutes.toString();
    let seconds = dateOfOrder.getSeconds();
    seconds < 10 ? seconds = '0' + seconds.toString() : seconds = seconds.toString();
    let year = dateOfOrder.getFullYear().toString();
    let month = dateOfOrder.getMonth() + 1;
    month < 10 ? month = '0' + month.toString() : month = month.toString();
    let date = dateOfOrder.getDate().toString();
    date < 10 ? date = '0' + date.toString() : date = date.toString();
  
    const lastOrderResult = {orderNumber: padLeadingZeros(orderList.length + 1, 16), model: product, orderTime: hours + ':' + minutes + ':' + seconds, orderDate: date + '.' + month + '.' + year};
  
    localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
    };
  };
};