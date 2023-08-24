import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_END_POINT;

// const headerToken = () => { return localStorage.getItem("token"); };

const headerToken = () => {
  return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzliZjJjMDg4OTViNmYyMDUwZmVmNzM0MDM0OWEyNSIsInN1YiI6IjY0ZGY4YzE1Yjc3ZDRiMTEzZmM2Nzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gEUd59jqUwcUXNCWSAzSazqEr9BCCW9Yi2QPXKRNupU'
};


const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${headerToken()}`,
  }
};

export function ApiCall(Method, endPoint = "") {  
  return new Promise((resolve, reject) => {
    axios[Method](`${apiEndPoint}${endPoint}`, options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
