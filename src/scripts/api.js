const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'daf5035e-4588-42a3-83e7-1ee78c41d205',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse);
}

export const getUserParameters = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse);
}

export const checkResource = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
    });
    return {
      exists: response.ok,
      status: response.status,
      mimeType: response.headers.get('Content-Type'),
      headers: response.headers
    };
  } catch (error) {
    return {
      exists: false,
      error: error.message
    };
  }
}

export const editProfile = (nameProfile, aboutProfile) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameProfile,
            about: aboutProfile
        })
    })
    .then(handleResponse);
}

export const editAvatar = (linkAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkAvatar,
        })
    })
    .then(handleResponse);
}

export const addNewCardOnServ = (nameCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
        })
    })
    .then(handleResponse);
}

export const deleteCardOnServer = (idCard) => {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse);
}

export const likeCardOnServer = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse);
}

export const deleteLikeCardOnServer = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse);
}