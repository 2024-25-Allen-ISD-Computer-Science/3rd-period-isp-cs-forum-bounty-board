const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const columns = document.querySelectorAll('.column');

        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const taskText = taskInput.value;
            if (taskText) {
                const task = document.createElement('div');
                task.classList.add('task');
                task.draggable = false;
                task.textContent = taskText;
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
        