<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="homeStatus"
      label="La vivienda es"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import HomeStatusService from '../../../services/common/address/HomeStatusService'

  export default {
    name: 'HomeStatusSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        homeStatus: [
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
        HomeStatusService.get().then(
          homeStatus => homeStatus.data.data.forEach(
            element => this.homeStatus.push(element),
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
