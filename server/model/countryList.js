import fetch from 'node-fetch';

const url = 'https://api.first.org/data/v1/countries';
class Country {

  #fetchCountry = async (url) => {
    try {
      const countryList = await fetch(url, { method: 'GET' });
      return countryList.json();
    } catch (err) {
      console.log(err)
      return []
    }
  };
  getAll = async () => {
    try {
      const res = await this.#fetchCountry(url);
      return this.#normalize(res.data);
    }
    catch(erro) {
      console.log(erro);
      return "API request failed";
    }
  };
  searchCountry = async (token) => {
    const url = `${url}?q=${token}`;
    const res = await this.#fetchCountry(url);
    const result = this.#normalize(res.data);
    if (result.length > 0) {
      return result;
    }
    return false;
  };
  #normalize = (obj) => Object.values(obj).map((el) => el.country);
}

const CountryList = new Country();
export default CountryList;
