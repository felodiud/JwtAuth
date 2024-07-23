const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
    },
    actions: {
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(
            "http://192.168.50.127:3001/api/login",
            opts
          );
          if (response.status !== 200) {
            alert("Error!");
            return false;
          }

          const data = await response.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: sessionStorage.getItem("token") });
        } catch (error) {
          console.error("Error!, cannot log in!");
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      tokenFromSessioinStorage: () => {
        const token = sessionStorage.getItem("token");
        if (token && token !== undefined && token !== "") {
          setStore({ token: token });
        }
      },

      getMessage: () => {
        const store = getStore();
        const opts = {
          method: "GET",
          headers: { Authorization: "Bearer " + store.token },
        };
        return fetch("http://192.168.50.127:3001/api/hello", opts)
          .then((response) => response.json())
          .then((data) => data.message)
          .catch((err) => {
            console.error(err);
            return "Error!";
          });
      },
    },
  };
};

export default getState;
