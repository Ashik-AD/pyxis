import jwt from 'jwt-simple';
import secret from 'dotenv';
secret.config();

export const generateToken = async (user) => {
  try {
    return await jwt.encode({ sub: user.uid }, process.env.ENCRYPT_SECRET);
  }
  catch(error){
    console.log('Unable to generate auth token')
  }
};
