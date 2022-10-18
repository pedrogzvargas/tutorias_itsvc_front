import Service from '../../Service'

import store from '../../../store'

const resource = 'students/load-subjects/'

export default {
  post (payload) {
    return Service.post(`${resource}`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
