<template>
  <div>
    <v-select
      v-model="selected"
      item-text="name"
      item-value="id"
      :items="academicGroups"
      label="Grupo"
      :readonly="readonly"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import AcademicGroupService from '../../../services/common/academy/AcademicGroupService'
  export default {
    name: 'AcademicGroupSelect',
    props: {
      universityId: Number,
      majorId: Number,
      academicPeriodId: Number,
      academicPeriodNumberId: Number,
      readonly: Boolean,
      defaultSelected: Number,
    },
    data () {
      return {
        selected: this.defaultSelected,
        academicGroups: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      universityId: function () {
        this.academicGroups = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      majorId: function () {
        this.academicGroups = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      academicPeriodId: function () {
        this.academicGroups = [
          { id: null, name: 'Seleccione' },
        ]
        this.selected = null
        this.fillSelect()
      },
      academicPeriodNumberId: function () {
        this.academicGroups = [
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
        if (this.universityId && this.majorId && this.academicPeriodId && this.academicPeriodNumberId) {
          AcademicGroupService.get(this.universityId, this.majorId, this.academicPeriodId, this.academicPeriodNumberId).then(
            academicGroups => academicGroups.data.data.forEach(
              element => this.academicGroups.push(element),
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
