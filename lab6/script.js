// ============================================
// EVENT DELEGATION - Product Modal
// ============================================

// Делегування подій для продуктів
const productsContainer = document.getElementById('products-container');
const modal = document.getElementById('modal');

productsContainer.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    
    if (productCard) {
        const name = productCard.dataset.name;
        const price = productCard.dataset.price;
        const description = productCard.dataset.description;
        const icon = productCard.querySelector('.product-icon').textContent;
        
        openModal(name, price, description, icon);
    }
});

function openModal(name, price, description, icon) {
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-price').textContent = `${price} грн`;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-icon').textContent = icon;
    
    modal.style.display = 'block';
    console.log('Модальне вікно відкрито для продукту:', name);
}

function closeModal() {
    modal.style.display = 'none';
}

// Закриття модального вікна при кліку за його межами
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// ============================================
// TASK 2 - SWAP INPUTS
// ============================================

function swapInputs() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    
    // Обмін значень
    const temp = input1.value;
    input1.value = input2.value;
    input2.value = temp;
    
    console.log('ЗАВДАННЯ 2: Обмін виконано!');
    console.log('Перше поле:', input1.value);
    console.log('Друге поле:', input2.value);
}

// ============================================
// TASK 4 - RESIZE BOX
// ============================================

let boxSize = 100;

function increaseBox() {
    boxSize += 15;
    updateBoxSize();
    console.log('ЗАВДАННЯ 4: Збільшити. Новий розмір:', boxSize + 'px');
}

function decreaseBox() {
    if (boxSize > 15) {
        boxSize -= 15;
        updateBoxSize();
        console.log('ЗАВДАННЯ 4: Зменшити. Новий розмір:', boxSize + 'px');
    } else {
        console.log('ЗАВДАННЯ 4: Неможливо зменшити далі!');
    }
}

function updateBoxSize() {
    const box = document.getElementById('resizable-box');
    box.style.width = boxSize + 'px';
    box.style.height = boxSize + 'px';
}

// ============================================
// TASK 6 - CLICK DETECTION
// ============================================

window.addEventListener('click', function(event) {
    const place = document.getElementById('place');
    const rect = place.getBoundingClientRect();
    
    const clickedInside = 
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    
    console.log('ЗАВДАННЯ 6: Клік всередині зеленого блоку?', clickedInside);
});

// ============================================
// TASK 7 - LOGIN FORM
// ============================================

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = this.elements.email.value.trim();
    const password = this.elements.password.value.trim();
    
    if (!email || !password) {
        alert('All form fields must be filled in');
        console.log('ЗАВДАННЯ 7: Не всі поля заповнені!');
        return;
    }
    
    const formData = {
        email: email,
        password: password
    };
    
    console.log('ЗАВДАННЯ 7: Форма відправлена!');
    console.log('Дані форми:', formData);
    
    this.reset();
});

// ============================================
// TASK 8 - CHANGE BACKGROUND COLOR
// ============================================

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeBackgroundColor() {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
    document.getElementById('color-value').textContent = color;
    
    console.log('ЗАВДАННЯ 8: Колір фону змінено на:', color);
}

// ============================================
// TASK 9 - CREATE/DESTROY BOXES
// ============================================

function createBoxes() {
    const input = document.getElementById('boxes-amount');
    const amount = parseInt(input.value);
    
    if (!amount || amount < 1 || amount > 100) {
        alert('Введіть число від 1 до 100');
        console.log('ЗАВДАННЯ 9: Невірне значення!');
        return;
    }
    
    destroyBoxes();
    
    const boxesContainer = document.getElementById('boxes');
    const fragment = document.createDocumentFragment();
    
    let size = 30;
    
    for (let i = 0; i < amount; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.style.width = size + 'px';
        box.style.height = size + 'px';
        box.style.backgroundColor = getRandomHexColor();
        
        fragment.appendChild(box);
        size += 10;
    }
    
    boxesContainer.appendChild(fragment);
    
    console.log(`ЗАВДАННЯ 9: Створено ${amount} квадратів`);
}

function destroyBoxes() {
    const boxesContainer = document.getElementById('boxes');
    boxesContainer.innerHTML = '';
    
    console.log('ЗАВДАННЯ 9: Всі квадрати видалено');
}

// ============================================
// TASK 10 - ANALYZE CATEGORIES
// ============================================

function analyzeCategories() {
    const categories = document.querySelectorAll('ul#categories > li.item');
    
    console.log('ЗАВДАННЯ 10: Аналіз категорій');
    console.log(`Number of categories: ${categories.length}`);
    console.log('---');
    
    categories.forEach(category => {
        const title = category.querySelector('h2').textContent;
        const elementsCount = category.querySelectorAll('ul > li').length;
        
        console.log(`Category: ${title}`);
        console.log(`Elements: ${elementsCount}`);
        console.log('---');
    });
    
    alert(`Аналіз завершено! Знайдено ${categories.length} категорій. Дивіться консоль для деталей.`);
}

// ============================================
// INITIALIZATION
// ============================================

console.log('%c🚀 Лабораторна робота №6 завантажена!', 'color: #14b8a6; font-size: 20px; font-weight: bold;');
console.log('%cШтифлюк Ольга, ІО-31, Варіант 24', 'color: #64748b; font-size: 14px;');
console.log('---');
console.log('Доступні завдання:');
console.log('✅ Делегування подій (клік на продукт)');
console.log('✅ Завдання 2: SWAP ME');
console.log('✅ Завдання 4: Зміна розміру блоку');
console.log('✅ Завдання 6: Визначення кліку');
console.log('✅ Завдання 7: Форма логіну');
console.log('✅ Завдання 8: Зміна кольору фону');
console.log('✅ Завдання 9: Створення колекції квадратів');
console.log('✅ Завдання 10: Аналіз категорій');
console.log('---');