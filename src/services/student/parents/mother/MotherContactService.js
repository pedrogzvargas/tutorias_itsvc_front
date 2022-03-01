import Service from '../../../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/parent/mother/phone/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/parent/mother/phone/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
