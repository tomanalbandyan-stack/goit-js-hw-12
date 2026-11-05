import axios from 'axios';

export const getImagesByQuery = async (query, page) => {
  const res = await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '58317784-79f584b65abafed05bd7b4b94',
        q: query,
        page: page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

  return res.data; 
};

