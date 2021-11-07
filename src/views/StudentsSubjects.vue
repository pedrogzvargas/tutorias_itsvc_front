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
  import StudentsSubjectList from '../components/admin/student/StudentsSubjectList'
  export default {
    name: 'StudentsSubjects',
    components: {
      StudentsSubjectList,
    },
    data: () => ({
      searchValue: '',
      items: [
        {
          text: 'Alumnos',
          disabled: false,
          href: '/students',
        },
        {
          text: 'Pedro Jesús González Vargas',
          disabled: false,
          href: '/students',
        },
        {
          text: 'Materias',
          disabled: true,
        },
      ],
    }),
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
