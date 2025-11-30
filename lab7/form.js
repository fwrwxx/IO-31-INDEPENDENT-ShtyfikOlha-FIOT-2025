// Form data object
let formData = { email: "", message: "" };

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');

// Load data from localStorage on page load
loadFormData();

// Listen to input changes using delegation
form.addEventListener('input', onFormInput);

// Listen to form submit
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
    const { name, value } = event.target;
    
    // Update formData object
    formData[name] = value.trim();
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    
    // Check if all fields are filled
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }
    
    // Log form data to console
    console.log('Form submitted:', formData);
    
    // Clear storage
    localStorage.removeItem(STORAGE_KEY);
    
    // Clear formData object
    formData = { email: "", message: "" };
    
    // Clear form fields
    form.reset();
    
    alert('Форма успішно відправлена! Дані виведені у консоль.');
}

function loadFormData() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        
        if (savedData) {
            formData = JSON.parse(savedData);
            
            // Populate form fields
            emailInput.value = formData.email || '';
            messageInput.value = formData.message || '';
        }
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}