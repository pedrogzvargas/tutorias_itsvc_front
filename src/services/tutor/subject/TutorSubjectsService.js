import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor'

export default {
  get (tutorId, search = '', page = 1) {
    return Service.get(`${resource}/${tutorId}/subject/`, {
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
