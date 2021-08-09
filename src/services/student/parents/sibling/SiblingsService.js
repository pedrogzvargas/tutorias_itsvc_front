import Service from '../../../Service'

const resource = 'students'

export default {
  get (StudentId) {
    return Service.get(`${resource}/${StudentId}/sibling/`)
  },
  post (StudentId, payload) {
    return Service.post(`${resource}/${StudentId}/sibling/`, payload)
  },
  put (StudentId, siblingId, payload) {
    return Service.put(`${resource}/${StudentId}/sibling/${siblingId}/`, payload)
  },
  delete (StudentId, siblingId) {
    return Service.delete(`${resource}/${StudentId}/sibling/${siblingId}/`)
  },
}
