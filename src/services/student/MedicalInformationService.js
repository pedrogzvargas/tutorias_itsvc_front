import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/medical-information/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/medical-information/`, payload)
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/medical-information/${instituteId}/`, payload)
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/medical-information/${instituteId}/`)
  },
}
