import bcrypt from 'bcryptjs';
import User from './user.js';
import {
  validateEmail,
  validatePassword,
  validateEmpty,
} from '../utils/validateInput.js';
import fieldLists from '../db/fieldLists.js';
import { generateToken } from './userToken.js';

const res = (status, msg, code) => ({
  status: status,
  message: msg,
  errCode: code,
});

const handleLogin = async ({ email, password }) => {
  // Check for input validity
  if (validateEmpty(email) || validateEmpty(password)) {
    return res(422, 'User information is missing');
  }

  if (!validateEmail(email) || !validatePassword(password)) {
    return res(422, 'User email and password has invalid format');
  }
  // Check whether user exist or not with the given email address
  const user = await User.find({
    id: [fieldLists.email],
    value: email.toString().toLowerCase(),
  });
  if (!user) {
    return res(
      404,
      `There's no user account found with this ${email} address`,
      'email'
    );
  }

  // check password with hashed version
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res(
      422,
      'The password you entered is incorrect. Please try again.',
      'password'
    );
  }
  const token = await generateToken(user);

  return {
    status: 200,
    user: {
      id: user.uid,
      full_name: user.user_name,
      country: user.country,
      email: user.email,
      date_of_birth: user.date_of_birth,
      joined_date: user.joined_date,
      liked_id: user._liked,
      playlists_id: user._playlists,
      token: token,
    },
  };
};

export default handleLogin;
