// 1-ое задание
let menuItems = document.getElementsByClassName('menu-item'),
    menuItem5 = document.createElement('li'),
    menu = document.getElementsByClassName('menu')[0];

menu.insertBefore(menuItems[2], menuItems[1]);
menuItem5.classList.add('menu-item');
menuItem5.textContent = 'Пятый пункт';
menu.appendChild(menuItem5);

// 2-ое задание
document.body.style.backgroundImage = "url('img/apple_true.jpg')";

// 3-ье задание
let header = document.getElementById('title');
header.textContent = 'Мы продаем только подлинную технику Apple';

// 4-ое задание
let adv = document.getElementsByClassName('adv')[0],
    column = document.getElementsByClassName('column')[1];

column.removeChild(adv);

// 5-ое задание
let promptElement = document.getElementById('prompt'),
    userAnswer = prompt('Какое ваше отношение к технике Apple?');

promptElement.textContent = userAnswer;