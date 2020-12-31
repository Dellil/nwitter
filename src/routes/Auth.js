import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name==="email") {
            setEmail(value);
        }
        else if(name==="password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const { target: { name },} = event;

        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name ==="github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" required input={email} onChange={onChange} name="email"/>
                <input type="password" placeholder="Password" required input={password} onChange={onChange} name="password"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;