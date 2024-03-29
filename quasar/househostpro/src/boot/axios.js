import { boot } from 'quasar/wrappers'
import axios from 'axios'

export default boot(({ app,router }) => {
  app.config.globalProperties.$axios = axios

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  axios.interceptors.request.use(function (config){

    console.log("Status ok",config);
    config.withCredentials = true;
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}`;
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
      if (error.response && error.response.status === 400 || error.response && error.response.status === 401){
        router.push("/login");
      }
      return Promise.reject(error);
    });
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.fullPath !== '/login') {
      next('/login');
    } else {
      next();
    }
  });
})
export { axios }
