import AdminView from '@/views/dashboards/adminView.vue'
import PatientView from '@/views/dashboards/patientView.vue'
import DoctorView from '@/views/dashboards/doctorView.vue'
import NurseView from '@/views/dashboards/nurseView.vue'
import receptionistView from '@/views/dashboards/receptionistView.vue'

const routes = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   meta: { requiresAuth: true }
  // },
   {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/patient',
    component: PatientView,
    meta: { requiresAuth: true, role: 'patient' }
  },
  {
    path: '/doctor',
    component: DoctorView,
    meta: { requiresAuth: true, role: 'doctor' }
  },
  {
    path: '/nurse',
    component: NurseView,
    meta: { requiresAuth: true, role: 'nurse' }
  },
  {
    path: '/receptionist',
    component: receptionistView,
    meta: { requiresAuth: true, role: 'receptionist' }
  }
];

export default routes;
