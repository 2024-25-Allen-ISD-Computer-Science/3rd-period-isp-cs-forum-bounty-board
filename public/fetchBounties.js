import PocketBase from './lib/pocketbase.es.mjs';

const pb = new PocketBase('https://cautious-space-system-v9vr7qgjqgjfw749-8090.app.github.dev');
console.log('Connected to PocketBase:', pb);
async function fetchBounties() {
    try {
        const response = await fetch('https://api.example.com/bounties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayBounties(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayBounties(bounties) {
    const mainForumColumn = document.getElementById('mainForum');
    const cyberSecurityColumn = document.getElementById('cyberSecurity');
    const cshsColumn = document.getElementById('cshs');

    // Clear existing content
    mainForumColumn.innerHTML = '<h2 class="column-title">Main Forum</h2>';
    cyberSecurityColumn.innerHTML = '<h2 class="column-title">CyberSecurity</h2>';
    cshsColumn.innerHTML = '<h2 class="column-title">Computer Science Honor Society</h2>';

    bounties.forEach(bounty => {
        const bountyElement = document.createElement('div');
        bountyElement.className = 'bounty bg-gray-700 text-white p-4 rounded-lg mb-4'; // Match styling
        bountyElement.innerHTML = `
            <h3 class="text-xl font-bold">${bounty.name}</h3>
            <p>${bounty.description}</p>
            <p>Deadline: ${bounty.date}</p>
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

document.addEventListener('DOMContentLoaded', fetchBounties);