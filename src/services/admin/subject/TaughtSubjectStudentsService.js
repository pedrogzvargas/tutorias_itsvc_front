import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students/subject'

export default {
  get (tutorSubjectId) {
    return Service.get(`${resource}/${tutorSubjectId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
