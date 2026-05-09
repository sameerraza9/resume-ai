import { useContext } from "react";
import { authContext } from "../auth.context";
import { register, login, getMe, logout } from "../Services/auth.api";

export const useAuth = () => {
    const context = useContext(authContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ username, password }) => {
        setLoading(true)
        const data = await login({ username, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({ email, username, password }) => {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister
    }
    

}