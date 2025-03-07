import PocketBase from './lib/pocketbase.es.mjs';

const pb = new PocketBase('http://localhost:8090');

document.addEventListener('DOMContentLoaded', () => {
    const addClubBtn = document.getElementById('addClubBtn');
    const clubFormPopup = document.getElementById('clubFormPopup');
    const closeBtn = document.querySelector('.close');
    const clubForm = document.getElementById('clubForm');

    // Show/Hide Club Form Popup
    if (addClubBtn) {
        addClubBtn.addEventListener('click', () => {
            clubFormPopup.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clubFormPopup.style.display = 'none';
        });
    }

    // Handle Club Form Submission
    if (clubForm) {
        clubForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: clubForm.clubName.value,
                description: clubForm.clubDescription.value,
                leader: clubForm.clubLeader.value
            };

            try {
                const record = await pb.collection('clubs').create(formData);
                console.log('Created club:', record);
                clubForm.reset();
                clubFormPopup.style.display = 'none';
                alert('Club created successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Error creating club:', error);
                alert('Failed to create club. Please try again.');
            }
        });
    }
}); 