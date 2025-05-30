const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Simple matches data
const matches = [
    {
        id: 1,
        date: new Date(),
        home_team: {
            full_name: 'Los Angeles Lakers',
            logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
        },
        visitor_team: {
            full_name: 'Golden State Warriors',
            logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
        },
        venue: 'Los Angeles, CA',
        status: 'Scheduled'
    },
    {
        id: 2,
        date: new Date(),
        home_team: {
            full_name: 'Boston Celtics',
            logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
        },
        visitor_team: {
            full_name: 'Chicago Bulls',
            logo: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
        },
        venue: 'Boston, MA',
        status: 'Scheduled'
    },
    {
        id: 3,
        date: new Date(),
        home_team: {
            full_name: 'Miami Heat',
            logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
        },
        visitor_team: {
            full_name: 'Brooklyn Nets',
            logo: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
        },
        venue: 'Miami, FL',
        status: 'Scheduled'
    }
];

// Simple API endpoint to get matches
app.get('/api/matches', (req, res) => {
    try {
        const { date } = req.query;
        
        // Update match dates to the requested date
        const matchesWithDate = matches.map(match => ({
            ...match,
            date: new Date(date)
        }));

        res.json({
            status: 'success',
            data: matchesWithDate
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 