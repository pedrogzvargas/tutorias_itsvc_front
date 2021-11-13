import Service from '../Service'

const resource = 'users'

export default {
  get (id) {
    return Service.get(`${resource}/${id}/profile/`)
  },
}
