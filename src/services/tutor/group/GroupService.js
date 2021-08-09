import Service from '../../Service'

const resource = 'tutor/group'

export default {
  get (tutorId) {
    return Service.get(`${resource}/${tutorId}/`)
  },
  post (tutorId, payload) {
    return Service.post(`${resource}/${tutorId}/`, payload)
  },
  put (tutorId, payload) {
    return Service.put(`${resource}/${tutorId}/`, payload)
  },
  delete (tutorId) {
    return Service.delete(`${resource}/${tutorId}/`)
  },
}
