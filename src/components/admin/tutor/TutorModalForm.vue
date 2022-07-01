<template>
  <div>
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-dialog
      v-model="show"
      max-width="740px"
    >
      <v-card class="pa-8">
        <p class="text-h6">
          Datos de tutor
        </p>
        <v-divider />
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent=""
        >
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.first_name"
                :rules="firstNameRules"
                label="Nombre"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.second_name"
                :rules="secondNameRules"
                label="Segundo nombre"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.last_name"
                :rules="lastNameRules"
                label="Apellido paterno"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.second_last_name"
                :rules="secondLastNameRules"
                label="Apellido materno"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.username"
                :rules="userNameRules"
                label="Usuario"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                :hint="passwordHint"
                persistent-hint
                outlined
                autocomplete="new-password"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Correo"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <university-select
                :default-selected="form.university_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.university_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <major-select
                :university-id="form.university_id"
                :default-selected="form.academic_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.academic_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0 px-10"
            >
              <v-switch
                v-model="form.is_active"
                inset
                :label="form.is_active ? 'Tutor activo': 'Tutor inactivo'"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="resetValidation"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="persist"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import TutorService from '../../../services/tutor/tutor/TutorService'
  import TutorsService from '../../../services/tutor/tutor/TutorsService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import UniversitySelect from '../../common/academic/UniversitySelect'
  import MajorSelect from '../../common/academic/MajorSelect'
  export default {
    name: 'TutorModalForm',
    components: {
      UniversitySelect,
      MajorSelect,
      ActionNotifier,
    },
    props: {
      mode: String,
      currentRecord: Object,
    },
    data () {
      return {
        show: false,
        showPassword: false,
        valid: false,
        birthDateMenu: false,
        actionMessage: null,
        actionMessageColor: null,
        form: {
          first_name: null,
          second_name: null,
          last_name: null,
          second_last_name: null,
          email: null,
          username: null,
          password: null,
          is_active: null,
          university_id: null,
          academic_id: null,
        },
        firstNameRules: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length <= 100) || 'Nombre debe ser menor de 100 caracteres',
        ],
        lastNameRules: [
          v => !!v || 'Apellido paterno es requerido',
          v => (v && v.length <= 100) || 'Apellido paterno debe ser menor de 100 caracteres',
        ],
        userNameRules: [
          v => !!v || 'Nombre de usuario es requerido',
          v => (v && v.length <= 100) || 'Nombre de usuario debe ser menor de 100 caracteres',
        ],
        emailRules: [
          v => !!v || 'E-mail es requerido',
          v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
        ],
      }
    },
    computed: {
      secondNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Segundo nombre debe ser menor o igual a 100 caracteres']
        return this.form.second_name ? rules : []
      },
      secondLastNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Apellido materno debe ser menor o igual a 100 caracteres']
        return this.form.second_last_name ? rules : []
      },
      passwordRules () {
        const rules = [v => (v && v.length <= 100) || 'Contraseña debe ser menor o igual a 100 caracteres']
        return this.mode === 'create' ? rules : []
      },
      passwordHint () {
        return this.mode === 'edit' ? 'Si no deseas cambiar la contraseña, deja este campo en blanco' : ''
      },
    },
    watch: {
      currentRecord (currentRecord) {
        if (this.mode === 'edit' && currentRecord) {
          this.form.first_name = currentRecord.first_name
          this.form.second_name = currentRecord.second_name
          this.form.last_name = currentRecord.last_name
          this.form.second_last_name = currentRecord.second_last_name
          this.form.username = currentRecord.username
          this.form.email = currentRecord.email
          this.form.university_id = currentRecord.university_id
          this.form.academic_id = currentRecord.academic_id
          this.form.is_active = currentRecord.is_active
        } else {
          this.reset()
        }
      },
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
        this.form.university_id = null
        this.form.academic_id = null
      },
      resetValidation () {
        this.show = false
        this.$refs.form.resetValidation()
      },
      createTutor () {
        TutorsService.post(this.form).then(
          (response) => {
            this.$emit('listUpdated')
            this.notify('Agregado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo agregar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      updateTutor () {
        this.form.password = this.form.password ? this.form.password : null
        TutorService.put(this.currentRecord.id, this.form).then(
          (response) => {
            this.$emit('listUpdated')
            this.notify('Actualizado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      persist () {
        if (this.$refs.form.validate()) {
          if (this.mode === 'create') {
            this.createTutor()
          } else {
            this.updateTutor()
          }
          this.show = false
          this.reset()
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
