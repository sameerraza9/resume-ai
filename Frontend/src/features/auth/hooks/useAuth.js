import { useContext, useEffect } from "react";
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
            console.log("Login successful:", data.user);
            
        } catch (error) {
            console.error("Login errorrrrrr:", error);
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


    useEffect(()=>{

        const getAndSetUser=async()=>{
            const data= await getMe()
            setUser(data.user)
            setLoading(false)
        }

        getAndSetUser()

    },[])


    return {
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister
    }


}