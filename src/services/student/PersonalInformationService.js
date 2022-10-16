import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
    get (id) {
        return Service.get(
          `${resource}/${id}/personal-information/`, {
            headers: {
              Authorization: `token ${store.getters['user/userToken']}`,
            },
          })
    },
    put (id, data) {
      return Service.put(
        `${resource}/${id}/personal-information/`,
        data, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
    post (id, data) {
      return Service.post(
        `${resource}/${id}/personal-information/`,
        data, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
}
