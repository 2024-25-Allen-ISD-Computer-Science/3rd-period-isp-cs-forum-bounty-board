import PocketBase from './lib/pocketbase.es.mjs';

const pb = new PocketBase('http://localhost:8090');
console.log('Connected to PocketBase:', pb);

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const addBountyBtn = document.getElementById('addBountyBtn');
    const bountyFormPopup = document.getElementById('bountyFormPopup');
    const closeBtn = document.querySelector('.close');
    const columns = document.querySelectorAll('.column');

    // Show/Hide Popup
    if (addBountyBtn) {
        addBountyBtn.addEventListener('click', () => {
            bountyFormPopup.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            bountyFormPopup.style.display = 'none';
        });
    }

    // Handle form submission
    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Get form values
                const taskInput = document.getElementById('taskInput');
                const taskDescription = document.getElementById('taskDescription');
                const taskDeadline = document.getElementById('taskDeadline');
                const taskColumn = document.getElementById('taskColumn');
                const taskFiles = document.getElementById('taskFiles');

                console.log('Raw taskColumn element:', taskColumn);
                console.log('taskColumn value:', taskColumn ? taskColumn.value : 'Element not found');

                // Validate form data
                if (!taskInput.value || !taskDescription.value || !taskDeadline.value || !taskColumn || !taskColumn.value) {
                    throw new Error('All fields are required');
                }

                // Create FormData for file upload
                const formData = new FormData();
                formData.append('name', taskInput.value.trim());
                formData.append('description', taskDescription.value.trim());
                
                // Map the column value to the correct organization name
                const organizationMap = {
                    'mainforum': 'Main Forum',
                    'cybersecurity': 'Cybersecurity',
                    'cshs': 'CSHS'
                };

                const selectedOrg = organizationMap[taskColumn.value.toLowerCase()] || taskColumn.value;
                console.log('Selected organization:', selectedOrg);
                console.log('Organization mapping:', organizationMap);
                console.log('taskColumn.value:', taskColumn.value);

                formData.append('organization', selectedOrg);
                formData.append('date', taskDeadline.value);
                
                // Add file if one was selected
                if (taskFiles.files.length > 0) {
                    formData.append('additional_documents', taskFiles.files[0]);
                }

                console.log('Attempting to create bounty with data:', Object.fromEntries(formData));

                // Save to PocketBase using FormData
                const record = await pb.collection('bounties').create(formData);
                console.log('Created bounty:', record);

                // Create visual task element
                const task = document.createElement('div');
                task.classList.add('task');
                task.draggable = true;
                task.setAttribute('data-id', record.id);
                
                task.innerHTML = `
                    <h2>${record.name}</h2>
                    <p>${record.description}</p>
                    <strong>Deadline: ${record.date}</strong>
                `;

                // Add to appropriate column - convert organization name to column ID format
                const columnId = record.organization.toLowerCase()
                                                  .replace(/main forum/, 'mainforum')
                                                  .replace(/cybersecurity/, 'cybersecurity')
                                                  .replace(/cshs/, 'cshs')
                                                  .replace(/\s+/g, '');
                console.log('Looking for column with ID:', columnId);
                const targetColumn = document.getElementById(columnId);
                if (targetColumn) {
                    targetColumn.appendChild(task);
                } else {
                    console.error('Column not found for organization:', record.organization);
                }

                // Add drag and drop functionality
                addDragAndDropEvents(task);

                // Reset form and close popup
                taskForm.reset();
                bountyFormPopup.style.display = 'none';
                
                alert('Bounty created successfully!');
            } catch (error) {
                console.error('Error details:', error);
                if (error.response) {
                    console.error('Server response:', error.response);
                    alert(`Failed to create bounty: ${error.response.message}`);
                } else {
                    alert(`Failed to create bounty: ${error.message}`);
                }
            }
        });
    }

    function addDragAndDropEvents(task) {
        task.addEventListener('dragstart', function() {
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', async function() {
            task.classList.remove('dragging');
            
            // Get the new column (parent element) and update the organization in PocketBase
            const newColumn = task.parentElement;
            if (newColumn && newColumn.id) {
                // Map column ID back to organization name
                const reverseOrganizationMap = {
                    'mainforum': 'Main Forum',
                    'cybersecurity': 'Cybersecurity',
                    'cshs': 'CSHS'
                };
                
                const newOrg = reverseOrganizationMap[newColumn.id];
                if (newOrg) {
                    try {
                        // Get the bounty ID from a data attribute
                        const bountyId = task.getAttribute('data-id');
                        if (bountyId) {
                            await pb.collection('bounties').update(bountyId, {
                                organization: newOrg
                            });
                            console.log('Updated bounty organization to:', newOrg);
                        }
                    } catch (error) {
                        console.error('Error updating bounty organization:', error);
                    }
                }
            }
        });
    }

    columns.forEach(column => {
        column.addEventListener('dragover', function(event) {
            event.preventDefault();
            const afterElement = getDragAfterElement(column, event.clientY);
            const draggingTask = document.querySelector('.dragging');
            if (draggingTask) {
                if (afterElement) {
                    column.insertBefore(draggingTask, afterElement);
                } else {
                    column.appendChild(draggingTask);
                }
            }
        });
    });

    function getDragAfterElement(column, y) {
        const draggableElements = [...column.querySelectorAll('.task:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Load existing bounties
    async function loadBounties() {
        try {
            const records = await pb.collection('bounties').getFullList({
                sort: '-created'
            });
            
            records.forEach(bounty => {
                const task = document.createElement('div');
                task.classList.add('task');
                task.draggable = true;
                task.setAttribute('data-id', bounty.id);
                
                task.innerHTML = `
                    <h2>${bounty.name}</h2>
                    <p>${bounty.description}</p>
                    <strong>Deadline: ${bounty.date}</strong>
                `;

                // Convert organization name to column ID format
                const columnId = bounty.organization.toLowerCase()
                                                  .replace(/main forum/, 'mainforum')
                                                  .replace(/cybersecurity/, 'cybersecurity')
                                                  .replace(/cshs/, 'cshs')
                                                  .replace(/\s+/g, '');
                console.log('Loading bounty into column:', columnId);
                const targetColumn = document.getElementById(columnId);
                if (targetColumn) {
                    targetColumn.appendChild(task);
                    addDragAndDropEvents(task);
                } else {
                    console.error('Column not found for organization:', bounty.organization);
                }
            });
        } catch (error) {
            console.error('Error loading bounties:', error);
        }
    }

    // Load existing bounties when the page loads
    loadBounties();
});