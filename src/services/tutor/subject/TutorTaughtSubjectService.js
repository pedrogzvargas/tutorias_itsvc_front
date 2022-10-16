import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor'

export default {
  get (tutorId, taughtSubjectId) {
    return Service.get(`${resource}/${tutorId}/subject/${taughtSubjectId}/detail/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
