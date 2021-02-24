import { AuthService, UserService, SalonService } from "@/services";

export const services = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  salon: SalonService.getInstance()
};
