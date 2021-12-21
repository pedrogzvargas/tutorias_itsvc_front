import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/estilo-aprendizaje/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/estilo-aprendizaje/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/estilo-aprendizaje/`, payload)
  },
}
