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
        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <div class="pa-5 white--text">
              <div class="text-h4 font-weight-light">
                Tutores
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
                        mdi-account-plus
                      </v-icon>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </template>
          <v-card-text>
            <tutors-list
              ref="TutorsList"
              :search="searchValue"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorsList from '../components/admin/tutor/TutorsList'
  export default {
    name: 'Tutors',
    components: {
      TutorsList,
    },
    data: () => ({
      searchValue: '',
    }),
    methods: {
      showModalASCreate () {
        this.$refs.TutorsList.showTutorFormAsCreation()
      },
      filterList () {
        this.$refs.TutorsList.page = 1
        this.$refs.TutorsList.fillTutors()
      },
    },
  }
</script>

<style scoped>

</style>
