let btn = document.querySelector('.btn');
let firstName = document.querySelector('#name');
let email = document.querySelector('#email');
let list = document.querySelector('.items');


btn.addEventListener("click", addTask);
document.addEventListener('DOMContentLoaded', getTasks);
list.addEventListener('click', deleteUser);

function getTasks() {
    let users;
    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }

    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'item';
        li.appendChild(document.createTextNode(`${user.name} ${user.email}`));
        list.appendChild(li);
        const link = document.createElement('a');
        link.appendChild(document.createTextNode('❌'));
        link.className = 'delete';
        li.appendChild(link);
        list.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();
    if (firstName.value === '' && email.value === '') {
        alert('Enter name and email');
    } else {
        const li = document.createElement('li');
        li.className = 'item';
        li.appendChild(document.createTextNode(`${firstName.value} ${email.value}`));
        const link = document.createElement('a');
        link.appendChild(document.createTextNode('❌'));
        li.appendChild(link);
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
    }
    let user = {};
    user['name'] = name;
    user['email'] = email;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteUser(e){
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        removeUserFromLocalStorage(e.target.parentElement);
    }
}

function removeUserFromLocalStorage(useritem) {
    let users;
    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users = users.filter(user => {
        return (useritem.textContent.split(' ')[0] !== user.name);
    });
    localStorage.setItem('users', JSON.stringify(users));
}

