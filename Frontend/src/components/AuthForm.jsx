import { useState } from 'react';
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const   navigation = useNavigation();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';
    // const [isLogin, setIsLogin] = useState(true);

    // function switchAuthHandler() {
    //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
    // }

  return (
    <>
      <Form method="post" className ={`space-y-6 ${classes.form} px-7 py-7 rounded-2xl bg-stone-700 `}>
        <h1 className='text-xl font-bold text-slate-200' >{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>
          {Object.values(data.errors).map((err) => <li key={err}>
            {err}
          </li> )}
        </ul> }
        { data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input className=' rounded-md outline-{5px} border focus:outline-amber-900 focus:ring focus:ring-amber-500' id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" className=' rounded-md focus:border-none border' name="password" required />
        </p>
        <div  className={` flex justify-end   `}>
          <p className='p-2 mr-2 rounded-md hover:bg-stone-600 z-0 text-white '><Link to={`?mode=${isLogin ? 'signup': 'login' }`}>
           {isLogin ? 'Create new user' : 'Login'}
          </Link></p>
          <button className='bg-yellow-300 px-4 py-2 rounded-md hover:bg-amber-500 text-black ' disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

