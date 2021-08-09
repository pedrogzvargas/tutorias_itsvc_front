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
        <app-card class="mt-4 text-center">
          <v-img
            class="rounded-circle elevation-6 mt-n12 d-inline-block"
            :src="data.profileImage"
            width="128"
          />

          <v-card-text class="text-center">
            <h4 class="text-h3 mb-1 text--primary">
              {{ this.data.fullName }}
            </h4>

            <h6 class="text-h5 mb-2 text--secondary">
              11VC0091
            </h6>

            <p class="text--secondary">
              pedro.gzvargas@gmail.com
            </p>
            <profile-form
              v-if="isEditing"
              :student-id=studentId
              is-editing="true"
            ></profile-form>
            <v-btn
              class="mr-0"
              color="primary"
              min-width="100"
              @click="isEditing = !isEditing"
              v-if="!isEditing"
              rounded
            >
              Editar
            </v-btn>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ProfileForm from '../components/student/ProfileForm'
  import { get } from 'vuex-pathify'
  export default {
    name: 'UserProfileView',
    components: {
      ProfileForm,
    },
    data: () => ({
      tabs: null,
      isEditing: null,
      studentId: 1,
    }),
    computed: {
      ...get('user', [
        'data',
      ]),
    },
  }
</script>
