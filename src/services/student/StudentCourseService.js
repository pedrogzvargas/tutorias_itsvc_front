import Service from '../Service'

const resource = 'course'

export default {
  get (studentId, courseId) {
    return Service.get(`${resource}/${studentId}/course/${courseId}/`)
  },
  post (studentId, courseId, payload) {
    return Service.post(`${resource}/${studentId}/course/${courseId}/`, payload)
  },
}
