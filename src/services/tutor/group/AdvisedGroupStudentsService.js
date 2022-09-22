import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students/academic-information'

export default {
  get (academicInformationId, params = {}) {
    return Service.get(`${resource}/${academicInformationId}/students/`, {
      params: params,
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
