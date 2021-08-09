<template>
  <v-main>
    <v-container
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="6"
        >
          <v-card class="elevation-10">
            <div
              align="center"
              class="py-5"
            >
              <img
                :src="require('@/assets/pit_logo.png')"
                width="290"
                height="130"
              >
            </div>
            <v-card-text>
              <v-form>
                <v-text-field
                  name="login"
                  label="Usuario"
                  prepend-icon="mdi-account-circle-outline"
                  type="text"
                  v-model="form.username"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock-outline"
                  name="password"
                  label="Contraseña"
                  type="password"
                  v-model="form.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="ma-2"
                color="primary"
                v-on:click.prevent="auth"
              >Iniciar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import LoginService from '../services/user/LoginService'
  // Utilities
  import { sync } from 'vuex-pathify'
  export default {
    name: 'LoginView',
    data () {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true,
      }
    },
    computed: {
      ...sync('user', [
        'data',
      ]),
    },
    methods: {
      auth () {
        LoginService.create(this.form).then(
          (response) => {
            this.data.fullName = response.data.data.fullname
            this.data.profileImage = response.data.data.profile_image
            this.data.token = response.data.data.token
            this.data.roles = response.data.data.roles
            this.$router.push('/student/profile/')
          },
        )
      },
    },
  }
</script>
