import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/tecnica-estudio/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/tecnica-estudio/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/tecnica-estudio/`, payload)
  },
}
