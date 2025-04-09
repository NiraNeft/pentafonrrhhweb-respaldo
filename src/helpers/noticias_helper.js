import axios from 'axios';

export const obtenerNoticias = async () => {
  const response = await axios.get('/api/noticias');
  return response.data;
};