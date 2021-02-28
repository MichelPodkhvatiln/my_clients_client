import {
  AuthService,
  UserService,
  SalonService,
  ServicesService
} from "@/services";

export const services = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  salon: SalonService.getInstance(),
  services: ServicesService.getInstance()
};
