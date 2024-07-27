import axios from 'axios';
import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    axios.get("http://localhost:3000")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return <div></div>;
}

export default Home;