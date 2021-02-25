type APIWageType = "hourly" | "non-hourly";

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

export const getShiftData = async (wageType: APIWageType, shiftId) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};

export const updateShiftData = async (wageType: APIWageType, shiftId, data) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "PUT",
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

export const deleteShiftData = async (wageType: APIWageType, shiftId) => {
  const url = `api/shift-details/${wageType}/${shiftId}`;
  return fetch(url, {
    method: "DELETE",
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
