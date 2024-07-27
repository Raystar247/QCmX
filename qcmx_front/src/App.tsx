import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import { useForm } from 'react-hook-form';

const BACKEND_URL: string = "http://localhost:3000";

type UserType = {
  id: string;
  username: string;
}

type UserRegisterFormType = {
  username: string;
}

const Home: React.FC = () => {

  const { register, handleSubmit } = useForm<UserRegisterFormType>();
  
  const [users, setUsers] = useState<UserType[]>([]);

  const addUser = async (event: UserRegisterFormType) => {
    const { username } = event;
    console.log(username);
    await axios.post(`${BACKEND_URL}/user/register`, {
              data: { username }
            })
            .then((response) => {
              console.log(response.data);
              const username = response.data;
              setUsers((_preUsers) => [username, ..._preUsers]);
            })
            .catch((error) => { console.log(error); });
  }

  useEffect(() => {
    axios.get(BACKEND_URL)
      .then((response) => {
        console.log(response.data);
        const { users } = response.data;
        setUsers(users);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(addUser)}>
        <input {...register("username")} type="text" />
        <button type="submit">add</button>
      </form>
      {users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </>
  );
}

export default Home;