const register = []
// register[register.length] = {name: "Dan", email: 'sss'}
// console.log(JSON.parse(localStorage.getItem('register')))
// localStorage.setItem('register', JSON.stringify(reg))


// const registerOld = JSON.parse(localStorage.getItem('register'))
// console.log(registerOld)

if (JSON.parse(localStorage.getItem('register')) === null) {
  localStorage.setItem('register', JSON.stringify(register))
} 
  const reg = JSON.parse(localStorage.getItem('register'))


function newRegister() {
  const name = document.querySelector('#firstName').value
  const email = document.querySelector('#email').value
  const pass = document.querySelector('#psw').value
  const passR = document.querySelector('#psw-repeat').value
  
  const registerEmail = JSON.parse(localStorage.getItem('register'))
                            .map(pp => pp.email)

  if (pass !== passR) {
    return alert('Password not repeated!')
  }

  // for (let e of registerEmail) {
  //   if (e === email) {
  //     return alert('This mail is already exist in register')
  //   }
  // }
  if (registerEmail.find(e => e === email)) {
    return alert('This mail is already exist in register')
  }
    
  reg[reg.length] = {'name': name, 'email': email, 'psw': pass}
    
  console.log(reg)
  localStorage.setItem('register', JSON.stringify(reg))

} 

// localStorage.clear()