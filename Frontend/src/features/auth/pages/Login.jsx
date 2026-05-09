import React from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'


const Login = () => {
    const navigate = useNavigate()

    const { handleLogin, loading } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        handleLogin({ username, password })
    }

    if (loading) {
        return (<main><h1>Loading....</h1></main>)
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="username" id='username' name='username' placeholder='Enter username to Login' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id='password' name='password' placeholder='Enter Password to Login' />
                    </div>

                    <button className='button primary-button'>Login</button>

                </form>

                <p>Dont have an account? <Link to={"/register"}>Register</Link></p>


            </div>
        </main>
    )
}

export default Login