import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/estado-psicofisiologico/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/estado-psicofisiologico/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/estado-psicofisiologico/`, payload)
  },
}
