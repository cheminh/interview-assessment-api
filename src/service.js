import fetch from 'node-fetch';

const getRemoteData = async (url) => {
  console.log(`Fetching service at ${url}`);
  try {
    console.log('calling fetch');
    let result = await fetch(url);
    console.log('after calling fetch');
    return await result.json();
  }
  catch (e) {
    console.error('Problem occurred', e);
  }

};

export default getRemoteData;
