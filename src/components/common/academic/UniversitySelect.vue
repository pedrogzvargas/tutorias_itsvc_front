<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="universities"
      label="Instituto"
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import UniversityService from '../../../services/common/academy/UniversityService'
  export default {
    name: 'UniversitySelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      disabled: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        universities: [
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
      UniversityService.get().then(
        universities => universities.data.data.forEach(
          element => this.universities.push(element),
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
