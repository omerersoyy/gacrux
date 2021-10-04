import AppConfig from '../../../config/AppConfig';
import {createClient} from '../Client';

export const getMapsApi = () => {
  const {MAPS_BASE_URL, KEY} = AppConfig
  const api = createClient(MAPS_BASE_URL);

  const search = query =>
    api.get(`/place/autocomplete/json?input=${query}&key=${KEY}`);

  const getDetailsById = id =>
    api.get(`/details/json?place_id=${id}&key=${KEY}`);

  return {
    api,
    search,
    getDetailsById
  };
};
