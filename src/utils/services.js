import { AuthService, UserService } from "@/services";

export const services = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
};
