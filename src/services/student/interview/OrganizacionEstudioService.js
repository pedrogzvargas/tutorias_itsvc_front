import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/organizacion-estudio/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/organizacion-estudio/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/organizacion-estudio/`, payload)
  },
}
