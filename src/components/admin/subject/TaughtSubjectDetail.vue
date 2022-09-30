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
        Docente
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Nombre"
              :value="taughtSubject.tutor.first_name"
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
              :value="taughtSubject.tutor.second_name"
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
              :value="taughtSubject.tutor.last_name"
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
              :value="taughtSubject.tutor.second_last_name"
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
              :value="taughtSubject.tutor.username"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-switch
              class="px-10"
              v-model="taughtSubject.tutor.is_active"
              inset
              :label="taughtSubject.tutor.is_active ? 'Activo': 'Inactivo'"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-book"
    >
      <template #title>
        Materia
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              label="Nombre"
              :value="taughtSubject.subject.name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              label="Código"
              :value="taughtSubject.subject.code"
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
              label="Horas teóricas"
              :value="taughtSubject.subject.first_value"
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
              label="Horas prácticas"
              :value="taughtSubject.subject.second_value"
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
              label="Total de créditos"
              :value="taughtSubject.subject.total_value"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-switch
              v-model="taughtSubject.subject.is_active"
              class="px-10"
              inset
              :label="taughtSubject.subject.is_active ? 'Activo': 'Inactivo'"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-school"
    >
      <template #title>
        Ciclo escolar
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              label="Nombre"
              :value="taughtSubject.school_cycle.name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-switch
              v-model="taughtSubject.school_cycle.is_active"
              class="px-10"
              inset
              :label="taughtSubject.school_cycle.is_active ? 'Activo': 'Inactivo'"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      color="primary"
      full-header
    >
      <template #heading>
        <div class="pa-3 white--text">
          <div class="text-h4 font-weight-light">
            Estudiantes inscritos
          </div>

          <div>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <div class="d-flex justify-start">
                  <v-text-field
                    v-model="searchValue"
                    label="Buscar"
                    clearable
                  ></v-text-field>
                  <v-btn
                    class="ma-3"
                    depressed
                    color="secondary"
                    @click="filterList"
                  >
                    Buscar
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
      <v-card-text>
        <taught-subject-students-list
          ref="TaughtSubjectStudentsList"
          :search="searchValue"
        />
      </v-card-text>
    </material-card>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import ProgressBar from '../../app/ProgressBar'
  import TaughtSubjectService from '../../../services/tutor/subject/TaughtSubjectService'
  import TaughtSubjectStudentsList from './TaughtSubjectStudentsList'

  export default {
    name: 'TaughtSubjectDetail',
    components: {
      TaughtSubjectStudentsList,
      ProgressBar,
    },
    data: () => ({
      isLoading: true,
      taughtSubject: null,
      taughtSubjectId: null,
      searchValue: '',
    }),
    computed: {
      items () {
        return [
          {
            text: 'Materias impartidas',
            disabled: false,
            to: {
              name: this.data.groups[0].name === 'tutor' ? 'TutorTaughtSubjects' : 'TaughtSubjects',
            },
          },
          {
            text: 'Detalle',
            disabled: true,
          },
        ]
      },
      ...get('user', [
        'data',
      ]),
    },
    watch: {
      '$route.params.id': function (id) {
        this.fillTaughtSubject(id)
      },
    },
    created () {
      this.taughtSubjectId = this.$route.params.id
      this.fillTaughtSubject()
    },
    methods: {
      async fillTaughtSubject () {
        await TaughtSubjectService.get(this.taughtSubjectId).then(
          (response) => {
            this.taughtSubject = response.data.data
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron tutores', 'secondary')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      filterList () {
        this.$refs.TaughtSubjectStudentsList.page = 1
        this.$refs.TaughtSubjectStudentsList.fillStudents()
      },
    },
  }
</script>
