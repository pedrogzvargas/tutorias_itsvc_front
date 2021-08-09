import Service from '../../Service'

const resource = 'tutor/subject'

export default {
  get (taughtSubjectId) {
    return Service.get(`${resource}/${taughtSubjectId}/detail/`)
  },
}
