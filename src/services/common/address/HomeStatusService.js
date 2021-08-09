import Service from '../../Service'

const resource = 'common/home-status/'

export default {
  get () {
    return Service.get(resource)
  },
}
