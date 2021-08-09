<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <v-text-field
            v-model="form.first_name"
            label="Nombre"
            outlined
            :readonly="!isEditing"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="3"
        >
          <v-text-field
            v-model="form.second_name"
            label="Segundo nombre"
            outlined
            :readonly="!isEditing"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="3"
        >
          <v-text-field
            v-model="form.last_name"
            label="Apellido paterno"
            outlined
            :readonly="!isEditing"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="3"
        >
          <v-text-field
            v-model="form.second_last_name"
            label="Apellido materno"
            outlined
            :readonly="!isEditing"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click="isEditing = !isEditing"
        >
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!isEditing"
          color="success"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-form>
</template>

<script>
  import ProfileService from '../../services/student/ProfileService'
  export default {
    name: 'ProfileForm',
    props: {
      studentId: Number,
      isEditing: Boolean,
    },
    data: () => ({
      tabs: null,
      isEditing: null,
      form: {
        first_name: '',
        second_name: '',
        last_name: '',
        second_last_name: '',
      },
    }),
    created () {
      ProfileService.get(this.studentId).then(
        (response) => {
          this.form.first_name = response.data.data.first_name
          this.form.second_name = response.data.data.second_name
          this.form.last_name = response.data.data.last_name
          this.form.second_last_name = response.data.data.second_last_name
        },
      )
    },
  }
</script>
