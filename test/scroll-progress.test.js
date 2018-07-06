const assert = chai.assert;

const defaultContainerClassName = 'scroll-progress__container';
const defaultInnerChildClassName = 'scroll-progress__fill';
const defaultCSSHeight = '6px';
const defaultCSSPosition = 'fixed';
const defaultCSSTop = '0px';
const defaultCSSWidth = '100%';
const defaultCSSBackgroundColor = 'skyblue';
const defaultChildElementCSSHeight = '100%';

const getElement = query => {
  return document.getElementsByClassName(query)[0];
};

describe('the ScrollProgress instance', () => {
  describe('when instantiated', () => {
    it('should return a new instance of ScrollProgress', () => {
      var scrollProgress = new ScrollProgress('.some-container');
      assert.instanceOf(
        scrollProgress,
        ScrollProgress,
        'scrollProgress should be an instance of ScrollProgress'
      );
    });
    it('should create a new DOM element', () => {
      var scrollProgress = new ScrollProgress('.some-container');
      var element = getElement(defaultContainerClassName);
      assert.exists(element);
    });

    it("should throw a ReferenceError if the selector argument doesn't exist", () => {
      assert.throws(function() {
        new ScrollProgress();
      }, ReferenceError);
    });
    it("should throw a TypeError when the selector argument isn't a string", () => {
      assert.throws(function() {
        new ScrollProgress({ not: 'a string' });
      }, TypeError);
    });
    it("should assign undefined to the options argument if one isn't provided", () => {
      var scrollProgress = new ScrollProgress('.some-container');
      assert.isUndefined(
        scrollProgress.options,
        `should be undefined, but is instead ${scrollProgress.options}`
      );
    });
    it("should throw a TypeError when the options argument isn't an object", () => {
      assert.throws(function() {
        new ScrollProgress('.some-container', 'but not an object');
      }, TypeError);
    });
  });
  afterEach(function() {
    if (getElement(defaultContainerClassName)) {
      getElement(defaultContainerClassName).remove();
    }
  });
});

describe('the new DOM element created by a ScrollProgress instance', () => {
  before(function() {
    new ScrollProgress('.some-container');
  });
  it('should have a CSS class name of ' + defaultContainerClassName, () => {
    var containsClassName = getElement(
      defaultContainerClassName
    ).classList.contains(defaultContainerClassName);
    assert.isTrue(containsClassName);
  });
  it(
    'should contain a child element with CSS class ' +
      defaultInnerChildClassName,
    () => {
      var containsElementWithCorrectClassName = getElement(
        defaultContainerClassName
      ).firstChild.classList.contains(defaultInnerChildClassName);
      assert.isTrue(containsElementWithCorrectClassName);
    }
  );
  it(`should have default CSS position: ${defaultCSSPosition}`, () => {
    var elementPosition = getElement(defaultContainerClassName).style.position;
    assert.equal(
      elementPosition,
      `${defaultCSSPosition}`,
      `element's default CSS position should be ${defaultCSSPosition}`
    );
  });
  it(`should have default CSS top: ${defaultCSSTop}`, () => {
    var elementPosition = getElement(defaultContainerClassName).style.top;
    assert.equal(
      elementPosition,
      `${defaultCSSTop}`,
      `element's default CSS top property should be set to ${defaultCSSTop}`
    );
  });
  it(`should have default CSS width: ${defaultCSSWidth}`, () => {
    var elementPosition = getElement(defaultContainerClassName).style.width;
    assert.equal(
      elementPosition,
      `${defaultCSSWidth}`,
      `element's default CSS width property should be set to ${defaultCSSWidth}`
    );
  });
  it(`should have default CSS height: ${defaultCSSHeight}`, () => {
    var elementPosition = getElement(defaultContainerClassName).style.height;
    assert.equal(
      elementPosition,
      defaultCSSHeight,
      `element's default CSS width property should be set to ${defaultCSSHeight}`
    );
  });
  after(function() {
    getElement(defaultContainerClassName).remove();
  });
});

describe('the child element, ' + defaultInnerChildClassName, () => {
  before(function() {
    new ScrollProgress('.some-container');
  });
  it(
    'should have default CSS background-color: ' + defaultCSSBackgroundColor,
    () => {
      var elementPosition = getElement(defaultInnerChildClassName).style
        .backgroundColor;
      assert.equal(
        elementPosition,
        defaultCSSBackgroundColor,
        `element's default CSS background-color property should be set to ${defaultCSSBackgroundColor}`
      );
    }
  );
  it(`should have default CSS height: ${defaultChildElementCSSHeight}`, () => {
    var elementPosition = getElement(defaultInnerChildClassName).style.height;
    assert.equal(
      elementPosition,
      defaultChildElementCSSHeight,
      `element's default CSS width property should be set to ${defaultChildElementCSSHeight}`
    );
  });
});
