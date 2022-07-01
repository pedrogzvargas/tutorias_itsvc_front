<template>
  <v-container
    id="tutor-groups-view"
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
            <div class="pa-8 white--text">
              <div class="text-h4 font-weight-light">
                Mis grupos asesorados
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
                        mdi-account-multiple-plus
                      </v-icon>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </template>
          <v-card-text>
            <tutor-groups-list
              ref="TutorGroupsList"
              :search="searchValue"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorGroupsList from '../components/tutor/group/TutorGroupsList'
  export default {
    name: 'TutorAdvisedGroups',
    components: {
      TutorGroupsList,
    },
    data: () => ({
      searchValue: '',
    }),
    methods: {
      showModalASCreate () {
        this.$refs.TutorGroupsList.showGroupFormAsCreation()
      },
      filterList () {
        this.$refs.TutorGroupsList.page = 1
        this.$refs.TutorGroupsList.fillGroups()
      },
    },
  }
</script>

<style scoped>

</style>
