import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor'

export default {
  get (tutorId, advisedGroupId) {
    return Service.get(`${resource}/${tutorId}/group/${advisedGroupId}/detail/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
