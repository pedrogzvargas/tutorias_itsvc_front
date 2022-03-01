import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/estado-psicofisiologico/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/estado-psicofisiologico/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/estado-psicofisiologico/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
