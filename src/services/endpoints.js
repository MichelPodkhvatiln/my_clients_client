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
    getById: "/salon/get/{:id}",
    create: "/salon/create",
    update: "/salon/update/{:id}",
    delete: "/salon/delete/{:id}"
  },
  services: {
    getList: "/services/get-list",
    create: "/services/create",
    update: "/services/update/{:id}",
    remove: "/services/remove/{:id}"
  },
  masters: {
    getList: "/master/get-list",
    getSalonMasters: "/master/get-salon-masters/{:salonId}",
    getMaster: "/master/get-master/{:id}",
    create: "/master/create",
    remove: "/master/remove/{:id}",
    changeInfo: "/master/change-info/{:id}",
    changeEmail: "/master/change-email/{:id}",
    changePassword: "/master/change-password/{:id}",
    changeSalon: "/master/change-salon",
    changeWorkDays: "/master/change-work-days",
    changeServices: "/master/change-services",
    addDateInfo: "/master/add-date-info",
    removeDateInfo: "/master/remove-date-info"
  },
  record: {
    addRecord: "/record/add-record"
  }
};
