import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students/subject'

export default {
  get (tutorSubjectId, params = {}) {
    return Service.get(`${resource}/${tutorSubjectId}/`, {
      params: params,
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
