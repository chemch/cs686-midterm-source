//importing neccessary libraries for this modal which will add users to the database and we will be using this as a functional component for table
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

//starting of the functional component which takes a argument inside for adding the user to the user aray for dynamic display witout any reload
// eslint-disable-next-line react/prop-types
function CreateUserModal({ addUser }) {

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
  console.log(`Axios Dest: ${axios_destination} due to Local Build: ${local_build}`);

  //using state variables for access of the input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //function for dynamic change of values for the input fields of name field
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //function for dynamic change of values for the input fields of email field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //creation of an async await function which first checks if all the inputs are filled, sends a post request to the server using axios then shows a toast message if is successful or not
  const handleCreateUser = async () => {
    //input check
    if (!name || !email || name === "" || email === "") {
      toast.error("All Fields Are Required");
      return;
    }

    try {
      // console log the time of creation
      const timestamp = new Date().toLocaleString();
      console.log(`Creating User: Name=${name}, Email=${email} at ${timestamp}`);

      //post req to server
      const res = await axios.post(axios_destination, {
        name,
        email
      });

      //incase of success
      if (res.status === 201) {
        toast.success("User Created");
        addUser(res.data); // add the new user to the list
        setName(""); //empty the fields after successful operation
        setEmail(""); //empty the fields after successful operation
      }
    } catch (error) {
      //incase of error
      console.error("Error Creating User: ", error);
      toast.error("Error Creating User");
    }
  };

  //using bootstrap pre built components
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#CreateUserModal"
      >
        <b>Create User</b>
      </button>

      <div
        className="modal fade"
        id="CreateUserModal"
        tabIndex="-1"
        aria-labelledby="CreateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserModalLabel">
                <b>Enter Name and Email</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ex: John Doe"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ex: johndoe@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreateUser}
                data-bs-dismiss="modal"
              >
                <b>Create User</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the created function
export default CreateUserModal;
