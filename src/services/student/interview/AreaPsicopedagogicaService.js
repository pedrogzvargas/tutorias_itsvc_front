import Service from '../../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/area-psicopedagogica/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/area-psicopedagogica/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/area-psicopedagogica/`, payload)
  },
}
