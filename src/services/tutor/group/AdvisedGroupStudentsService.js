import Service from '../../Service'
import cookie from 'vue-cookies'

const resource = 'students/academic-information'

export default {
  get (academicInformationId) {
    return Service.get(`${resource}/${academicInformationId}/students/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
