document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const taskFormPopup = document.getElementById('taskFormPopup');
    const closeButtons = document.querySelectorAll('.close');
    
    // Task popup handling
    createTaskButton.addEventListener('click', () => {
        taskFormPopup.style.display = 'block';
    });

    // Close button handling
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            taskFormPopup.style.display = 'none';
        });
    });

    // Close popup when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === taskFormPopup) {
            taskFormPopup.style.display = 'none';
        }
    });

    // Handle task form submission
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your task creation logic here
        taskFormPopup.style.display = 'none';
    });

    // Mock function to load club info (replace with actual data fetching)
    function loadClubInfo() {
        const clubNameSpan = document.getElementById('clubName');
        // Replace this with actual club data fetching
        clubNameSpan.textContent = "Your Club Name";
    }

    loadClubInfo();
}); 