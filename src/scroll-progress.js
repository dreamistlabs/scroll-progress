import {
  containerStyles,
  fillStyles
} from './lib/cssStyles';

export class ScrollProgress {
  constructor(selector, options) {
    console.log('//scroll-progress v0.0.1');
    this.selector = selector;
    this.options = options;
    this.element = queryElement(this.selector);
    this.elementHeight = this.element.offsetHeight;
    this.elementWidth = this.element.offsetWidth;
    this.progressBar = createProgressBar();
    this.progress = updateProgress(this);
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    function applyCSS(element, styles) {
      for (let style of styles) {
        element.style[style.property] = style.value;
      }
    }

    function createProgressBar() {
      const progressBar = createProgressBarContainer();
      document.body.appendChild(progressBar);
      return progressBar;
    }

    function createProgressBarContainer() {
      const el = document.createElement('div');
      el.appendChild(createProgressBarFill());
      el.classList.add('scroll-progress__container');
      return el;
    }

    function createProgressBarFill() {
      const el = document.createElement('div');
      el.classList.add('scroll-progress__fill');
      return el;
    }

    function queryElement(selector) {
      if (!document.querySelector(selector)) {
        throw new ReferenceError()
      }
      return document.querySelector(selector)
    }

    function updateProgress(object) {
      //--TODO: option for height vs width (vertical vs horizontal)
      object.progress = (window.scrollY / (object.elementHeight - object.windowHeight)) * 100;
      object.progressBar.firstChild.style.width = object.progress + '%';
      console.log(object.elementHeight, window.innerHeight, object.windowHeight, window.scrollY, object.progress);
    }

    function validateParameters() {
      if (this.selector) {
        throw new ReferenceError();
      }
      if (typeof selector !== 'string') {
        throw new TypeError();
      }
      if (options && typeof options !== 'object') {
        throw new TypeError();
      }
    }

    (function initialize(object) {
      applyCSS(object.progressBar, containerStyles);
      applyCSS(object.progressBar.firstChild, fillStyles);
      document.addEventListener('scroll', () => {
        updateProgress(object);
      });
      document.addEventListener('resize', () => {
        updateProgress(object);
      });
    })(this);
  }
}