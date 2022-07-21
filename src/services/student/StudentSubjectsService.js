import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId, params = {}) {
    return Service.get(`${resource}/${studentId}/subject/`, {
      params: params,
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  // get (studentId, search = '', page = 1) {
  //   return Service.get(`${resource}/${studentId}/subject/`, {
  //     params: {
  //       search: search,
  //       page: page,
  //     },
  //     headers: {
  //       Authorization: `token ${cookie.get('token')}`,
  //     },
  //   })
  // },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/subject/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (studentId, studentSubjectId, payload) {
    return Service.put(`${resource}/${studentId}/subject/${studentSubjectId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (studentId, studentSubjectId) {
    return Service.delete(`${resource}/${studentId}/subject/${studentSubjectId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
