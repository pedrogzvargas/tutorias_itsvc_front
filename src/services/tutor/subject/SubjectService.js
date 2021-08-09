import Service from '../../Service'

const resource = 'tutor/subject'

export default {
  get (subjectId) {
    return Service.get(`${resource}/${subjectId}/`)
  },
  post (subjectId, payload) {
    return Service.post(`${resource}/${subjectId}/`, payload)
  },
  put (subjectId, payload) {
    return Service.put(`${resource}/${subjectId}/`, payload)
  },
  delete (subjectId) {
    return Service.delete(`${resource}/${subjectId}/`)
  },
}
