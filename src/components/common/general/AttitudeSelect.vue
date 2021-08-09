<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="attitudes"
      label="Actitud"
      :readonly="readonly"
      :rules="rules"
      outlined
      :dense="dense"
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import AttitudeService from '../../../services/common/general/AttitudeService'

  export default {
    name: 'AttitudeSelect',
    props: {
      defaultSelected: Number,
      dense: Boolean,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        attitudes: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      defaultSelected (newValue, oldValue) {
        this.selected = newValue
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        AttitudeService.get().then(
          attitudes => attitudes.data.data.forEach(
            element => this.attitudes.push(element),
          ),
        ).catch(
          function (error) {
            console.log('Show error notification!')
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
