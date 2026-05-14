import { useContext } from "react";
import { authContext } from "../auth.context";
import { register, login, getMe, logout } from "../Services/auth.api";

export const useAuth = () => {
    const context = useContext(authContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ username, password }) => {
        setLoading(true)
        try {
            const data = await login({ username, password })
            setUser(data.user)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ email, username, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister
    }


}