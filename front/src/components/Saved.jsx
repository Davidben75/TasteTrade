import { useGetUserId } from "../hooks/useGetUserId";
import {ic_bookmark} from 'react-icons-kit/md/ic_bookmark';
import {ic_bookmark_border_outline} from 'react-icons-kit/md/ic_bookmark_border_outline';
import { useState } from "react";
import Icon from "react-icons-kit";
import axios from "axios";
import { auth } from "../auth/auth";



const Saved = ({recipeID}) => {
    const [saved, setSaved] = useState(false)
 
    const userID = useGetUserId()

    const handleClick = (recipeID) => {
        if (!userID){
            return alert("Tu dois être connecté !")
        }
        console.log(userID);
      
        axios.put(`${process.env.REACT_APP_API}/favorite`, { recipeID, userID }, {headers : auth() })
          .then((res) => {
            console.log(res.data);
            setSaved(true)
            alert("Recette bien ajouté à vos favoris")
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <>  
        <button type="button" className="saved_icon" onClick={() =>  handleClick(recipeID)}>
            {saved ?
            (<Icon icon={ic_bookmark} size={18}/>) 
            : 
            (<Icon icon={ic_bookmark_border_outline} size={18}/>)
            }
        </button>
        </>
    );
};

export default Saved;