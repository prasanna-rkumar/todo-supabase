import { useState } from "react";
import { supabase } from "../supabaseClient";

const Auth = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async ({ isLogin }) => {
    const { error, data, session, user } =
      isLogin
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message)
      setPassword("")
    }
    console.log(error, data, session, user)
  }

  return (
    <div className="Login-card">
      <h2>Sign In</h2>
      <div className="Form-container">
        <form className="">
          <TextFormField
            label="Email"
            inputType="email"
            inputName="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E.g: andymikael@gmail.com"
          />
          <TextFormField
            label="Password"
            inputType="password"
            inputName="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
          {
            error && (
              <p style={{
                color: "red",
                fontSize: 14
              }}>{error}</p>
            )
          }
          <div className="Form-submit-container">
            <button className="App-button Form-submit" type="submit" onClick={(e) => {
              e.preventDefault();
              handleAuth({ isLogin: true });
            }}>
              Sign in
            </button>
          </div>
          <div className="Form-submit-container">
            <button className="App-button Form-submit" type="submit" onClick={(e) => {
              e.preventDefault();
              handleAuth({ isLogin: false });
            }}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TextFormField = ({ onChange, value, label, inputType, inputName, placeholder }) => (
  <>
    <label className="Form-label" htmlFor="userEmail">{label}</label>
    <input placeholder={placeholder} required className="Form-input App-border-radius Input-field" type={inputType} name={inputName} value={value} onChange={onChange} />
  </>
);


export default Auth;
