/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'PATIENT' | 'DOCTOR' | 'LAB' | 'PHARMACY' | 'DELIVERY' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  type: 'IN_PERSON' | 'ONLINE';
}

export interface Report {
  id: string;
  patientId: string;
  title: string;
  date: string;
  labName: string;
  status: 'PENDING' | 'READY';
  fileUrl?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  inStock: boolean;
  refillNeeded: boolean;
}

export interface Order {
  id: string;
  patientId: string;
  items: Medication[];
  status: 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  date: string;
}
