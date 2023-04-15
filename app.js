let btn = document.querySelector('.btn');
let firstName = document.querySelector('#name');
let email = document.querySelector('#email');
let list = document.querySelector('.items');


btn.addEventListener("click", addTask);

function addTask(e) {
    e.preventDefault();
    if (firstName.value === '' && email.value === '') {
        alert('Enter name and email');
    } else {
        const li = document.createElement('li');
        li.className = 'item';
        li.appendChild(document.createTextNode(`${firstName.value} ${email.value}`));
        list.appendChild(li);
        storeTaskInLocalStorage(firstName.value, email.value);
        firstName.value = '';
        email.value = '';
    }
}

function storeTaskInLocalStorage(name, email) {
    let users;
    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
        console.log(users);
    }
    console.log();
    let user = {};
    users.push(user[name] = email);
    localStorage.setItem('users', JSON.stringify(users));
}


