<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import HospitalIcon from './icons/IconHospital.vue'
import StaffIcon from './icons/IconStaff.vue'
import PatientIcon from './icons/IconPatient.vue'
import AppointmentIcon from './icons/IconAppointment.vue'
import DetailsIcon from './icons/IconDetails.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <HospitalIcon />
    </template>
    <template #heading>Medimanage</template>

    Medimanage is an excellent solution for managing high-class hospitals. It offers comprehensive
    tools to efficiently manage hospital staff, including doctors, nurses, and administrative
    personnel.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <StaffIcon />
    </template>
    <template #heading>Staff Management</template>

    With Medimanage, you can easily organize and oversee your hospital staff. The platform allows
    for scheduling, task assignments, and performance tracking, ensuring that your team operates
    smoothly and effectively.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <PatientIcon />
    </template>
    <template #heading>Patient Management</template>

    Medimanage provides robust patient management features. Patients can register, update their
    information, and access their medical records securely. This ensures that all patient data is
    up-to-date and easily accessible.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AppointmentIcon />
    </template>
    <template #heading>Appointments</template>

    Patients can conveniently book appointments through Medimanage. The system allows for easy
    scheduling and rescheduling, helping to reduce no-shows and improve patient satisfaction.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DetailsIcon />
    </template>
    <template #heading>Patient Details</template>

    Medimanage enables patients to view their appointment details, medical history, and treatment
    plans. This transparency helps patients stay informed about their health and treatment progress.
  </WelcomeItem>
</template>
