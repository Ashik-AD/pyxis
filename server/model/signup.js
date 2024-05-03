import bcrypt from 'bcryptjs';
import User from './user.js';
import { v4 as uuidV4 } from 'uuid';
import {
  validateEmail,
  validatePassword,
  checkPattern,
  validateEmpty,
} from '../utils/validateInput.js';

const genId = () => uuidV4().toString().replaceAll('-', '');
const res = (status, msg, errorCode) => {
  return {
    status,
    message: msg,
    errorCode,
  };
};
const SignUp = async ({ fullName, email, password, }) => {
  if (
    validateEmpty(fullName) ||
    validateEmpty(email) ||
    validateEmpty(password)
  ) {
    return res(406, 'You must provide necessary informations!');
  }

  if (!checkPattern(fullName)) {
    return res(422, 'Invalid user name.');
  }

  if (!validateEmail(email)) {
    return res(422, 'Invalid email address');
  }

  if (!validatePassword(password)) {
    return res(
      422,
      'Invalid password. Password must contains at least one uppercase, lowercase character, one number and one special symbol'
    );
  }

  try {
    const isUserAlreadyExist = await User.find({ id: 'email', value: email });
  
    if (isUserAlreadyExist) {
      return res(
        422,
        `User already exists with this email: ${email}. Please try with another email `,
        'EMAIL_ALREADY_IN_USE'
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createNewUser = await User.add({
      uid: genId(),
      user_name: fullName,
      email: email.toString().toLowerCase(),
      password: hashedPassword,
      date_of_birth: "",
      country: "",
      _watch_list: genId(),
      _liked: genId(),
      _playlists: genId(),
    });
    if (createNewUser === 0) {
      return res(406, "Can't create user account :(");
    }
    return res(200, 'User account successfully created :)');
  } catch (error) {
    console.log(error);
    return res(422, 'Something went wrong :(');
  }
};

export default SignUp;
