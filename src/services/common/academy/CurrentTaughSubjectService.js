import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor/subject/current-as-catalog'

export default {
  get () {
    return Service.get(`${resource}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
