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

function request(endPoint, options) {
  return fetch(`${config.baseUrl}${endPoint}`, options).then(handleResponse)
}

export const getInitialCards = () => {
  const options = {
    headers: config.headers
  }
  return request('/cards', options);
}

export const getUserParameters = () => {
  const options = {
    headers: config.headers
  }
  return request('/users/me', options);
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
  const options = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: nameProfile,
        about: aboutProfile
    })    
  }
  return request('/users/me', options);
}

export const editAvatar = (linkAvatar) => {
  const options = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: linkAvatar,
    })    
  }
  return request('/users/me/avatar', options);
}

export const addNewCardOnServ = (nameCard, linkCard) => {
  const options = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: nameCard,
        link: linkCard
    })
  }
  return request('/cards', options);
}

export const deleteCardOnServer = (idCard) => {
  const options = {
    method: 'DELETE',
    headers: config.headers    
  }
  return request(`/cards/${idCard}`, options);
}

export const likeCardOnServer = (idCard) => {
  const options = {
    method: 'PUT',
    headers: config.headers    
  }
  return request(`/cards/likes/${idCard}`, options);
}

export const deleteLikeCardOnServer = (idCard) => {
  const options = {
    method: 'DELETE',
    headers: config.headers    
  }
  return request(`/cards/likes/${idCard}`, options);
}