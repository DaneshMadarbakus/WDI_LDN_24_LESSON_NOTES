angular
  .module('lightsaberApp')
  .factory('Character', Character);

Character.$inject = ['API', '$resource'];
function Character(API, $resource) {
  const Character = $resource(`${API}/characters/:id`,
    { id: '@_id' },
    {
      // 'get': { method: 'GET' },
      // 'save': { method: 'POST' },
      // 'remove': { method: 'DELETE' },
      // 'delete': { method: 'DELETE' },
      // 'query': { method: 'GET', isArray: true },
      'update': { method: 'PUT' }
    }
  );

  // Character.prototype.firstName = function(){
  //   if (this.name) {
  //     if (this.name.indexOf(' ') === -1) return this.name;
  //     return this.name.slice(0, this.name.indexOf(' '));
  //   }
  // };

  // angular.extend(Character.prototype, {
  //   firstName: function() {
  //     if (this.name) {
  //       if (this.name.indexOf(' ') === -1) return this.name;
  //       return this.name.slice(0, this.name.indexOf(' '));
  //     }
  //   }
  // });

  Object.defineProperty(Character.prototype, 'firstName', {
    get: function(){
      if (this.name) {
        if (this.name.indexOf(' ') === -1) return this.name;
        return this.name.slice(0, this.name.indexOf(' '));
      }
    }
  });

  return Character;
}
