import createAccount from '../model/signup.js';
import handleLogin from '../model/login.js';
import User from '../model/user.js';
export const signUp = async (req, res) => {
  const account = await createAccount(req.body.data);
  res.send(account);
};

export const signIn = async (req, res) => {
  const login = await handleLogin(req.body.data);
  res.send(login);
};

export const updateEmail = async (req, res) => {
  try {
    const {uid, newEmail, password} = req.body.data;
    const updateEmail = await User.updateEmail({uid, newEmail, password});
    if (updateEmail) {
// @TODO: fix the typos & grammar 
      res
        .status(201)
        .send(
          `Email update successful. ${newEmail} is your new email for this account.`
        );
      return;
    }
    res
      .status(200)
      .send('Email is unchanged. Probably you providing same email as previous.');
  } catch (err) {
    console.log(err)
    res.send({ err });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { data } = req.body;
    const reqSub = await User.changePassword({ ...data });
    if (reqSub === true) {
      res.status(201).send('Password successfully updated');
      return;
    }
    res.status(200).send({ ...reqSub });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

export const deleteAccountPermanent = async (req, res) => {
  try {
    const { data } = req.body;
    await User.deleteAccount(data, (ack, err) => {
      if(err) throw err;
      res.send({message: ack})
    });
  } catch (error) {
    res.status(400).send('Something went wrong');
    console.log(error);
  }
};
