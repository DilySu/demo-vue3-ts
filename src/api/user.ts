import request from "@/utils/request";
import { LoginUser } from "@/types";

export function login(data: LoginUser) {
  return request.post("/login", data);
}
