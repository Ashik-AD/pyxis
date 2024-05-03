import CountryList from '../model/countryList.js';

export const allCountry = async (req, res, next) => {
  try {
    const list = await (await CountryList.getAll()).sort();
    res.send(list);
  } catch (error) {
    console.log(error)
    res.status(421).send(`Can't get country list`);
  }
};

export const searchCountry = async (req, res, next) => {
  try {
    const searchToken = req.params.c_name;
    const result = await CountryList.searchCountry(searchToken);
    res.send(result);
  } catch (err) {
    res.status(400).send('Something went wrong');
    console.log(err);
  }
};
