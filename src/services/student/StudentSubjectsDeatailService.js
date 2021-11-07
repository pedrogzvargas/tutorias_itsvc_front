import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId, search = '', page = 1) {
    return Service.get(`${resource}/${studentId}/subject-details/`, {
      params: {
        search: search,
        page: page,
      },
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
