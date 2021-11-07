<template>
  <div>
    <v-autocomplete
      v-model="selected"
      item-value="id"
      item-text="subject"
      :items="subjects"
      :readonly="readonly"
      :rules="rules"
      outlined
      label="Materia"
      @change="emitSelected"
    ></v-autocomplete>
  </div>
</template>

<script>
  import CurrentTaughSubjectService from '../../../services/common/academy/CurrentTaughSubjectService'
  export default {
    name: 'CurrentTaughSubjectSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        subjects: [
          { id: null, subject: 'Seleccione' },
        ],
      }
    },
    watch: {
      defaultSelected (value) {
        this.selected = value
      },
    },
    created () {
      CurrentTaughSubjectService.get().then(
        subjects => subjects.data.data.forEach(
          element => this.subjects.push(element),
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
