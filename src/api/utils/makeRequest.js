export async function makeRequest(
  url,
  params = null,
  responseToJson = true,
  headerMethod = null,
  headerToken = null,
  bodyData = null,
  contentType = 'application/json'
) {
  function getParam() {
    if (!contentType) {
      return {
        method: headerMethod,
        headers: {
          Authorization: headerToken,
        },
        body: bodyData,
      };
    } else {
      return {
        method: headerMethod,
        headers: {
          Authorization: headerToken,
          'Content-type': contentType,
        },
        body: bodyData,
      };
    }
  }
  try {
    const response = await fetch(url, params && getParam());
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
