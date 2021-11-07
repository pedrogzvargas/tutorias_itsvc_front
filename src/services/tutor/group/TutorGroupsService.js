import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor'

export default {
  get (tutorId, search = '', page = 1) {
    return Service.get(`${resource}/${tutorId}/group/`, {
      params: {
        search: search,
        page: page,
      },
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (payload) {
    return Service.post(`${resource}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
