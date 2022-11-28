import React, { useState } from "react";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(e.target)
    
    e.target[3].disabled = true
    console.log(e.target[0])
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = url;


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user.email)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

    // try {
    //   //Create user
    //   const res = await createUserWithEmailAndPassword(auth, email, password);

    //   //Create a unique image name
    //   const date = new Date().getTime();
    //   const storageRef = ref(storage, `${username + date}`);

    //   await uploadBytesResumable(storageRef, file).then(() => {
    //     getDownloadURL(storageRef).then(async (downloadURL) => {
    //       try {
    //         //Update profile
    //         await updateProfile(res.user, {
    //           username,
    //           photoURL: downloadURL,
    //         });
    //         //create user on firestore
    //         await setDoc(doc(db, "users", res.user.uid), {
    //           uid: res.user.uid,
    //           username,
    //           email,
    //           photoURL: downloadURL,
    //         });

    //         //create empty user chats on firestore
    //         await setDoc(doc(db, "userChats", res.user.uid), {});
    //         navigate("/");
    //       } catch (err) {
    //         console.log(err);
    //         setErr(true);
    //         setLoading(false);
    //       }
    //     });
    //   });
    // } catch (err) {
    //   setErr(true);
    //   setLoading(false);
    // }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GoodTalk Chat App</span>
        <span className="title">Register</span>
        <form className="muba" onSubmit={handleSubmit}>
          <input required type="text" name="username" placeholder="username" />
          <input required type="email" name="email" placeholder="email" />
          <input required type="password" name="password" placeholder="password" />
          {/* <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label> */}
          <button disabled={loading}>Sign up</button>
          {loading && "Processing please wait..."}
          {err && <span>Something went wrong please try again</span>}
        </form>
        <p>
           Do you have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;