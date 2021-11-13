<template>
  <v-container
    id="user-profile-view"
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
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
              class="pa-8"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >Información académica:</span>
              <v-tab
                class="mr-3"
                href="#tab-1"
              >
                <v-icon class="mr-2">
                  mdi-account-clock
                </v-icon>
                Actual
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-history
                </v-icon>
                Historial
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-3"
              >
                <v-icon class="mr-2">
                  mdi-cash-multiple
                </v-icon>
                Beca
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items
            v-model="tabs"
            background-color="transparent"
          >
            <v-tab-item
              value="tab-1"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-account-clock"
                >
                  <template #title>
                    Información académica actual
                  </template>
                  <academic-information-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-history"
                >
                  <template #title>
                    Historial académico
                    <div class="d-flex justify-end mb-6">
                      <!--                      <v-tooltip bottom>-->
                      <v-icon
                        class="mx-1"
                        @click="showModalASCreate"
                      >
                        mdi-pencil-plus
                      <!--<template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="mx-1"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-pencil-plus
                          </v-icon>
                        </template>
                        <span>Agregar instituto</span>
                      </v-tooltip>-->
                      </v-icon>
                    </div>
                  </template>
                  <institutes-list ref="InstituteList" />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-cash-multiple"
                >
                  <template #title>
                    Información de beca
                  </template>
                  <scholarship-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AcademicInformationForm from '../components/student/academic_information/AcademicInformationForm'
  import InstitutesList from '../components/student/academic_information/InstitutesList'
  import ScholarshipForm from '../components/student/academic_information/ScholarshipForm'
  export default {
    name: 'AcademicInformationView',
    components: {
      ScholarshipForm,
      AcademicInformationForm,
      InstitutesList,
    },
    data: () => ({
      tabs: null,
    }),
    methods: {
      showModalASCreate () {
        this.$refs.InstituteList.showInstituteFormAsCreation()
      },
    },
  }
</script>

<style scoped>

</style>
