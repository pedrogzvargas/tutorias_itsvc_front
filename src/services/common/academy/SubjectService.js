import Service from '../../Service'

const resource = 'academy/subject'

export default {
    get (id) {
        return Service.get(`${resource}/`)
    },
}
