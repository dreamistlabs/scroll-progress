var assert = chai.assert;

describe('new ScrollProgress', () => {
  it('returns a new instance of ScrollProgress', () => {
    var scrollProgress = new ScrollProgress('.some-container');
    assert.instanceOf(
      scrollProgress,
      ScrollProgress,
      'scrollProgress should be an instance of ScrollProgress'
    );
  });
  describe('the selector argument', () => {
    it("throws a ReferenceError when it isn't provided", () => {
      assert.throws(function() {
        new ScrollProgress();
      }, ReferenceError);
    });
    it("throws a TypeError when it isn't a string", () => {
      assert.throws(function() {
        new ScrollProgress({ not: 'a string' });
      }, TypeError);
    });
  });
  describe('the options argument', () => {
    it("throws a TypeError when it isn't an object", () => {
      assert.throws(function() {
        new ScrollProgress('.some-container', 'but not an object');
      }, TypeError);
    });
    it("returns undefined if one isn't declared", () => {
      var scrollProgress = new ScrollProgress('.some-container');
      assert.isUndefined(
        scrollProgress.options,
        `should be undefined, but is instead ${scrollProgress.options}`
      );
    });
  });
});
