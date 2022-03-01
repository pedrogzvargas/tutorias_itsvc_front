import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
    get (id) {
        return Service.get(
          `${resource}/${id}/personal-information/`, {
            headers: {
              Authorization: `token ${cookie.get('token')}`,
            },
          })
    },
    put (id, data) {
      return Service.put(
        `${resource}/${id}/personal-information/`,
        data, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
    post (id, data) {
      return Service.post(
        `${resource}/${id}/personal-information/`,
        data, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
}
