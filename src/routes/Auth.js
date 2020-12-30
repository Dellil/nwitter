import React, { useState } from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name==="email") {
            setEmail(value);
        }
        else if(name==="password") {
            setPassword(value);
        }
        console.log(e.target.name);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" required input={email} onChange={onChange} name="email"/>
                <input type="password" placeholder="Password" required input={password} onChange={onChange} name="password"/>
                <input type="submit" value="Log In"/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;