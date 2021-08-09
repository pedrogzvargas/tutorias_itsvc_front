import Service from '../../Service'

const resource = 'academy/university'

export default {
    get (universityId, majorId, periodId) {
        return Service.get(`${resource}/${universityId}/major/${majorId}/period/${periodId}/period-number/`)
    },
}
