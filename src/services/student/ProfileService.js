import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'users'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/profile/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/profile/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
