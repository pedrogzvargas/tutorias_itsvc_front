import Service from '../../Service'

const resource = 'academy/subject-type'

export default {
    get (id) {
        return Service.get(`${resource}/`)
    },
}
