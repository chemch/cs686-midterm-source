//importing libraries, functional components for using them in a table which will show data from server
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

//creation of the parent functional component which will be pased to app.jsx
function Table() {

  // validate environment variables are set
  if (!import.meta.env.VITE_API_PORT || !import.meta.env.VITE_API_HOST || !import.meta.env.VITE_API_PROTOCOL) {
    throw new Error("API_PORT or API_HOST or API_PROTOCOL is not set");
  }

  // set the API_HOST and API_PORT from the environment variables
  const api_port = import.meta.env.VITE_API_PORT;
  const api_host = import.meta.env.VITE_API_HOST;
  const api_protocol = import.meta.env.VITE_API_PROTOCOL;
  const local_build = import.meta.env.VITE_LOCAL_BUILD;
  
  // check if the local build is set
  var axios_destination = "";
  if (local_build === "true") {
    axios_destination = `${api_protocol}://${api_host}:${api_port}/`
  }
  else {
    // exclude the port if running on remote server
    axios_destination = `${api_protocol}://${api_host}/api/`
  }
  // console.log(`Axios Dest: ${axios_destination} due to Local Build: ${local_build}`);

  //using use state, use ref for state variables and ref to track if fetch has already been attempted
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  //async await useEffect function for fetching data from server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(`Fetching Users from Server at ${new Date().toLocaleString()}`);
        //get request to the server
        const response = await axios.get(axios_destination);
        //setting the empty array as a json object of users got from the server
        setUsers(response.data);

        //using the useRef current which is the same as initialized untill changes
        if (!hasFetchedUsers.current) {
          toast.success("Data Fetched");
          hasFetchedUsers.current = true; // set the ref to true after first fetch
        }
      } catch (error) {
        console.log("There was an error fetching the users!", error);

        //if we haven't fetched it stay as it is
        if (!hasFetchedUsers.current) {
          toast.error("Error Fetching Data");
          hasFetchedUsers.current = true; // set the ref to true after first fetch attempt
        }
      }
    };

    //calling the function here
    fetchUsers();
  }, []);

  //after adding or creating a new user we normally would have to manually reload the page but with this function we just add the created user at the last of the fetched json object which we saved as an array
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  //using bootstrap pre built components and modal components
  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          User Table - Midterm
        </h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3 id="h3">No Users in Database</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}


//exporting the component to be using it in the app.jsx
export default Table;
