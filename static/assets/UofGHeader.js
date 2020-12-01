"use strict";

(function () {

    function loadJS(url) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');

            script.setAttribute('src', url);
            script.onload = () => {
                resolve('Loaded ' + url + ' Successfully!');
            }
            script.onerror = (e) => {
                reject(Error('Failed to load ' + url));
            }

            document.body.appendChild(script);
        });
    }

    function defineComponents() {
        if (typeof customElements.get('uofg-header') != 'function') {
            class UofGDropdownMenu extends HTMLElement {
                constructor() {
                    super();

                    this.createContainers();
                    this.openMethod = this.fadeIn;
                    this.closeMethod = this.fadeOut;
                    this.initialized = false;
                }
                connectedCallback() {
                    if (!this.initialized && this.isConnected) {
                        this.initialized = true;
                        if (this.getAttribute('data-closeonblur') != 'false') {
                            this.addEventListener('focusout', this.closeOnBlur);
                        }
                        this.render();
                    }
                }
                attributeChangedCallback(name, oldValue, newValue) {
                    switch (name) {
                        case 'data-closeonblur':
                            if (newValue == 'false') {
                                this.removeEventListener('focusout', this.closeOnBlur);
                            } else if (oldValue == 'false') {
                                this.addEventListener('focusout', this.closeOnBlur);
                            }
                            break;
                        case 'data-animation':
                            switch (newValue) {
                                case 'slide':
                                    this.openMethod = this.slideDown;
                                    this.closeMethod = this.slideUp;
                                    break;
                                case 'none':
                                    this.openMethod = this.instantOpen;
                                    this.closeMethod = this.instantClose;
                                    break;
                                default:
                                    this.openMethod = this.fadeIn;
                                    this.closeMethod = this.fadeOut;
                                    break;
                            }
                            break;
                        case 'data-transition-time':
                            this.transition_time = (newValue) ? newValue : '200';
                            break;
                        default:
                            break;
                    }
                }
                static get observedAttributes() {
                    return ['data-closeonblur', 'data-animation', 'data-transition-time'];
                }
                render() {
                    this.classList.add('uofg-dropdown-menu');
                    this.tabIndex = '-1';

                    let sibling = this.nextElementSibling;
                    let parent = this.parentElement;

                    parent.removeChild(this); //Remove element from DOM to reduce reflows

                    while (this.firstElementChild) { //Move all of the custom components children into approriate containers
                        if (this.firstElementChild.classList.contains('opener')) { //If a child has the opener class it will be placed in the button of this custom element. (NOTE that button elements have restrictions on what can be considered valid children, for example div is considered an invalid child of button)
                            this.firstElementChild.classList.remove('opener');
                            this.opener.appendChild(this.firstElementChild);
                        } else {
                            this.container.appendChild(this.firstElementChild)
                        }
                    }

                    this.appendChild(this.opener);
                    this.appendChild(this.container);

                    if (sibling) { //Add element back into DOM
                        parent.insertBefore(this, sibling);
                    } else {
                        parent.appendChild(this);
                    }

                    this.transition_time = (this.transition_time) ? this.transition_time : '200';

                    this.container.calculatedRenderHeight = this.container.offsetHeight + 'px';
                    this.container.style.display = 'none';

                    this.dispatchEvent(new CustomEvent('dropdownready'));
                }
                createContainers() {
                    //Create a button that will act as a method of opening and closing the dropdown.
                    this.opener = document.createElement('button');
                    this.opener.classList.add('uofg-dropdown-menu-opener');
                    this.opener.setAttribute('aria-haspopup', true);
                    this.opener.setAttribute('aria-expanded', false);
                    this.opener.addEventListener('click', () => {
                        this.toggle();
                    });
                    this.opener.addEventListener('keydown', (e) => {
                        switch (e.key) {
                            case 'ArrowDown':
                                e.preventDefault();
                                let nextFocusable = this.container.querySelector('a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])');
                                if (nextFocusable) {
                                    nextFocusable.focus();
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    this.addEventListener('keydown', (e) => {
                        if (e.key == 'Escape') {
                            this.close();
                        }
                    });

                    //Create a div which will contain all of the elements that are a part of the dropdown
                    this.container = document.createElement('div');
                    this.container.setAttribute('tabindex', '-1');
                    this.container.setAttribute('role', 'menu');
                    this.container.classList.add('uofg-dropdown-menu-container');
                }
                open() {
                    this.classList.add('open');
                    this.opener.setAttribute('aria-expanded', true);

                    this.openMethod();

                    this.dispatchEvent(new CustomEvent('dropdownopen', { bubbles: true }));
                }
                close() {
                    this.classList.remove('open');
                    this.opener.setAttribute('aria-expanded', false);

                    this.closeMethod();

                    this.dispatchEvent(new CustomEvent('dropdownclosed', { bubbles: true }));
                }
                closeOnBlur(e) {
                    if (!this.contains(e.relatedTarget)) {
                        if (this.classList.contains('open')) {
                            this.close();
                        }
                    }
                }
                toggle() {
                    if (!this.animationPlaying) {
                        if (this.classList.contains('open')) {
                            this.close();
                        } else {
                            this.open();
                        }
                    }
                }
                fadeIn() {
                    this.animationPlaying = true;

                    window.requestAnimationFrame(() => {
                        this.container.style = `opacity: 0; transition: all ease-in ${this.transition_time}ms;`;

                        window.requestAnimationFrame(() => {
                            this.container.style.opacity = '1';

                            clearTimeout(this.fadeInTimer);
                            this.fadeInTimer = setTimeout(() => {
                                this.container.style = '';
                                this.animationPlaying = false;
                                this.fadeInTimer = null;
                            }, this.transition_time);
                        });
                    });
                }
                fadeOut() {
                    this.animationPlaying = true;

                    window.requestAnimationFrame(() => {
                        this.container.style = `opacity: 1; transition: all ease-in ${this.transition_time}ms;`;

                        window.requestAnimationFrame(() => {
                            this.container.style.opacity = '0';

                            clearTimeout(this.fadeOutTimer);
                            this.fadeOutTimer = setTimeout(() => {
                                this.container.style = 'display: none;';
                                this.animationPlaying = false;
                                this.fadeOutTimer = null;
                            }, this.transition_time);
                        });
                    });
                }
                slideUp() {
                    this.animationPlaying = true;

                    window.requestAnimationFrame(() => {
                        this.container.style = `overflow: hidden; height: ${this.container.calculatedRenderHeight}; transition: all ease-in ${this.transition_time}ms;`;

                        window.requestAnimationFrame(() => {
                            this.container.style.height = 0;
                            this.container.style.paddingTop = 0;
                            this.container.style.paddingBottom = 0;
                            this.container.style.marginTop = 0;
                            this.container.style.marginBottom = 0;

                            if (!this.slideUpTimer) {
                                this.slideUpTimer = setTimeout(() => {
                                    this.container.style = 'display: none;';
                                    this.animationPlaying = false;
                                    this.slideUpTimer = null;
                                }, this.transition_time);
                            }
                        });
                    });
                }
                slideDown() {
                    this.animationPlaying = true;

                    window.requestAnimationFrame(() => {
                        this.instantOpen();
                        this.container.calculatedRenderHeight = this.container.offsetHeight + 'px';
                        this.instantClose();

                        window.requestAnimationFrame(() => {
                            this.container.style = `overflow: hidden; height: 0; padding-top: 0; padding-bottom: 0; margin-top: 0; margin-bottom: 0; transition: all ease-in ${this.transition_time}ms;`;

                            window.requestAnimationFrame(() => {
                                this.container.style.height = this.container.calculatedRenderHeight;
                                this.container.style.paddingTop = '';
                                this.container.style.paddingBottom = '';
                                this.container.style.marginTop = '';
                                this.container.style.marginBottom = '';

                                if (!this.slideDownTimer) {
                                    this.slideDownTimer = setTimeout(() => {
                                        this.container.style = '';
                                        this.animationPlaying = false;
                                        this.slideDownTimer = null;
                                    }, this.transition_time);
                                }
                            });
                        });
                    });
                }
                instantClose() {
                    this.container.style = 'display:none';
                }
                instantOpen() {
                    this.container.style = '';
                }
            }
            class UofGHeader extends HTMLElement {
                constructor() {
                    super();
                }
                connectedCallback() {
                    if (this.isConnected && !this.content_container) {
                        //Check to see if the header breakpoint already exists (the breakpoint acts as a spacer/placeholder for the header and will also function as the element used by the IntersectionObserver API which will determine when to switch header states)
                        this.breakPoint = document.querySelector('#header-breakpoint');
                        if (!this.breakPoint) { //If it doesn't exist, create it and insert it before the custom element
                            this.breakPoint = document.createElement('div');
                            this.breakPoint.id = 'header-breakpoint';
                            document.body.prepend(this.breakPoint); //Make sure the breakpoint is the first element in the body
                        }

                        //Creating intersection observer that will change header state for desktop on scroll
                        this.intersection_observer = new IntersectionObserver((entries, observer) => {
                            let entry = entries[0];
                            if (entry.isIntersecting) {
                                this.expand();
                            } else {
                                this.reduce();
                            }
                        }, {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0.0
                        });

                        window.addEventListener('resize', () => {
                            this.resizeHandler();
                        });

                        this.transitionTime = Number.parseFloat(getComputedStyle(this).transitionDuration) * 1000;
                        this.render();
                        this.dispatchEvent(new CustomEvent('uofgheaderready', { bubbles: true }));
                    }
                }
                render() {
                    //Remove header from DOM to minimize reflows
                    let parent = this.parentElement;
                    let sibling = this.nextElementSibling;
                    parent.removeChild(this);

                    //Create all header content
                    this.content_container = document.createElement('header');
                    this.content_container.id = "uofg-header-container";
                    this.content_container.appendChild(this.createUofgLogo());

                    let flex_break = document.createElement('div');
                    flex_break.classList.add('break');

                    this.main_content = document.createElement('div');
                    this.main_content.id = 'uofg-header-main-content';
                    this.main_content.reduced = false;

                    this.searchBar = this.createSearchBar();
                    this.searchMenu = this.createSearchMenu();
                    this.resourcesMenu = this.createResourcesMenu();
                    this.mainMenu = this.createMainMenu();
                    this.pageSpecific = this.createPageSpecific();

                    this.main_content.appendChild(this.searchBar);
                    this.main_content.appendChild(this.searchMenu);
                    this.main_content.appendChild(this.resourcesMenu);
                    this.main_content.appendChild(flex_break);
                    this.main_content.appendChild(this.mainMenu);

                    if (this.pageSpecific) {
                        flex_break = flex_break.cloneNode();
                        this.main_content.appendChild(flex_break);
                        this.main_content.appendChild(this.pageSpecific);
                    }

                    this.content_container.appendChild(this.main_content);
                    this.appendChild(this.content_container);

                    this.resizeHandler();
                    this.classList.remove('unloaded');

                    //Add header back into DOM
                    if (sibling) {
                        parent.insertBefore(this, sibling);
                    } else {
                        parent.appendChild(this);
                    }
                }
                createUofgLogo() {
                    let logo = document.createElement("a");
                    logo.href = 'https://www.uoguelph.ca/';
                    logo.id = 'uofg-header-logo-link';

                    let img = document.createElement('img');
                    img.src = "data:image/svg+xml;utf8,%3Csvg id=' Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 404.7 810.11' %3E%3Cstyle%3E.st0%7Bfill:%23fff%7D%3C/style%3E%3Cpath d='M0-.71h404.7v810.83H0z'/%3E%3Cpath class='st0' d='M302.59 628.15l-2.26 8.28c9.78 0 22.57 6.02 22.57 11.28v39.37c-.04-.84-1.36 21.57-32.35 21.57-55.68 0-63.2-40.63-63.2-81.25 0-27.84 9.78-53.42 23.32-69.22 13.54-15.8 39.87-15.05 61.69-12.79 21.82 2.26 27.84 36.11 27.84 36.11l6.77-2.26 1.5-54.17s-3.01-3.01-5.27-2.26-10.53 4.51-15.05 4.51c-4.51 0-18.81-3.76-33.86-3.76-27.08 0-53.42 6.77-72.98 33.86a130.85 130.85 0 0 0-13.98 24.55v-63.05l.06-.57c0-33.1 16.63-26.42 18.43-29.72 2.26-4.14 2.63-4.89-.38-5.64 0 0-35.42-.44-64.33 0 0 0-8.4 5.95-3.01 6.39 21.48 1.79 31.22 9.4 31.22 30.09l-.06.19v103.07c0 27.08-21.07 43.64-51.16 43.64-30.09 0-51.16-19.56-51.16-52.66v-94.04c0-33.1 16.63-27.17 18.43-30.47 2.26-4.14 2.63-4.89-.38-5.64 0 0-37.99 2.26-65.83 0 0 0-8.4 5.94-3.01 6.39 21.48 1.79 22.19 12.04 22.19 32.73v106.83s-2.26 57.18 72.98 57.18c31.6 0 50.41-12.79 60.19-25.58 0 0 2.58-2.58 5.65-7.14 1.13 10.01 3.21 19.78 6.07 29.09 12.04 39.12 57.18 49.65 72.22 49.65 18.81 0 18.06 0 35.36-11.29 8.91-5.81 42.13-18.06 42.13-18.06v-54.92c0-9.78 16.55-13.54 16.55-13.54l.75-6.77h-67.65z'/%3E%3Cdefs%3E%3Cpath id='SVGID_1_' d='M0-.71h404.7v406.13H0z'/%3E%3C/defs%3E%3CclipPath id='SVGID_2_' %3E%3Cuse xlink:href='%23SVGID_1_' overflow='visible'/%3E%3C/clipPath%3E%3Cpath class='st0' d='M297.3 156.72s-3.41-.3-3.41 6.33l.02 24.9c0 4.42 1.37 5.67 4.22 6.02.96.12-.19 1.39-.4 1.61-.2.2-6.02-.6-12.45 0-.8.07-.21-.6-.21-1.41s3.62-.2 3.62-4.22l-.02-26c0-7.43-5.62-6.83-5.62-6.83s-.8-1.81 2.41-1.81c1.4 0 8.33.2 11.85 0 .9-.05.9.2.6.6-.31.41-.01.71-.61.81m-134.63 44.07l-13.2-35.74c-3.01-8.03-6.22-8.23-6.22-8.23s-.6-1.4 2.61-1.4h12.85l-.65 1.81c-2.01 0-4.22 1.61-2.41 7.03l8.23 23.29s5.62-13.65 7.63-19.88c2.01-6.22 1.2-8.63-1.61-10.04-2.81-1.4-.6-2.21-.6-2.21h11.64v1.4c-3.01.4-4.97 7.85-6.22 11.25-4.12 11.14-10.44 30.92-10.84 31.92-.38.93-.41 1.2-1.21.8m44.2 16.62c-.52 1.81-2.33 1.86-5.04 1.86-3.01 0-7.03.6-7.03.6v-12.05h11.04s4.62.21 5.62 4.22c1 4.02 3.21 1.21 2.21-1.4-1.01-2.61-1.01-7.03-1.01-7.03l-2.91.3h-24.09c-3.21 0-2.01 2.01-2.01 2.01s5.22-.2 5.22 6.63l.02 25.4c0 4.02-3.23 3.91-3.61 4.62-1.01 1.87-.34 1.61 1 1.61 0 0 15.14-.4 23.97 0 1.2.05 2.81 1 3.62-.4.94-1.65 1.41-8.84 1.41-8.84s-.32-3.24-2.21 0c-1.82 3.13-1.81 5.83-8.83 5.83s-9.24-.4-9.44-2.82c-.2-2.4 0-14.45 0-14.45s.81-1.2 3.41-1.2h4.02s3.63.27 4.42 4.22c.2 1 1.61-.41 1.61-.41v-8.03c0-.02-.26-1.08-1.39-.67m31.81-62.35c4.62 0 8.32 4.37 8.32 8.99 0 6.23-6.82 10.04-10.84 10.04 0 0 4.51 2.8 10.84 12.45 6.33 9.64 12.25 11.85 18.37 12.15 2.21.11 7.13-.2 12.65-3.41 3.51-2.04 1.4.81 1.01 1.2-.4.4-6.73 5.72-16.16 5.72-11.44 0-18.88-9.44-22.49-15.06-3.62-5.62-8.43-10.69-8.43-10.69-1.96-2.54-4.62-1.61-4.62-1.61v15.46c0-.4-.29 2.3 2.8 3.06 3.15.77 1 2.01 1 2.01l-12.92-.05c-.8 0 0-.4 0-1.2 0-.81 3.82-.2 3.82-4.22l-.02-26.4c.61-6.63-5.22-7.03-5.22-7.03 0-1.61.89-1.8 2.9-1.65 5.22.38 16.38.45 18.99.24m-3.52 3.12l-7.83.4v12.45s3.43.92 6.42.6c1.91-.2 4.52-.65 5.65-2.06 0 0 1.37-2.71 1.37-4.92.01-2.21-1.99-5.67-5.61-6.47z'/%3E%3Cpath class='st0' d='M280.73 154.61s-1 .61-2.81.4c-1.81-.2-5.83-.88-8.43-.8-7.03.2-13.45 5.62-13.45 11.25 0 5.62 4.41 9.23 10.84 10.64 6.42 1.4 10.04 3.01 10.04 8.63 0 4.82-5.22 6.83-9.04 6.83-3.81 0-8.68-2.98-10.84-6.22-1.61-2.41-1.2-4.62-1.2-4.62l-2.11.8s.7 5.02.1 7.43c-.45 1.8 4.82 6.63 12.85 6.63 9.84 0 16.26-4.62 16.26-14.26 0-8.03-9.84-9.84-12.65-10.44-2.81-.6-8.44-2.61-8.44-7.23 0-4.62 4.82-5.62 8.23-5.62 3.42 0 6.02 1.41 7.43 3.41 1.41 2.01 1.41 3.81 1.41 3.81l1.81-.6s-.6-4.22-.6-5.62c0-1.61.6-4.21.6-4.42m22.29 1.21h23.29c1.21 0 3.21-1.2 4.02-.4 0 0 .4.4.4 2.01v7.43c0 .8-1.59 1.77-1.81.4-.83-5.25-1.81-5.82-5.62-5.82-2.21 0-4.82-.81-4.82 1.81v29.32c0 2.81 3.08 3.04 4.22 3.61.4.2-.4 1.41-.4 1.41h-14.26s-.6-1.61.6-1.81c1.2-.2 3.82-2.41 3.82-4.22v-28.11s.4-2.01-2.01-2.01c-4.82 0-7.8-.97-8.84 5.22-.2 1.2-2.01 2.61-2.01 0 0-1.01.14-6.22 0-7.63-.19-2.02.81-2.21 3.42-1.21m-203 48.19l1.81-.2v7.23c-2.41 0-2.61-2.01-2.41-3.41.2-1.4-5.43 1.05-9.64 5.02-3.61 3.41-4.82 7.22-4.82 7.22 0 .21 5.22.41 5.82-1.6.06-.2 1 .4 1 .4v7.03s-1.14 1.44-1.61 1.21c-.47-.24 1.41-4.62-3.61-4.42-2.41.09-2.61-.2-2.61 0s-2.22 9.24-8.03 15.66c-5.72 6.33-14.06 8.23-18.87 4.21v-2.01s3.2 1.5 6.02 1.41c3.43-.12 8.55-1.7 12.05-8.03 3.71-6.73 4.62-10.64 4.62-11.24 0-.4-1.31-.2-1.31-.2l-.7-2.21h3.11s1.2-5.02 6.53-9.44c3.62-3.01 7.43-5.62 12.65-6.63m38.96-.41l-.4 14.46-1.81.6s-1.61-9.03-7.43-9.64c-5.82-.6-12.85-.8-16.46 3.42-3.61 4.21-6.22 11.04-6.22 18.47 0 10.85 2.01 21.69 16.87 21.69 8.84 0 8.63-6.83 8.63-5.62v-10.64c0-1.41-3.41-3.02-6.02-3.02l.6-2.21h18.07l-.2 1.81s-4.42 1-4.42 3.61v14.66s-8.87 3.27-11.25 4.82c-4.62 3.01-4.42 3.01-9.44 3.01-4.01 0-16.06-2.81-19.27-13.25-3.21-10.44-2.76-23.04 4.82-33.53 5.22-7.23 12.25-9.04 19.48-9.04 4.01 0 7.83 1.01 9.03 1.01 1.21 0 3.41-1.01 4.02-1.2.6-.21 1.4.59 1.4.59m5.62.41h13.25l-.2 2.01s-3.62.8-3.62 3.41v23.5c0 4.62 5.22 7.83 8.84 7.83 3.61 0 11.24-2.61 11.24-9.84v-21.68c0-1.41-1.61-3.42-5.42-3.42-1 0 1.61-2.01 1.61-2.01h10.84l-.4 2.01s-2.81 1-2.81 3.62c0 2.9-.2 18.14-.2 19.88 0 8.63-7.23 15.67-14.86 15.67-9.44 0-15.06-4.22-15.06-11.65v-25.1c0-1.41-3.82-2.41-3.82-2.41-1.6.19.61-1.82.61-1.82m72.89.19h14.06l-.6 1.61s-4.02-.6-4.02 5.02v27.1c0 1.2-1 1.61 2.41 2.61 1.54.45 8.97.27 11.04-.6 3.81-1.61 4.82-6.22 4.82-6.22l1.2-.2s-.4 8.64-1.01 9.84c-.6 1.21-1.84.84-4.82.6-5.02-.4-23.09.21-23.09.21l-.4-1.21s3.81-.2 3.81-8.44v-25.1c0-4.22-2.9-2.81-4.41-3.82-.6-.39 1.01-1.4 1.01-1.4m30.92.61s8.85.09 12.04-.4c5.22-.81 9.76-.47 13.45 1.81 2.61 1.6 3.82 5.22 4.02 7.43.42 4.6-2.67 7.74-5.02 9.44-3.61 2.61-6.82 3.01-14.45 2.21-1-.1-.81 1.61-.81 2.61v10.84c0 1.4 2.01 3.61 5.22 3.61.2 0-.81 1.61-.81 1.61H248.2s-.6-1 .4-1.4c1-.4 2.82-.8 3.01-3.21.2-2.41 0-27.31 0-29.52 0-1.21-1-3.21-3.81-3.21l.61-1.82m9.43 16.27s-.2 2.25 7.03 2c4.62-.16 6.82-5.22 6.82-8.43s-2.81-6.03-5.22-6.63c-2.41-.6-8.63 0-8.63 0v13.06zm57.62 23.14l.02-1.4c-.83-.01-3.59-.23-3.58-4.65.01-2.21.01-27.77.03-29.72.02-2.25 4.04-2.98 4.04-2.98l.21-1.21-13.65-.09-.22 1.61s3.73.34 3.73 2.75v11.75h-17.47c-1 0-.6-.6-.6-1.61v-9.84c0-2.41 2.81-2.61 2.81-2.61l.6-2.01h-12.65l-.4 1.61s3.82-.4 4.02 2.61c.14 2.2 0 28.11 0 29.72 0 1.41-1.18 4.42-3.62 4.62l-.2 1.4h12.45c.2 0 1.81-1.4-.4-2.01-1.66-.45-2.81-1.61-2.81-4.22v-14.05s.2-.6 1.2-.6h16.87v14.86c0 4.02-1.96 3.89-2.81 4.42-1.2.75-1.09 1.44 0 1.61.94.14 12.43.04 12.43.04M75.35 164.6c0-5.52-2.6-7.56-8.33-8.03-1.44-.12.81-1.71.81-1.71 7.71-.12 17.16 0 17.16 0 .81.2.7.4.1 1.51-.48.88-4.92-.9-4.92 7.93l-.02.15v27.71c0 6.02-4.22 10.24-4.22 10.24-2.61 3.41-7.63 6.83-16.06 6.83-20.08 0-19.48-15.26-19.48-15.26v-28.51c0-5.52-.19-8.26-5.92-8.74-1.44-.12.8-1.71.8-1.71 7.43.61 17.57 0 17.57 0 .8.2.7.4.1 1.51-.48.88-4.92-.71-4.92 8.13v25.1c0 8.83 5.62 14.05 13.65 14.05s13.65-4.42 13.65-11.64v-27.51l.03-.05m45.71.37c-.11-8.84 3.45-7.09 3.92-7.98.59-1.11.69-1.31-.12-1.5 0 0-4.01.6-11.45.09 0 0-2.22 1.61-.78 1.72 5.74.4 5.35 2.48 5.42 8l-.05 20.04c-.9.5-19.58-27.41-19.58-27.41l-1.79-2.61s-1.01.4-8.43-.2c0 0-2.24 1.59-.81 1.71 5.74.48 5.22 2.51 5.22 8.03l-.02 5.72.03 15.65c-.1 8.84-4.12 7-4.6 7.88-.61 1.1-.72 1.3.08 1.51 0 0 4.72-.5 12.15.19 0 0 2.26-1.56.82-1.7-5.73-.54-5.29-2.6-5.23-8.12l-.04-20.11s19.23 24.29 21.29 31.32c0 0 .5 1.76 1.61.5.82-.93 1.06-.72 1.65-1.1.7-.45.7-.75.75-1.61l-.04-30.02m74.74 9.32c1.01-.6 5.02-1 7.43-1.2 2.41-.2 4.02 2.81 4.22 4.42.2 1.61 1.76.41 1.61-.6-.4-2.61 0-6.22 0-8.23 0-1.4-1.2-1-1.61-.4-.8 1.2-1.81 2.01-4.01 2.41-2.21.4-7.63.8-7.63.8l-.2-.6v-12.05h11.04s4.79.27 6.02 4.22c1.01 3.21 2.21.81 1.81-1.4-.5-2.75-1.01-7.03-1.01-7.03l-2.91.3h-24.1c-1.81 0-2.01 1.81-2.01 1.81s5.22-.2 5.22 6.63l.02 25.6c0 4.02-4.22 3.62-4.22 4.42 0 .8.81 1.81 1.61 1.81h23.98s3.41 1.2 3.61-.4c.24-1.88 1.41-8.84 1.41-8.84s.04-2.07-1.81 0c-.81.9-1.21 5.62-9.23 5.82-7.03.18-9.24-.4-9.44-2.81-.2-2.41 0-14.46 0-14.46l.2-.22m161.23 21.49c1.91 0 1.31-.2 1.91-.9.6-.7 0-1.01-1.1-.9-1.1.1-2.91-.5-3.01-3.51-.1-3.01 0-11.55 0-11.55.6-1 6.02-10.44 8.23-14.65l1.2-2.07c1.17-2.03 1.53-3.92 3.71-4.22.6-.08.58-.26 1.61-.6.6-.2 1.2-1.61.4-1.61h-12.15c-.4 0-2.2.56-.7 1.31.4.2 1.86-.12 3.01.8.52.42 1.61 2.47.7 4.18l-8.03 13.05s-6.42-11.45-7.63-13.45c-1.2-2.01-.97-3.52 1.21-3.82.6-.08.58-.26 1.6-.6.61-.2 1.21-1.61.4-1.61h-13.96c-.4 0-2.2.55-.7 1.3.4.2 2.41.81 2.91 1.61.5.81 10.64 18.88 11.95 21.79.55 1.23.47 8.03.4 10.04-.1 2.91-.97 3.21-2.31 3.62-.96.29-1.4.7-1.51 1.31-.1.6.2.49 2.52.5 3.83-.01 9.34-.02 9.34-.02m12.25-45.18H33.16l1.61-1.61h336.12l-1.61 1.61m-231.71 12.54c0-6.63 3.31-5.92 3.31-5.92.6-.1.4-.7.7-1.11.3-.4.3-.65-.6-.6-2.01.1-9.74 0-11.15 0l-.99-.05c-3.21 0-2.11 1.81-2.11 1.81s5.62-.6 5.62 6.83l.02 26c0 4.02-3.62 3.41-3.62 4.22 0 .8-.6 1.48.2 1.4 6.42-.6 12.25.2 12.44 0 .22-.21 1.37-1.49.4-1.61-2.85-.36-4.21-1.61-4.21-6.02l-.01-24.95m177.29 87.05H144.6l1.61-1.61h170.27l-1.62 1.61'/%3E%3Cpath class='st0' d='M62.38 222.78c-1.61 2.01-3.21 4.62-3.62 7.03-1.38 8.27 3.77 8.64 6.83 8.03 4.02-.8 9.24-6.23 10.24-12.45 1.59-9.84-8.12-9.28-13.45-2.61m8.03 7.63c-2.01 2.61-3.21 4.42-6.42 4.01-3.21-.4-2.28-5.52.8-9.63 2.41-3.21 5.82-4.22 6.83-2.22 1.4 2.82.8 5.23-1.21 7.84z'/%3E%3C/svg%3E";
                    img.alt = 'University of Guelph Logo';
                    img.id = 'uofg-header-logo-img';

                    img.addEventListener("error", function () {
                        this.src = '//uoguelph.ca/img/uofg-cornerstone-alternate.png';
                    }, { once: true });

                    logo.appendChild(img);

                    return logo;
                }
                createResourcesMenu() {
                    let menu = new UofGDropdownMenu();

                    menu.id = "uofg-header-resources-menu";
                    menu.setAttribute('data-animation', 'slide');

                    menu.opener.innerHTML = '<span class="opener">Resources</span>';
                    menu.container.innerHTML = `
                    <h2 class="sr-only">Resources</h2>
                    <nav id="uofg-header-quick-links-container" aria-labelledby="uofg-header-quick-links-heading">
                        <h3 id="uofg-header-quick-links-heading">Quick Links</h3>
                        <ul id="uofg-header-quick-links">
                            <li><a class="uofg-header-quick-link icon-intranet" href="https://intranet.uoguelph.ca">Intranet</a></li>
                            <li><a class="uofg-header-quick-link icon-mail" href="https://mail.uoguelph.ca">GryphMail</a></li>
                            <li><a class="uofg-header-quick-link icon-pencil" href="https://courselink.uoguelph.ca">CourseLink</a></li>
                            <li><a class="uofg-header-quick-link icon-webadvisor" href="https://webadvisor.uoguelph.ca">WebAdvisor</a></li>
                            <li><a class="uofg-header-quick-link icon-gryphlife" href="https://gryphlife.uoguelph.ca">GryphLife</a></li>
                            <li><a class="uofg-header-quick-link icon-library" href="https://www.lib.uoguelph.ca/">Library</a></li>
                            <li><a class="uofg-header-quick-link icon-map" href="https://www.uoguelph.ca/campus/map/">Map</a></li>
                            <li><a class="uofg-header-quick-link icon-directory" href="https://www.uoguelph.ca/directory/">Directory</a></li>
                        </ul>
                    </nav>
            
                    <div id="uofg-header-resources-list">
                        <nav class="campus-resources resources-list" aria-labelledby="uofg-header-campus-resources-heading">
                            <h3 id="uofg-header-campus-resources-heading">Campus Resources</h3>
                            <ul>
                                <li><a href="https://housing.uoguelph.ca/" class="uofg-header-resource-link">University Housing</a></li>
                                <li><a href="https://hospitality.uoguelph.ca/on-campus-dining" class="uofg-header-resource-link">Campus Dining</a></li>
                                <li><a href="http://bookstore.uoguelph.ca/" class="uofg-header-resource-link">The Bookstore</a></li>
                            </ul>
                        </nav>
            
                        <nav class="academic-resources resources-list" aria-labelledby="uofg-header-academic-resources-heading">
                            <h3 id="uofg-header-academic-resources-heading">Academic Resources</h3>
                            <ul>
                               <li><a href="https://www.uoguelph.ca/academics/calendars" class="uofg-header-resource-link">Academic Calendars</a></li>
                               <li><a href="https://www.uoguelph.ca/studentaffairs/student-resources" class="uofg-header-resource-link">Student Resources</a></li>
                               <li><a href="https://www.uoguelph.ca/registrar/" class="uofg-header-resource-link">Registrar</a></li>
                            </ul>
                        </nav>
            
                        <nav class="other-resources resources-list" aria-labelledby="uofg-header-other-resources-heading">
                            <h3 id="uofg-header-other-resources-heading">Other Resources</h3>
                            <ul>
                                <li><a href="https://www.uoguelph.ca/police/" class="uofg-header-resource-link">Campus Police</a></li>
                                <li><a href="https://parking.uoguelph.ca/" class="uofg-header-resource-link">Parking</a></li>
                                <li><a href="http://bookstore.uoguelph.ca/" class="uofg-header-resource-link">Fitness &amp; Recreation</a></li>
                            </ul>
                        </nav>
                    </div>
                    `;

                    menu.addEventListener('dropdownopen', (e) => {
                        if (e.target.isSameNode(menu) && this.main_content.classList.contains('reduced')) {
                            document.body.classList.add('disable-scrolling');
                            this.classList.add('overlay-active');
                        }
                    });

                    menu.addEventListener('dropdownclosed', (e) => {
                        if (e.target.isSameNode(menu)) {
                            document.body.classList.remove('disable-scrolling');
                            this.classList.remove('overlay-active');
                        }
                    });

                    return menu;
                }
                createSearchBar() {
                    let bar = document.createElement("form");
                    bar.id = 'uofg-header-search-bar';
                    bar.method = 'get';
                    bar.setAttribute('role', 'search');
                    bar.setAttribute('action', 'https://uoguelph.ca/search/');

                    bar.innerHTML =
                        `
                        <input id="uofg-header-search-bar-input" type="text" placeholder="Search U of G" name="q" aria-label="Search">
                        <input type="hidden" name="cx" value="002616817380988741256:tp3ks5ha2dw">
                        <input type="hidden" name="cof" value="FORID:11">
                        <input type="hidden" name="ie" value="UTF-8">
                        <button id="uofg-header-search-bar-button" class="fa-search" type="submit" aria-label="Search"></button>
                        `

                    return bar;
                }
                createSearchMenu() {
                    let menu = new UofGDropdownMenu();
                    menu.id = 'uofg-header-search-menu';
                    menu.style.display = 'none';
                    menu.setAttribute('data-animation', 'slide');

                    menu.opener.setAttribute('aria-label', 'Search Menu');
                    menu.opener.classList.add('fa-search');
                    menu.opener.innerHTML = '<span>Search</span>'

                    menu.addEventListener('dropdownopen', (e) => {
                        if (e.target.isSameNode(menu)) {
                            document.body.classList.add('disable-scrolling');
                            this.classList.add('overlay-active');
                        }
                    });

                    menu.addEventListener('dropdownclosed', (e) => {
                        if (e.target.isSameNode(menu)) {
                            document.body.classList.remove('disable-scrolling');
                            this.classList.remove('overlay-active');
                        }
                    });

                    fetch('uoguelph.ca/scripts/popularQueries') //GET popular search queries
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error(response.status);
                            }
                        })
                        .then((queries) => {
                            if (queries) {
                                let textHeader = document.createElement('h3')
                                textHeader.textContent = 'Popular Search Terms';

                                let queriesContainer = document.createElement('div'); //Create a container for all the queries
                                queriesContainer.id = 'uofg-header-popular-queries';
                                queriesContainer.appendChild(textHeader);

                                for (const query of queries) { //Create a link element for all of the queries, and append them to the container.
                                    let link = document.createElement('a');
                                    link.textContent = query;
                                    link.href = `https://www.uoguelph.ca/search/?q=${query}&cx=002616817380988741256%253Atp3ks5ha2dw&cof=FORID%253A11&ie=UTF-8`;
                                    link.classList.add('uofg-header-search-menu-popular-query');
                                    queriesContainer.appendChild(link);
                                }

                                menu.container.appendChild(queriesContainer);
                            }
                        })
                        .catch((e) => {
                            console.error("Can't GET popular search queries", e);
                        });

                    return menu;
                }
                createMainMenu() {
                    let nav = document.createElement('nav');
                    nav.id = "uofg-header-main-menu";
                    nav.innerHTML = '<h2 id="uofg-header-main-menu-heading" class="sr-only">Main Menu</h2>';
                    nav.setAttribute('aria-labelledby', 'uofg-header-main-menu-heading');

                    let list = document.createElement('ul');
                    list.id = 'uofg-header-main-menu-list';

                    let futureStudents = new UofGDropdownMenu();
                    futureStudents.opener.innerHTML = '<span>Future Students</span>';
                    futureStudents.container.innerHTML = `
                        <ul id="uofg-header-faculty-staff-links">
                            <li><a title="Student Services" href="https://www.uoguelph.ca/students/" class="dropdown-item">Student Services</a></li>
                            <li><a title="Undergraduate Admissions" href="https://admission.uoguelph.ca/">Undergrad Admissions</a></li>
                            <li><a title="Graduate Admissions" href="https://graduatestudies.uoguelph.ca/">Grad Admissions</a></li>
                            <li><a title="Admission requirements" href="https://admission.uoguelph.ca/admissionreqs" class="dropdown-item">Admission requirements</a></li>
                            <li><a title="International Students" href="https://www.uoguelph.ca/international/students/international-students" class="dropdown-item">International Students</a></li>
                            <li><a title="Apply at U of G" href="https://www.uoguelph.ca/applying" class="dropdown-item">Apply at U of G</a></li>
                        </ul>
                        `;

                    let liWrapper = document.createElement('li');
                    liWrapper.appendChild(futureStudents);
                    list.appendChild(liWrapper);

                    let currentStudents = new UofGDropdownMenu();
                    currentStudents.opener.innerHTML = '<span>Current Students</span>';
                    currentStudents.container.innerHTML = `
                        <ul id="uofg-header-faculty-staff-links">
                            <li><a title="Student Life" href="https://studentlife.uoguelph.ca/">Student Life</a></li>
                            <li><a title="Undergraduate Calendar" href="https://www.uoguelph.ca/registrar/calendars/undergraduate/current/">Undergraduate Calendar</a></li>
                            <li><a title="Graduate Calendar" href="https://www.uoguelph.ca/registrar/calendars/graduate/current/">Graduate Calendar</a></li>
                        </ul>
                        `;

                    liWrapper = document.createElement('li');
                    liWrapper.appendChild(currentStudents)
                    list.appendChild(liWrapper);

                    let facultyStaff = new UofGDropdownMenu();
                    facultyStaff.opener.innerHTML = '<span class="opener">Faculty & Staff</span>';
                    facultyStaff.container.innerHTML = `
                        <ul id="uofg-header-faculty-staff-links">
                            <li><a title="Academic Departments" href="https://www.uoguelph.ca/academics/departments/">Academic Departments</a></li>
                            <li><a title="Staff Departments" href="https://www.uoguelph.ca/faculty/">Staff Departments</a></li>
                            <li><a title="Campus Directory" href="https://www.uoguelph.ca/directory/">Campus Directory</a></li>
                            <li><a title="Faculty Jobs" href="https://www.uoguelph.ca/facultyjobs/">Faculty Jobs</a></li>
                            <li><a title="Career Opportunities" href="https://www.uoguelph.ca/hr/careers-guelph/current-opportunities">Career Opportunities</a></li>
                        </ul>
                        `;

                    liWrapper = document.createElement('li');
                    liWrapper.appendChild(facultyStaff);
                    list.appendChild(liWrapper);

                    let alumniFriends = new UofGDropdownMenu();
                    alumniFriends.opener.innerHTML = '<span>Alumni & Friends</span>';
                    alumniFriends.container.innerHTML = `
                        <ul id="uofg-header-alumni-friends-links">
                            <li><a title="Alumni Affairs" href="https://alumni.uoguelph.ca/">Alumni Association</a></li>
                            <li><a title="Portico Magazine" href="http://porticomagazine.ca/">Portico Magazine</a></li>
                            <li><a title="Give to U of G" href="https://alumni.uoguelph.ca/give">Give to U of G</a></li>
                        </ul>
                        `;

                    liWrapper = document.createElement('li');
                    liWrapper.appendChild(alumniFriends);
                    list.appendChild(liWrapper);

                    nav.appendChild(list);

                    return nav;
                }
                createPageSpecific() {
                    if (this.firstElementChild) {
                        let nav = document.createElement('nav')
                        nav.id = 'uofg-header-page-specific-menu';
                        nav.innerHTML = '<h2 id="uofg-header-page-specific-menu-heading" class="sr-only">Page Menu</h2>';
                        nav.setAttribute('aria-labelledby', 'uofg-header-page-specific-menu-heading');

                        let container = document.createElement('ul');
                        container.id = "uofg-header-page-specific-menu-list";

                        while (this.firstElementChild) {
                            let liWrapper = document.createElement('li');
                            liWrapper.classList.add('uofg-header-page-specfic-menu-item');
                            liWrapper.appendChild(this.firstElementChild);
                            container.appendChild(liWrapper);
                        }

                        nav.appendChild(container);

                        return nav;
                    } else {
                        return null;
                    }
                }
                resizeHandler() {
                    if (window.matchMedia("(max-width:1024px)").matches) {
                        //For mobile devices/resized desktop windows, stop changing header on scrolling and set header to reduced form
                        this.intersection_observer.unobserve(this.breakPoint);
                        this.reduce();
                    } else {
                        //For desktop, make header change on scroll
                        this.intersection_observer.observe(this.breakPoint);
                    }
                }
                reduce() {
                    this.classList.add('reduced');
                    this.main_content.classList.remove('transitioning');

                    if (!this.main_content.classList.contains('reduced')) { //Only add transitioning class if header needs to be reduced

                        //Close any open dropdowns
                        this.querySelectorAll('uofg-dropdown-menu.open').forEach((dropdown) => {
                            let animationType = dropdown.getAttribute('data-animation');

                            dropdown.setAttribute('data-animation', 'none');
                            dropdown.close();
                            dropdown.setAttribute('data-animation', animationType);
                        });

                        //Fade out header main content
                        this.main_content.classList.add('transitioning');

                        //Once content is faded out, we can detach main_content
                        if (!this.reduceTimer) {
                            this.reduceTimer = setTimeout(() => {
                                window.requestAnimationFrame(() => {
                                    if (this.classList.contains('reduced')) {

                                        this.main_content.parentElement.removeChild(this.main_content); //Remove main content from the DOM

                                        this.main_content.querySelectorAll('.break').forEach((flex_break) => {
                                            flex_break.style.display = 'none';
                                        });

                                        this.resourcesMenu.opener.textContent = 'Menu';
                                        this.resourcesMenu.opener.setAttribute('aria-label', 'Main Menu');

                                        if (this.pageSpecific) {
                                            this.pageSpecific.querySelector('#uofg-header-page-specific-menu-heading').classList.remove('sr-only');
                                            this.pageSpecific.querySelectorAll('uofg-dropdown-menu').forEach((dropdown) => {
                                                dropdown.setAttribute('data-closeonblur', 'false');
                                            });
                                            this.resourcesMenu.container.prepend(this.pageSpecific);
                                        }

                                        this.mainMenu.querySelectorAll('uofg-dropdown-menu').forEach((dropdown) => {
                                            dropdown.setAttribute('data-closeonblur', 'false');
                                        });
                                        this.resourcesMenu.container.prepend(this.mainMenu);

                                        this.searchMenu.container.prepend(this.searchBar)
                                        this.searchMenu.style.display = '';

                                        this.main_content.classList.add('reduced');
                                        this.main_content.classList.remove('expanded');

                                        this.content_container.appendChild(this.main_content);

                                        //Remove the transitioning class to fade the content back in.
                                        window.requestAnimationFrame(() => {
                                            this.main_content.classList.remove('transitioning'); //This will execute after one repaint, allowing for the css transition to occur
                                        });
                                    }
                                });

                                this.reduceTimer = null;
                            }, this.transitionTime);
                        }
                    }
                }
                expand() {
                    this.classList.remove('reduced');
                    this.main_content.classList.remove('transitioning');

                    if (this.main_content.classList.contains('reduced')) { //Only add transitioning class if header needs to be expanded
                        //Close any open dropdowns
                        this.querySelectorAll('uofg-dropdown-menu.open').forEach((dropdown) => {
                            let animationType = dropdown.getAttribute('data-animation');

                            dropdown.setAttribute('data-animation', 'none');
                            dropdown.close();
                            dropdown.setAttribute('data-animation', animationType);
                        });

                        //Fade out header main content
                        this.main_content.classList.add('transitioning');

                        //Once content is faded out, we can detach main_content
                        if (!this.expandTimer) {
                            this.expandTimer = setTimeout(() => {
                                window.requestAnimationFrame(() => {
                                    if (!this.classList.contains('reduced')) {

                                        this.main_content.parentElement.removeChild(this.main_content);

                                        this.main_content.querySelectorAll('.break').forEach((flex_break) => {
                                            flex_break.style.display = '';
                                        });

                                        this.resourcesMenu.opener.textContent = 'Resources';
                                        this.resourcesMenu.opener.setAttribute('aria-label', 'Resources Menu');

                                        this.mainMenu.querySelectorAll('uofg-dropdown-menu').forEach((dropdown) => {
                                            dropdown.setAttribute('data-closeonblur', '');
                                        });

                                        if (this.pageSpecific) {
                                            this.main_content.insertBefore(this.mainMenu, this.main_content.lastElementChild);
                                            this.pageSpecific.querySelectorAll('uofg-dropdown-menu').forEach((dropdown) => {
                                                dropdown.setAttribute('data-closeonblur', '');
                                            });
                                            this.pageSpecific.querySelector('#uofg-header-page-specific-menu-heading').classList.add('sr-only');
                                            this.main_content.appendChild(this.pageSpecific);
                                        } else {
                                            this.main_content.appendChild(this.mainMenu);
                                        }

                                        this.main_content.insertBefore(this.searchBar, this.searchMenu);
                                        this.searchMenu.style.display = 'none';

                                        this.main_content.classList.remove('reduced');
                                        this.main_content.classList.add('expanded');

                                        this.content_container.appendChild(this.main_content);

                                        //Remove the transitioning class to fade the content back in.
                                        window.requestAnimationFrame(() => {
                                            this.main_content.classList.remove('transitioning'); //This will execute after one repaint, allowing for the css transition to occur
                                        });
                                    }
                                });

                                this.expandTimer = null;
                            }, this.transitionTime);
                        }

                    }
                }
            }

            customElements.define('uofg-dropdown-menu', UofGDropdownMenu);
            customElements.define('uofg-header', UofGHeader);

            document.dispatchEvent(new CustomEvent('UofGWebComponentsReady', { detail: ["uofg-dropdown-menu", "uofg-header"], bubbles: true }));
        }
    }

    if (typeof WebComponents !== 'undefined') { //Check if the polyfill is loaded
        WebComponents.waitFor(() => {
            defineComponents();
        });
    } else { //Polyfill isn't loaded so load it
        loadJS('https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js')
            .then(() => {
                WebComponents.waitFor(() => {
                    defineComponents();
                });
            })
            .catch(() => { //Failed to load the polyfill
                try {
                    defineComponents(); //Try to define the components anyway in case the browser natively supports webcomponents
                } catch (error) {
                    console.error('Your Browser does not support WebComponents and could not load the polyfill');
                }
            });
    }
}());