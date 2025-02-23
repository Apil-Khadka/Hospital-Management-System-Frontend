interface patientDetails {
  id: number;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  mrn: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  address: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
}
interface patientDetail {
  data: patientDetails;
}
interface User {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    detail: patientDetails | null;
  };
}

export type {User, patientDetail }
