'use client';

import { useState } from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

import { login, registerUser } from '@/actions';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterFrom = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    //Server Action
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.massage);
      return;
    }

    await login(email.toLowerCase(), password);

    window.location.replace('/');
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      {/* {errors.name?.type === 'required' && (
        <span className='text-red-500'>* El nombre es obligatorio</span>
      )} */}

      <label htmlFor='name'>Nombre completo</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type='email'
        // Aplicar expresión regular para comprobación de correo electrónico
        {...register('email', { required: true, pattern: emailRegex })}
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type='password'
        {...register('password', { required: true, minLength: 6 })}
      />

      <span className='text-red-500'>{errorMessage}</span>

      <button className='btn-primary'>Crear cuenta</button>

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Ingresar
      </Link>
    </form>
  );
};
