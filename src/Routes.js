const url = "http://192.168.1.86/";
// const url = "http://192.168.31.122:8000/";
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
};
