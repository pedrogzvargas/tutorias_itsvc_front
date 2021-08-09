<template>
  <div>
    <!--<v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="subjects"
      label="Materia"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>-->
    <v-autocomplete
      v-model="selected"
      item-value="id"
      item-text="name"
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
  import SubjectService from '../../../services/common/academy/SubjectService'
  export default {
    name: 'SubjectSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        subjects: [
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
      SubjectService.get().then(
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
