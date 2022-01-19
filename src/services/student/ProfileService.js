import Service from '../Service'

const resource = 'users'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/profile/`)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/profile/`, payload)
  },
}
