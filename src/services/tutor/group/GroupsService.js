import Service from '../../Service'

const resource = 'tutor/group'

export default {
  get (search = '', page = 1) {
    return Service.get(`${resource}/`, { params: { search: search, page: page } })
  },
  post (payload) {
    return Service.post(`${resource}/`, payload)
  },
}
