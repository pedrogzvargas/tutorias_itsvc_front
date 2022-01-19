import Service from '../Service'

const resource = 'users'

export default {
    get (id) {
        return Service.get(`${resource}/${id}/profile-image/`)
    },
    post (id, data) {
      return Service.post(`${resource}/${id}/profile-image/`, data)
    },
    put (id, data) {
        return Service.put(`${resource}/${id}/profile-image/`, data)
    },
}
