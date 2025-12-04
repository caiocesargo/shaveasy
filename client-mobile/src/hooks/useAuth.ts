import { useQuery } from "@tanstack/react-query";
import { authUtils } from "../utils/auth";

const useAuth = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: authUtils.getAuthenticatedUser,
  });

export default useAuth;
