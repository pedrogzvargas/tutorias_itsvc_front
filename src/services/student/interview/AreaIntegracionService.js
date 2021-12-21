import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/area-integracion/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/area-integracion/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/area-integracion/`, payload)
  },
}
