import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/db/db";
import axios from "axios";
import { User } from "./models/User";
import { HolidaysCalendar } from "./models/Calendar";
import { Attributes } from "sequelize";

dotenv.config();

const PORT = process.env.PORT;

const app: Application = express();
app.use(express.json());

app.get('/countries', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/country-info', async (req: Request, res: Response) => {
    try {
        const { countryCode } = req.query;

        const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const countryInfo = countryInfoResponse.data;
        const countryName = countryInfo.commonName;

        const [populationResponse, flagResponse] = await Promise.all([
            axios.post('https://countriesnow.space/api/v0.1/countries/population', { country: countryName }),
            axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', { country: countryName }),
        ]);

        res.status(200).json({
            country: countryName,
            borders: countryInfo.borders,
            population: populationResponse.data.data.populationCounts,
            flag: flagResponse.data.data.flag,
        });

    } catch (error) {
        console.error("Error fetching country info:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/users', async (req: Request, res: Response) => {
    try {
        const { email, name, password }: { email: string; name: string; password: string } = req.body;
        const user = await User.create({ email, name, password } as User);
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/users/:userId/calendar/holidays', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const { countryCode, year, holidays }: { countryCode: string; year: number; holidays: string[] } = req.body;

        const { data: holidaysList } = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);

        const filteredHolidays = holidaysList.filter((holiday: { name: string }) => holidays.includes(holiday.name))

        const holidayEntry = await HolidaysCalendar.create(
            {
                userId,
                countryCode,
                year,
                holidays: filteredHolidays.map((h: { name: string }) => h.name),
            } as Attributes<HolidaysCalendar>);

        res.status(201).json({ holidays: holidayEntry });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        app.listen(PORT, async () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();