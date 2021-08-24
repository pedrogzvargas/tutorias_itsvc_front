import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'tutor/group'

export default {
  get (tutorId) {
    return Service.get(`${resource}/${tutorId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (tutorId, payload) {
    return Service.post(`${resource}/${tutorId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (tutorId, payload) {
    return Service.put(`${resource}/${tutorId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (tutorId) {
    return Service.delete(`${resource}/${tutorId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
