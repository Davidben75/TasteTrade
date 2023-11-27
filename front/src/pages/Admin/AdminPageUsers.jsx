import axios from "axios";
import { useEffect , useState } from "react";
import { auth } from "../../auth/auth";



const AdminPageUsers = () => {
    const [users, setUsers] = useState([]);

    

    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/all/users`, {headers :auth() })
        .then((res) => {
            setUsers(res.data)
            console.log(res.data)
        })
    },[]);
    


    return (
        <>
        <section className="admin_detail">
        <h1>Tableau de bord administrateur</h1>
        {users &&(
            <table className="table_adimn">
          <thead>
            <tr>
              <th>Nom de l'utilisateur</th>
              <th>Création du compte</th>
              <th>Rôle </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}        
        </section>
        
        </>
      
    );
};

export default AdminPageUsers;