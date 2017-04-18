const MANIFEST_BASE_URL = "/mars/manifest"
const PHOTOS_BASE_URL = "/mars/photos"

function getManifest(rover) {
  let uri = `${MANIFEST_BASE_URL}/${rover}`
  return getData(uri)
}

function getImagesBySol(rover, sol) {
  let uri = `${PHOTOS_BASE_URL}/${rover}/sol/${sol}`
  return getData(uri)
}

function getImagesByDate(rover, date) {
  let uri = `${PHOTOS_BASE_URL}/${rover}/earthdate/${date}`
  return getData(uri)
}

// generic function for fetching data
function getData(uri) {
  return fetch(uri, {
    accept: 'application/json',
  })
  .then(checkStatus)
  .then((res) => res.json())
  .catch((err) => console.log(`error ${err.status} fetching ${uri}`))
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  let error = new Error(`HTTP Error ${res.status} ${res.statusText}`);
  error.status = res.status;
  error.res = res;
  throw error;
}

const Ajax = { getManifest, getImagesBySol, getImagesByDate };
export default Ajax;
