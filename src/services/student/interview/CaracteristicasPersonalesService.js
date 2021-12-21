import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/caracteristicas-personales/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/caracteristicas-personales/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/caracteristicas-personales/`, payload)
  },
}
