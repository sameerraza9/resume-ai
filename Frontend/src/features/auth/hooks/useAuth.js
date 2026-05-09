import { useContext } from "react";
import { authContext } from "../auth.context";


export const useAuth = () => {
    const context = useContext(authContext)
    const { user, setUser, loading, setLoading } = context
}