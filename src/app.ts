import express from 'express';
import cors from 'cors';
import patientReportRoutes from './routes/patientReportRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/reports', patientReportRoutes);

export default app;
