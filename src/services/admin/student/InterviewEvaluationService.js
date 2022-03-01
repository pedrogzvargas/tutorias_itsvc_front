import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/interview-evaluation/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
