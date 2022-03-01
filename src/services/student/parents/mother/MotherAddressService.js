import Service from '../../../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/parent/mother/address/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/parent/mother/address/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (StudentId, payload) {
    return Service.put(`${resource}/${StudentId}/parent/mother/address/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
