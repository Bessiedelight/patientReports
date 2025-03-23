import { Request, Response, NextFunction } from 'express';
import { PatientReport } from '../models/patientReport';

// Create a new report
export const createReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await PatientReport.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

// Get all reports (with pagination & sorting)
export const getReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
    const reports = await PatientReport.find()
      .sort({ [sort as string]: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

// Get a single report by ID
export const getReportById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await PatientReport.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: 'Report not found' });
      return;
    }
    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Update a report
export const updateReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await PatientReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) {
      res.status(404).json({ message: 'Report not found' });
      return;
    }
    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Delete a report
export const deleteReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await PatientReport.findByIdAndDelete(req.params.id);
    if (!report) {
      res.status(404).json({ message: 'Report not found' });
      return;
    }
    res.json({ message: 'Report deleted' });
  } catch (error) {
    next(error);
  }
};
