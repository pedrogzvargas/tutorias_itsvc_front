import Service from '../../Service'

const resource = 'academy/university'

export default {
    get (universityId, majorId) {
        return Service.get(`${resource}/${universityId}/major/${majorId}/period/`)
    },
}
