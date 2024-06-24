import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getUsers, createUser } from "./requestHelper";

function App() {
  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUserList(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddNew = async () => {
    const newUser = {
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      age: "25",
      regions: "Mandalay",
      phoneNumber: "03434343",
      isGraduated: true,
      gender: "female",
    };
    await createUser(newUser);
    await fetchUsers();
  };

  return (
    <>
      <button onClick={handleAddNew}>Add new test users</button>
      {userList.length > 0 && (
        <>
          {userList.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </>
      )}
    </>
  );
}

export default App;
