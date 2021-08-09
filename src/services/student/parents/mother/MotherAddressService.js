import Service from '../../../Service'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/parent/mother/address/`)
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/parent/mother/address/`, payload)
  },
  put (StudentId, payload) {
    return Service.put(`${resource}/${StudentId}/parent/mother/address/`, payload)
  },
}
