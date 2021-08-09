<template>
  <v-container
    id="general-information-view"
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
              >Información:</span>
              <v-tab
                class="mr-3"
                href="#tab-1"
              >
                <v-icon class="mr-2">
                  mdi-book-account
                </v-icon>
                General
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-hospital-box
                </v-icon>
                Médica
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-3"
              >
                <v-icon class="mr-2">
                  mdi-currency-usd
                </v-icon>
                Económica
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
                  icon="mdi-book-account"
                >
                  <template #title>
                    Información general
                  </template>
                  <personal-information-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-hospital-box"
                >
                  <template #title>
                    Información médica
                    <div class="d-flex justify-end mb-6">
                      <v-icon
                        class="mx-1"
                        @click="showModalASCreate"
                      >
                        mdi-pencil-plus
                      </v-icon>
                    </div>
                  </template>
                  <deficiency-list ref="DeficiencyList" />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-currency-usd"
                >
                  <template #title>
                    Información económica
                  </template>
                  <income-form />
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
  import PersonalInformationForm from '../components/student/general_information/PersonalInformationForm'
  import DeficiencyList from '../components/student/general_information/deficiencyList'
  import IncomeForm from '../components/student/general_information/IncomeForm'
  export default {
    name: 'GeneralInformationView',
    components: {
      PersonalInformationForm,
      DeficiencyList,
      IncomeForm,
    },
    data: () => ({
      tabs: null,
      isEditing: null,
      items: ['Instituto Tecnológico Superior de Venustiano Carranza', 'Instituto Tecnológico Superior de Poza Rica'],
    }),
    methods: {
      showModalASCreate () {
        this.$refs.DeficiencyList.showDeficiencyFormAsCreation()
      },
    },
  }
</script>

<style scoped>

</style>
