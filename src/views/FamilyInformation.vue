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
                  mdi-human-male
                </v-icon>
                Padre
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-human-female
                </v-icon>
                Madre
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-3"
              >
                <v-icon class="mr-2">
                  mdi-human-male-female
                </v-icon>
                Hermanos
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
                  icon="mdi-human-male"
                >
                  <template #title>
                    Información general
                  </template>
                  <father-general-information-form />
                </material-card>
              </v-card-text>
              <v-card-text>
                <material-card
                  color="#278894"
                  icon="mdi-map-marker"
                >
                  <template #title>
                    Dirección
                  </template>

                  <father-address-form />
                </material-card>
              </v-card-text>
              <v-card-text>
                <material-card
                  color="#4c61af"
                  icon="mdi-phone"
                >
                  <template #title>
                    Contacto
                  </template>
                  <father-contact-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-human-male"
                >
                  <template #title>
                    Información general
                  </template>
                  <mother-general-information-form />
                </material-card>
              </v-card-text>
              <v-card-text>
                <material-card
                  color="#278894"
                  icon="mdi-map-marker"
                >
                  <template #title>
                    Dirección
                  </template>
                  <mother-address-form />
                </material-card>
              </v-card-text>
              <v-card-text>
                <material-card
                  color="#4c61af"
                  icon="mdi-phone"
                >
                  <template #title>
                    Contacto
                  </template>
                  <mother-contact-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-human-male-female"
                >
                  <template #title>
                    Información hermanos
                    <div class="d-flex justify-end mb-6">
                      <!--                      <v-tooltip bottom>-->
                      <v-icon
                        class="mx-1"
                        @click="showModalASCreate"
                      >
                        mdi-pencil-plus
                      </v-icon>
                    </div>
                  </template>
                  <siblings-list ref="SiblingsList" />
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
  import FatherGeneralInformationForm
    from '../components/student/family_information/father/FatherGeneralInformationForm'
  import FatherAddressForm from '../components/student/family_information/father/FatherAddressForm'
  import FatherContactForm from '../components/student/family_information/father/FatherContactForm'
  import MotherGeneralInformationForm
    from '../components/student/family_information/mother/MotherGeneralInformationForm'
  import MotherAddressForm from '../components/student/family_information/mother/MotherAddressForm'
  import MotherContactForm from '../components/student/family_information/mother/MotherContactForm'
  import SiblingsList from '../components/student/family_information/siblings/SiblingsList'
  export default {
    name: 'FamilyInformationView',
    components: {
      MotherGeneralInformationForm,
      FatherGeneralInformationForm,
      FatherAddressForm,
      MotherAddressForm,
      FatherContactForm,
      MotherContactForm,
      SiblingsList,
    },
    data: () => ({
      tabs: null,
      isEditing: null,
    }),
    methods: {
      showModalASCreate () {
        this.$refs.SiblingsList.showSiblingFormAsCreation()
      },
    },
  }
</script>

<style scoped>

</style>
