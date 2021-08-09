import Service from '../../Service'

const resource = 'academy/university'

export default {
    get (id) {
        return Service.get(`${resource}/${id}/major/`)
    },
}
