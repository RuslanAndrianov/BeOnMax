'use strict'

let money, time;
/*
function start()
{
    money = +prompt ("Ваш бюджет на месяц?", "");
    time = prompt ("Введите дату в формате YYYY-MM-DD");
    while (isNaN(money) || money == "" || money == null)
    {
        money = +prompt ("Ваш бюджет на месяц?", "");
    }

}
start();
*/
let appData =
{
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function ()
    {
        for (let i = 0; i < 2; i++)
        {
            let a = prompt("Введите обязательную статью расходов в этом месяце:"),
                b = prompt("Во сколько обойдется?");
    
            if ( (typeof(a)=='string') && (typeof(a) != null) && 
            (typeof(b) != null) && (a != "") && (b != "") && 
            a.length < 50 ) 
            {
                console.log("Готово");
                appData.expenses[a] = b;
            }
            else
            {
                console.log("Не готово");
                i--;
            }
        }
    },
    detectDayBudget: function ()
    {
        appData.moneyPerDay = (appData.budget/30).toFixed(2);
        alert("Ежедневный бюджет: " + appData.moneyPerDay);
    },
    detectLevel: function ()
    {
        if (appData.moneyPerDay < 100)
        {
            console.log("Минимальный уровень достатка");
        }     
        else if ( (appData.moneyPerDay >= 100) && (appData.moneyPerDay < 2000) )
        {
            console.log("Средний уровень достатка");
        }
        else if (appData.moneyPerDay >= 2000)
        {
            console.log("Высокий уровень достатка");
        }
        else 
        {
            console.log("Ошибка");
        }
    },
    chooseOptExpenses: function ()
    {
        for (let i = 0; i < 3; i++)
        {
            appData.optionalExpenses[i] = prompt("Статья необязательных расходов?");
        }
    },
    checkSavings: function ()
    {
        if (appData.savings == true)
        {
            let save = +prompt("Какова сумма накоплений?"),
                persent = +prompt("Под какой процент?");
                
                appData.monthIncome = (save/100/12*persent).toFixed(2);
                alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseIncome: function ()
    {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");
        while (items == null || items == "") 
        {
            items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");
        }
        appData.income = items.split(", ");
        appData.income.push(prompt("Может что-то еще?"));
        appData.income.sort();
        console.log("Способы доп. заработка:");
        appData.income.forEach(function (itemmassive, i)
        {
            console.log(i + 1 + ": " + itemmassive);
        })
    }
};

appData.chooseIncome();

console.log("Наша программа включает в себя данные:");
for (let key in appData)
{
    console.log(key + " : " + appData[key]);
}
