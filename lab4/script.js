// Toast notification system
function showToast(message, description = '', type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✗';
    
    toast.innerHTML = `
        <div class="toast-title">${icon} ${message}</div>
        ${description ? `<div class="toast-description">${description}</div>` : ''}
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// Завдання 1: Визначення чверті години
function handleTask1() {
    const timeInput = prompt("Введіть час у форматі год:хвил (наприклад, 10:30):");
    
    if (timeInput === null) {
        showToast("Скасовано", "", "error");
        return;
    }

    console.log(`Введений час: ${timeInput}`);
    const parts = timeInput.split(":");
    
    if (parts.length !== 2) {
        showToast("Неправильний формат", "Використовуйте формат год:хвил", "error");
        return;
    }

    const minutes = parseInt(parts[1]);
    
    if (isNaN(minutes) || minutes < 0 || minutes >= 60) {
        showToast("Невірне значення хвилин", "", "error");
        return;
    }

    let quarter;
    if (minutes >= 0 && minutes < 15) {
        quarter = "Перша чверть години";
    } else if (minutes >= 15 && minutes < 30) {
        quarter = "Друга чверть години";
    } else if (minutes >= 30 && minutes < 45) {
        quarter = "Третя чверть години";
    } else {
        quarter = "Четверта чверть години";
    }

    console.log(`Результат: ${quarter}`);
    alert(quarter);
    showToast(quarter, `Час: ${timeInput}`, "success");
}

// Завдання 2: Визначення дня тижня
function handleTask2() {
    const dayInput = prompt("Введіть номер дня тижня (1-7, де 1 - понеділок):");
    
    if (dayInput === null) {
        showToast("Скасовано", "", "error");
        return;
    }

    console.log(`Введено номер дня: ${dayInput}`);

    let finish;
    switch (dayInput) {
        case '1':
            finish = 'понеділок';
            break;
        case '2':
            finish = 'вівторок';
            break;
        case '3':
            finish = 'середа';
            break;
        case '4':
            finish = 'четвер';
            break;
        case '5':
            finish = "п'ятниця";
            break;
        case '6':
            finish = 'субота';
            break;
        case '7':
            finish = 'неділя';
            break;
        default:
            finish = 'Невірне значення. Введіть число від 1 до 7';
    }

    console.log(`День тижня: ${finish}`);
    alert(finish);
    showToast(finish, `Номер дня: ${dayInput}`, "success");
}

// Завдання 3: Система авторизації
function handleTask3() {
    const users = {
        'User1': 'password1',
        'User2': 'password2',
        'User3': 'password3'
    };

    let login = prompt("Введіть логін (User1, User2 або User3):");

    while (login === "") {
        login = prompt("Логін не може бути пустим. Введіть логін:");
    }

    if (login === null) {
        showToast("Скасовано", "", "error");
        return;
    }

    console.log(`Введений логін: ${login}`);

    if (login in users) {
        const password = prompt("Введіть пароль:");
        
        if (password === null) {
            showToast("Скасовано", "", "error");
            return;
        }

        if (password === users[login]) {
            console.log(`Успішна авторизація: ${login}`);
            alert(`Hello, ${login}!`);
            showToast(`Hello, ${login}!`, "Ви успішно увійшли в систему", "success");
        } else {
            console.log("Невірний пароль");
            alert("Невірний пароль");
            showToast("Невірний пароль", "", "error");
        }
    } else {
        console.log("Користувача не знайдено");
        alert("I don't know you");
        showToast("I don't know you", "Користувача не знайдено в системі", "error");
    }
}

// Завдання 4: Розрахунок доставки
function getShippingMessage(country, price, deliveryFee) {
    const totalPrice = price + deliveryFee;
    return `Shipping to ${country} will cost ${totalPrice} credits`;
}

function handleTask4() {
    const country = prompt("Введіть країну доставки:");
    
    if (!country) {
        showToast("Скасовано", "", "error");
        return;
    }

    const priceStr = prompt("Введіть вартість товару (credits):");
    
    if (!priceStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const deliveryFeeStr = prompt("Введіть вартість доставки (credits):");
    
    if (!deliveryFeeStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const price = parseFloat(priceStr);
    const deliveryFee = parseFloat(deliveryFeeStr);
    const message = getShippingMessage(country, price, deliveryFee);
    
    console.log(message);
    console.log(`Країна: ${country}`);
    console.log(`Вартість товару: ${price} credits`);
    console.log(`Вартість доставки: ${deliveryFee} credits`);
    console.log(`Загальна сума: ${price + deliveryFee} credits`);
    
    alert(message);
    showToast(message, `Товар: ${price} + Доставка: ${deliveryFee}`, "success");
}

// Завдання 5: Покупка дроїдів
function makeTransaction(quantity, pricePerDroid, customerCredits) {
    const totalPrice = quantity * pricePerDroid;
    
    if (totalPrice > customerCredits) {
        return "Insufficient funds!";
    }
    
    return `You ordered ${quantity} droids worth ${totalPrice} credits!`;
}

function handleTask5() {
    const quantityStr = prompt("Введіть кількість дроїдів:");
    
    if (!quantityStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const priceStr = prompt("Введіть ціну одного дроїда (credits):");
    
    if (!priceStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const creditsStr = prompt("Введіть суму коштів на рахунку (credits):");
    
    if (!creditsStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const quantity = parseInt(quantityStr);
    const pricePerDroid = parseFloat(priceStr);
    const customerCredits = parseFloat(creditsStr);
    const totalPrice = quantity * pricePerDroid;
    const message = makeTransaction(quantity, pricePerDroid, customerCredits);
    
    console.log(`Кількість: ${quantity}`);
    console.log(`Ціна за дроїда: ${pricePerDroid} credits`);
    console.log(`Баланс користувача: ${customerCredits} credits`);
    console.log(`Загальна вартість: ${totalPrice} credits`);
    console.log(`Результат: ${message}`);
    
    alert(message);
    
    if (message.includes("Insufficient")) {
        showToast(message, `Потрібно: ${totalPrice} credits, У вас: ${customerCredits} credits`, "error");
    } else {
        showToast(message, `Списано ${totalPrice} credits з ${customerCredits} credits`, "success");
    }
}

// Завдання 6: Об'єднання масивів
function makeArray(firstArray, secondArray, maxLength) {
    const newArray = [...firstArray, ...secondArray];
    if (newArray.length > maxLength) {
        return newArray.slice(0, maxLength);
    }
    return newArray;
}

function handleTask6() {
    const firstArrayStr = prompt("Введіть перший масив через кому (наприклад: 1,2,3):");
    
    if (!firstArrayStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const secondArrayStr = prompt("Введіть другий масив через кому (наприклад: 4,5,6):");
    
    if (!secondArrayStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const maxLengthStr = prompt("Введіть максимальну довжину результуючого масиву:");
    
    if (!maxLengthStr) {
        showToast("Скасовано", "", "error");
        return;
    }

    const firstArray = firstArrayStr.split(",").map(Number);
    const secondArray = secondArrayStr.split(",").map(Number);
    const maxLength = parseInt(maxLengthStr);
    const result = makeArray(firstArray, secondArray, maxLength);
    
    console.log("Перший масив:", firstArray);
    console.log("Другий масив:", secondArray);
    console.log("Максимальна довжина:", maxLength);
    console.log("Об'єднаний масив:", [...firstArray, ...secondArray]);
    console.log("Результуючий масив:", result);
    
    alert(`Результат: [${result.join(", ")}]`);
    showToast("Масив створено!", `Результат: [${result.join(", ")}]`, "success");
}

// Log on page load
console.log("Лабораторна робота №4 - JavaScript");
console.log("Штифлюк Ольга, ІО-31, ФІОТ");
console.log("Варіант 24 (парний)");
console.log("==========================================");
