import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
    get (StudentId) {
        return Service.get(`${resource}/${StudentId}/academic-information/`, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
    post (StudentId, academicInformationId, payload) {
      return Service.post(`${resource}/${StudentId}/academic-information/`, payload, {
        headers: {
          Authorization: `token ${cookie.get('token')}`,
        },
      })
    },
    put (StudentId, academicInformationId, payload) {
        return Service.put(`${resource}/${StudentId}/academic-information/${academicInformationId}/`, payload, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
}
