document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('openFormButton');
    const taskFormPopup = document.getElementById('taskFormPopup');
    const closeButton = document.querySelector('.close');

    openFormButton.addEventListener('click', () => {
        taskFormPopup.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        taskFormPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == taskFormPopup) {
            taskFormPopup.style.display = 'none';
        }
    });
});