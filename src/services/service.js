
class Service {
  get(url) {
    return fetch(url).then(function(response) {
      let result = {};
      result.promise = response.json();
      result.link = response.headers.get("link");
      // link will have the next and the last page
      return result;
    });
  }
}
export default new Service();
