import React from 'react';
// import LoginButton from '../components/LoginButton';
// import LogoutButton from '../components/LogoutButton';
import SignUpForm from '../components/SignUpForm';
// function SignIn() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

export default function SignUp() {
  return (
    <div>
      <SignUpForm />
    </div>
    
  )
}