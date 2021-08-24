import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor/subject'

export default {
  get (taughtSubjectId) {
    return Service.get(`${resource}/${taughtSubjectId}/detail/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
