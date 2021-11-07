import Service from '../../Service'

const resource = 'academy/subject-failure-metric'

export default {
    get (id) {
        return Service.get(`${resource}/`)
    },
}
