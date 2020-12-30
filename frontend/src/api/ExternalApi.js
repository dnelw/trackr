const serverUrl = process.env.REACT_APP_API_URI;

export const callApi = async () => {
  try {
    const response = await fetch(`${serverUrl}/`);

    const responseData = await response.json();

    console.log(responseData);
  } catch (error) {
    console.log(error.message);
  }
};

export const callSecureApi = async (user, token) => {
  if (user && token) {
    try {
      const { sub } = user;
      const response = await fetch(`${serverUrl}/user/${sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  }
};
