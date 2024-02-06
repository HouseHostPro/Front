import { boot } from 'quasar/wrappers'
import axios from 'axios'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios


})
export { axios }

/*Vue.use(VueAxios,axios);
const axiosBase = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});



export { axiosBase }*/
