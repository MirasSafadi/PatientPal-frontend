import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // שומר את הערך בשדה
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // שומר את הערך בשדה
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
