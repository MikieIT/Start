// =====page-color======
const color = ['red', 'pink', 'green', 'blue', 'grey', 'black'];
let next = 0;
const changePageColor = () => {
  document.querySelector('.page-color').style.color = color[next++];
  if (next > color.length) {next = 0;};
};
setInterval(changePageColor, 1000);

//  ==============  Registration  ===============
// const register = [];

if (JSON.parse(localStorage.getItem('register')) === null) {
  localStorage.setItem('register', JSON.stringify([]));
};
  
function padLeadingZeros(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
};

function newRegister() {
  const reg = JSON.parse(localStorage.getItem('register'));

  const name = document.querySelector('#register-fname').value;
  const email = document.querySelector('#register-email').value;
  const pass = document.querySelector('#register-psw').value;
  const passR = document.querySelector('#register-psw-repeat').value;
  
  const registerEmail = reg.map(pp => pp.email);

  if (pass !== passR) {
    document.querySelector('#register-href').href = '#register';
    return alert('Password not repeated!');
  };
  
  if (registerEmail.find(e => e === email)) {
    document.querySelector('#register-href').href = '#register';
    return alert('This mail is already exist in register');
  } else {
    document.querySelector('#register-href').href = '#main';
    reg[reg.length] = {'number': reg.length, 'name': name, 'lastName': '', 'email': email, 'psw': pass, 'country': '', 'adress': '', 'phone': '', 'id': padLeadingZeros(reg.length, 10), 'personalDiscount': 0};
      
    console.log(reg);
    localStorage.setItem('register', JSON.stringify(reg));
  }

};

// localStorage.clear()


//  =====   Sign in nav btn   =========
const openSignIn = () => {
  document.querySelector('#sign-in').style.display = 'block';
};

const closeSignIn = () => {
  document.querySelector('#sign-in').style.display = 'none';
};

document.querySelector('#sign-in-btn').addEventListener('click', openSignIn);

document.querySelector('#sign-in').addEventListener('click', closeSignIn);

document.querySelector('#sign-in-container').addEventListener('mouseover', () => {
  document.querySelector('#sign-in').removeEventListener('click', closeSignIn);
  document.querySelector('#sign-in').style.background = 'rgb(0, 0, 0, 0.4)';
});
document.querySelector('#sign-in-container').addEventListener('mouseout', () => {
  document.querySelector('#sign-in').addEventListener('click', closeSignIn);
  document.querySelector('#sign-in').style.background = 'rgb(0, 0, 0, 0.2)';
});

//  =====  Sign in btn   ======
const overSignInBtn = () => {
  document.querySelector('#personal-information-btns').style.display = 'block';
};
const outSignInBtn = () => {
  document.querySelector('#personal-information-btns').style.display = 'none';
};


const signInBtn = () => {
  const email = document.querySelector('#sign-in-email').value;
  const psw = document.querySelector('#sign-in-psw').value;
  const reg = JSON.parse(localStorage.getItem('register'));
  const registerEmail = reg.map(pp => pp.email);
  const orderList = JSON.parse(localStorage.getItem('orderList'));

  if (!email || !psw) {
    return alert('Please fill in email and password.');
  }
  if (registerEmail.find(e => e === email)) {
    let signInPerson = reg.find(per => per.email === email);
    if (signInPerson.email === email && signInPerson.psw === psw) {

      const yourOrders = orderList.filter(order => order.personId === signInPerson.id);
      if (yourOrders.length >= 1) {signInPerson.personalDiscount = 5;};
      if (yourOrders.length >= 5) {signInPerson.personalDiscount = 10;};
      reg[signInPerson.number] = signInPerson;
      localStorage.setItem('signInPerson', JSON.stringify(signInPerson));
      localStorage.setItem('register', JSON.stringify(reg));
      document.querySelector('#sign-in').style.display = 'none';
      document.querySelector('#sign-in-btn').innerHTML = `Hello ${signInPerson.name}`;
      document.querySelector('#sign-in-btn').style.color = 'blue';
      document.querySelector('#sign-in-btn-div').style.background = 'rgba(251, 251, 251, 0.5)';
      document.querySelector('#sign-in-btn').removeEventListener('click', openSignIn);
      document.querySelector('#sign-in-btn-div').addEventListener('mouseover', overSignInBtn);
      document.querySelector('#sign-in-btn-div').addEventListener('mouseout', outSignInBtn);
      document.querySelector('#sign-in-to-right').style.display = 'block';
      console.log(signInPerson);

    } else {
      return alert('Wrong email or password.');
    };
  } else {
    return alert('Wrong email or password.');
  };

};

//  ==== Personal information  ====
const yourInformation = () => {

  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  document.querySelector('#personal-information-fname').value = signInPerson.name;
  document.querySelector('#personal-information-lname').value = signInPerson.lastName;
  document.querySelector('#personal-information-email').value = signInPerson.email;
  document.querySelector('#personal-information-phone').value = signInPerson.phone;
  document.querySelector('#personal-information-country').value = signInPerson.country;
  document.querySelector('#personal-information-adress').value = signInPerson.adress;
};
// Save changes
const saveChanges = () => {
  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  const reg = JSON.parse(localStorage.getItem('register'));
  const registerEmail = reg.map(pp => pp.email);

  if(registerEmail.find(e => e === document.querySelector('#personal-information-email').value) && signInPerson.email !== document.querySelector('#personal-information-email').value) {
    return alert('This mail is already exist in register');
  } else {
    signInPerson.name = document.querySelector('#personal-information-fname').value;
    signInPerson.lastName = document.querySelector('#personal-information-lname').value;
    signInPerson.email = document.querySelector('#personal-information-email').value;
    signInPerson.phone = document.querySelector('#personal-information-phone').value;
    signInPerson.country = document.querySelector('#personal-information-country').value;
    signInPerson.adress = document.querySelector('#personal-information-adress').value;
    document.querySelector('#sign-in-btn').innerHTML = `Hello ${signInPerson.name}`;
  
    reg[signInPerson.number] = signInPerson;
    localStorage.setItem('register', JSON.stringify(reg));
    localStorage.setItem('signInPerson', JSON.stringify(signInPerson));
    alert('Your data saved!');
  };
};

// ====  your orders ====
const yourOrdersInformation = () => {
  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  const orderList = JSON.parse(localStorage.getItem('orderList'));
  const yourOrders = [];
  for (order of orderList) {
    if (signInPerson.id === order.personId) {
      yourOrders[yourOrders.length] = order;
    }
  };
  const yourOrdersRev = yourOrders.reverse();
  const idOfThis = document.querySelector('#your-orders-information').id;

  
      if (yourOrders.length >= 1) {signInPerson.personalDiscount = 5;};
      if (yourOrders.length >= 5) {signInPerson.personalDiscount = 10;};
      localStorage.setItem('signInPerson', JSON.stringify(signInPerson));

  if (document.querySelector(`#add-required${idOfThis}`) !== null) {
    document.querySelector(`#add-required${idOfThis}`).remove();
  };
  const requiredText = document.createElement("div");
  requiredText.setAttribute('id', `add-required${idOfThis}`);
  const discount = document.createElement("p");
    const disciuntContent = document.createTextNode(`Your discount for next order: ${signInPerson.personalDiscount}%`);
    discount.appendChild(disciuntContent);
    discount.style.fontSize = '18px';
    // discount.style.color = 'blue';
    discount.style.padding = '15px 15px';
    requiredText.appendChild(discount);
  for (order of yourOrdersRev) {
    const orderText = document.createElement("p");
    const newContent = document.createTextNode(`Order number: ${order.orderNumberId} | Product: ${order.product} | Price: ${order.price} | Date: ${order.orderDate} | Time: ${order.orderTime} | Payment: ${order.payment}`);
    orderText.appendChild(newContent);
    orderText.style.fontSize = '15px';
    orderText.style.color = 'blue';
    orderText.style.padding = '15px 15px';
    requiredText.appendChild(orderText);
    
  };
  document.querySelector('#your-orders-information').appendChild(requiredText);

  
  console.log(yourOrders.reverse());
};

// ===  Sign out  ===
const signOut = () => {
  localStorage.setItem('signInPerson', JSON.stringify(null));
      document.querySelector('#sign-in-btn').innerHTML = `Sign in`;
      document.querySelector('#sign-in-btn').style.color = 'red';
      document.querySelector('#sign-in-btn-div').style.background = 'none';
      document.querySelector('#sign-in-btn').addEventListener('click', openSignIn);
      document.querySelector('#sign-in-btn-div').removeEventListener('mouseover', overSignInBtn);
      document.querySelector('#sign-in-btn-div').removeEventListener('mouseout', outSignInBtn);
      document.querySelector('#sign-in-to-right').style.display = 'none';
};

//  === Auto sign in ====
if (JSON.parse(localStorage.getItem('signInPerson')) !== null) {
  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  document.querySelector('#sign-in-btn').innerHTML = `Hello ${signInPerson.name}`;
  document.querySelector('#sign-in-btn').style.color = 'blue';
  document.querySelector('#sign-in-btn-div').style.background = 'rgba(251, 251, 251, 0.5)';
  document.querySelector('#sign-in-btn').removeEventListener('click', openSignIn);
  document.querySelector('#sign-in-btn-div').addEventListener('mouseover', overSignInBtn);
  document.querySelector('#sign-in-btn-div').addEventListener('mouseout', outSignInBtn);
  document.querySelector('#sign-in-to-right').style.display = 'block';
};

//  ====  onclick display none for menu ===
document.querySelector('#home-btn-div').addEventListener('mouseover', () => {
  document.querySelector('#products-btn').style.display = 'block';
});
document.querySelector('#home-btn-div').addEventListener('mouseout', () => {
  document.querySelector('#products-btn').style.display = 'none';
});
function displayNone() {
  this.style.display = 'none';
};
document.querySelector('#personal-information-btns').addEventListener('click', displayNone);
document.querySelector('#products-btn').addEventListener('click', displayNone);

document.querySelector('#home-btn-div').addEventListener('mouseover', () => {
  document.querySelector('#products-btn').style.display = 'block';
});
document.querySelector('#home-btn-div').addEventListener('mouseout', () => {
  document.querySelector('#products-btn').style.display = 'none';
});


//  ===== Order autofill  ======
const ordreAutoFill = () => {
  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  document.querySelector('#fname-order').value = signInPerson.name;
  document.querySelector('#lname-order').value = signInPerson.lastName;
  document.querySelector('#phone-order').value = signInPerson.phone;
  // document.querySelector('#country-order').value = signInPerson.country;
  document.querySelector('#adress-order').value = signInPerson.adress;
};
document.querySelector('#order-btn-aside').addEventListener('click', ordreAutoFill);

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



// ======== Required input ======

// const requiredInput = () => {
//   this.value ? this.style.border = '5px solid green' : this.style.border = '5px solid red';
// };    // Not Working

// this.value ? this.style.borderBottom = '5px solid green' : this.style.borderBottom = '5px solid red';
// this.style.borderBottom = this.value ? '2px solid green' :  '2px solid red';

function requiredInput() {
  const idOfThis = this.id;
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
  if (!this.value) {
    this.style.borderBottom = '2px solid red';
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
  if (!this.value || this.value.length !== 10 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
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

//  sign in input check
document.querySelector('#sign-in-email').addEventListener("blur", requiredInput);
document.querySelector('#sign-in-psw').addEventListener("blur", requiredInput);


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
  const phone = document.querySelector('#phone-order-delivery').value;
  if (a && b && c && d && e && g && h && j && phone && phone.length === 10 && !isNaN(Number(phone))) {
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
    alert("Please fill all the inputs corect");
    document.querySelector('#a-to-second-step').href = "#order";
  }
}


// =========    Payment card check    =========

function checkCardNumber() {
  const idOfThis = this.id;
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
  if (!this.value || this.value.length !== 16 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};
function checkExpiration() {
  const idOfThis = this.id;
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
  if (!this.value || this.value.length !== 2 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'visible';
  } else {
    this.style.borderBottom = '2px solid green';
    document.querySelector(`#add-required${idOfThis}`).style.visibility = 'hidden';
  };
};
function checkCvv() {
  const idOfThis = this.id;
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
  if (!this.value || this.value.length !== 3 || isNaN(Number(this.value))) {
    this.style.borderBottom = '2px solid red';
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
  localStorage.setItem('orderList', JSON.stringify([]));
};
  



function newOrder() {

  const orderList = JSON.parse(localStorage.getItem('orderList'));
  const signInPerson = JSON.parse(localStorage.getItem('signInPerson'));
  const visa = document.querySelector('#visa');
  const masterCard = document.querySelector('#master-card');
  const cash = document.querySelector('#cash');
  document.querySelector('#a-to-result').setAttribute('href', 'result.html');
  const product = document.querySelector('#bike-model').value;
  const price = document.querySelector('#bike-price').innerHTML;
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
  
  if (cash.checked) {
    // Saving the order
    
  orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'price': price, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': cash.value, 'dateOfOrder': dateOfOrder.toString(), 'personId': signInPerson.id, 'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};
    
  console.log(orderList);
  localStorage.setItem('orderList', JSON.stringify(orderList));

  const lastOrderResult = {'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'model': product, 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};

  localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
  };
  
  if (visa.checked) {
    if (!document.querySelector('#card-number').value || document.querySelector('#card-number').value.length !== 16 || isNaN(Number(document.querySelector('#card-number').value)) || !document.querySelector('#expiration-dd').value || document.querySelector('#expiration-dd').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-dd').value)) || !document.querySelector('#expiration-mm').value || document.querySelector('#expiration-mm').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-mm').value)) || !document.querySelector('#card-cvv').value || document.querySelector('#card-cvv').value.length !== 3 || isNaN(Number(document.querySelector('#card-cvv').value))) {
      document.querySelector('#a-to-result').setAttribute('href', '#order-payment');
      return alert('Fill card information to pay.')
    } else {
      // Saving the order
    
    orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'price': price, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': visa.value, 'dateOfOrder': dateOfOrder.toString(), 'personId': signInPerson.id, 'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};
      
    console.log(orderList);
    localStorage.setItem('orderList', JSON.stringify(orderList));
  
    const lastOrderResult = {'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'model': product, 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};
  
    localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
    };
  };

  if (masterCard.checked) {
    if (!document.querySelector('#card-number').value || document.querySelector('#card-number').value.length !== 16 || isNaN(Number(document.querySelector('#card-number').value)) || !document.querySelector('#expiration-dd').value || document.querySelector('#expiration-dd').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-dd').value)) || !document.querySelector('#expiration-mm').value || document.querySelector('#expiration-mm').value.length !== 2 || isNaN(Number(document.querySelector('#expiration-mm').value)) || !document.querySelector('#card-cvv').value || document.querySelector('#card-cvv').value.length !== 3 || isNaN(Number(document.querySelector('#card-cvv').value))) {
      document.querySelector('#a-to-result').setAttribute('href', '#order-payment');
      return alert('Fill card information to pay.')
    } else {
      // Saving the order
      
    orderList[orderList.length] = {'orderNumber': orderList.length + 1, 'product': product, 'price': price, 'firstName': fName, 'lastName': lName, 'country': country, 'adress': adress, 'phone': phone, 'firstNameDelivery': fNameD, 'lastNameDelivery': lNameD, 'countryDelivery': countryD, 'adressDelivery': adressD, 'phoneDelivery': phoneD, 'dateOfDelivery': dateOfDelivery, 'payment': masterCard.value, 'dateOfOrder': dateOfOrder.toString(), 'personId': signInPerson.id, 'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};
      
    console.log(orderList);
    localStorage.setItem('orderList', JSON.stringify(orderList));
  
    const lastOrderResult = {'orderNumberId': padLeadingZeros(orderList.length + 1, 16), 'model': product, 'orderTime': hours + ':' + minutes + ':' + seconds, 'orderDate': date + '.' + month + '.' + year};
  
    localStorage.setItem('lastOrderResult', JSON.stringify(lastOrderResult));
    };
  };
};