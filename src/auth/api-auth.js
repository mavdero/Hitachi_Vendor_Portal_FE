import handleApiError from '../utils/Errorhandler';
const signin = async (user) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'credentials': 'include',
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log("loginError::",err)
      handleApiError(err);

    }
  }
  
  const signout = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    signin, 
    signout
  }
  