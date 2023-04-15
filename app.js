let btn = document.querySelector('.btn');
let firstName = document.querySelector('#name');
let email = document.querySelector('#email');
let list = document.querySelector('.items');


btn.addEventListener("click", addUser);
document.addEventListener('DOMContentLoaded', getTasks);
list.addEventListener('click', deleteUser);
list.addEventListener('click', editUser);

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
        const edit = document.createElement('a');
        edit.appendChild(document.createTextNode('🖋'));
        edit.className = 'edit';
        li.appendChild(edit);
        const deleteIcon = document.createElement('a');
        deleteIcon.appendChild(document.createTextNode('❌'));
        deleteIcon.className = 'delete';
        li.appendChild(deleteIcon);
        list.appendChild(li);
    });
}

function addUser(e) {
    if (firstName.value === '' && email.value === '') {
        alert('Enter name and email');
    } else {
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

    let isupdate = true;
    users.forEach(user => {
        if (name == user.name || email == user.email) {
            user.name = name;
            user.email = email;
            isupdate = false;
        }
    })
    if (isupdate) {
        let user = {};
        user['name'] = name;
        user['email'] = email;
        users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteUser(e) {
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

function editUser(e) {
    if (e.target.classList.contains('edit')) {
        editUserInLocalStorage(e.target.parentElement);
    }
}

function editUserInLocalStorage(useritem) {
    let users;
    if (localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users.forEach(user => {
        if (useritem.textContent.split(' ')[0] == user.name) {
            firstName.value = user.name;
            email.value = user.email;
        }
    })
}