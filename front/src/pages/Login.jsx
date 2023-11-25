
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [message, setMessage] = useState()
    const [user, setUser] = useState({
        email : "",
        password : ""
    });

    function handleChange (e) {
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    }

    function handleSubmit (e){
        e.preventDefault();
        if(!user.email){
            return alert("Email vide")
        } else if  (!user.password){
            return alert("Mot de passe vide")
        }
        axios.post(`${process.env.REACT_APP_API}/login`, user)
        .then((res) => {
            setMessage(res.data)
        })
    }


    return (
        <form className='form_login' method='post' onSubmit={handleSubmit}>
        <h1> Se connecter !</h1>
            <label>
                Email : 
                <input 
                type="email" 
                name="email" 
                value={user.email}
                onChange={handleChange}
                />
            </label>  <br/><br/>

            <label>
                Mot de passe : 
                <input 
                type="password" 
                name="password"
                onChange={handleChange}
                 />
            </label>  <br/><br/>

            <button type='submit'>
                Se connecter
            </button>

            {message && (
                <p>{message}</p>
            )}

        </form>
    );
};

export default Login;