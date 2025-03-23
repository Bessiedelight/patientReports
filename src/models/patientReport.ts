import { Schema, model, models, Document } from 'mongoose';

export interface IPatientReport extends Document {
  patientName: string;
  hospitalId: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  symptoms: string;
  diagnosis: string;
  followUp: boolean;
  temperature?: number;
  bloodPressure?: string;
  heartRate?: number;
  medication?: string;
  instructions?: string;
  doctor: string;
}

const PatientReportSchema = new Schema<IPatientReport>(
  {
    patientName: { type: String, required: true },
    doctor: { type: String, required: true },
    hospitalId: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    followUp: { type: Boolean, required: true },
    temperature: { type: Number, required: false },
    bloodPressure: { type: String, required: false },
    heartRate: { type: Number, required: false },
    medication: { type: String, required: false },
    instructions: { type: String, required: false },
  },
  { timestamps: true }
);

export const PatientReport =
  models.PatientReport ||
  model<IPatientReport>('PatientReport', PatientReportSchema);
