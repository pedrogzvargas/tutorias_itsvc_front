<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="houseType"
      label="Tipo de vivienda"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import HousingTypeService from '../../../services/common/address/HousingTypeService'

  export default {
    name: 'HouseTypeSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        houseType: [
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
        HousingTypeService.get().then(
          houseType => houseType.data.data.forEach(
            element => this.houseType.push(element),
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
