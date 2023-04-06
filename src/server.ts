import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

interface AlphaVantageData {
    DividendDate: string;
    ExDividendDate: string;
    AnnouncementDate: string;
}

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'TZ5REY72C10IQ6A6';


app.get('/api/:symbol', async (req: Request, res: Response) => {
    const { symbol } = req.params;
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json() as AlphaVantageData;

        // Check if the data variable is null or undefined
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }

        const result: AlphaVantageData = {
            DividendDate: data.DividendDate,
            ExDividendDate: data.ExDividendDate,
            AnnouncementDate: data.AnnouncementDate
        };

        // Send the result
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});