import { boot } from 'quasar/wrappers'
import axios from 'axios'

export default boot(({ app,router }) => {
  app.config.globalProperties.$axios = axios

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  axios.interceptors.request.use(function (config){

    console.log("Status ok",config);
    config.withCredentials = true;
    config.headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`) ;
    return config;
  },function (rej){
    console.log("Status ko",rej.response.status);
  });

  axios.interceptors.response.use(function (response){
      console.log("Status ok",response.status);
      return response.data;
    },function (rej){
      console.log("Status ko",rej.response.status);
      router.push("/")
    }
  )
})
export { axios }

/*Vue.use(VueAxios,axios);
const axiosBase = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});



export { axiosBase }*/
