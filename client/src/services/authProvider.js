import handleRequest from "@utils/handleRequest";
import backendRoutes from "@constants/backendRoutes";

const requestSignUp = async (newUser) => {
  return fetch(backendRoutes.registerRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

const requestSignIn = async (credentials) => {
  return fetch(backendRoutes.loginRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

const authProvider = {
  signUp: async (newUser) => {
    const response = await handleRequest(() => requestSignUp(newUser));
    const { token, user } = await response.json();
    localStorage.setItem("token", token);
    return user;
  },
  signIn: async (credentials) => {
    const response = await handleRequest(() => requestSignIn(credentials));
    const { token, user } = await response.json();
    localStorage.setItem("token", token);
    return user;
  },
  signOut: () => {
    return localStorage.removeItem("token");
  },
};

export default authProvider;