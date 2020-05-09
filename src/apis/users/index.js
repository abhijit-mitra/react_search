export default class UserApis{
  static getUsers= async()=>{
    const url = 'http://www.mocky.io/v2/5ba8efb23100007200c2750c';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
