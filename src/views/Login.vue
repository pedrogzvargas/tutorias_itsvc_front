<template>
  <div>
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
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
          md="4"
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
              <v-form
                ref="form"
                lazy-validation
              >
                <v-text-field
                  v-model="form.username"
                  name="login"
                  label="Usuario"
                  prepend-icon="mdi-account-circle-outline"
                  type="text"
                  :rules="[v => !!v || 'Usuario es requerido']"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  prepend-icon="mdi-lock-outline"
                  name="password"
                  label="Contraseña"
                  type="password"
                  :rules="[v => !!v || 'Contraseña es requerida']"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="ma-2"
                color="primary"
                @click="auth"
              >Iniciar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import LoginService from '../services/user/LoginService'
  // Utilities
  import { sync, call } from 'vuex-pathify'
  export default {
    name: 'LoginView',
    data () {
      return {
        form: {
          username: null,
          password: null,
        },
        show: true,
        actionMessage: null,
        actionMessageColor: null,
      }
    },
    computed: {
      ...sync('user', [
        'data',
      ]),
      ...sync('app', [
        'drawerSide',
      ]),
    },
    methods: {
      ...call('user/*'),
      auth () {
        if (this.$refs.form.validate()) {
          console.info(this.$refs.form.validate())
          LoginService.create(this.form).then(
            (response) => {
              this.data.fullName = response.data.data.fullname
              this.data.profileImage = response.data.data.profile_image
              this.data.userId = response.data.data.user_id
              this.data.roles = response.data.data.roles
              this.data.groups = response.data.data.groups
              this.data.token = response.data.data.token
              this.drawerSide = true
              this.update()
              this.$router.push('/profile/')
            },
          ).catch(
            (response) => {
              console.info(response)
              this.notify('No se pudo iniciar sesión, revisa tus credenciales', 'error')
              return Promise.reject(response)
            },
          )
        }
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
