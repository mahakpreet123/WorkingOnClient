import React, { useState, useEffect } from "react";
import Input from './Components/input';
import Button from './Components/Button';


const App = () => {

  const [Error, setError] = useState({});
  console.log(Error);
  
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (Object.keys(Error).length === 0 ) {
      setPopupMessage(
        `Fullname: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Password: ${data.password}\n` +
        `Phone number: ${data.phone}`
      );  
      setPopupType("success");   
      setShowPopup(true); 
    }
  }, [Error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      setError(Validate(data));
      // setPopupMessage();
      // setPopupType("success");
      // setShowPopup(true);

    } catch (error) {
      console.log(error);
    }
  };

  const Validate = (data1) => {

    console.log(data1);
    const error = {};
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@gmail\.com$/;
    const pnumberRegex = /^\d+$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/;


    if (!data1.name.trim()) {
      error.name = 'Username is Required!'
    }

    if (!data1.email.trim()) {
      error.email = 'Useremail is Required!'
    }
    else if (!emailRegex.test(data1.email)) {
      error.email = "Input valid email!";
    }

    if (!data1.password.trim()) {
      error.password = 'Userpassword is Required'
    }
    else if (data1.password.length <= 6 || data1.password.length >= 12) {
      error.password = 'Enter charater btw 6-12';
    }
    else if (!passwordRegex.test(data1.password)) {
      error.password = "Enter valid password";
    }

    if (!data1.phone.trim()) {
      error.phone = 'Userphone number is Required'
    }
    else if (data1.phone.length != 10) {
      error.phone = 'Phone number must be 10 digits.';
    }
    else if (!pnumberRegex.test(data1.phone)) {
      error.phone = 'Only digits are allowed!';
    }

    return error;

  }

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="w-[25%] min-h-[80%] bg-blue-200 flex justify-center items-center border border-black rounded-lg shadow-lg">
          <div>
            <h1 className="text-2xl font-semibold my-3 flex justify-center">Sign up</h1>
            <Input
              Label="Name"
              Name="name"
              Value={data.name}
              Type="text"
              Id="name"
              Placeholder="Enter your name.."
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <span className="text-red-600 mb-2">{Error.name}</span>
            <Input
              Label="Email"
              Name="email"
              Value={data.email}
              Type="email"
              Id="email"
              Placeholder="Enter your email.."
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <span className="text-red-600 mb-2">{Error.email}</span>
            <Input
              Label="Password"
              Name="password"
              Value={data.password}
              Type="password"
              Id="password"
              Placeholder="Enter your password.."
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <span className="text-red-600 mb-2">{Error.password}</span>
            <Input
              Label="Contact number"
              Name="phone"
              Value={data.phone}
              Type="tel"
              Id="tel"
              Placeholder="Enter your phone number.."
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <span className="text-red-600 mb-2">{Error.phone}</span>
            <Button Label="Signup" Type="submit" />
            
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-md w-[30%] bg-white ${
              popupType === "success" ? "border-green-500" : "border-red-500"
            } border-l-4`}
          >
            <h3
              className={`text-lg font-semibold ${
                popupType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {popupType === "success" ? "Success" : "Error"}
            </h3>
            <p className="mt-2">{popupMessage}</p>
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default App;

