<template>
  <div>
    <v-autocomplete
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="subjectTypes"
      :readonly="readonly"
      :rules="rules"
      outlined
      label="Tipo materia"
      @change="emitSelected"
    ></v-autocomplete>
  </div>
</template>

<script>
  import SubjectTypeService from '../../../services/common/academy/SubjectTypeService'
  export default {
    name: 'SubjectTypeSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        subjectTypes: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      defaultSelected (value) {
        this.selected = value
      },
    },
    created () {
      SubjectTypeService.get().then(
        subjects => subjects.data.data.forEach(
          element => this.subjectTypes.push(element),
        ),
      ).catch(
        function (error) {
          return Promise.reject(error)
        },
      )
    },
    methods: {
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>
