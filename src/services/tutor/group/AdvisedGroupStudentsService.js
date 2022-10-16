import Service from '../../Service'

import store from '../../../store'

const resource = 'students/academic-information'

export default {
  get (academicInformationId, params = {}) {
    return Service.get(`${resource}/${academicInformationId}/students/`, {
      params: params,
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
