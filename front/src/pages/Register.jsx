/* eslint-disable no-useless-escape */
import { useState } from "react";
import axios from "axios";
import Icon from 'react-icons-kit'
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'
import {basic_exclamation} from 'react-icons-kit/linea/basic_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check'

const Register = () => {
    const [message , setMessage] = useState()

    // validation states
    const [lowerValidated, setLowerValidated] = useState(false)
    const [upperValidated, setUpperValidated] = useState(false)
    const [numberValidated, setNumberValidated] = useState(false)
    const [specialValidated, setSpecialValidated] = useState(false)
    const [lengthValidated, setLengthValidated] = useState(false)

    const [type, setType] = useState("password")
    const [user , setUser] = useState({
        email : "",
        username : "",
        password : "",
    })

    

    function handleChange (e) {
        const {name, value} = e.target
        setUser({...user, [name] : value})

        
        if(name === "password"){
            const lower = new RegExp('(?=.*[a-z])')
            const upper = new RegExp('(?=.*[A-Z])')
            const number = new RegExp('(?=.*[0-9])')
            const special = new RegExp('(?=.*[!@#\$‰^&\*])');
            const length = new RegExp('(?=.{8,})')

            // Lower validation
            if(lower.test(value)){
                setLowerValidated(true)
            }else{
                setLowerValidated(false)
            }

            // Upper Validation
            if(upper.test(value)){
                setUpperValidated(true)
            }else{
                setUpperValidated(false)
            }

            // Number validation
            if(number.test(value)){
                setNumberValidated(true)
            }else{
                setNumberValidated(false)
            }
            
            // Special validation
            if(special.test(value)){
                setSpecialValidated(true)
            }else{
                setSpecialValidated(false)
            }

            // Length Validation
            if(length.test(value)){
                setLengthValidated(true)
            }else{
                setLengthValidated(false)
            } 

        }
    }

    function handleSubmit (e){
        e.preventDefault();

        if (!lowerValidated || !upperValidated || !numberValidated || !specialValidated || !lengthValidated){
            return alert('Mot de passe trop faible')
        }

        if (!user.email || !user.username) {
            alert("Les champs email et/ou nom d'utilisateur sont vides");
        } else if (!user.password) {
            alert("Vous avez oublié votre mot de passe");
        } else { 

        axios.post(`${process.env.REACT_APP_API}/register`, user)
        .then((res) => {
          console.log(res.data);
          setMessage(res.data.message)
        })
        .catch((error) => {
          console.error(error);
        });
    }
}
    return (
        <>
    
        <section className="form_login">
            <h2>S'inscrire</h2>
            <form method="post" onSubmit={handleSubmit}
            className="form"
            >
            
            <span className="input-group">  
            <label htmlFor="email" className="input-label">
            Email :   
                <input 
                type="text"
                id="email" 
                name="email"  
                value={user.email}
                onChange={handleChange}
                />
                
                    
                </label>
            </span> 

            <span className="input-group">  
            <label htmlFor="username" className="input-label">
                    Nom d'utilisateur : 
                <input 
                type="text"
                id="username" 
                name="username"  
                value={user.username}
                onChange={handleChange}
                />
                   
                </label>
            </span> 
                
            <br /> <br />

            <span className="input-group">
            <label htmlFor="password" className="input-label">
                    Mot de passe  :
            <input 
                type={type}
                id="password" 
                name="password"
                onChange={handleChange}
                />

                
                </label>

                {type==="password"?(
                    <span className="icon-span"
                    onClick={() => setType("text")}>
                        <Icon  icon={basic_eye_closed} size={18}/>
                    </span>
                ):(
                    <span className="icon-span"
                    onClick={() => setType("password")}>
                        <Icon  icon={basic_eye} size={18}/>
                    </span>
                )}

                <article className="form-tracker">
                    <p className={lowerValidated ?'validated':'not-validated'}>
                    {lowerValidated?(
                        <span className="validated-icon">
                        <Icon icon={arrows_circle_check} />
                        </span>  
                    ):(
                        <span className="not-validated">
                        <Icon icon={basic_exclamation} />
                        </span>  
                    )}
                    Au moins une lettre en minuscule
                    </p> 

                    <p className={upperValidated ?'validated':'not-validated'}>
                    {upperValidated?(
                        <span className="validated-icon">
                        <Icon icon={arrows_circle_check} />
                        </span>  
                    ):(
                        <span className="not-validated">
                        <Icon icon={basic_exclamation} />
                        </span>  
                    )}
                    Au moins une lettre en majuscule
                    </p>

                    <p className={numberValidated ?'validated':'not-validated'}>
                    {numberValidated ?(
                        <span className="validated-icon">
                        <Icon icon={arrows_circle_check} />
                        </span>  
                    ):(
                        <span className="not-validated">
                        <Icon icon={basic_exclamation} />
                        </span>  
                    )}
                    Au moins un chiffre
                    </p>

                    <p className={specialValidated ?'validated':'not-validated'}>
                    {specialValidated ?(
                        <span className="validated-icon">
                        <Icon icon={arrows_circle_check} />
                        </span>  
                    ):(
                        <span className="not-validated">
                        <Icon icon={basic_exclamation} />
                        </span>  
                    )}
                    Au moins un caractère spécial
                    </p>

                    <p className={lengthValidated ?'validated':'not-validated'}>
                    {lengthValidated ?(
                        <span className="validated-icon">
                        <Icon icon={arrows_circle_check} />
                        </span>  
                    ):(
                        <span className="not-validated">
                        <Icon icon={basic_exclamation} />
                        </span>  
                    )}
                    Au moins 8 caractères
                    </p>
                </article>

                
            </span>
                
                
                <br /> <br />

                <button type="submit" className="form-button">
                    Enregistrer
                </button>

                {message && (
                    <p>{message}</p>
                )}
            </form>
        </section>
        
        
        
        </>
    );
};

export default Register;