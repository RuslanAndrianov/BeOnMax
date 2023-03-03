window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    //#region Info Tab

    const tab = document.querySelectorAll('.info-header-tab');
    const info = document.querySelector('.info-header');
    const tabContent = document.querySelectorAll('.info-tabcontent');

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
        const target = event.target;
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

    //#endregion 
    
    //#region Timer

    const deadline = '2023-12-12';

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
        const timer = document.getElementById(id);
        const hours = timer.querySelector('.hours');
        const minutes = timer.querySelector('.minutes');
        const seconds = timer.querySelector('.seconds');
        const timeInterval = setInterval(updateClock, 1000);

        function updateClock() 
        {
            const t = getTimeRemaining(endtime);

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

    //#endregion

    //#region Modal

    const more = document.querySelector('.more');
    const overlay = document.querySelector('.overlay');
    const close = document.querySelector('.popup-close');
    const descriptionBtn = document.querySelectorAll('.description-btn');
    let arr = [];

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

    //#endregion

    //#region Forms

    const mainForm = document.querySelector('.main-form');
    const endForm = document.getElementById('form');

    function formHandler (form)
    {
        const message = {
            loading: "Загрузка...",
            success: "Спасибо! Мы скоро с вами свяжемся!",
            failure: "Что-то пошло не так!"
        };

        const input = form.getElementsByTagName('input');
        const statusMessage = document.createElement('div');
        
        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) 
        {
            event.preventDefault();
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            
            request.open('POST', '/lesson11/server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
            const formData = new FormData(form);

            //#region Посылаем запрос в формате JSON

            let obj = {};
            formData.forEach(function(value, key)
            {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            request.send(json);

            //#endregion

            //#region Обработка запроса

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

            //#endregion

            //#region Очистка данных формы

            for (let i = 0; i < input.length; i++)
            {
                input[i].value = '';
            }

            //#endregion
        });
    }

    formHandler(mainForm);
    formHandler(endForm);

    //#endregion

    //#region Slider

    let slideIndex = 1;
    const slides = document.querySelectorAll('.slider-item');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dotsWrap = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');

    function showSlides(n)
    {
        if (n > slides.length)
        {
            slideIndex = 1;
        }
        
        if (n < 1)
        {
            slideIndex = slides.length;
        }

        slides.forEach((item) =>
        {
            item.style.display = 'none';
        });
        
        dots.forEach((item) =>
        {
            item.classList.remove('dot-active');
        });

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusSlides(n)
    {
        showSlides(slideIndex += n);
    }

    function currentSlide(n)
    {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => 
    {
        plusSlides(-1);
    });

    next.addEventListener('click', () => 
    {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', (event) =>
    {
        for (let i = 0; i < dots.length + 1; i++)
        {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1])
            {
                currentSlide(i);
            }
        }
    });

    //#endregion

    //#region Calculator

    const persons = document.querySelectorAll('.counter-block-input')[0];
    const restDays = document.querySelectorAll('.counter-block-input')[1];
    const place = document.getElementById('select');
    const totalValue = document.getElementById('total');
    let personsSum, 
        daysSum,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function()
    {
        personsSum = +this.value;
        if (personsSum)
        {
            total = (daysSum + personsSum) * 4000;

            if (restDays.value == '')
            {
                totalValue.innerHTML = 0;
            }
            else
            {
                totalValue.innerHTML = total;
            }
        }
        else
        {
            totalValue.innerHTML = 0;
        }
    });

    restDays.addEventListener('change', function()
    {
        daysSum = +this.value;
        if (daysSum)
        {
            total = (daysSum + personsSum) * 4000;

            if (persons.value == '')
            {
                totalValue.innerHTML = 0;
            }
            else
            {
                totalValue.innerHTML = total;
            }
        }
        else
        {
            totalValue.innerHTML = 0;
        }
    });

    place.addEventListener('change', function()
    {
        if (persons.value == '' || restDays.value == '')
        {
            totalValue.innerHTML = 0;
        }
        else
        {
            let temp = total;
            totalValue.innerHTML = temp * this.options[this.selectedIndex].value;
        }
    });

    //#endregion

});