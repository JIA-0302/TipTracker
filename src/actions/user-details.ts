export const getUserData = async () => {
  const url = `api/user-profile/`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userDetail = data.userDetail;
      if (userDetail) {
        return {
          name: userDetail["name"],
          email: userDetail["email"],
        };
      }
      return {};
    });
};

export const updateUserData = async (data) => {
  const url = `api/user-profile/`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};
