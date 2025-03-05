import AdminView from '@/views/dashboards/adminView.vue'
import PatientView from '@/views/dashboards/patientView.vue'
import DoctorView from '@/views/dashboards/doctorView.vue'
import NurseView from '@/views/dashboards/nurseView.vue'
import ReceptionistView from '@/views/dashboards/receptionistView.vue'
import BaseProfile from '@/components/profile/PatientProfile.vue'
import PatientAppointment from '@/components/Appointment/Patient/PatientAppointment.vue'
import PatientAppointmentDetail from '@/components/Appointment/Patient/details/PatientAppointmentDetails.vue'
import PatientAppointmentReceptionistShow from '@/components/Appointment/Receptionist/PatientAppointmentReceptionistShow.vue'
import DoctorAppointmentShow from '@/components/Appointment/Doctor/DoctorAppointmentShow.vue'
import PathologyView from '@/views/dashboards/pathologyView.vue'
import LabOrderShow from '@/components/pathology/LabOrderShow.vue'
import LabTestShow from '@/components/pathology/labtest/LabTestShow.vue'
import MedicationShow from '@/components/pharmacy/MedicationShow.vue'
import PrescriptionShow from '@/components/pharmacy/PrescriptionShow.vue'
import PharmacistView from '@/views/dashboards/pharmacistView.vue'
import BillingManager from '@/components/billing/BillManager.vue'

const routes = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/patient',
    component: PatientView,
    meta: { requiresAuth: true, role: 'patient' },
    children: [
      {
        path: 'profile',
        component: BaseProfile,
        meta: { requiresAuth: true, role: 'patient' },
      },
      {
        path: 'appointment',
        component: PatientAppointment,
        meta: { requiresAuth: true, role: 'patient' },
      },
      {
        path: 'appointment-details',
        component: PatientAppointmentDetail,
        meta: { requiresAuth: true, role: 'patient', props: true },
      },
    ],
  },
  {
    path: '/doctor',
    component: DoctorView,
    meta: { requiresAuth: true, role: 'doctor' },
    children: [
      {
        path: 'profile',
        component: BaseProfile,
        meta: { requiresAuth: true, role: 'doctor' },
      },
      {
        path: 'appointment',
        component: DoctorAppointmentShow,
        meta: { requiresAuth: true, role: 'doctor' },
      },
    ],
  },
  {
    path: '/nurse',
    component: NurseView,
    meta: { requiresAuth: true, role: 'nurse' },
  },
  {
    path: '/receptionist',
    component: ReceptionistView,
    meta: { requiresAuth: true, role: 'receptionist' },
    children: [
      {
        path: 'profile',
        component: BaseProfile,
        meta: { requiresAuth: true, role: 'receptionist' },
      },
      {
        path: 'appointment',
        component: PatientAppointmentReceptionistShow,
        meta: { requiresAuth: true, role: 'receptionist' },
      },
      {
        path: 'billing',
        component: BillingManager,
        meta: { requiresAuth: true, role: 'receptionist' },
      },
    ],
  },
  {
    path: '/pathologist',
    component: PathologyView,
    meta: { requiresAuth: true, role: 'pathologist' },
    children: [
      {
        path: 'profile',
        component: BaseProfile,
        meta: { requiresAuth: true, role: 'pathologist' },
      },
      {
        path: 'laborder',
        component: LabOrderShow,
        meta: { requiresAuth: true, role: 'pathologist' },
      },
      {
        path: 'labtest',
        component: LabTestShow,
        meta: { requiresAuth: true, role: 'pathologist' },
      },
    ],
  },
  {
    path: '/pharmacist',
    component: PharmacistView,
    meta: { requiresAuth: true, role: 'pharmacist' },
    children: [
      {
        path: 'profile',
        component: BaseProfile,
        meta: { requiresAuth: true, role: 'pharmacist' },
      },
      {
        path: 'prescription',
        component: PrescriptionShow,
        meta: { requiresAuth: true, role: 'pharmacist' },
      },
      {
        path: 'medication',
        component: MedicationShow,
        meta: { requiresAuth: true, role: 'pharmacist' },
      },
    ],
  },
]

export default routes
