//importing neccessary libraries for this modal which will delete users from the database and we will be using this as a functional component for table
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

//starting of the functional component which will delete users
function DeleteUserModal() {
  
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
  if (local_build) {
    axios_destination = `${api_protocol}://${api_host}:${api_port}/`
  }
  else {
    // exclude the port if running on remote server
    axios_destination = `${api_protocol}://${api_host}/api/`
  }
  console.log(`Axios Dest: ${axios_destination} due to Local Build: ${local_build}`);

  //using state variables for access of the input fields
  const [id, setId] = useState("");

  //function for dynamic change of values for the input fields of id field
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  //creation of an async await function which first checks if the input is filled, sends a delete request to the server using axios then shows a toast message if is successful or not
  const handleDeleteUser = async () => {
    //input check
    if (!id || id === "") {
      toast.error("All Fields are Required.");
      return;
    }
    try {
      console.log(`Deleting User with ID: ${id}`);

      //delete req to the server with data payload
      const res = await axios.request({
        method: "delete",
        url: axios_destination,
        data: { id }
      });

      //incase of success
      if (res.status === 200) {
        console.log("User Deleted");
        toast.success(`Id ${id} Deleted Successfully || Reloading to Update`);
      }

      setId(""); //empty the fields after successful operation

      //after 3 sec reload the page for users to view deletion
      setTimeout(() => {
        location.reload();
      }, 3000);

    } catch (error) {
      //incase of error
      console.error("Error Deleting User", error);
      toast.error("Error Deleting User");
    }
  };

  //using bootstrap pre built components
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#DeleteUserModal"
      >
        <b>Delete User</b>
      </button>

      <div
        className="modal fade"
        id="DeleteUserModal"
        tabIndex="-1"
        aria-labelledby="DeleteUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="DeleteUserModal">
                <b>Enter Id</b>
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteUser}
                data-bs-dismiss="modal"
              >
                <b>Delete User</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the created function
export default DeleteUserModal;
