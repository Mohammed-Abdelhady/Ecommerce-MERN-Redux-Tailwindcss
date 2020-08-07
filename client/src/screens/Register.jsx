import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Button from '../components/buttons/button.component';
import Container from '../components/container/container.component';
import FormInput from '../components/inputs/form.input.component';
import { register } from '../data/reducers/auth';
const Register = ({ register }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPasswrod: '',
  });

  const { name, email, password, confirmPasswrod } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    if (password !== confirmPasswrod) {
      toast.error('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };
  return (
    <Container>
      <form
        className='bg-white rounded-lg overflow-hidden
       shadow-2xl p-5  my-16 md:w-1/2 lg:w-1/3 mx-auto'
        onSubmit={onSubmit}
      >
        <h2 className='font-bold text-3xl text-center mb-5'>Register</h2>
        <FormInput
          title='Name'
          placeholder='Congar'
          value={name}
          handleChange={handleChange('name')}
          type='text'
        />
        <FormInput
          title='Email'
          placeholder='congar@example.com'
          value={email}
          handleChange={handleChange('email')}
          type='email'
        />
        <FormInput
          title='Password'
          placeholder='******'
          value={password}
          handleChange={handleChange('password')}
          type='password'
        />
        <FormInput
          title='Confirm Passwrod'
          placeholder='******'
          value={confirmPasswrod}
          handleChange={handleChange('confirmPasswrod')}
          type='password'
        />
        <Button
          title='SignUp'
          moreStyle='bg-primary text-white w-full mb-3'
          type='submit'
        />
        <div className='flex justify-end w-full'>
          <Button
            isButton={false}
            title='already have an account ?'
            href='/login'
            moreStyle='text-gray-600'
          />
        </div>
      </form>
    </Container>
  );
};

export default connect(null, { register })(Register);
