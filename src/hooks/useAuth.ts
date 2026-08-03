import { useAuthContext } from "../context/AuthContext";
export type { AuthContextType as UseAuthReturn } from "../context/AuthContext";

export function useAuth() {
  return useAuthContext();
}
