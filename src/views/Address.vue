<template>
  <v-container
    id="address-information-view"
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
                  mdi-home-circle
                </v-icon>
                Domiciliaria
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
                  icon="mdi-home-circle"
                >
                  <template #title>
                    Información domiciliaria
                  </template>
                  <address-information-form></address-information-form>
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
  import AddressInformationForm from '../components/student/address_information/AddressInformationForm'
  export default {
    name: 'AddressView',
    components: {
      AddressInformationForm,
    },
    data: () => ({
      tabs: null,
      isEditing: null,
      items: ['Instituto Tecnológico Superior de Venustiano Carranza', 'Instituto Tecnológico Superior de Poza Rica'],
    }),
  }
</script>

<style scoped>

</style>
