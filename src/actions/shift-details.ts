export const createShiftData = async (data) => {
  return fetch("api/shift-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (!json.success) {
        throw new Error(json.message);
      }
    });
};
