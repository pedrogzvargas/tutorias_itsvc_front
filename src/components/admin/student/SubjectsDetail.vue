<template>
  <div>
    <progress-bar v-if="isLoading" />
    <v-breadcrumbs
      :items="items"
      v-if="!isLoading"
    >
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-human-male"
    >
      <template #title>
        Estudiante
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Nombre"
              :value="subjectDetails.student.first_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Segundo nombre"
              :value="subjectDetails.student.second_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Apellido paterno"
              :value="subjectDetails.student.last_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Apellido materno"
              :value="subjectDetails.student.second_last_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Nombre de usuario"
              :value="subjectDetails.student.username"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Matricula"
              :value="subjectDetails.student.enrollment"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Correo"
              :value="subjectDetails.student.email"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-account-multiple"
    >
      <template #title>
        Información académica
      </template>
      <v-container v-if="subjectDetails.academic_information">
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="Instituto"
              :value="subjectDetails.academic_information.university"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Carera"
              :value="subjectDetails.academic_information.major"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Periodo"
              :value="subjectDetails.academic_information.period"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Número de periodo"
              :value="subjectDetails.academic_information.period_number"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Grupo"
              :value="subjectDetails.academic_information.group"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-else
      >
        <p class="text-center secondary--text text-h4">No hay información académica</p>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-book"
    >
      <template #title>
        Detalle de materias
      </template>
      <v-container v-if="subjectDetails.subject_details">
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Materias de la carrera"
              :value="subjectDetails.subject_details.subjects"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Materias cursando"
              :value="subjectDetails.subject_details.taking_subjects"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Materias aprobadas"
              :value="subjectDetails.subject_details.approved_subjects"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Materias reprobadas"
              :value="subjectDetails.subject_details.failed_subjects"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Puntos materias aprobadas"
              :value="subjectDetails.subject_details.approved_subjects_points"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Puntos materias cursando"
              :value="subjectDetails.subject_details.taking_subjects_points"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Total de puntos"
              :value="subjectDetails.subject_details.total_points"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              block
              class="ma-2"
              color="secondary"
              @click="$router.push({name: 'StudentsSubjects', params: { id: studentId }})"
            >
              Seguimiento de materias
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-else
      >
        <p class="text-center secondary--text text-h4">No hay detalle de materias</p>
      </v-container>
    </material-card>
  </div>
</template>

<script>
  import ProgressBar from '../../app/ProgressBar'
  import StudentSubjectsDeatailService from '../../../services/student/StudentSubjectsDeatailService'

  export default {
    name: 'SubjectsDetail',
    components: {
      ProgressBar,
    },
    data: () => ({
      subjectDetails: null,
      isLoading: true,
      items: [
        {
          text: 'Alumnos',
          disabled: false,
          href: '/students',
        },
        {
          text: 'Detalle',
          disabled: true,
        },
      ],
    }),
    watch: {
      '$route.params.id': function (id) {
        this.fillSubjectsDetail(id)
      },
    },
    created () {
      this.studentId = this.$route.params.id
      this.fillSubjectsDetail()
    },
    methods: {
      async fillSubjectsDetail () {
        await StudentSubjectsDeatailService.get(this.studentId).then(
          (response) => {
            this.subjectDetails = response.data.data
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron detalles de materias', 'warning')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
    },
  }
</script>

<style scoped>

</style>
