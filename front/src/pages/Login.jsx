import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email.trim() || !user.password.trim()) {
      return alert("Veuillez remplir tous les champs.");
    }

    axios.post(`${process.env.REACT_APP_API}/login`, user)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          // Change route if connexion success
          navigate('/');
          // Reload 
          window.location.reload() 
        }
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
        console.error(error);
      });
  };

  return (
    <form className='form_login' method='post' onSubmit={handleSubmit}>
      <h1>Se connecter !</h1>
      <label>
        Email :
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label> <br />

      <label>
        Mot de passe :
        <input
          type="password"
          name="password"
          onChange={handleChange}
        />
      </label> <br />

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
