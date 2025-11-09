// Toast notification system
function showToast(title, description, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${title}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        ${description ? `<div class="toast-description">${description}</div>` : ''}
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Task 1.2: getProductDetails з колбеками
function handleTask1_2() {
    console.log("=== ЗАВДАННЯ 1.2: getProductDetails ===");
    
    const products = [
        { id: 1, name: "Laptop", price: 25000, quantity: 3 },
        { id: 2, name: "Phone", price: 15000, quantity: 5 },
        { id: 3, name: "Tablet", price: 12000, quantity: 2 }
    ];

    const successCallback = (product) => {
        console.log(`✅ Товар знайдено:`, product);
        showToast(
            `Товар знайдено: ${product.name}`,
            `Ціна: ${product.price} грн, Кількість: ${product.quantity} шт.`,
            'success'
        );
    };

    const errorCallback = () => {
        console.log("❌ Товар не знайдено");
        showToast("Товар не знайдено", null, 'error');
    };

    const getProductDetails = (productId, onSuccess, onError) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            onSuccess(product);
        } else {
            onError();
        }
    };

    // Тестуємо з існуючим товаром
    getProductDetails(2, successCallback, errorCallback);
    
    console.log("\n📝 Опис роботи:");
    console.log("- getProductDetails приймає productId та два колбеки");
    console.log("- successCallback викликається, якщо товар знайдено");
    console.log("- errorCallback викликається, якщо товар не знайдено");
}

// Task 1.4: Майбутні концерти
function handleTask1_4() {
    console.log("=== ЗАВДАННЯ 1.4: Майбутні концерти ===");
    
    const concerts = {
        Київ: new Date("2020-04-01"),
        Умань: new Date("2025-07-02"),
        Вінниця: new Date("2020-04-21"),
        Одеса: new Date("2025-03-15"),
        Хмельницький: new Date("2020-04-18"),
        Харків: new Date("2025-07-10"),
    };

    const today = new Date();
    
    console.log("📅 Всі концерти:");
    console.table(concerts);
    
    // Використовуємо стрілочні функції для фільтрації та сортування
    const futureConcerts = Object.entries(concerts)
        .filter(([_, date]) => date > today)
        .sort((a, b) => a[1].getTime() - b[1].getTime())
        .map(([city]) => city);

    console.log("\n✅ Майбутні концерти (відсортовано):", futureConcerts);
    console.log("🎯 Очікуваний результат: ['Одеса', 'Умань', 'Харків']");
    
    showToast(
        "Майбутні концерти відфільтровано!",
        futureConcerts.join(", "),
        'success'
    );
}

// Task 1.6: Знижка на медикаменти
function handleTask1_6() {
    console.log("=== ЗАВДАННЯ 1.6: Знижка на медикаменти ===");
    
    const medicines = [
        { name: "Noshpa", price: 170 },
        { name: "Analgin", price: 55 },
        { name: "Quanil", price: 310 },
        { name: "Alphacholine", price: 390 },
    ];

    console.log("💊 Початковий масив:");
    console.table(medicines);

    // Використовуємо стрілочні функції та map
    const discountedMedicines = medicines.map((med, index) => ({
        id: index + 1,
        ...med,
        originalPrice: med.price,
        price: med.price > 300 ? Math.round(med.price * 0.7) : med.price,
        hasDiscount: med.price > 300,
        discount: med.price > 300 ? "30%" : "0%"
    }));

    console.log("\n✅ Медикаменти з ID та знижкою 30% (для ціни > 300 грн):");
    console.table(discountedMedicines);
    
    const discountCount = discountedMedicines.filter(m => m.hasDiscount).length;
    
    showToast(
        "Знижки застосовано!",
        `${discountCount} медикаментів зі знижкою 30%`,
        'success'
    );
}

// Task 1.8: Storage конструктор
function handleTask1_8() {
    console.log("=== ЗАВДАННЯ 1.8: Storage конструктор ===");
    
    function Storage(items) {
        this.items = items;
        
        this.getItems = () => {
            return this.items;
        };
        
        this.addItem = (item) => {
            this.items.push(item);
            console.log(`➕ Додано: ${item}`);
        };
        
        this.removeItem = (item) => {
            const index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
                console.log(`➖ Видалено: ${item}`);
            } else {
                console.log(`⚠️ Товар "${item}" не знайдено`);
            }
        };
    }

    const storage = new Storage(["apple", "banana", "mango"]);
    
    console.log("📦 Початковий склад:", storage.getItems());
    
    storage.addItem("orange");
    console.log("📦 Після додавання orange:", storage.getItems());
    
    storage.removeItem("banana");
    console.log("📦 Після видалення banana:", storage.getItems());
    
    storage.removeItem("pear"); // Спроба видалити неіснуючий товар
    
    console.log("\n✅ Фінальний склад:", storage.getItems());
    
    showToast(
        "Storage працює коректно!",
        `Поточні товари: ${storage.getItems().join(", ")}`,
        'success'
    );
}

// Task 1.9: Підрахунок тегів
function handleTask1_9() {
    console.log("=== ЗАВДАННЯ 1.9: Підрахунок тегів ===");
    
    const tweets = [
        { id: "000", likes: 5, tags: ["js", "nodejs"] },
        { id: "001", likes: 2, tags: ["html", "css"] },
        { id: "002", likes: 17, tags: ["html", "js", "nodejs"] },
        { id: "003", likes: 8, tags: ["css", "react"] },
        { id: "004", likes: 0, tags: ["js", "nodejs", "react"] },
    ];

    console.log("🐦 Твіти:");
    console.table(tweets);

    // Використовуємо reduce для підрахунку тегів
    const tagCounts = tweets.reduce((acc, tweet) => {
        tweet.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});

    console.log("\n#️⃣ Кількість тегів:", tagCounts);
    console.log("🎯 Очікуваний результат: {js: 3, nodejs: 3, html: 2, css: 2, react: 2}");
    
    const tagsInfo = Object.entries(tagCounts)
        .map(([tag, count]) => `${tag}: ${count}`)
        .join(", ");
    
    showToast(
        "Теги підраховано!",
        tagsInfo,
        'success'
    );
}

// Task 1.10: Перевірка дужок
function handleTask1_10() {
    console.log("=== ЗАВДАННЯ 1.10: Перевірка дужок ===");
    
    const checkBrackets = (str) => {
        const stack = [];
        const pairs = { '(': ')', '{': '}', '[': ']' };
        const opening = Object.keys(pairs);
        const closing = Object.values(pairs);

        for (let char of str) {
            if (opening.includes(char)) {
                stack.push(char);
            } else if (closing.includes(char)) {
                if (stack.length === 0) return false;
                const last = stack.pop();
                if (pairs[last] !== char) return false;
            }
        }
        
        return stack.length === 0;
    };

    const testCases = [
        { code: "function test() { return [1, 2, 3]; }", expected: true },
        { code: "if (true) { console.log('hi'); }", expected: true },
        { code: "const arr = [1, 2, {a: 3}];", expected: true },
        { code: "function bad() { return [1, 2; }", expected: false },
        { code: "const obj = {key: [1, 2]};", expected: true },
        { code: "((()))", expected: true },
        { code: "({[}])", expected: false }
    ];

    console.log("🔍 Результати перевірки:");
    
    testCases.forEach((test, index) => {
        const result = checkBrackets(test.code);
        const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
        console.log(`\n${index + 1}. ${status}`);
        console.log(`   Код: ${test.code}`);
        console.log(`   Результат: ${result} (очікувалось: ${test.expected})`);
    });

    const passed = testCases.filter(t => checkBrackets(t.code) === t.expected).length;
    
    showToast(
        "Перевірка дужок виконана!",
        `${passed} з ${testCases.length} тестів пройдено`,
        'success'
    );
}

// Task 2.2: Перевірка віку < 20
function handleTask2_2() {
    console.log("=== ЗАВДАННЯ 2.2: Перевірка віку < 20 ===");
    
    const people = [
        { name: 'John', age: 27 },
        { name: 'Jane', age: 31 },
        { name: 'Bob', age: 19 },
    ];

    console.log("👥 Масив людей:");
    console.table(people);

    // Використовуємо метод some()
    const hasYoung = people.some(person => person.age < 20);
    
    console.log("\n🔍 Чи є хтось молодше 20?", hasYoung);
    console.log("🎯 Очікуваний результат: true");
    
    const youngPerson = people.find(p => p.age < 20);
    
    if (hasYoung) {
        console.log(`✅ Знайдено: ${youngPerson.name} (${youngPerson.age} років)`);
        showToast(
            "Є люди молодші за 20 років!",
            `Знайдено: ${youngPerson.name} (${youngPerson.age} років)`,
            'success'
        );
    } else {
        showToast("Немає людей молодших за 20", null, 'success');
    }
}

// Task 2.4: Квадрати чисел
function handleTask2_4() {
    console.log("=== ЗАВДАННЯ 2.4: Квадрати чисел ===");
    
    const numbers = [1, 2, 3, 4, 5];
    
    // Використовуємо метод map()
    const squares = numbers.map(n => n * n);
    
    console.log("🔢 Вхідний масив:", numbers);
    console.log("📊 Квадрати:", squares);
    console.log("🎯 Очікуваний результат: [1, 4, 9, 16, 25]");
    
    console.log("\n📝 Детальна таблиця:");
    console.table(numbers.map((n, i) => ({
        число: n,
        квадрат: squares[i],
        формула: `${n}² = ${squares[i]}`
    })));
    
    showToast(
        "Квадрати обчислено!",
        `Результат: ${squares.join(", ")}`,
        'success'
    );
}

// Task 2.6: Сортування за віком
function handleTask2_6() {
    console.log("=== ЗАВДАННЯ 2.6: Сортування за віком ===");
    
    const people = [
        { name: "John", age: 27 },
        { name: "Jane", age: 31 },
        { name: "Bob", age: 19 }
    ];

    console.log("👥 До сортування:");
    console.table(people);

    // Використовуємо метод sort() зі стрілочною функцією
    const sorted = [...people].sort((a, b) => a.age - b.age);
    
    console.log("\n👥 Після сортування за віком:");
    console.table(sorted);
    
    console.log("🎯 Очікуваний результат:");
    console.log("[{name: 'Bob', age: 19}, {name: 'John', age: 27}, {name: 'Jane', age: 31}]");
    
    const sortedNames = sorted.map(p => `${p.name} (${p.age})`).join(" → ");
    
    showToast(
        "Масив відсортовано!",
        sortedNames,
        'success'
    );
}

// Calculator class with method chaining
function handleCalculator() {
    console.log("=== ЗАВДАННЯ 2: Calculator клас ===");
    
    class Calculator {
        constructor() {
            this.value = 0;
        }

        number(val) {
            this.value = val;
            console.log(`🔢 Встановлено значення: ${val}`);
            return this;
        }

        add(val) {
            this.value += val;
            console.log(`➕ Додаємо ${val}, результат: ${this.value}`);
            return this;
        }

        subtract(val) {
            this.value -= val;
            console.log(`➖ Віднімаємо ${val}, результат: ${this.value}`);
            return this;
        }

        multiply(val) {
            this.value *= val;
            console.log(`✖️ Множимо на ${val}, результат: ${this.value}`);
            return this;
        }

        divide(val) {
            if (val === 0) {
                throw new Error("❌ Ділення на нуль неможливе!");
            }
            this.value /= val;
            console.log(`➗ Ділимо на ${val}, результат: ${this.value}`);
            return this;
        }

        getResult() {
            console.log(`\n✅ Фінальний результат: ${this.value}`);
            return this.value;
        }
    }

    console.log("🧮 Ланцюжок операцій:");
    console.log("number(10) → add(5) → subtract(3) → multiply(4) → divide(2)\n");
    
    const calc = new Calculator();
    const result = calc
        .number(10)    // 10
        .add(5)        // 15
        .subtract(3)   // 12
        .multiply(4)   // 48
        .divide(2)     // 24
        .getResult();

    console.log("\n📝 Покрокові обчислення:");
    console.log("10 → +5 = 15 → -3 = 12 → ×4 = 48 → ÷2 = 24");
    console.log("🎯 Очікуваний результат: 24");
    console.log(`✅ Отриманий результат: ${result}`);
    
    // Тест ділення на нуль
    console.log("\n⚠️ Тест ділення на нуль:");
    try {
        new Calculator().number(10).divide(0);
    } catch (error) {
        console.log(`✅ Помилка коректно оброблена: ${error.message}`);
    }
    
    showToast(
        "Calculator працює!",
        `Результат обчислень: ${result}`,
        'success'
    );
}

// Виведення інформації про завантаження
console.log("✨ Лабораторна робота №5 завантажена");
console.log("📝 Автор: Штифлюк Ольга, ІО-31, ФІОТ");
console.log("🎯 Варіант: 24 (парний)");
console.log("\n💡 Натисніть на кнопки завдань для виконання!");
