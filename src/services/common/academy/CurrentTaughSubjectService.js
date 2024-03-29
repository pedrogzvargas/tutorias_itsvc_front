import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor/subject/current-as-catalog'

export default {
  get () {
    return Service.get(`${resource}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
