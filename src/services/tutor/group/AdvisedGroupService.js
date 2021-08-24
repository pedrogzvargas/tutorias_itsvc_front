import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor/group'

export default {
  get (advisedGroupId) {
    return Service.get(`${resource}/${advisedGroupId}/detail/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
