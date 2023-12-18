import { useAuth } from "../../context/AuthContext";

function Home() {
  const data = useAuth();
  console.log(data);

  return (
    <div>Home</div>
  )
}

export default Home