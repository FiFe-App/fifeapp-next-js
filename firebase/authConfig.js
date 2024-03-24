import { store } from '../lib/store';

export const config = () => {
    const data = store.getState()

    console.log('NODE_ENV',process.env.NODE_ENV);

    return ({
      baseURL: 
      (process.env.NODE_ENV=='development' && Platform.OS == 'web' 
       ? 'http://localhost:8888' : 'https://fifeapp.hu')
      +'/.netlify/functions/index',
      headers: {
        'authtoken': data?.user?.userData?.authtoken,
      }
    })
}