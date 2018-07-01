import {
  containerStyles,
  fillStyles
} from './lib/cssStyles';

export class ScrollProgress {
  constructor(selector, options) {
    console.log('//scroll-progress v0.0.1');
    this.selector = selector;
    this.options = options;
    this.element = this.queryElement();
    this.elementHeight = this.element.offsetHeight;
    this.elementWidth = this.element.offsetWidth;
    this.progressBar = this.createProgressBar();
    this.progress = this.updateProgress();
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    this.initialize();
  }
  initialize() {
    this.applyCSS(this.progressBar, containerStyles);
    this.applyCSS(this.progressBar.firstChild, fillStyles);

    document.addEventListener('scroll', () => {
      this.updateProgress();
    });
    document.addEventListener('resize', () => {
      this.updateProgress();
    });
  }

  updateProgress() {
    //--TODO: option for height vs width (vertical vs horizontal)
    this.progress = (window.scrollY / (this.elementHeight - this.windowHeight)) * 100;
    this.progressBar.firstChild.style.width = this.progress + '%';
    console.log(this.elementHeight, window.innerHeight, this.windowHeight, window.scrollY, this.progress);
  }
  validateParameters() {
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
  applyCSS(element, styles) {
    for (let style of styles) {
      console.log(style);
      element.style[style.property] = style.value;
    }
  }
  applyCSSStyles() {
    for (let option in this.options) {
      const acceptedProperties = ['color', 'position'];
      if (acceptedProperties.includes(option)) {
        const fillProperties = ['color'];
        if (fillProperties.includes(option)) {
          this.setCSS(this.progressBar.firstChild, option);
        } else {
          this.setCSS(this.progressBar, option);
        }
      }
    }
  }
  setCSS(element, option) {
    let property;
    switch (option) {
      case 'color':
        property = 'backgroundColor';
        break;
      case 'position':
        console.log('position', option);
        property = option;
        element.style[this.options[option]] = 0;
        return;
      default:
        break;
    }
    element.style[property] = this.options[option];
  }

  createProgressBar() {
    const progressBar = this.createProgressBarContainer();
    document.body.appendChild(progressBar);
    return progressBar;
  }
  createProgressBarContainer() {
    const container = document.createElement('div');
    container.appendChild(this.createProgressBarFill());
    container.classList.add('scroll-progress__container');
    return container;
  }
  createProgressBarFill() {
    const el = document.createElement('div');
    el.classList.add('scroll-progress__fill');
    return el;
  }
  queryElement() {
    if (!document.querySelector(this.selector)) {
      throw new ReferenceError()
    }
    return document.querySelector(this.selector)
  }

}