import axios from 'axios';
import queryString from 'query-string';

const API_URL = "https://firestore.googleapis.com/v1/projects/loopbackfirestore/databases/(default)/documents/cryptopop-main/?pageSize=1000";


//TODO: handle logic for intercept jwt token and refresh token when it expired
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  // @ts-ignore
  paramsSerializer: (params: any) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  console.log("config",config);
  
  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  }
  console.log(response);
  
  return response;
}, (error) => {
  throw error;
// Handle errors
});
export default axiosClient;
