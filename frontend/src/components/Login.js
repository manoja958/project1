// import React, { useState } from 'react';
// import axios from 'axios';
// import Search from './Search';
// import Admin from './Admin';
// import "../App.css";

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [data, setData] = useState(null);
//   const [msg, setMsg] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/employees/login', { email, password });
//       setData(res.data);
//       setMsg('');
//     } catch {
//       setMsg('Invalid credentials');
//     }
//   };

//   // ✅ Admin login using specific credentials
//   if (email === 'admin@gmail.com' && password === 'admin123' && data) {
//     return <Admin />;
//   }

//   // ✅ Employee login
//   if (data) {
//     return <Search user={data} />;
//   }

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//       {msg && <p style={{ color: 'red' }}>{msg}</p>}
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/employees/login', form);
      setMsg(`Welcome ${res.data.employee.name}!`);
    } catch {
      setMsg('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>
      {msg && <p style={{ color: msg.includes('Invalid') ? 'red' : 'green' }}>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email <input name="email" type="email" onChange={handleChange} required /></label>
        <label>Password <input name="password" type="password" onChange={handleChange} required /></label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
