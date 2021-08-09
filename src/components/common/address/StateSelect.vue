<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="states"
      label="Estado"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import StateService from '../../../services/common/address/StateService'

  export default {
    name: 'StateSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        states: [
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
        StateService.get().then(
          states => states.data.data.forEach(
            element => this.states.push(element),
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
