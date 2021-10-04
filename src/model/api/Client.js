import {create} from 'apisauce';

export const createClient = (baseURL, timeout = 10000, headers) => {
  const client = create({
    baseURL,
    timeout,
    headers,
  });

  const get = query => client.get(query);


  return {
    client,
    get,
  };
};
