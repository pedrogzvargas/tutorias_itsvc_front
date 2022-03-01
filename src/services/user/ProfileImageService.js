import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'users'

export default {
    get (id) {
        return Service.get(`${resource}/${id}/profile-image/`, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
    post (id, data) {
      return Service.post(`${resource}/${id}/profile-image/`, data, {
        headers: {
          Authorization: `token ${cookie.get('token')}`,
        },
      })
    },
    put (id, data) {
        return Service.put(`${resource}/${id}/profile-image/`, data, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          },
        })
    },
}
