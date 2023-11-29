import { useGetUserId } from "../hooks/useGetUserId";
import {ic_bookmark} from 'react-icons-kit/md/ic_bookmark';
import {ic_bookmark_border_outline} from 'react-icons-kit/md/ic_bookmark_border_outline';
import { useState } from "react";
import Icon from "react-icons-kit";



const Saved = () => {
    const [saved, setSaved] = useState(false)
    const userID = useGetUserId()

    const handleClick = () => {
        setSaved((prevSaved) => !prevSaved)
    }

    return (
        <>  
        <button type="button" className="saved_icon" onClick={handleClick}>
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