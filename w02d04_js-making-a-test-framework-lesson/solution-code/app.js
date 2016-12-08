// The `describe` function is for grouping related specs.
function describe(description, callback) {
  console.log(description);
  callback();
}

// Specs/Tests are defined by calling the `it` function
function it(description, callback) {
  console.log(description);
  callback();
}

// Expectations are built with the function expect
function expect(object){
  function log(result) {
    if (!!result) {
      console.log('%c' + "pass", 'color: green');
    } else {
      console.log('%c' + "fail", 'color: red');
    }
  }
  return {
    toBe: function(condition){
      return log(object === condition);
    },
    toBeDefined: function() {
      return log(typeof object !== "undefined");
    },
    toBeUnDefined: function() {
      return log(typeof object === "undefined");
    },
    toEqual: function(condition){
      return log(object === condition);
    },
    toBeTruthy: function() {
      return log(!!object === true);
    },
    toBeFalsey: function(){
      return log(!!object === false);
    },
    toBeNull: function(){
      return log(object === null);
    },
    toContain: function(condition){
      return log(object.indexOf(condition) >= 0);
    }
  };
}

// Let's define a car
var car = {
  wheels: 5,
  owners: ["Alex", "Mike", "Gerry", "Steve"],
  crashes: null,
  mot: true,
};

// Now let's create some specs for this car object
describe("These are the specs for a car", function(){
  it("should exist (be true)", function(){
    expect(!!car).toBe(true);
  });
  it("should be defined", function(){
    expect(car).toBeDefined();
  });
  it("should be undefined", function(){
    expect(car.color).toBeUnDefined();
  });
  it("should have two wheels", function(){
    expect(car.wheels).toEqual(2);
  });
  it("should have it's mot", function(){
    expect(car.mot).toBeTruthy();
  });
  it("should have had no crashes", function(){
    expect(car.crashes).toBeFalsey();
  });
  it("should have had null crashes", function(){
    expect(car.crashes).toBeNull();
  });
  it("should have had Alex as an owner", function(){
    expect(car.owners).toContain("Alex");
  });
});
