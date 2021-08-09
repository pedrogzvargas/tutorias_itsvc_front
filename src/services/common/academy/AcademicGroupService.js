import Service from '../../Service'

const resource = 'academy/university'

export default {
    get (universityId, majorId, periodId, periodNumberId) {
        return Service.get(`${resource}/${universityId}/major/${majorId}/period/${periodId}/period-number/${periodNumberId}/groups/`)
    },
}
