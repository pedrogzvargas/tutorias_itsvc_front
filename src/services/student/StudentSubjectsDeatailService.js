import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId, search = '', page = 1) {
    return Service.get(`${resource}/${studentId}/subject-details/`, {
      params: {
        search: search,
        page: page,
      },
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
