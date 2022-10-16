import Service from '../Service'

import store from '../../store'

const resource = 'users'

export default {
    get (id) {
        return Service.get(`${resource}/${id}/profile-image/`, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
    post (id, data) {
      return Service.post(`${resource}/${id}/profile-image/`, data, {
        headers: {
          Authorization: `token ${store.getters['user/userToken']}`,
        },
      })
    },
    put (id, data) {
        return Service.put(`${resource}/${id}/profile-image/`, data, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
}
