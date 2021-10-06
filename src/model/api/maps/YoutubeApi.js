import AppConfig from '../../../config/AppConfig';
import {createClient} from '../Client';

export const getYoutubeApi = () => {
  const {YTB_BASE_URL, YTB_KEY} = AppConfig;
  const api = createClient(YTB_BASE_URL);

  const searchByLocation = (location, pageToken) =>
    api.get(
      `search?part=snippet&location=${location}&locationRadius=10km&type=video${
        pageToken ? `&page_token=${pageToken}` : ''
      }&key=${YTB_KEY}`,
    );

  return {
    api,
    searchByLocation,
  };
};
