<template>
  <v-container
    id="subject-detail-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <taught-subject-detail />

        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <div class="pa-3 white--text">
              <div class="text-h4 font-weight-light">
                Alumnos inscritos
              </div>

              <div>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <div class="d-flex justify-start">
                      <v-text-field
                        label="Buscar"
                        clearable
                      ></v-text-field>
                      <v-btn
                        class="ma-3"
                        depressed
                        color="secondary"
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
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TaughtSubjectDetail from '../components/tutor/subject/TaughtSubjectDetail'
  export default {
    name: 'TaughtSubject',
    components: {
      TaughtSubjectDetail,
    },
  }
</script>

<style scoped>

</style>
