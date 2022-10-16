import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor/group'

export default {
  get (advisedGroupId) {
    return Service.get(`${resource}/${advisedGroupId}/detail/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
