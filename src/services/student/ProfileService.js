import Service from '../Service'

const resource = 'students'

export default {
  get (id) {
    return Service.get(`${resource}/${id}/`)
  },
}
