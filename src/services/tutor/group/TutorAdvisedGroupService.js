import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor'

export default {
  get (tutorId, advisedGroupId) {
    return Service.get(`${resource}/${tutorId}/group/${advisedGroupId}/detail/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
