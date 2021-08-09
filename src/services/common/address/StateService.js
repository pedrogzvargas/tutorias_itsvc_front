import Service from '../../Service'

const resource = 'common/state/'

export default {
  get () {
    return Service.get(resource)
  },
}
