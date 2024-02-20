import { boot } from 'quasar/wrappers'
import axios from 'axios'

export default boot(({ app,router }) => {
  app.config.globalProperties.$axios = axios

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  axios.interceptors.request.use(function (config){

    console.log("Status ok",config);
    config.withCredentials = true;
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}` ;
    return config;
  },function (error){
    console.log("Status ko",error);
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response){
      console.log("Status ok",response.status);
      return response.data;
    },function (error){
      console.log("Status ko",error);
      if (error.response && error.response.status === 401){
        router.push("/login");
      }
      return Promise.reject(error);
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
