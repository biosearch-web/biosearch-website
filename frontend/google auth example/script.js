function handleCredentialResponse(response) {
  console.log("Token JWT:", response.credential);

  // Aqui você pode decodificar o usuário
  const data = parseJwt(response.credential);
  console.log(data);
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}