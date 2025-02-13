// const url = "http://192.168.1.86/";
// const url = "http://192.168.1.93:8000/";
const url = "http://127.0.0.1:8000/";
const role = {
  admin: "admin",
  mahasiswa: "mahasswa",
  lecturer: "lecturer",
};

export const RoutesApi = {
  url: url,
  login: url + "api/login",
  tasksAdmin: url + `api/${role.admin}/tasks`,
  contractAdmin: url + `api/${role.admin}/contract`,
  uniAdmin: url + `api/${role.admin}/universities`,
  classAdmin: url + `api/${role.lecturer}/groups`,
  getAdmin: {
    url: url + `api/${role.admin}/users`,
    intent: "api.user.get.admin",
  },
};
