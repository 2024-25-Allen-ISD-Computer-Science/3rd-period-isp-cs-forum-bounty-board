import PocketBase from './lib/pocketbase.es.mjs';
    
const pb = new PocketBase('https://cautious-space-system-v9vr7qgjqgjfw749-8090.app.github.dev');

console.log('Connected to PocketBase:', pb);
const data = {
    "name": "test",
    "description": "test",
    "organization": "Main Forum",
    "date": "test"
};
//const record = await pb.collection('bounties').create(data);

const taskForm = document.getElementById('taskForm');
        
       
        const taskInput = document.getElementById('taskInput');
        const columns = document.querySelectorAll('.column');
        const taskDescriptionInput = document.getElementById('taskDescription');
        const fileInput = document.getElementById('taskFiles');
        const taskDeadlineInput = document.getElementById('taskDeadline');
        const taskColumn = document.getElementById('taskColumn'); 
        /*
        const record = await pb.collection('bounty').create({
            name: taskInput,
            description: taskDescriptionInput,
            organization: "taskColumn.value",
            additional_documents: fileInput,
            date: taskDeadlineInput
        });
        console.log(record)
        */

        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const taskText = taskInput.value;
            if (taskText) {
                const task = document.createElement('div');
                task.classList.add('task');
                task.draggable = true;
                task.clickable = true;
                const taskName = document.createElement('h2'); 
                taskName.textContent = taskInput.value;
                task.append(taskName);
                const taskDescription = document.createElement('p');
                taskDescription.textContent = taskDescriptionInput.value;
                task.appendChild(taskDescription);
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const url = URL.createObjectURL(file);
                    const taskFileLink = document.createElement('a');
                    taskFileLink.href = url;
                    taskFileLink.download = file.name;
                    taskFileLink.textContent = file.name;
                    task.appendChild(taskFileLink);
                }
                
                const taskDeadline = document.createElement('strong');
                taskDeadline.textContent = `Deadline: ${taskDeadlineInput.value}`;
                task.appendChild(taskDeadline);
                document.getElementById(taskColumn.value).appendChild(task);
                taskInput.value = '';
                addDragAndDropEvents(task);
            }
        });

        function addDragAndDropEvents(task) {
            task.addEventListener('dragstart', function() {
                task.classList.add('dragging');
            });

            task.addEventListener('dragend', function() {
                task.classList.remove('dragging');
            });

            columns.forEach(column => {
                column.addEventListener('dragover', function(event) {
                    event.preventDefault();
                    const draggingTask = document.querySelector('.dragging');
                    column.appendChild(draggingTask);
                });
            });
        }
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

          
            const sidebar = document.createElement('div');
            sidebar.id = 'taskSidebar';
            
            sidebar.innerHTML = `
                <h2 id="sidebarTitle">Task Title</h2>
                <p id="sidebarDetails">Task Description</p>
                <form id="submissionForm">
                    <input type="file" id="submissionFile" name="submissionFile">
                    <h5>Add a description for your solution</h5>
                    <textarea id="submissionDescription" name="submissionDescription" placeholder=""></textarea>
                    <h5>Add a link to your github repository if possible</h5>
                    <input type="url" id="submissionLink" name="submissionLink" placeholder="">
                    <button type="submit">Submit</button>
                </form>

                <button id="closeSidebar" style="margin-bottom: 10px;">Close</button>

            `;
            document.body.appendChild(sidebar);

            document.getElementById('closeSidebar').addEventListener('click', () => {
                sidebar.style.right = '-350px'; 
                overlay.style.display = 'none'; 
            });

            document.addEventListener('click', (event) => {
                const task = event.target.closest('.task');
                if (task) {
                    const taskTitle = task.querySelector('h2').innerText;
                    const taskDescription = task.querySelector('p').innerText;
                    document.getElementById('sidebarTitle').innerText = taskTitle;
                    document.getElementById('sidebarDetails').innerText = taskDescription;
                    sidebar.style.right = '0'; 
                }
            });
        });
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 999;
    `;
    document.body.appendChild(overlay);

    document.addEventListener('click', (event) => {
        const task = event.target.closest('.task');
        if (task) {
            overlay.style.display = 'block'; // Show overlay
        }
    });