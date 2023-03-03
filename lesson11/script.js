window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    
    // Info Tab
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) 
    {
        for (let i = a; i < tabContent.length; i++) 
        {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) 
    {
        if (tabContent[b].classList.contains('hide')) 
        {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) 
    {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) 
        {
            for(let i = 0; i < tab.length; i++) 
            {
                if (target == tab[i]) 
                {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2023-12-12';

    function getTimeRemaining(endtime) 
    {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60) + '',
        minutes = Math.floor((t/1000/60) % 60) + '',
        hours = Math.floor((t/1000/60/60)) + '';

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) 
    {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() 
        {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            function addZero(num) 
            {
                if (num <= 9) 
                {
                    return '0' + num;
                } 
                else 
                {
                    return num;
                } 
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) 
            {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        arr = [];

    for (let i = 0; i < descriptionBtn.length; i++)
    {
        arr[i] = descriptionBtn[i];
    }
    
    arr.push(more);
    
    arr.forEach(function(item)
    {
        item.addEventListener('click', function()
        {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    close.addEventListener('click', function()
    {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Forms

    let mainForm = document.querySelector('.main-form'),
        endForm = document.getElementById('form');

    function formHandler (form)
    {
        let message = {
            loading: "Загрузка...",
            success: "Спасибо! Мы скоро с вами свяжемся!",
            failure: "Что-то пошло не так!"
        };

        let input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
        
        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) 
        {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', '/lesson11/server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
            let formData = new FormData(form);

            // Посылаем запрос в формате JSON

            let obj = {};
            formData.forEach(function(value, key)
            {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);

            // Обработка запроса

            request.addEventListener('readystatechange', function()
            {
                if (request.readyState < 4)
                {
                    statusMessage.innerHTML = message.loading;
                }
                else if (request.readyState === 4 && request == 200)
                    {
                        statusMessage.innerHTML = message.success;
                    }
                    else
                    {
                        statusMessage.innerHTML = message.failure;
                    }
            });

            // Очистка данных формы

            for (let i = 0; i < input.length; i++)
            {
                input[i].value = '';
            }
        });
    }

    formHandler(mainForm);
    formHandler(endForm);
});