const url = "http://192.168.1.86/";
const role = {
  admin: "admin",
  mahasiswa: "mahasiswa",
  dosen: "dosen",
}

export const RoutesApi = {
  login: url + "api/login",
  tasksAdmin: url + `api/${role.admin}/tasks`,
  contractAdmin: url + `api/${role.admin}/contract`,
};
