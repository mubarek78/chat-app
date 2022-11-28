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
    const file = e.target[3].files[0];




    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadBytesResumable(storageRef, file).then(() => {

        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        })

        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            // create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
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
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
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