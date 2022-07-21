import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor'

export default {
  get (tutorId, taughtSubjectId) {
    return Service.get(`${resource}/${tutorId}/subject/${taughtSubjectId}/detail/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
