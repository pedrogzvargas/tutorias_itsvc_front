import Service from '../../Service'

import store from '../../../store'

const resource = 'students/subject'

export default {
  get (tutorSubjectId, params = {}) {
    return Service.get(`${resource}/${tutorSubjectId}/`, {
      params: params,
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
