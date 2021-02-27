export const endpoints = {
  auth: {
    login: "/auth/login",
    signUp: "/auth/sign-up"
  },
  user: {
    getUser: "/user/get-user"
  },
  salon: {
    getList: "/salon/get-list",
    create: "/salon/create",
    update: "/salon/update/{:id}",
    delete: "/salon/delete/{:id}"
  },
  services: {
    getList: "/services/get-list",
    create: "/services/create",
    update: "/services/update/{:id}",
    remove: "/services/remove/{:id}"
  }
};
