export const parseCookie = (cookieString: string, search: string) => {
  const cookies = cookieString.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === search) {
      return value;
    }
  }
};
