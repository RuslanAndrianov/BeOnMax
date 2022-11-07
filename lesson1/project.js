let money = prompt("Ваш бюджет на месяц?");
    time = prompt("Введите дату в формате YYYY-MM-DD");

let appData =
{
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}

appData.expenses.answer1 = prompt("Введите обязательную статью расходов в этом месяце:");
appData.expenses.answer2 = prompt("Во сколько обойдется?");
appData.expenses.answer3 = prompt("Введите обязательную статью расходов в этом месяце:");
appData.expenses.answer4 = prompt("Во сколько обойдется?");

alert(appData.budget/30);