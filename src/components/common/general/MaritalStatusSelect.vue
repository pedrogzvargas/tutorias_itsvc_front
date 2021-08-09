<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="maritalStatuses"
      label="Estado civil"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import MaritalStatusService from '../../../services/common/general/MaritalStatusService'
  export default {
    name: 'MaritalStatusSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        maritalStatuses: [
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
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        MaritalStatusService.get().then(
          maritalStatuses => maritalStatuses.data.data.forEach(
            element => this.maritalStatuses.push(element),
          ),
        ).catch(
          function (error) {
            return Promise.reject(error)
          },
        )
      },
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>

<style scoped>

</style>
