import AppConfig from '../../../config/AppConfig';
import {createClient} from '../Client';

export const getMapsApi = () => {
  const {MAPS_BASE_URL, MAPS_KEY} = AppConfig
  const api = createClient(MAPS_BASE_URL);

  const search = query =>
    api.get(`/place/autocomplete/json?input=${query}&key=${MAPS_KEY}`);

  const getDetailsById = id =>
    api.get(`/place/details/json?place_id=${id}&key=${MAPS_KEY}`);

  return {
    api,
    search,
    getDetailsById
  };
};
