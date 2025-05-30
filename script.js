document.addEventListener('DOMContentLoaded', () => {
    const matchesContainer = document.getElementById('matchesContainer');
    const dateSelect = document.getElementById('dateSelect');
    const loading = document.getElementById('loading');

    // Set default date to today
    const today = new Date();
    dateSelect.value = today.toISOString().split('T')[0];

    // Function to format time
    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Function to create match card
    const createMatchCard = (game) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';

        const homeTeam = game.home_team;
        const visitorTeam = game.visitor_team;
        const gameStatus = game.status;
        const gameDate = new Date(game.date);

        matchCard.innerHTML = `
            <div class="match-header">
                <span>${formatDate(gameDate)}</span>
            </div>
            <div class="team">
                <img src="${homeTeam.logo}" alt="${homeTeam.full_name}" class="team-logo">
                <div>
                    <span class="team-name">${homeTeam.full_name}</span>
                    <span>(Home)</span>
                </div>
            </div>
            <div class="team">
                <img src="${visitorTeam.logo}" alt="${visitorTeam.full_name}" class="team-logo">
                <div>
                    <span class="team-name">${visitorTeam.full_name}</span>
                    <span>(Away)</span>
                </div>
            </div>
            <div class="match-info">
                <p>Time: ${formatTime(gameDate)}</p>
                <p>Status: ${gameStatus}</p>
                <p>Venue: ${game.venue}</p>
            </div>
        `;

        return matchCard;
    };

    // Function to fetch matches from our backend
    const fetchMatches = async (date) => {
        try {
            loading.style.display = 'block';
            matchesContainer.innerHTML = '';
            matchesContainer.appendChild(loading);

            const response = await fetch(`http://localhost:5000/api/matches?date=${date}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch matches');
            }

            const data = await response.json();
            loading.style.display = 'none';
            matchesContainer.innerHTML = '';

            if (!data.data || data.data.length === 0) {
                matchesContainer.innerHTML = '<div class="error-message">No matches scheduled for this date</div>';
                return;
            }

            data.data.forEach(game => {
                const matchCard = createMatchCard(game);
                matchesContainer.appendChild(matchCard);
            });

        } catch (error) {
            console.error('Error fetching matches:', error);
            matchesContainer.innerHTML = '<div class="error-message">Failed to load matches. Please try again later.</div>';
        }
    };

    // Event listener for date change
    dateSelect.addEventListener('change', (e) => {
        fetchMatches(e.target.value);
    });

    // Initial fetch
    fetchMatches(dateSelect.value);
}); 