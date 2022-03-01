import Service from '../../../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/sibling/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/sibling/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (StudentId, siblingId, payload) {
    return Service.put(`${resource}/${StudentId}/sibling/${siblingId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (StudentId, siblingId) {
    return Service.delete(`${resource}/${StudentId}/sibling/${siblingId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
