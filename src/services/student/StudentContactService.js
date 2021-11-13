import Service from '../Service'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/phone/`)
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/phone/`, payload)
  },
}
