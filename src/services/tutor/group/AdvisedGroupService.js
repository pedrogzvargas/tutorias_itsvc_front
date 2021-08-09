import Service from '../../Service'

const resource = 'tutor/group'

export default {
  get (advisedGroupId) {
    return Service.get(`${resource}/${advisedGroupId}/detail/`)
  },
}
