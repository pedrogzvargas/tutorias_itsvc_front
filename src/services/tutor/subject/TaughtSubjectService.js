import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor/subject'

export default {
  get (taughtSubjectId) {
    return Service.get(`${resource}/${taughtSubjectId}/detail/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
