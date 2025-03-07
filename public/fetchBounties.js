import PocketBase from './lib/pocketbase.es.mjs';

const pb = new PocketBase('http://localhost:8090');
console.log('Connected to PocketBase:', pb);

async function fetchBounties() {
    try {
        const records = await pb.collection('bounties').getFullList({
            sort: '-created'
        });
        console.log('Fetched bounties:', records);
        displayBounties(records);
    } catch (error) {
        console.error('Error fetching bounties:', error);
    }
}

function displayBounties(bounties) {
    const mainForumColumn = document.getElementById('mainForum');
    const cyberSecurityColumn = document.getElementById('cyberSecurity');
    const cshsColumn = document.getElementById('cshs');

    // Clear existing content but keep the headers
    mainForumColumn.innerHTML = '<h2 class="column-title">Main Forum</h2>';
    cyberSecurityColumn.innerHTML = '<h2 class="column-title">CyberSecurity</h2>';
    cshsColumn.innerHTML = '<h2 class="column-title">Computer Science Honor Society</h2>';

    bounties.forEach(bounty => {
        const bountyElement = document.createElement('div');
        bountyElement.className = 'task';
        bountyElement.draggable = true;
        bountyElement.innerHTML = `
            <h2>${bounty.name}</h2>
            <p>${bounty.description}</p>
            <strong>Deadline: ${bounty.date}</strong>
        `;

        switch (bounty.organization) {
            case 'mainForum':
                mainForumColumn.appendChild(bountyElement);
                break;
            case 'cyberSecurity':
                cyberSecurityColumn.appendChild(bountyElement);
                break;
            case 'cshs':
                cshsColumn.appendChild(bountyElement);
                break;
            default:
                console.error('Unknown column:', bounty.organization);
        }
    });
}

// Add a function to create new bounties
async function createBounty(bountyData) {
    try {
        const record = await pb.collection('bounties').create(bountyData);
        console.log('Created bounty:', record);
        // Refresh the bounties display
        fetchBounties();
    } catch (error) {
        console.error('Error creating bounty:', error);
    }
}

// Export the createBounty function if needed by other modules
window.createBounty = createBounty;

document.addEventListener('DOMContentLoaded', fetchBounties);