import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/motivacion-estudio/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/motivacion-estudio/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/motivacion-estudio/`, payload)
  },
}
