import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Button from '../components/buttons/button.component';
import Container from '../components/container/container.component';
import FormInput from '../components/inputs/form.input.component';
import { login } from '../data/reducers/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuth, isLoading, user }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuth && user) {
    const { name, role } = user;
    toast.success(`welcome ${name}`);
    if (role === 0) return <Redirect to='/dashboard/user' />;
    if (role === 1) return <Redirect to='/dashboard/admin' />;
  }

  return (
    <Container>
      <form
        className='bg-white rounded-lg overflow-hidden
       shadow-2xl p-5  my-16 md:w-1/2 lg:w-1/3 mx-auto flex flex-col'
        onSubmit={onSubmit}
      >
        <h2 className='font-bold text-3xl text-center mb-5'>Login</h2>
        
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
        
        {isLoading && <div id='loading' className='self-center mb-3' />}
        {!isLoading && (
          <Button
            title='SignIn'
            moreStyle='bg-primary text-white w-full mb-3'
            type='submit'
          />
        )}

        <div className='flex justify-end w-full'>
          <Button
            isButton={false}
            title='did you need a new account ?'
            href='/register'
            moreStyle='text-gray-600'
          />
        </div>
      </form>
    </Container>
  );
};

const mapToStateProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  user: state.auth.user,
});
export default connect(mapToStateProps, { login })(Login);
