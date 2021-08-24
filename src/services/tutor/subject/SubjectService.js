import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor/subject'

export default {
  get (subjectId) {
    return Service.get(`${resource}/${subjectId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (subjectId, payload) {
    return Service.post(`${resource}/${subjectId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (subjectId, payload) {
    return Service.put(`${resource}/${subjectId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (subjectId) {
    return Service.delete(`${resource}/${subjectId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
