import PocketBase from './lib/pocketbase.es.mjs';
    
const pb = new PocketBase('https://cautious-space-system-v9vr7qgjqgjfw749-8090.app.github.dev');

console.log('Connected to PocketBase:', pb);

document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const createClubButton = document.getElementById('createClubButton');
    const taskFormPopup = document.getElementById('taskFormPopup');
    const clubFormPopup = document.getElementById('clubFormPopup');
    const closeButtons = document.querySelectorAll('.close');
    
    // Task popup handling
    createTaskButton.addEventListener('click', () => {
        taskFormPopup.style.display = 'block';
    });

    // Club popup handling
    createClubButton.addEventListener('click', () => {
        clubFormPopup.style.display = 'block';
    });

    // Close button handling
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            taskFormPopup.style.display = 'none';
            clubFormPopup.style.display = 'none';
        });
    });

    // Close popups when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === taskFormPopup) {
            taskFormPopup.style.display = 'none';
        }
        if (event.target === clubFormPopup) {
            clubFormPopup.style.display = 'none';
        }
    });

    // Handle task form submission
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your task creation logic here
        taskFormPopup.style.display = 'none';
    });

    // Handle club form submission
    const clubForm = document.getElementById('clubForm');
    clubForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const clubData = {
            name: document.getElementById('clubName').value,
            description: document.getElementById('clubDescription').value,
            leaderEmail: document.getElementById('clubLeader').value,
            createdAt: new Date().toISOString()
        };

        // Add the club to the board
        const board = document.querySelector('.board');
        const newColumn = document.createElement('div');
        newColumn.className = 'column';
        newColumn.id = clubData.name.toLowerCase().replace(/\s+/g, '-');
        
        newColumn.innerHTML = `
            <h2>${clubData.name}</h2>
            <div class="club-info">
                <p class="description">${clubData.description}</p>
                <p class="leader">Leader: ${clubData.leaderEmail}</p>
            </div>
        `;

        // Adjust board layout
        const columns = board.querySelectorAll('.column');
        const totalColumns = columns.length + 1;
        const columnWidth = Math.max(250, (board.offsetWidth - (20 * totalColumns)) / totalColumns);
        
        columns.forEach(col => {
            col.style.width = `${columnWidth}px`;
            col.style.margin = '0 10px';
        });
        newColumn.style.width = `${columnWidth}px`;
        newColumn.style.margin = '0 10px';

        board.appendChild(newColumn);

        // Clear the form and close the popup
        clubForm.reset();
        clubFormPopup.style.display = 'none';

        // Optional: Show success message
        alert(`Club "${clubData.name}" has been created successfully!`);
    });
}); 