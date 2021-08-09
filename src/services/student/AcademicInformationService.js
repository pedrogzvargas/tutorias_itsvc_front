import Service from '../Service'

const resource = 'students'

export default {
    get (StudentId) {
        return Service.get(`${resource}/${StudentId}/academic-information/`)
    },
    post (StudentId, academicInformationId, payload) {
      return Service.post(`${resource}/${StudentId}/academic-information/`, payload)
    },
    put (StudentId, academicInformationId, payload) {
        return Service.put(`${resource}/${StudentId}/academic-information/${academicInformationId}/`, payload)
    },
}
