export async function makeRequest(
  url,
  params = null,
  responseToJson = true,
  headerMethod = null,
  _headerToken = null,
  bodyData = null,
  contentType = 'application/json'
) {
  function getParam() {
    const headers = {};
    if (contentType) {
      headers['Content-type'] = contentType;
    }
    return {
      method: headerMethod,
      headers,
      credentials: 'include',
      body: bodyData,
    };
  }
  try {
    const response = await fetch(url, params ? getParam() : { credentials: 'include' });
    if (responseToJson) {
      const result = await response.json();
      return result;
    } else {
      return response;
    }
  } catch (err) {
    return err;
  }
}
