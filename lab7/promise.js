const form = document.querySelector('.promise-form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const delay = Number(formData.get('delay'));
    const state = formData.get('state');
    
    createPromise(delay, state)
        .then((delay) => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch((delay) => {
            console.log(`❌ Rejected promise in ${delay}ms`);
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        });
    
    // Show info about promise creation
    iziToast.info({
        title: 'Creating promise',
        message: `Promise will ${state === 'fulfilled' ? 'resolve' : 'reject'} in ${delay}ms`,
        position: 'topRight'
    });
}

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}