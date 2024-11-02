import express from 'express';
import CatalogRoutes from './api/CatalogRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api', CatalogRoutes);

export default app;