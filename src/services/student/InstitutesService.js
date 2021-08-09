import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/institute/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/institute/`, payload)
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/institute/${instituteId}/`, payload)
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/institute/${instituteId}/`)
  },
}
