import Service from '../../Service'

import store from '../../../store'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/interview-evaluation/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
