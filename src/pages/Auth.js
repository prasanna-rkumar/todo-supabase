import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <div className="Form-submit-container">
            <button className="App-button Form-submit" type="submit" onClick={(e) => {
              e.preventDefault();
            }}>
              Sign in
          </button>
          </div>
        </form>
        <button className="App-button Form-submit" type="submit" onClick={(e) => {

}}>
            Login as Test user
        </button>
      </div>
    </div>
  );
};

const TextFormField = ({ onChange, value, label, inputType, inputName, placeholder }) => (
  <>
    <label className="Form-label" htmlFor="userEmail">{label}</label>
    <input placeholder={placeholder} className="Form-input App-border-radius Input-field" type={inputType} name={inputName} value={value} onChange={onChange} />
  </>
);


export default Auth;