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
            :src="data.profileImage ? data.profileImage : require('@/assets/no-image.png')"
            width="140"
            height="140"
          />

          <v-card-text class="text-center">
            <h4 class="text-h3 mb-1 text--primary">
              {{ this.data.fullName }}
            </h4>

            <h6 class="text-h5 mb-2 text--secondary">
              11VC0091
            </h6>
            <profile-form />
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
      studentId: 1,
    }),
    computed: {
      ...get('user', [
        'data',
      ]),
    },
  }
</script>
