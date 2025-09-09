import { radioApiClient } from './clients';

const getStat = async () => {
  const res = await radioApiClient.get('/stat');
  return res.data;
};

export { getStat };
