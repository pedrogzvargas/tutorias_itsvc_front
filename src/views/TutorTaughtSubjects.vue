<template>
  <v-container
    id="tutor-subjecs-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <div class="pa-5 white--text">
              <div class="text-h4 font-weight-light">
                Materias impartidas
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
            <tutor-subjects-list
              ref="TutorSubjectsList"
              :search="searchValue"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorSubjectsList from '../components/tutor/subject/TutorSubjectsList'
  export default {
    name: 'TutorTaughtSubjects',
    components: {
      TutorSubjectsList,
    },
    data: () => ({
      searchValue: '',
    }),
    methods: {
      filterList () {
        this.$refs.TutorSubjectsList.page = 1
        this.$refs.TutorSubjectsList.fillSubjects()
      },
    },
  }
</script>

<style scoped>

</style>
