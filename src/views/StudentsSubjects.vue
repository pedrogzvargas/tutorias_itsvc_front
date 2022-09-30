<template>
  <v-container
    id="tutors-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <div class="pa-5 white--text">
              <div class="text-h4 font-weight-light">
                Materias
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
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <div class="d-flex justify-end mb-6">
                      <v-icon
                        class="mx-1"
                        @click="showModalASCreate"
                      >
                        mdi-note-plus
                      </v-icon>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </template>
          <v-card-text>
            <students-subject-list
              ref="StudentsSubjectList"
              :search="searchValue"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import StudentsSubjectList from '../components/admin/student/StudentsSubjectList'
  export default {
    name: 'StudentsSubjects',
    components: {
      StudentsSubjectList,
    },
    data: () => ({
      searchValue: '',
    }),
    computed: {
      items () {
        return [
          {
            text: 'Estudiantes',
            disabled: false,
            exact: true,
            to: {
              name: this.data.groups[0].name === 'tutor' ? 'TutorAdvisedGroups' : 'Students',
            },
          },
          {
            text: 'Detalle',
            disabled: false,
            to: {
              name: 'StudentSubjectsDetail',
              params: {
                id: this.$route.params.id,
              },
            },
          },
          {
            text: 'Materias',
            disabled: true,
          },
        ]
      },
      ...get('user', [
        'data',
      ]),
    },
    methods: {
      showModalASCreate () {
        this.$refs.StudentsSubjectList.showStudentSubjectFormAsCreation()
      },
      filterList () {
        this.$refs.StudentsSubjectList.fillStudents()
      },
    },
  }
</script>

<style scoped>

</style>
