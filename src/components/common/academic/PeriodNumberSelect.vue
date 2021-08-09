<template>
  <div>
    <v-select
      v-model="selected"
      item-text="name"
      item-value="id"
      :items="academicPeriodNumber"
      label="Número de periodo"
      :readonly="readonly"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import PeriodNumberService from '../../../services/common/academy/PeriodNumberService'
  export default {
    name: 'PeriodNumberSelect',
    props: {
      universityId: Number,
      majorId: Number,
      academicPeriodId: Number,
      readonly: Boolean,
      defaultSelected: Number,
    },
    data () {
      return {
        selected: this.defaultSelected,
        academicPeriodNumber: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      defaultSelected (newValue) {
        this.selected = newValue
      },
      universityId: function () {
        this.academicPeriodNumber = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      majorId: function () {
        this.academicPeriodNumber = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      academicPeriodId: function () {
        this.academicPeriodNumber = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        if (this.universityId && this.majorId && this.academicPeriodId) {
          PeriodNumberService.get(this.universityId, this.majorId, this.academicPeriodId).then(
            adademicPeriodNumber => adademicPeriodNumber.data.data.forEach(
              element => this.academicPeriodNumber.push(element),
            ),
          ).catch(
            function (error) {
              console.log('Show error notification!')
              return Promise.reject(error)
            },
          )
        }
      },
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>
