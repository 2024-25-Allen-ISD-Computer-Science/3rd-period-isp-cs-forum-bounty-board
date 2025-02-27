import PocketBase from './lib/pocketbase.es.mjs';

const pb = new PocketBase('https://cautious-space-system-v9vr7qgjqgjfw749-8090.app.github.dev');
console.log('Connected to PocketBase:', pb);
async function fetchBounties() {
    try {
        const bounties = await pb.collection('bounties').getFullList(); // Replace 'bounties' with your collection name
        displayBounties(bounties);
    } catch (error) {
        console.error('Error fetching bounties:', error);
    }
}

function displayBounties(bounties) {
    const mainForumColumn = document.getElementById('mainForum');
    const cyberSecurityColumn = document.getElementById('cyberSecurity');
    const cshsColumn = document.getElementById('cshs');

    mainForumColumn.innerHTML = '<h2>Main Forum</h2>';
    cyberSecurityColumn.innerHTML = '<h2>CyberSecurity</h2>';
    cshsColumn.innerHTML = '<h2>Computer Science Honor Society</h2>';

    bounties.forEach(bounty => {
        const bountyElement = document.createElement('div');
        bountyElement.className = 'bounty';
        bountyElement.innerHTML = `
            <h3>${bounty.name}</h3>
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