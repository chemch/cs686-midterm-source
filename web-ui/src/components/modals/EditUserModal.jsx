//importing neccessary libraries for this modal which will edit users in the database and we will be using this as a functional component for table
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

//starting of the functional component which edits the user in the database
function EditUserModal() {
  
  // validate environment variables are set
  if (!import.meta.env.VITE_API_PORT || !import.meta.env.VITE_API_HOST) {
    throw new Error("API_PORT or API_HOST is not set");
  }

  // set the API_HOST and API_PORT from the environment variables
  const api_port = import.meta.env.VITE_API_PORT;
  // console.log(`API_PORT: ${api_port}`);
  const api_host = import.meta.env.VITE_API_HOST;
  // console.log(`API_HOST ${api_host}`);

  //using state variables for access of the input fields
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //function for dynamic change of values for the input fields of id field
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  //function for dynamic change of values for the input fields of name field
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //function for dynamic change of values for the input fields of email field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //creation of an async await function which first checks if all the inputs are filled, sends a post request to the server using axios then shows a toast message if is successful or not
  const handleEditUser = async () => {
    //input check
    if (!id || !name || !email || id === "" || name === "" || email === "") {
      toast.error("All Fields Are Required");
      return;
    }
    try {
      const timestamp = new Date().toLocaleString();
      console.log(`Editing User: ID=${id}, Name=${name}, Email=${email} at ${timestamp}`);

      //put req to server
      const res = await axios.put(`http://${api_host}:${api_port}`, {
        id,
        name,
        email
      });

      //incase of success
      if (res.status === 200) {
        toast.success("User Edited || Reloading to Update");
        setId(""); //empty the fields after successful operation
        setName(""); //empty the fields after successful operation
        setEmail(""); //empty the fields after successful operation

        //after 3 sec reload the page for users to view edit
        setTimeout(() => {
          location.reload();
        }, 3000);

      }
    } catch (error) {
      //incase of error
      console.error("Error Editing User", error);
      toast.error("Error Editing User");
    }
  };
//using bootstrap pre built components
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#editUserModal"
      >
        <b>Edit User</b>
      </button>

      <div
        className="modal fade"
        id="editUserModal"
        tabIndex="-1"
        aria-labelledby="EditUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditUserModal">
                <b>Enter Id, Name and Email</b>
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
                <label htmlFor="id" className="form-label">
                  Id:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Ex: 12"
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  New Name:
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
                  New Email:
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
                className="btn btn-warning"
                onClick={handleEditUser}
                data-bs-dismiss="modal"
              >
                <b>Edit User</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the created function
export default EditUserModal;
