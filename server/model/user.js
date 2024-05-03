"use-strict"
import { Users } from '../db/mongooseModels.js'
import fld from '../db/fieldLists.js';
import { validateEmail, validatePassword } from '../utils/validateInput.js';
import validateQueryParam from '../utils/validateQueryParam.js';
import like from './liked.js';
import playlist from './playlist.js';
import bcrypt from 'bcryptjs';
import watchList from './watchList.js';
import { invalidQueryParamException } from './errors/handleErr.js';
import deleteAccount from '../controller/deleteAccount.js';

class HandleUser {
  /**
   *
   * @param {id, filedName, value}
   * This module handle creation, searching and deleting the user;
   * @method {add, find, findById, delete}
   */
  constructor() {
    this.liked = like;
    this.playlist = playlist;
    this.watchList = watchList;
  }
  #handleException = (msg, code) => {
    this.msg = msg ? msg : 'Invalid query parameter';
    this.code = code ? code : 422;
    return { msg: this.msg, code };
  };
  add = async (fields) => {
    const {
      uid,
      user_name,
      email,
      password,
      _liked,
      _playlists,
      _watch_list
    } = fields;
    try {
      if (
        uid !== null &&
        user_name !== null &&
        email !== null &&
        password !== null &&
        _liked !== null &&
        _playlists !== null && _watch_list !== null
      ) {
        await Users.create(fields);
        return 1;
      }
      else {
        throw "User information missing";
      }
    } catch (error) {
      console.log(error);
    }
  };

  find = async ({ id, value }) => {
    if (validateQueryParam(id) || validateQueryParam(value)) {
      const res = await Users.findOne({[id]: value});
      return res;
    }
    throw this.#handleException();
  };

  findById = async (id) => {
    if (validateQueryParam(id)) {
      const res = await Users.findOne({[fld.uid]: id})
      return res;
    }
    throw this.#handleException();
  };

  delete = async (id) => {
    if (validateQueryParam(id)) {
      const res = await Users.deleteOne({[fld.uid]: id});
      return res;
    }
    throw this.#handleException();
  };

  updateEmail = async ({ uid, newEmail, password }) => {
    if (validateQueryParam(uid)) {
      if (validateEmail(newEmail)) {
        const isNewEmailExist = await Users.findOne({[fld.uid]: uid, [fld.email]: newEmail});
        if (!isNewEmailExist) {
          const snapshot = await this.findById(uid);
          if (snapshot) {
            const checkPassword = await bcrypt.compare(
              password,
              snapshot.password
            );
            if (checkPassword) {
              const email = newEmail.toString().toLowerCase();
              if (snapshot.email.toString().toLowerCase() !== email) {
                const res = await Users.updateOne({[fld.uid]: uid}, {[fld.email]: email});

                if(res.modifiedCount > 0){
                  return true;
                }
                return false;
              }
              return false;
            }
            throw this.#handleException(
              'Password is incorrect for this email. Please enter correct password.',
              'INVALID_PASSWORD'
            );
          }
          throw this.#handleException(
            `There is no user exist with this ${newEmail}`
          );
        }
        throw this.#handleException(
          'Email is already in use.',
          'EMAIL_IN_USED'
        );
      }
      throw this.#handleException(`Invalid email provided ${newEmail}`);
    }
    throw this.#handleException();
  };

  changePassword = async ({ uid, currentPwd, newPwd }) => {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException();
    }

    if (!validatePassword(currentPwd) || !validatePassword(newPwd)) {
      return this.#handleException(
        'Invalid password formatContains at least 1 of the following types (a-z), (A-Z), (0-9), (!,@,#,$).',
        'INVALID_PASSWORD_FORMAT'
      );
    }

    const snapshot = await this.findById(uid);
    if (!snapshot) {
      return this.#handleException(
        `Oops! something went wrong. Make sure own this account.`,
        'USER_NOEXIST'
      );
    }

    const checkPwd = await bcrypt.compare(currentPwd, snapshot.password);
    if (!checkPwd) {
      return this.#handleException(
        'The password you entered is incorrect. Please try again.',
        'INCORRECT_PWD'
      );
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPwd, salt);
      const res = await Users.updateOne({[fld.uid]: uid}, {[fld.password]: hashPassword})
      if (res.modifiedCount <= 0 && res.acknowledged) {
        return this.#handleException('Update success.', 'UNCHANGED');
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong with hashing');
    }
  };

  deleteAccount = async ({ uid, email, password }, cb) => {
    if (!validateQueryParam(uid)) {
      throw this.#handleException(null, uid); 
    }
    const findUser = await this.findById(uid);
    if (!findUser) {
      return this.#handleException(
        'Oops! something went wrong. Make sure own this account.',
        'USER_NOEXIST'
      );
    }

    if (findUser.email !== email) {
      return this.#handleException(
        'Email & Password is incorrect. Please try again.'
      );
    }
    try {
      const cmpPwd = await bcrypt.compare(password, findUser.password);
      if (!cmpPwd) {
        return this.#handleException(
          'Email & Password is incorrect. Please try again.'
        );
      }
      await deleteAccount(uid, cb)
    } catch (error) {
      console.log(error);
      throw new Error('Internal server error', error);
    }
  };
}

const User = new HandleUser();
export default User;
