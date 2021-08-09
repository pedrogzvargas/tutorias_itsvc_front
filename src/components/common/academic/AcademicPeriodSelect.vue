<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="academicPeriods"
      label="Periodo"
      :readonly="readonly"
      outlined
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import AcademicPeriodService from '../../../services/common/academy/AcademicPeriodService'
  export default {
    name: 'AcademicPeriodSelect',
    props: {
      universityId: Number,
      majorId: Number,
      defaultSelected: Number,
      readonly: Boolean,
    },
    data () {
      return {
        selected: this.defaultSelected,
        academicPeriods: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      universityId: function () {
        this.academicPeriods = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      majorId: function () {
        this.academicPeriods = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      defaultSelected (value) {
        this.selected = value
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        if (this.universityId && this.majorId) {
          AcademicPeriodService.get(this.universityId, this.majorId).then(
            adademicPeriods => adademicPeriods.data.data.forEach(
              element => this.academicPeriods.push(element),
            ),
          ).catch(
            function (error) {
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
