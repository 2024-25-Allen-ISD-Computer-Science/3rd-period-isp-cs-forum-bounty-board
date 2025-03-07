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
    const sampleBounty = {
        name: 'Sample Bounty',
        description: 'This is a sample bounty for testing purposes.',
        date: '2023-12-31',
        organization: 'mainForum'
    };
    bounties.push(sampleBounty);
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

document.addEventListener('DOMContentLoaded', () => {
    fetchBounties();

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
        const bounty = event.target.closest('.bounty');
        if (bounty) {
            const bountyTitle = bounty.querySelector('h3').innerText;
            const bountyDescription = bounty.querySelector('p').innerText;
            document.getElementById('sidebarTitle').innerText = bountyTitle;
            document.getElementById('sidebarDetails').innerText = bountyDescription;
            sidebar.style.right = '0'; 
            overlay.style.display = 'block'; // Show overlay
        }
    });

    document.getElementById('submissionForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const submissionFile = document.getElementById('submissionFile').files[0];
        const submissionDescription = document.getElementById('submissionDescription').value;
        const submissionLink = document.getElementById('submissionLink').value;

        const formData = new FormData();
        formData.append('file', submissionFile);
        formData.append('description', submissionDescription);
        formData.append('link', submissionLink);

        try {
            const response = await pb.collection('submissions').create(formData);
            console.log('Submission successful:', response);
            sidebar.style.right = '-350px'; 
            overlay.style.display = 'none'; 
        } catch (error) {
            console.error('Error submitting:', error);
        }
    });
});