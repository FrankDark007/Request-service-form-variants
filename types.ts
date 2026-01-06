export enum ServiceType {
  WaterDamage = 'Water Damage',
  MoldRemediation = 'Mold Remediation',
  FireRestoration = 'Fire Restoration',
  SewageCleanup = 'Sewage Cleanup',
  StormDamage = 'Storm Damage'
}

export enum UrgencyLevel {
  Emergency = 'Emergency',
  Scheduled = 'Scheduled'
}

export enum ContactMethod {
  Phone = 'Phone',
  Email = 'Email',
  Text = 'Text'
}

export interface ServiceFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: ServiceType | '';
  urgency: UrgencyLevel;
  description: string;
  preferredContact: ContactMethod;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  description?: string;
}