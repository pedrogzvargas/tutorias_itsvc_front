import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/job/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/job/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/job/`, payload)
  },
}
