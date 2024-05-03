import React, { useState, useContext, useEffect } from 'react';
import { ax } from '../../config/default';
import TeddyImage from '../../image/teddy.png';
import { validateEmail, validatePassword } from '../../utils/ValidateInput';
import InputErrorMsg from '../form/InputErrorMsg';
import NormalInput from '../form/NormalInput';
import ConfirmationBox from './ConfirmationBox';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import DeletingProgress from './DeletingProgress';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../store/Store';

type InfoType = {
  email: string;
  pwd: string;
};
type AuthErrorType = {
  msg: string;
  which: string;
};
const DeleteAccount = () => {
  const {
    store: { user },
    dispatch,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [confirmBox, setConfirmBox] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [info, setInfo] = useState<InfoType>({
    email: '',
    pwd: '',
  });
  const [process, setProcess] = useState(false);
  const [authError, setAuthError] = useState<AuthErrorType>({
    msg: '',
    which: '',
  });
  const [resError, setResError] = useState('');
  const [toggleShowPwd, setToggleShowPwd] = useState(false);
  // State cleanup
  useEffect(() => {
    return () => {
      setInfo({ email: '', pwd: '' });
      setResError('');
      setAuthError({ msg: '', which: '' });
      setToggleShowPwd(false);
      setConfirm(false);
    };
  }, []);
  // Form Info cleanup
  useEffect(() => {
    if (confirm) {
      setInfo({ email: '', pwd: '' });
    }
  }, [confirm]);
  const handleToggleShowPwd = () => setToggleShowPwd((prevState) => !prevState);

  const handleChangeInput = (eve: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = eve.currentTarget;
    setInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSetError = (name: string, msg: string) =>
    setAuthError({ msg, which: name });
  const isEmpty = (name: 'email' | 'pwd') => (!info[name] ? true : false);
  const handleClearError = () => {
    if (authError.msg || resError) {
      setAuthError({ msg: '', which: '' });
      setResError('');
    }
  };
  const handleValidateEmail = () => {
    if (isEmpty('email')) {
      handleSetError('email', 'Blank field');
      return false;
    }
    if (!validateEmail(info.email)) {
      handleSetError(
        'email',
        'Invalid email address. Please enter valid email'
      );
      return false;
    }
    return true;
  };
  const handleValidatePassword = () => {
    if (isEmpty('pwd')) {
      handleSetError('pwd', 'Blank filed');
      return false;
    }
    if (info.pwd.length < 7) {
      handleSetError('pwd', 'Password length must be 8 characters.');
      return false;
    }
    if (!validatePassword(info.pwd)) {
      handleSetError(
        'pwd',
        'Contains at least 1 of the following types (a-z), (A-Z), (0-9), (!,@,#,$).'
      );
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (eve: React.SyntheticEvent) => {
    console.log('hello');
    eve.preventDefault();
    setProcess(true);
    const validateEmail = handleValidateEmail();
    if (validateEmail) {
      const validatePassword = handleValidatePassword();
      if (validatePassword) {
        try {
          const { data } = await ax.post(`/account/delete/permanent`, {
            data: { email: info.email, password: info.pwd, uid: user.id },
          });
          if (data.status === 200) {
            dispatch({ type: 'CLEAR_USER' });
            setConfirm(false);
            return navigate('deletion/success', { replace: true });
          }
          setResError(data.msg);
          return;
        } catch (error) {
          console.log('Something went wrong');
        } finally {
          setProcess(false);
        }
      }
    }
    setProcess(false);
  };

  return (
    <div className='py-50 flex flex-col gap-30 sm:content-center'>
      <img src={TeddyImage} alt='delete-banner' className='w-300' />
      <div
        className='flex flex-col gap-20 p-20 rounded-lg color-white'
        style={{ background: 'rgba(132, 0, 0, 0.22)' }}>
        <h1 className='text-lg'>Delete Your Account</h1>
        <span className='color-warn my-10 block font-semibold'>
          Note: Deleting account means you've no more access
        </span>
        <span>
          Delete your account permanently?{' '}
          <span
            className='text-regular font-bold color-info cursor-pointer'
            style={{ textDecoration: 'underline' }}
            onClick={() => setConfirmBox((prevState) => !prevState)}>
            Click here
          </span>{' '}
        </span>
      </div>
      {confirmBox && (
        <ConfirmationBox
          handleClick={() => {
            setConfirm(true);
            setConfirmBox(false);
          }}
          handleCloseBox={() => {
            setConfirm(false);
            setConfirmBox(false);
          }}
        />
      )}
      {confirm && (
        <div className='fixed top-0 left-0 flex flex-col content-center bg-primary h-screen w-screen color-white px-20'>
          <form
            onSubmit={handleSubmitForm}
            className='relative flex flex-col gap-20 w-full sm:w-400 bg-secondary py-50 px-20 rounded-lg overflow-hidden'>
            <span
              className='text-center text-medium font-medium'
              style={{ marginBottom: 30 }}>
              Enter your Email & Password
            </span>

            {resError && <InputErrorMsg error={resError} />}
            <div className='flex flex-col gap-10'>
              <NormalInput
                type='text'
                name='email'
                value={info.email}
                placeholder='Email address'
                handleOnChange={handleChangeInput}
                handleOnClick={handleClearError}
                handleFocusOut={handleValidateEmail}
                error={authError.which === 'email'}
              />
              {authError.which === 'email' && (
                <InputErrorMsg error={authError.msg} styles='text-sm' />
              )}
            </div>
            <div className='flex flex-col gap-10 relative'>
              <NormalInput
                type={!toggleShowPwd ? 'password' : 'text'}
                name='pwd'
                value={info.pwd}
                placeholder='Enter Password'
                handleOnChange={handleChangeInput}
                handleOnClick={handleClearError}
                handleFocusOut={handleValidatePassword}
                error={authError.which === 'pwd'}
                styling={{ paddingRight: 35 }}
              />
              <span
                className='absolute right-10 cursor-pointer hover-fade-half font-bold'
                style={{ top: 13, right: 15 }}
                onClick={handleToggleShowPwd}>
                {toggleShowPwd ? <VscEye /> : <VscEyeClosed />}
              </span>
              {authError.which === 'pwd' && (
                <InputErrorMsg error={authError.msg} styles='text-sm' />
              )}
            </div>
            <div className='flex gap-20 content-center'>
              <button
                itemType='cancel'
                onClick={() => {
                  setConfirm(false);
                  setConfirmBox(false);
                }}
                className='bg-purple color-white rounded-xlg font-semibold hover-fade-half'>
                Cancel
              </button>
              <button className='bg-fade color-white rounded-xlg font-semibold hover-bg-fade'>
                DELETE
              </button>
            </div>
            {process && <DeletingProgress />}
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
