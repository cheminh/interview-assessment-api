import fetch from 'node-fetch';
import localData from './data/data.js';

const getRemoteData = async (url) => {

  if (localData && localData.provinces_territories && localData.provinces_territories.length > 0) {
    console.log('Local data found, returning local provinces_territories');
    return localData.provinces_territories;
  }

  if (!url) {
    throw new Error('URL is required for remote data fetch');
  }

  try {
    console.log('calling fetch for URL:', url);
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    console.log('fetch completed successfully');
    return await result.json();
  }
  catch (e) {
    console.error('Problem occurred with remote fetch:', e.message);
    throw new Error(`Remote data fetch failed: ${e.message}`);
  }

};

export const getAlmostRemoteData = async (url) => {
  throw new Error('something went wrong!');
};

export const getNotSoRemoteData = (url) => {
  throw new Error('something went wrong!');
};

export default getRemoteData;
