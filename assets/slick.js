// /*
//      _ _      _       _
//  ___| (_) ___| | __  (_)___
// / __| | |/ __| |/ /  | / __|
// \__ \ | | (__|   < _ | \__ \
// |___/_|_|\___|_|\_(_)/ |___/
//                    |__/

//  Version: 1.8.0
//   Author: Ken Wheeler
//  Website: http://kenwheeler.github.io
//     Docs: http://kenwheeler.github.io/slick
//     Repo: http://github.com/kenwheeler/slick
//   Issues: http://github.com/kenwheeler/slick/issues

//  */
// /* global window, document, define, jQuery, setInterval, clearInterval */
// ;(function(factory) {
//     'use strict';
//     if (typeof define === 'function' && define.amd) {
//         define(['jquery'], factory);
//     } else if (typeof exports !== 'undefined') {
//         module.exports = factory(require('jquery'));
//     } else {
//         factory(jQuery);
//     }

// }(function($) {
//     'use strict';
//     var Slick = window.Slick || {};

//     Slick = (function() {

//         var instanceUid = 0;

//         function Slick(element, settings) {

//             var _ = this, dataSettings;

//             _.defaults = {
//                 accessibility: true,
//                 adaptiveHeight: false,
//                 appendArrows: $(element),
//                 appendDots: $(element),
//                 arrows: true,
//                 asNavFor: null,
//                 prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
//                 nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
//                 autoplay: false,
//                 autoplaySpeed: 3000,
//                 centerMode: false,
//                 centerPadding: '50px',
//                 cssEase: 'ease',
//                 customPaging: function(slider, i) {
//                     return $('<button type="button" />').text(i + 1);
//                 },
//                 dots: false,
//                 dotsClass: 'slick-dots',
//                 draggable: true,
//                 easing: 'linear',
//                 edgeFriction: 0.35,
//                 fade: false,
//                 focusOnSelect: false,
//                 focusOnChange: false,
//                 infinite: true,
//                 initialSlide: 0,
//                 lazyLoad: 'ondemand',
//                 mobileFirst: false,
//                 pauseOnHover: true,
//                 pauseOnFocus: true,
//                 pauseOnDotsHover: false,
//                 respondTo: 'window',
//                 responsive: null,
//                 rows: 1,
//                 rtl: false,
//                 slide: '',
//                 slidesPerRow: 1,
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 speed: 500,
//                 swipe: true,
//                 swipeToSlide: false,
//                 touchMove: true,
//                 touchThreshold: 5,
//                 useCSS: true,
//                 useTransform: true,
//                 variableWidth: false,
//                 vertical: false,
//                 verticalSwiping: false,
//                 waitForAnimate: true,
//                 zIndex: 1000
//             };

//             _.initials = {
//                 animating: false,
//                 dragging: false,
//                 autoPlayTimer: null,
//                 currentDirection: 0,
//                 currentLeft: null,
//                 currentSlide: 0,
//                 direction: 1,
//                 $dots: null,
//                 listWidth: null,
//                 listHeight: null,
//                 loadIndex: 0,
//                 $nextArrow: null,
//                 $prevArrow: null,
//                 scrolling: false,
//                 slideCount: null,
//                 slideWidth: null,
//                 $slideTrack: null,
//                 $slides: null,
//                 sliding: false,
//                 slideOffset: 0,
//                 swipeLeft: null,
//                 swiping: false,
//                 $list: null,
//                 touchObject: {},
//                 transformsEnabled: false,
//                 unslicked: false
//             };

//             $.extend(_, _.initials);

//             _.activeBreakpoint = null;
//             _.animType = null;
//             _.animProp = null;
//             _.breakpoints = [];
//             _.breakpointSettings = [];
//             _.cssTransitions = false;
//             _.focussed = false;
//             _.interrupted = false;
//             _.hidden = 'hidden';
//             _.paused = true;
//             _.positionProp = null;
//             _.respondTo = null;
//             _.rowCount = 1;
//             _.shouldClick = true;
//             _.$slider = $(element);
//             _.$slidesCache = null;
//             _.transformType = null;
//             _.transitionType = null;
//             _.visibilityChange = 'visibilitychange';
//             _.windowWidth = 0;
//             _.windowTimer = null;

//             dataSettings = $(element).data('slick') || {};

//             _.options = $.extend({}, _.defaults, settings, dataSettings);

//             _.currentSlide = _.options.initialSlide;

//             _.originalSettings = _.options;

//             if (typeof document.mozHidden !== 'undefined') {
//                 _.hidden = 'mozHidden';
//                 _.visibilityChange = 'mozvisibilitychange';
//             } else if (typeof document.webkitHidden !== 'undefined') {
//                 _.hidden = 'webkitHidden';
//                 _.visibilityChange = 'webkitvisibilitychange';
//             }

//             _.autoPlay = $.proxy(_.autoPlay, _);
//             _.autoPlayClear = $.proxy(_.autoPlayClear, _);
//             _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
//             _.changeSlide = $.proxy(_.changeSlide, _);
//             _.clickHandler = $.proxy(_.clickHandler, _);
//             _.selectHandler = $.proxy(_.selectHandler, _);
//             _.setPosition = $.proxy(_.setPosition, _);
//             _.swipeHandler = $.proxy(_.swipeHandler, _);
//             _.dragHandler = $.proxy(_.dragHandler, _);
//             _.keyHandler = $.proxy(_.keyHandler, _);

//             _.instanceUid = instanceUid++;

//             // A simple way to check for HTML strings
//             // Strict HTML recognition (must start with <)
//             // Extracted from jQuery v1.11 source
//             _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


//             _.registerBreakpoints();
//             _.init(true);

//         }

//         return Slick;

//     }());

//     Slick.prototype.activateADA = function() {
//         var _ = this;

//         _.$slideTrack.find('.slick-active').attr({
//             'aria-hidden': 'false'
//         }).find('a, input, button, select').attr({
//             'tabindex': '0'
//         });

//     };

//     Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

//         var _ = this;

//         if (typeof(index) === 'boolean') {
//             addBefore = index;
//             index = null;
//         } else if (index < 0 || (index >= _.slideCount)) {
//             return false;
//         }

//         _.unload();

//         if (typeof(index) === 'number') {
//             if (index === 0 && _.$slides.length === 0) {
//                 $(markup).appendTo(_.$slideTrack);
//             } else if (addBefore) {
//                 $(markup).insertBefore(_.$slides.eq(index));
//             } else {
//                 $(markup).insertAfter(_.$slides.eq(index));
//             }
//         } else {
//             if (addBefore === true) {
//                 $(markup).prependTo(_.$slideTrack);
//             } else {
//                 $(markup).appendTo(_.$slideTrack);
//             }
//         }

//         _.$slides = _.$slideTrack.children(this.options.slide);

//         _.$slideTrack.children(this.options.slide).detach();

//         _.$slideTrack.append(_.$slides);

//         _.$slides.each(function(index, element) {
//             $(element).attr('data-slick-index', index);
//         });

//         _.$slidesCache = _.$slides;

//         _.reinit();

//     };

//     Slick.prototype.animateHeight = function() {
//         var _ = this;
//         if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
//             var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
//             _.$list.animate({
//                 height: targetHeight
//             }, _.options.speed);
//         }
//     };

//     Slick.prototype.animateSlide = function(targetLeft, callback) {

//         var animProps = {},
//             _ = this;

//         _.animateHeight();

//         if (_.options.rtl === true && _.options.vertical === false) {
//             targetLeft = -targetLeft;
//         }
//         if (_.transformsEnabled === false) {
//             if (_.options.vertical === false) {
//                 _.$slideTrack.animate({
//                     left: targetLeft
//                 }, _.options.speed, _.options.easing, callback);
//             } else {
//                 _.$slideTrack.animate({
//                     top: targetLeft
//                 }, _.options.speed, _.options.easing, callback);
//             }

//         } else {

//             if (_.cssTransitions === false) {
//                 if (_.options.rtl === true) {
//                     _.currentLeft = -(_.currentLeft);
//                 }
//                 $({
//                     animStart: _.currentLeft
//                 }).animate({
//                     animStart: targetLeft
//                 }, {
//                     duration: _.options.speed,
//                     easing: _.options.easing,
//                     step: function(now) {
//                         now = Math.ceil(now);
//                         if (_.options.vertical === false) {
//                             animProps[_.animType] = 'translate(' +
//                                 now + 'px, 0px)';
//                             _.$slideTrack.css(animProps);
//                         } else {
//                             animProps[_.animType] = 'translate(0px,' +
//                                 now + 'px)';
//                             _.$slideTrack.css(animProps);
//                         }
//                     },
//                     complete: function() {
//                         if (callback) {
//                             callback.call();
//                         }
//                     }
//                 });

//             } else {

//                 _.applyTransition();
//                 targetLeft = Math.ceil(targetLeft);

//                 if (_.options.vertical === false) {
//                     animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
//                 } else {
//                     animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
//                 }
//                 _.$slideTrack.css(animProps);

//                 if (callback) {
//                     setTimeout(function() {

//                         _.disableTransition();

//                         callback.call();
//                     }, _.options.speed);
//                 }

//             }

//         }

//     };

//     Slick.prototype.getNavTarget = function() {

//         var _ = this,
//             asNavFor = _.options.asNavFor;

//         if ( asNavFor && asNavFor !== null ) {
//             asNavFor = $(asNavFor).not(_.$slider);
//         }

//         return asNavFor;

//     };

//     Slick.prototype.asNavFor = function(index) {

//         var _ = this,
//             asNavFor = _.getNavTarget();

//         if ( asNavFor !== null && typeof asNavFor === 'object' ) {
//             asNavFor.each(function() {
//                 var target = $(this).slick('getSlick');
//                 if(!target.unslicked) {
//                     target.slideHandler(index, true);
//                 }
//             });
//         }

//     };

//     Slick.prototype.applyTransition = function(slide) {

//         var _ = this,
//             transition = {};

//         if (_.options.fade === false) {
//             transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
//         } else {
//             transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
//         }

//         if (_.options.fade === false) {
//             _.$slideTrack.css(transition);
//         } else {
//             _.$slides.eq(slide).css(transition);
//         }

//     };

//     Slick.prototype.autoPlay = function() {

//         var _ = this;

//         _.autoPlayClear();

//         if ( _.slideCount > _.options.slidesToShow ) {
//             _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
//         }

//     };

//     Slick.prototype.autoPlayClear = function() {

//         var _ = this;

//         if (_.autoPlayTimer) {
//             clearInterval(_.autoPlayTimer);
//         }

//     };

//     Slick.prototype.autoPlayIterator = function() {

//         var _ = this,
//             slideTo = _.currentSlide + _.options.slidesToScroll;

//         if ( !_.paused && !_.interrupted && !_.focussed ) {

//             if ( _.options.infinite === false ) {

//                 if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
//                     _.direction = 0;
//                 }

//                 else if ( _.direction === 0 ) {

//                     slideTo = _.currentSlide - _.options.slidesToScroll;

//                     if ( _.currentSlide - 1 === 0 ) {
//                         _.direction = 1;
//                     }

//                 }

//             }

//             _.slideHandler( slideTo );

//         }

//     };

//     Slick.prototype.buildArrows = function() {

//         var _ = this;

//         if (_.options.arrows === true ) {

//             _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
//             _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

//             if( _.slideCount > _.options.slidesToShow ) {

//                 _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
//                 _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

//                 if (_.htmlExpr.test(_.options.prevArrow)) {
//                     _.$prevArrow.prependTo(_.options.appendArrows);
//                 }

//                 if (_.htmlExpr.test(_.options.nextArrow)) {
//                     _.$nextArrow.appendTo(_.options.appendArrows);
//                 }

//                 if (_.options.infinite !== true) {
//                     _.$prevArrow
//                         .addClass('slick-disabled')
//                         .attr('aria-disabled', 'true');
//                 }

//             } else {

//                 _.$prevArrow.add( _.$nextArrow )

//                     .addClass('slick-hidden')
//                     .attr({
//                         'aria-disabled': 'true',
//                         'tabindex': '-1'
//                     });

//             }

//         }

//     };

//     Slick.prototype.buildDots = function() {

//         var _ = this,
//             i, dot;

//         if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

//             _.$slider.addClass('slick-dotted');

//             dot = $('<ul />').addClass(_.options.dotsClass);

//             for (i = 0; i <= _.getDotCount(); i += 1) {
//                 dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
//             }

//             _.$dots = dot.appendTo(_.options.appendDots);

//             _.$dots.find('li').first().addClass('slick-active');

//         }

//     };

//     Slick.prototype.buildOut = function() {

//         var _ = this;

//         _.$slides =
//             _.$slider
//                 .children( _.options.slide + ':not(.slick-cloned)')
//                 .addClass('slick-slide');

//         _.slideCount = _.$slides.length;

//         _.$slides.each(function(index, element) {
//             $(element)
//                 .attr('data-slick-index', index)
//                 .data('originalStyling', $(element).attr('style') || '');
//         });

//         _.$slider.addClass('slick-slider');

//         _.$slideTrack = (_.slideCount === 0) ?
//             $('<div class="slick-track"/>').appendTo(_.$slider) :
//             _.$slides.wrapAll('<div class="slick-track"/>').parent();

//         _.$list = _.$slideTrack.wrap(
//             '<div class="slick-list"/>').parent();
//         _.$slideTrack.css('opacity', 0);

//         if (_.options.centerMode === true || _.options.swipeToSlide === true) {
//             _.options.slidesToScroll = 1;
//         }

//         $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

//         _.setupInfinite();

//         _.buildArrows();

//         _.buildDots();

//         _.updateDots();


//         _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

//         if (_.options.draggable === true) {
//             _.$list.addClass('draggable');
//         }

//     };

//     Slick.prototype.buildRows = function() {

//         var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

//         newSlides = document.createDocumentFragment();
//         originalSlides = _.$slider.children();

//         if(_.options.rows > 0) {

//             slidesPerSection = _.options.slidesPerRow * _.options.rows;
//             numOfSlides = Math.ceil(
//                 originalSlides.length / slidesPerSection
//             );

//             for(a = 0; a < numOfSlides; a++){
//                 var slide = document.createElement('div');
//                 for(b = 0; b < _.options.rows; b++) {
//                     var row = document.createElement('div');
//                     for(c = 0; c < _.options.slidesPerRow; c++) {
//                         var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
//                         if (originalSlides.get(target)) {
//                             row.appendChild(originalSlides.get(target));
//                         }
//                     }
//                     slide.appendChild(row);
//                 }
//                 newSlides.appendChild(slide);
//             }

//             _.$slider.empty().append(newSlides);
//             _.$slider.children().children().children()
//                 .css({
//                     'width':(100 / _.options.slidesPerRow) + '%',
//                     'display': 'inline-block'
//                 });

//         }

//     };

//     Slick.prototype.checkResponsive = function(initial, forceUpdate) {

//         var _ = this,
//             breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
//         var sliderWidth = _.$slider.width();
//         var windowWidth = window.innerWidth || $(window).width();

//         if (_.respondTo === 'window') {
//             respondToWidth = windowWidth;
//         } else if (_.respondTo === 'slider') {
//             respondToWidth = sliderWidth;
//         } else if (_.respondTo === 'min') {
//             respondToWidth = Math.min(windowWidth, sliderWidth);
//         }

//         if ( _.options.responsive &&
//             _.options.responsive.length &&
//             _.options.responsive !== null) {

//             targetBreakpoint = null;

//             for (breakpoint in _.breakpoints) {
//                 if (_.breakpoints.hasOwnProperty(breakpoint)) {
//                     if (_.originalSettings.mobileFirst === false) {
//                         if (respondToWidth < _.breakpoints[breakpoint]) {
//                             targetBreakpoint = _.breakpoints[breakpoint];
//                         }
//                     } else {
//                         if (respondToWidth > _.breakpoints[breakpoint]) {
//                             targetBreakpoint = _.breakpoints[breakpoint];
//                         }
//                     }
//                 }
//             }

//             if (targetBreakpoint !== null) {
//                 if (_.activeBreakpoint !== null) {
//                     if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
//                         _.activeBreakpoint =
//                             targetBreakpoint;
//                         if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
//                             _.unslick(targetBreakpoint);
//                         } else {
//                             _.options = $.extend({}, _.originalSettings,
//                                 _.breakpointSettings[
//                                     targetBreakpoint]);
//                             if (initial === true) {
//                                 _.currentSlide = _.options.initialSlide;
//                             }
//                             _.refresh(initial);
//                         }
//                         triggerBreakpoint = targetBreakpoint;
//                     }
//                 } else {
//                     _.activeBreakpoint = targetBreakpoint;
//                     if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
//                         _.unslick(targetBreakpoint);
//                     } else {
//                         _.options = $.extend({}, _.originalSettings,
//                             _.breakpointSettings[
//                                 targetBreakpoint]);
//                         if (initial === true) {
//                             _.currentSlide = _.options.initialSlide;
//                         }
//                         _.refresh(initial);
//                     }
//                     triggerBreakpoint = targetBreakpoint;
//                 }
//             } else {
//                 if (_.activeBreakpoint !== null) {
//                     _.activeBreakpoint = null;
//                     _.options = _.originalSettings;
//                     if (initial === true) {
//                         _.currentSlide = _.options.initialSlide;
//                     }
//                     _.refresh(initial);
//                     triggerBreakpoint = targetBreakpoint;
//                 }
//             }

//             // only trigger breakpoints during an actual break. not on initialize.
//             if( !initial && triggerBreakpoint !== false ) {
//                 _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
//             }
//         }

//     };

//     Slick.prototype.changeSlide = function(event, dontAnimate) {

//         var _ = this,
//             $target = $(event.currentTarget),
//             indexOffset, slideOffset, unevenOffset;

//         // If target is a link, prevent default action.
//         if($target.is('a')) {
//             event.preventDefault();
//         }

//         // If target is not the <li> element (ie: a child), find the <li>.
//         if(!$target.is('li')) {
//             $target = $target.closest('li');
//         }

//         unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
//         indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

//         switch (event.data.message) {

//             case 'previous':
//                 slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
//                 if (_.slideCount > _.options.slidesToShow) {
//                     _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
//                 }
//                 break;

//             case 'next':
//                 slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
//                 if (_.slideCount > _.options.slidesToShow) {
//                     _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
//                 }
//                 break;

//             case 'index':
//                 var index = event.data.index === 0 ? 0 :
//                     event.data.index || $target.index() * _.options.slidesToScroll;

//                 _.slideHandler(_.checkNavigable(index), false, dontAnimate);
//                 $target.children().trigger('focus');
//                 break;

//             default:
//                 return;
//         }

//     };

//     Slick.prototype.checkNavigable = function(index) {

//         var _ = this,
//             navigables, prevNavigable;

//         navigables = _.getNavigableIndexes();
//         prevNavigable = 0;
//         if (index > navigables[navigables.length - 1]) {
//             index = navigables[navigables.length - 1];
//         } else {
//             for (var n in navigables) {
//                 if (index < navigables[n]) {
//                     index = prevNavigable;
//                     break;
//                 }
//                 prevNavigable = navigables[n];
//             }
//         }

//         return index;
//     };

//     Slick.prototype.cleanUpEvents = function() {

//         var _ = this;

//         if (_.options.dots && _.$dots !== null) {

//             $('li', _.$dots)
//                 .off('click.slick', _.changeSlide)
//                 .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
//                 .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

//             if (_.options.accessibility === true) {
//                 _.$dots.off('keydown.slick', _.keyHandler);
//             }
//         }

//         _.$slider.off('focus.slick blur.slick');

//         if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
//             _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
//             _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

//             if (_.options.accessibility === true) {
//                 _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
//                 _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
//             }
//         }

//         _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
//         _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
//         _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
//         _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

//         _.$list.off('click.slick', _.clickHandler);

//         $(document).off(_.visibilityChange, _.visibility);

//         _.cleanUpSlideEvents();

//         if (_.options.accessibility === true) {
//             _.$list.off('keydown.slick', _.keyHandler);
//         }

//         if (_.options.focusOnSelect === true) {
//             $(_.$slideTrack).children().off('click.slick', _.selectHandler);
//         }

//         $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

//         $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

//         $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

//         $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

//     };

//     Slick.prototype.cleanUpSlideEvents = function() {

//         var _ = this;

//         _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
//         _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

//     };

//     Slick.prototype.cleanUpRows = function() {

//         var _ = this, originalSlides;

//         if(_.options.rows > 0) {
//             originalSlides = _.$slides.children().children();
//             originalSlides.removeAttr('style');
//             _.$slider.empty().append(originalSlides);
//         }

//     };

//     Slick.prototype.clickHandler = function(event) {

//         var _ = this;

//         if (_.shouldClick === false) {
//             event.stopImmediatePropagation();
//             event.stopPropagation();
//             event.preventDefault();
//         }

//     };

//     Slick.prototype.destroy = function(refresh) {

//         var _ = this;

//         _.autoPlayClear();

//         _.touchObject = {};

//         _.cleanUpEvents();

//         $('.slick-cloned', _.$slider).detach();

//         if (_.$dots) {
//             _.$dots.remove();
//         }

//         if ( _.$prevArrow && _.$prevArrow.length ) {

//             _.$prevArrow
//                 .removeClass('slick-disabled slick-arrow slick-hidden')
//                 .removeAttr('aria-hidden aria-disabled tabindex')
//                 .css('display','');

//             if ( _.htmlExpr.test( _.options.prevArrow )) {
//                 _.$prevArrow.remove();
//             }
//         }

//         if ( _.$nextArrow && _.$nextArrow.length ) {

//             _.$nextArrow
//                 .removeClass('slick-disabled slick-arrow slick-hidden')
//                 .removeAttr('aria-hidden aria-disabled tabindex')
//                 .css('display','');

//             if ( _.htmlExpr.test( _.options.nextArrow )) {
//                 _.$nextArrow.remove();
//             }
//         }


//         if (_.$slides) {

//             _.$slides
//                 .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
//                 .removeAttr('aria-hidden')
//                 .removeAttr('data-slick-index')
//                 .each(function(){
//                     $(this).attr('style', $(this).data('originalStyling'));
//                 });

//             _.$slideTrack.children(this.options.slide).detach();

//             _.$slideTrack.detach();

//             _.$list.detach();

//             _.$slider.append(_.$slides);
//         }

//         _.cleanUpRows();

//         _.$slider.removeClass('slick-slider');
//         _.$slider.removeClass('slick-initialized');
//         _.$slider.removeClass('slick-dotted');

//         _.unslicked = true;

//         if(!refresh) {
//             _.$slider.trigger('destroy', [_]);
//         }

//     };

//     Slick.prototype.disableTransition = function(slide) {

//         var _ = this,
//             transition = {};

//         transition[_.transitionType] = '';

//         if (_.options.fade === false) {
//             _.$slideTrack.css(transition);
//         } else {
//             _.$slides.eq(slide).css(transition);
//         }

//     };

//     Slick.prototype.fadeSlide = function(slideIndex, callback) {

//         var _ = this;

//         if (_.cssTransitions === false) {

//             _.$slides.eq(slideIndex).css({
//                 zIndex: _.options.zIndex
//             });

//             _.$slides.eq(slideIndex).animate({
//                 opacity: 1
//             }, _.options.speed, _.options.easing, callback);

//         } else {

//             _.applyTransition(slideIndex);

//             _.$slides.eq(slideIndex).css({
//                 opacity: 1,
//                 zIndex: _.options.zIndex
//             });

//             if (callback) {
//                 setTimeout(function() {

//                     _.disableTransition(slideIndex);

//                     callback.call();
//                 }, _.options.speed);
//             }

//         }

//     };

//     Slick.prototype.fadeSlideOut = function(slideIndex) {

//         var _ = this;

//         if (_.cssTransitions === false) {

//             _.$slides.eq(slideIndex).animate({
//                 opacity: 0,
//                 zIndex: _.options.zIndex - 2
//             }, _.options.speed, _.options.easing);

//         } else {

//             _.applyTransition(slideIndex);

//             _.$slides.eq(slideIndex).css({
//                 opacity: 0,
//                 zIndex: _.options.zIndex - 2
//             });

//         }

//     };

//     Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

//         var _ = this;

//         if (filter !== null) {

//             _.$slidesCache = _.$slides;

//             _.unload();

//             _.$slideTrack.children(this.options.slide).detach();

//             _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

//             _.reinit();

//         }

//     };

//     Slick.prototype.focusHandler = function() {

//         var _ = this;

//         _.$slider
//             .off('focus.slick blur.slick')
//             .on('focus.slick blur.slick', '*', function(event) {

//             event.stopImmediatePropagation();
//             var $sf = $(this);

//             setTimeout(function() {

//                 if( _.options.pauseOnFocus ) {
//                     _.focussed = $sf.is(':focus');
//                     _.autoPlay();
//                 }

//             }, 0);

//         });
//     };

//     Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

//         var _ = this;
//         return _.currentSlide;

//     };

//     Slick.prototype.getDotCount = function() {

//         var _ = this;

//         var breakPoint = 0;
//         var counter = 0;
//         var pagerQty = 0;

//         if (_.options.infinite === true) {
//             if (_.slideCount <= _.options.slidesToShow) {
//                  ++pagerQty;
//             } else {
//                 while (breakPoint < _.slideCount) {
//                     ++pagerQty;
//                     breakPoint = counter + _.options.slidesToScroll;
//                     counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
//                 }
//             }
//         } else if (_.options.centerMode === true) {
//             pagerQty = _.slideCount;
//         } else if(!_.options.asNavFor) {
//             pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
//         }else {
//             while (breakPoint < _.slideCount) {
//                 ++pagerQty;
//                 breakPoint = counter + _.options.slidesToScroll;
//                 counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
//             }
//         }

//         return pagerQty - 1;

//     };

//     Slick.prototype.getLeft = function(slideIndex) {

//         var _ = this,
//             targetLeft,
//             verticalHeight,
//             verticalOffset = 0,
//             targetSlide,
//             coef;

//         _.slideOffset = 0;
//         verticalHeight = _.$slides.first().outerHeight(true);

//         if (_.options.infinite === true) {
//             if (_.slideCount > _.options.slidesToShow) {
//                 _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
//                 coef = -1

//                 if (_.options.vertical === true && _.options.centerMode === true) {
//                     if (_.options.slidesToShow === 2) {
//                         coef = -1.5;
//                     } else if (_.options.slidesToShow === 1) {
//                         coef = -2
//                     }
//                 }
//                 verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
//             }
//             if (_.slideCount % _.options.slidesToScroll !== 0) {
//                 if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
//                     if (slideIndex > _.slideCount) {
//                         _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
//                         verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
//                     } else {
//                         _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
//                         verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
//                     }
//                 }
//             }
//         } else {
//             if (slideIndex + _.options.slidesToShow > _.slideCount) {
//                 _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
//                 verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
//             }
//         }

//         if (_.slideCount <= _.options.slidesToShow) {
//             _.slideOffset = 0;
//             verticalOffset = 0;
//         }

//         if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
//             _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
//         } else if (_.options.centerMode === true && _.options.infinite === true) {
//             _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
//         } else if (_.options.centerMode === true) {
//             _.slideOffset = 0;
//             _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
//         }

//         if (_.options.vertical === false) {
//             targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
//         } else {
//             targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
//         }

//         if (_.options.variableWidth === true) {

//             if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
//                 targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
//             } else {
//                 targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
//             }

//             if (_.options.rtl === true) {
//                 if (targetSlide[0]) {
//                     targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
//                 } else {
//                     targetLeft =  0;
//                 }
//             } else {
//                 targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
//             }

//             if (_.options.centerMode === true) {
//                 if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
//                     targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
//                 } else {
//                     targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
//                 }

//                 if (_.options.rtl === true) {
//                     if (targetSlide[0]) {
//                         targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
//                     } else {
//                         targetLeft =  0;
//                     }
//                 } else {
//                     targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
//                 }

//                 targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
//             }
//         }

//         return targetLeft;

//     };

//     Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

//         var _ = this;

//         return _.options[option];

//     };

//     Slick.prototype.getNavigableIndexes = function() {

//         var _ = this,
//             breakPoint = 0,
//             counter = 0,
//             indexes = [],
//             max;

//         if (_.options.infinite === false) {
//             max = _.slideCount;
//         } else {
//             breakPoint = _.options.slidesToScroll * -1;
//             counter = _.options.slidesToScroll * -1;
//             max = _.slideCount * 2;
//         }

//         while (breakPoint < max) {
//             indexes.push(breakPoint);
//             breakPoint = counter + _.options.slidesToScroll;
//             counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
//         }

//         return indexes;

//     };

//     Slick.prototype.getSlick = function() {

//         return this;

//     };

//     Slick.prototype.getSlideCount = function() {

//         var _ = this,
//             slidesTraversed, swipedSlide, centerOffset;

//         centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

//         if (_.options.swipeToSlide === true) {
//             _.$slideTrack.find('.slick-slide').each(function(index, slide) {
//                 if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
//                     swipedSlide = slide;
//                     return false;
//                 }
//             });

//             slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

//             return slidesTraversed;

//         } else {
//             return _.options.slidesToScroll;
//         }

//     };

//     Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

//         var _ = this;

//         _.changeSlide({
//             data: {
//                 message: 'index',
//                 index: parseInt(slide)
//             }
//         }, dontAnimate);

//     };

//     Slick.prototype.init = function(creation) {

//         var _ = this;

//         if (!$(_.$slider).hasClass('slick-initialized')) {

//             $(_.$slider).addClass('slick-initialized');

//             _.buildRows();
//             _.buildOut();
//             _.setProps();
//             _.startLoad();
//             _.loadSlider();
//             _.initializeEvents();
//             _.updateArrows();
//             _.updateDots();
//             _.checkResponsive(true);
//             _.focusHandler();

//         }

//         if (creation) {
//             _.$slider.trigger('init', [_]);
//         }

//         if (_.options.accessibility === true) {
//             _.initADA();
//         }

//         if ( _.options.autoplay ) {

//             _.paused = false;
//             _.autoPlay();

//         }

//     };

//     Slick.prototype.initADA = function() {
//         var _ = this,
//                 numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
//                 tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
//                     return (val >= 0) && (val < _.slideCount);
//                 });

//         _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
//             'aria-hidden': 'true',
//             'tabindex': '-1'
//         }).find('a, input, button, select').attr({
//             'tabindex': '-1'
//         });

//         if (_.$dots !== null) {
//             _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
//                 var slideControlIndex = tabControlIndexes.indexOf(i);

//                 $(this).attr({
//                     'role': 'tabpanel',
//                     'id': 'slick-slide' + _.instanceUid + i,
//                     'tabindex': -1
//                 });

//                 if (slideControlIndex !== -1) {
//                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
//                    if ($('#' + ariaButtonControl).length) {
//                      $(this).attr({
//                          'aria-describedby': ariaButtonControl
//                      });
//                    }
//                 }
//             });

//             _.$dots.attr('role', 'tablist').find('li').each(function(i) {
//                 var mappedSlideIndex = tabControlIndexes[i];

//                 $(this).attr({
//                     'role': 'presentation'
//                 });

//                 $(this).find('button').first().attr({
//                     'role': 'tab',
//                     'id': 'slick-slide-control' + _.instanceUid + i,
//                     'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
//                     'aria-label': (i + 1) + ' of ' + numDotGroups,
//                     'aria-selected': null,
//                     'tabindex': '-1'
//                 });

//             }).eq(_.currentSlide).find('button').attr({
//                 'aria-selected': 'true',
//                 'tabindex': '0'
//             }).end();
//         }

//         for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
//           if (_.options.focusOnChange) {
//             _.$slides.eq(i).attr({'tabindex': '0'});
//           } else {
//             _.$slides.eq(i).removeAttr('tabindex');
//           }
//         }

//         _.activateADA();

//     };

//     Slick.prototype.initArrowEvents = function() {

//         var _ = this;

//         if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
//             _.$prevArrow
//                .off('click.slick')
//                .on('click.slick', {
//                     message: 'previous'
//                }, _.changeSlide);
//             _.$nextArrow
//                .off('click.slick')
//                .on('click.slick', {
//                     message: 'next'
//                }, _.changeSlide);

//             if (_.options.accessibility === true) {
//                 _.$prevArrow.on('keydown.slick', _.keyHandler);
//                 _.$nextArrow.on('keydown.slick', _.keyHandler);
//             }
//         }

//     };

//     Slick.prototype.initDotEvents = function() {

//         var _ = this;

//         if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
//             $('li', _.$dots).on('click.slick', {
//                 message: 'index'
//             }, _.changeSlide);

//             if (_.options.accessibility === true) {
//                 _.$dots.on('keydown.slick', _.keyHandler);
//             }
//         }

//         if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

//             $('li', _.$dots)
//                 .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
//                 .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

//         }

//     };

//     Slick.prototype.initSlideEvents = function() {

//         var _ = this;

//         if ( _.options.pauseOnHover ) {

//             _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
//             _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

//         }

//     };

//     Slick.prototype.initializeEvents = function() {

//         var _ = this;

//         _.initArrowEvents();

//         _.initDotEvents();
//         _.initSlideEvents();

//         _.$list.on('touchstart.slick mousedown.slick', {
//             action: 'start'
//         }, _.swipeHandler);
//         _.$list.on('touchmove.slick mousemove.slick', {
//             action: 'move'
//         }, _.swipeHandler);
//         _.$list.on('touchend.slick mouseup.slick', {
//             action: 'end'
//         }, _.swipeHandler);
//         _.$list.on('touchcancel.slick mouseleave.slick', {
//             action: 'end'
//         }, _.swipeHandler);

//         _.$list.on('click.slick', _.clickHandler);

//         $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

//         if (_.options.accessibility === true) {
//             _.$list.on('keydown.slick', _.keyHandler);
//         }

//         if (_.options.focusOnSelect === true) {
//             $(_.$slideTrack).children().on('click.slick', _.selectHandler);
//         }

//         $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

//         $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

//         $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

//         $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
//         $(_.setPosition);

//     };

//     Slick.prototype.initUI = function() {

//         var _ = this;

//         if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

//             _.$prevArrow.show();
//             _.$nextArrow.show();

//         }

//         if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

//             _.$dots.show();

//         }

//     };

//     Slick.prototype.keyHandler = function(event) {

//         var _ = this;
//          //Dont slide if the cursor is inside the form fields and arrow keys are pressed
//         if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
//             if (event.keyCode === 37 && _.options.accessibility === true) {
//                 _.changeSlide({
//                     data: {
//                         message: _.options.rtl === true ? 'next' :  'previous'
//                     }
//                 });
//             } else if (event.keyCode === 39 && _.options.accessibility === true) {
//                 _.changeSlide({
//                     data: {
//                         message: _.options.rtl === true ? 'previous' : 'next'
//                     }
//                 });
//             }
//         }

//     };

//     Slick.prototype.lazyLoad = function() {

//         var _ = this,
//             loadRange, cloneRange, rangeStart, rangeEnd;

//         function loadImages(imagesScope) {

//             $('img[data-lazy]', imagesScope).each(function() {

//                 var image = $(this),
//                     imageSource = $(this).attr('data-lazy'),
//                     imageSrcSet = $(this).attr('data-srcset'),
//                     imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
//                     imageToLoad = document.createElement('img');

//                 imageToLoad.onload = function() {

//                     image
//                         .animate({ opacity: 0 }, 100, function() {

//                             if (imageSrcSet) {
//                                 image
//                                     .attr('srcset', imageSrcSet );

//                                 if (imageSizes) {
//                                     image
//                                         .attr('sizes', imageSizes );
//                                 }
//                             }

//                             image
//                                 .attr('src', imageSource)
//                                 .animate({ opacity: 1 }, 200, function() {
//                                     image
//                                         .removeAttr('data-lazy data-srcset data-sizes')
//                                         .removeClass('slick-loading');
//                                 });
//                             _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
//                         });

//                 };

//                 imageToLoad.onerror = function() {

//                     image
//                         .removeAttr( 'data-lazy' )
//                         .removeClass( 'slick-loading' )
//                         .addClass( 'slick-lazyload-error' );

//                     _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

//                 };

//                 imageToLoad.src = imageSource;

//             });

//         }

//         if (_.options.centerMode === true) {
//             if (_.options.infinite === true) {
//                 rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
//                 rangeEnd = rangeStart + _.options.slidesToShow + 2;
//             } else {
//                 rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
//                 rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
//             }
//         } else {
//             rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
//             rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
//             if (_.options.fade === true) {
//                 if (rangeStart > 0) rangeStart--;
//                 if (rangeEnd <= _.slideCount) rangeEnd++;
//             }
//         }

//         loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

//         if (_.options.lazyLoad === 'anticipated') {
//             var prevSlide = rangeStart - 1,
//                 nextSlide = rangeEnd,
//                 $slides = _.$slider.find('.slick-slide');

//             for (var i = 0; i < _.options.slidesToScroll; i++) {
//                 if (prevSlide < 0) prevSlide = _.slideCount - 1;
//                 loadRange = loadRange.add($slides.eq(prevSlide));
//                 loadRange = loadRange.add($slides.eq(nextSlide));
//                 prevSlide--;
//                 nextSlide++;
//             }
//         }

//         loadImages(loadRange);

//         if (_.slideCount <= _.options.slidesToShow) {
//             cloneRange = _.$slider.find('.slick-slide');
//             loadImages(cloneRange);
//         } else
//         if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
//             cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
//             loadImages(cloneRange);
//         } else if (_.currentSlide === 0) {
//             cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
//             loadImages(cloneRange);
//         }

//     };

//     Slick.prototype.loadSlider = function() {

//         var _ = this;

//         _.setPosition();

//         _.$slideTrack.css({
//             opacity: 1
//         });

//         _.$slider.removeClass('slick-loading');

//         _.initUI();

//         if (_.options.lazyLoad === 'progressive') {
//             _.progressiveLazyLoad();
//         }

//     };

//     Slick.prototype.next = Slick.prototype.slickNext = function() {

//         var _ = this;

//         _.changeSlide({
//             data: {
//                 message: 'next'
//             }
//         });

//     };

//     Slick.prototype.orientationChange = function() {

//         var _ = this;

//         _.checkResponsive();
//         _.setPosition();

//     };

//     Slick.prototype.pause = Slick.prototype.slickPause = function() {

//         var _ = this;

//         _.autoPlayClear();
//         _.paused = true;

//     };

//     Slick.prototype.play = Slick.prototype.slickPlay = function() {

//         var _ = this;

//         _.autoPlay();
//         _.options.autoplay = true;
//         _.paused = false;
//         _.focussed = false;
//         _.interrupted = false;

//     };

//     Slick.prototype.postSlide = function(index) {

//         var _ = this;

//         if( !_.unslicked ) {

//             _.$slider.trigger('afterChange', [_, index]);

//             _.animating = false;

//             if (_.slideCount > _.options.slidesToShow) {
//                 _.setPosition();
//             }

//             _.swipeLeft = null;

//             if ( _.options.autoplay ) {
//                 _.autoPlay();
//             }

//             if (_.options.accessibility === true) {
//                 _.initADA();

//                 if (_.options.focusOnChange) {
//                     var $currentSlide = $(_.$slides.get(_.currentSlide));
//                     $currentSlide.attr('tabindex', 0).focus();
//                 }
//             }

//         }

//     };

//     Slick.prototype.prev = Slick.prototype.slickPrev = function() {

//         var _ = this;

//         _.changeSlide({
//             data: {
//                 message: 'previous'
//             }
//         });

//     };

//     Slick.prototype.preventDefault = function(event) {

//         event.preventDefault();

//     };

//     Slick.prototype.progressiveLazyLoad = function( tryCount ) {

//         tryCount = tryCount || 1;

//         var _ = this,
//             $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
//             image,
//             imageSource,
//             imageSrcSet,
//             imageSizes,
//             imageToLoad;

//         if ( $imgsToLoad.length ) {

//             image = $imgsToLoad.first();
//             imageSource = image.attr('data-lazy');
//             imageSrcSet = image.attr('data-srcset');
//             imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
//             imageToLoad = document.createElement('img');

//             imageToLoad.onload = function() {

//                 if (imageSrcSet) {
//                     image
//                         .attr('srcset', imageSrcSet );

//                     if (imageSizes) {
//                         image
//                             .attr('sizes', imageSizes );
//                     }
//                 }

//                 image
//                     .attr( 'src', imageSource )
//                     .removeAttr('data-lazy data-srcset data-sizes')
//                     .removeClass('slick-loading');

//                 if ( _.options.adaptiveHeight === true ) {
//                     _.setPosition();
//                 }

//                 _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
//                 _.progressiveLazyLoad();

//             };

//             imageToLoad.onerror = function() {

//                 if ( tryCount < 3 ) {

//                     /**
//                      * try to load the image 3 times,
//                      * leave a slight delay so we don't get
//                      * servers blocking the request.
//                      */
//                     setTimeout( function() {
//                         _.progressiveLazyLoad( tryCount + 1 );
//                     }, 500 );

//                 } else {

//                     image
//                         .removeAttr( 'data-lazy' )
//                         .removeClass( 'slick-loading' )
//                         .addClass( 'slick-lazyload-error' );

//                     _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

//                     _.progressiveLazyLoad();

//                 }

//             };

//             imageToLoad.src = imageSource;

//         } else {

//             _.$slider.trigger('allImagesLoaded', [ _ ]);

//         }

//     };

//     Slick.prototype.refresh = function( initializing ) {

//         var _ = this, currentSlide, lastVisibleIndex;

//         lastVisibleIndex = _.slideCount - _.options.slidesToShow;

//         // in non-infinite sliders, we don't want to go past the
//         // last visible index.
//         if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
//             _.currentSlide = lastVisibleIndex;
//         }

//         // if less slides than to show, go to start.
//         if ( _.slideCount <= _.options.slidesToShow ) {
//             _.currentSlide = 0;

//         }

//         currentSlide = _.currentSlide;

//         _.destroy(true);

//         $.extend(_, _.initials, { currentSlide: currentSlide });

//         _.init();

//         if( !initializing ) {

//             _.changeSlide({
//                 data: {
//                     message: 'index',
//                     index: currentSlide
//                 }
//             }, false);

//         }

//     };

//     Slick.prototype.registerBreakpoints = function() {

//         var _ = this, breakpoint, currentBreakpoint, l,
//             responsiveSettings = _.options.responsive || null;

//         if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

//             _.respondTo = _.options.respondTo || 'window';

//             for ( breakpoint in responsiveSettings ) {

//                 l = _.breakpoints.length-1;

//                 if (responsiveSettings.hasOwnProperty(breakpoint)) {
//                     currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

//                     // loop through the breakpoints and cut out any existing
//                     // ones with the same breakpoint number, we don't want dupes.
//                     while( l >= 0 ) {
//                         if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
//                             _.breakpoints.splice(l,1);
//                         }
//                         l--;
//                     }

//                     _.breakpoints.push(currentBreakpoint);
//                     _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

//                 }

//             }

//             _.breakpoints.sort(function(a, b) {
//                 return ( _.options.mobileFirst ) ? a-b : b-a;
//             });

//         }

//     };

//     Slick.prototype.reinit = function() {

//         var _ = this;

//         _.$slides =
//             _.$slideTrack
//                 .children(_.options.slide)
//                 .addClass('slick-slide');

//         _.slideCount = _.$slides.length;

//         if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
//             _.currentSlide = _.currentSlide - _.options.slidesToScroll;
//         }

//         if (_.slideCount <= _.options.slidesToShow) {
//             _.currentSlide = 0;
//         }

//         _.registerBreakpoints();

//         _.setProps();
//         _.setupInfinite();
//         _.buildArrows();
//         _.updateArrows();
//         _.initArrowEvents();
//         _.buildDots();
//         _.updateDots();
//         _.initDotEvents();
//         _.cleanUpSlideEvents();
//         _.initSlideEvents();

//         _.checkResponsive(false, true);

//         if (_.options.focusOnSelect === true) {
//             $(_.$slideTrack).children().on('click.slick', _.selectHandler);
//         }

//         _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

//         _.setPosition();
//         _.focusHandler();

//         _.paused = !_.options.autoplay;
//         _.autoPlay();

//         _.$slider.trigger('reInit', [_]);

//     };

//     Slick.prototype.resize = function() {

//         var _ = this;

//         if ($(window).width() !== _.windowWidth) {
//             clearTimeout(_.windowDelay);
//             _.windowDelay = window.setTimeout(function() {
//                 _.windowWidth = $(window).width();
//                 _.checkResponsive();
//                 if( !_.unslicked ) { _.setPosition(); }
//             }, 50);
//         }
//     };

//     Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

//         var _ = this;

//         if (typeof(index) === 'boolean') {
//             removeBefore = index;
//             index = removeBefore === true ? 0 : _.slideCount - 1;
//         } else {
//             index = removeBefore === true ? --index : index;
//         }

//         if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
//             return false;
//         }

//         _.unload();

//         if (removeAll === true) {
//             _.$slideTrack.children().remove();
//         } else {
//             _.$slideTrack.children(this.options.slide).eq(index).remove();
//         }

//         _.$slides = _.$slideTrack.children(this.options.slide);

//         _.$slideTrack.children(this.options.slide).detach();

//         _.$slideTrack.append(_.$slides);

//         _.$slidesCache = _.$slides;

//         _.reinit();

//     };

//     Slick.prototype.setCSS = function(position) {

//         var _ = this,
//             positionProps = {},
//             x, y;

//         if (_.options.rtl === true) {
//             position = -position;
//         }
//         x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
//         y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

//         positionProps[_.positionProp] = position;

//         if (_.transformsEnabled === false) {
//             _.$slideTrack.css(positionProps);
//         } else {
//             positionProps = {};
//             if (_.cssTransitions === false) {
//                 positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
//                 _.$slideTrack.css(positionProps);
//             } else {
//                 positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
//                 _.$slideTrack.css(positionProps);
//             }
//         }

//     };

//     Slick.prototype.setDimensions = function() {

//         var _ = this;

//         if (_.options.vertical === false) {
//             if (_.options.centerMode === true) {
//                 _.$list.css({
//                     padding: ('0px ' + _.options.centerPadding)
//                 });
//             }
//         } else {
//             _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
//             if (_.options.centerMode === true) {
//                 _.$list.css({
//                     padding: (_.options.centerPadding + ' 0px')
//                 });
//             }
//         }

//         _.listWidth = _.$list.width();
//         _.listHeight = _.$list.height();


//         if (_.options.vertical === false && _.options.variableWidth === false) {
//             _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
//             _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

//         } else if (_.options.variableWidth === true) {
//             _.$slideTrack.width(5000 * _.slideCount);
//         } else {
//             _.slideWidth = Math.ceil(_.listWidth);
//             _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
//         }

//         var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
//         if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

//     };

//     Slick.prototype.setFade = function() {

//         var _ = this,
//             targetLeft;

//         _.$slides.each(function(index, element) {
//             targetLeft = (_.slideWidth * index) * -1;
//             if (_.options.rtl === true) {
//                 $(element).css({
//                     position: 'relative',
//                     right: targetLeft,
//                     top: 0,
//                     zIndex: _.options.zIndex - 2,
//                     opacity: 0
//                 });
//             } else {
//                 $(element).css({
//                     position: 'relative',
//                     left: targetLeft,
//                     top: 0,
//                     zIndex: _.options.zIndex - 2,
//                     opacity: 0
//                 });
//             }
//         });

//         _.$slides.eq(_.currentSlide).css({
//             zIndex: _.options.zIndex - 1,
//             opacity: 1
//         });

//     };

//     Slick.prototype.setHeight = function() {

//         var _ = this;

//         if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
//             var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
//             _.$list.css('height', targetHeight);
//         }

//     };

//     Slick.prototype.setOption =
//     Slick.prototype.slickSetOption = function() {

//         /**
//          * accepts arguments in format of:
//          *
//          *  - for changing a single option's value:
//          *     .slick("setOption", option, value, refresh )
//          *
//          *  - for changing a set of responsive options:
//          *     .slick("setOption", 'responsive', [{}, ...], refresh )
//          *
//          *  - for updating multiple values at once (not responsive)
//          *     .slick("setOption", { 'option': value, ... }, refresh )
//          */

//         var _ = this, l, item, option, value, refresh = false, type;

//         if( $.type( arguments[0] ) === 'object' ) {

//             option =  arguments[0];
//             refresh = arguments[1];
//             type = 'multiple';

//         } else if ( $.type( arguments[0] ) === 'string' ) {

//             option =  arguments[0];
//             value = arguments[1];
//             refresh = arguments[2];

//             if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

//                 type = 'responsive';

//             } else if ( typeof arguments[1] !== 'undefined' ) {

//                 type = 'single';

//             }

//         }

//         if ( type === 'single' ) {

//             _.options[option] = value;


//         } else if ( type === 'multiple' ) {

//             $.each( option , function( opt, val ) {

//                 _.options[opt] = val;

//             });


//         } else if ( type === 'responsive' ) {

//             for ( item in value ) {

//                 if( $.type( _.options.responsive ) !== 'array' ) {

//                     _.options.responsive = [ value[item] ];

//                 } else {

//                     l = _.options.responsive.length-1;

//                     // loop through the responsive object and splice out duplicates.
//                     while( l >= 0 ) {

//                         if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

//                             _.options.responsive.splice(l,1);

//                         }

//                         l--;

//                     }

//                     _.options.responsive.push( value[item] );

//                 }

//             }

//         }

//         if ( refresh ) {

//             _.unload();
//             _.reinit();

//         }

//     };

//     Slick.prototype.setPosition = function() {

//         var _ = this;

//         _.setDimensions();

//         _.setHeight();

//         if (_.options.fade === false) {
//             _.setCSS(_.getLeft(_.currentSlide));
//         } else {
//             _.setFade();
//         }

//         _.$slider.trigger('setPosition', [_]);

//     };

//     Slick.prototype.setProps = function() {

//         var _ = this,
//             bodyStyle = document.body.style;

//         _.positionProp = _.options.vertical === true ? 'top' : 'left';

//         if (_.positionProp === 'top') {
//             _.$slider.addClass('slick-vertical');
//         } else {
//             _.$slider.removeClass('slick-vertical');
//         }

//         if (bodyStyle.WebkitTransition !== undefined ||
//             bodyStyle.MozTransition !== undefined ||
//             bodyStyle.msTransition !== undefined) {
//             if (_.options.useCSS === true) {
//                 _.cssTransitions = true;
//             }
//         }

//         if ( _.options.fade ) {
//             if ( typeof _.options.zIndex === 'number' ) {
//                 if( _.options.zIndex < 3 ) {
//                     _.options.zIndex = 3;
//                 }
//             } else {
//                 _.options.zIndex = _.defaults.zIndex;
//             }
//         }

//         if (bodyStyle.OTransform !== undefined) {
//             _.animType = 'OTransform';
//             _.transformType = '-o-transform';
//             _.transitionType = 'OTransition';
//             if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
//         }
//         if (bodyStyle.MozTransform !== undefined) {
//             _.animType = 'MozTransform';
//             _.transformType = '-moz-transform';
//             _.transitionType = 'MozTransition';
//             if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
//         }
//         if (bodyStyle.webkitTransform !== undefined) {
//             _.animType = 'webkitTransform';
//             _.transformType = '-webkit-transform';
//             _.transitionType = 'webkitTransition';
//             if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
//         }
//         if (bodyStyle.msTransform !== undefined) {
//             _.animType = 'msTransform';
//             _.transformType = '-ms-transform';
//             _.transitionType = 'msTransition';
//             if (bodyStyle.msTransform === undefined) _.animType = false;
//         }
//         if (bodyStyle.transform !== undefined && _.animType !== false) {
//             _.animType = 'transform';
//             _.transformType = 'transform';
//             _.transitionType = 'transition';
//         }
//         _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
//     };


//     Slick.prototype.setSlideClasses = function(index) {

//         var _ = this,
//             centerOffset, allSlides, indexOffset, remainder;

//         allSlides = _.$slider
//             .find('.slick-slide')
//             .removeClass('slick-active slick-center slick-current')
//             .attr('aria-hidden', 'true');

//         _.$slides
//             .eq(index)
//             .addClass('slick-current');

//         if (_.options.centerMode === true) {

//             var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

//             centerOffset = Math.floor(_.options.slidesToShow / 2);

//             if (_.options.infinite === true) {

//                 if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
//                     _.$slides
//                         .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
//                         .addClass('slick-active')
//                         .attr('aria-hidden', 'false');

//                 } else {

//                     indexOffset = _.options.slidesToShow + index;
//                     allSlides
//                         .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
//                         .addClass('slick-active')
//                         .attr('aria-hidden', 'false');

//                 }

//                 if (index === 0) {

//                     allSlides
//                         .eq(allSlides.length - 1 - _.options.slidesToShow)
//                         .addClass('slick-center');

//                 } else if (index === _.slideCount - 1) {

//                     allSlides
//                         .eq(_.options.slidesToShow)
//                         .addClass('slick-center');

//                 }

//             }

//             _.$slides
//                 .eq(index)
//                 .addClass('slick-center');

//         } else {

//             if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

//                 _.$slides
//                     .slice(index, index + _.options.slidesToShow)
//                     .addClass('slick-active')
//                     .attr('aria-hidden', 'false');

//             } else if (allSlides.length <= _.options.slidesToShow) {

//                 allSlides
//                     .addClass('slick-active')
//                     .attr('aria-hidden', 'false');

//             } else {

//                 remainder = _.slideCount % _.options.slidesToShow;
//                 indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

//                 if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

//                     allSlides
//                         .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
//                         .addClass('slick-active')
//                         .attr('aria-hidden', 'false');

//                 } else {

//                     allSlides
//                         .slice(indexOffset, indexOffset + _.options.slidesToShow)
//                         .addClass('slick-active')
//                         .attr('aria-hidden', 'false');

//                 }

//             }

//         }

//         if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
//             _.lazyLoad();
//         }
//     };

//     Slick.prototype.setupInfinite = function() {

//         var _ = this,
//             i, slideIndex, infiniteCount;

//         if (_.options.fade === true) {
//             _.options.centerMode = false;
//         }

//         if (_.options.infinite === true && _.options.fade === false) {

//             slideIndex = null;

//             if (_.slideCount > _.options.slidesToShow) {

//                 if (_.options.centerMode === true) {
//                     infiniteCount = _.options.slidesToShow + 1;
//                 } else {
//                     infiniteCount = _.options.slidesToShow;
//                 }

//                 for (i = _.slideCount; i > (_.slideCount -
//                         infiniteCount); i -= 1) {
//                     slideIndex = i - 1;
//                     $(_.$slides[slideIndex]).clone(true).attr('id', '')
//                         .attr('data-slick-index', slideIndex - _.slideCount)
//                         .prependTo(_.$slideTrack).addClass('slick-cloned');
//                 }
//                 for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
//                     slideIndex = i;
//                     $(_.$slides[slideIndex]).clone(true).attr('id', '')
//                         .attr('data-slick-index', slideIndex + _.slideCount)
//                         .appendTo(_.$slideTrack).addClass('slick-cloned');
//                 }
//                 _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
//                     $(this).attr('id', '');
//                 });

//             }

//         }

//     };

//     Slick.prototype.interrupt = function( toggle ) {

//         var _ = this;

//         if( !toggle ) {
//             _.autoPlay();
//         }
//         _.interrupted = toggle;

//     };

//     Slick.prototype.selectHandler = function(event) {

//         var _ = this;

//         var targetElement =
//             $(event.target).is('.slick-slide') ?
//                 $(event.target) :
//                 $(event.target).parents('.slick-slide');

//         var index = parseInt(targetElement.attr('data-slick-index'));

//         if (!index) index = 0;

//         if (_.slideCount <= _.options.slidesToShow) {

//             _.slideHandler(index, false, true);
//             return;

//         }

//         _.slideHandler(index);

//     };

//     Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

//         var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
//             _ = this, navTarget;

//         sync = sync || false;

//         if (_.animating === true && _.options.waitForAnimate === true) {
//             return;
//         }

//         if (_.options.fade === true && _.currentSlide === index) {
//             return;
//         }

//         if (sync === false) {
//             _.asNavFor(index);
//         }

//         targetSlide = index;
//         targetLeft = _.getLeft(targetSlide);
//         slideLeft = _.getLeft(_.currentSlide);

//         _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

//         if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
//             if (_.options.fade === false) {
//                 targetSlide = _.currentSlide;
//                 if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
//                     _.animateSlide(slideLeft, function() {
//                         _.postSlide(targetSlide);
//                     });
//                 } else {
//                     _.postSlide(targetSlide);
//                 }
//             }
//             return;
//         } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
//             if (_.options.fade === false) {
//                 targetSlide = _.currentSlide;
//                 if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
//                     _.animateSlide(slideLeft, function() {
//                         _.postSlide(targetSlide);
//                     });
//                 } else {
//                     _.postSlide(targetSlide);
//                 }
//             }
//             return;
//         }

//         if ( _.options.autoplay ) {
//             clearInterval(_.autoPlayTimer);
//         }

//         if (targetSlide < 0) {
//             if (_.slideCount % _.options.slidesToScroll !== 0) {
//                 animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
//             } else {
//                 animSlide = _.slideCount + targetSlide;
//             }
//         } else if (targetSlide >= _.slideCount) {
//             if (_.slideCount % _.options.slidesToScroll !== 0) {
//                 animSlide = 0;
//             } else {
//                 animSlide = targetSlide - _.slideCount;
//             }
//         } else {
//             animSlide = targetSlide;
//         }

//         _.animating = true;

//         _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

//         oldSlide = _.currentSlide;
//         _.currentSlide = animSlide;

//         _.setSlideClasses(_.currentSlide);

//         if ( _.options.asNavFor ) {

//             navTarget = _.getNavTarget();
//             navTarget = navTarget.slick('getSlick');

//             if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
//                 navTarget.setSlideClasses(_.currentSlide);
//             }

//         }

//         _.updateDots();
//         _.updateArrows();

//         if (_.options.fade === true) {
//             if (dontAnimate !== true) {

//                 _.fadeSlideOut(oldSlide);

//                 _.fadeSlide(animSlide, function() {
//                     _.postSlide(animSlide);
//                 });

//             } else {
//                 _.postSlide(animSlide);
//             }
//             _.animateHeight();
//             return;
//         }

//         if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
//             _.animateSlide(targetLeft, function() {
//                 _.postSlide(animSlide);
//             });
//         } else {
//             _.postSlide(animSlide);
//         }

//     };

//     Slick.prototype.startLoad = function() {

//         var _ = this;

//         if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

//             _.$prevArrow.hide();
//             _.$nextArrow.hide();

//         }

//         if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

//             _.$dots.hide();

//         }

//         _.$slider.addClass('slick-loading');

//     };

//     Slick.prototype.swipeDirection = function() {

//         var xDist, yDist, r, swipeAngle, _ = this;

//         xDist = _.touchObject.startX - _.touchObject.curX;
//         yDist = _.touchObject.startY - _.touchObject.curY;
//         r = Math.atan2(yDist, xDist);

//         swipeAngle = Math.round(r * 180 / Math.PI);
//         if (swipeAngle < 0) {
//             swipeAngle = 360 - Math.abs(swipeAngle);
//         }

//         if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
//             return (_.options.rtl === false ? 'left' : 'right');
//         }
//         if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
//             return (_.options.rtl === false ? 'left' : 'right');
//         }
//         if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
//             return (_.options.rtl === false ? 'right' : 'left');
//         }
//         if (_.options.verticalSwiping === true) {
//             if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
//                 return 'down';
//             } else {
//                 return 'up';
//             }
//         }

//         return 'vertical';

//     };

//     Slick.prototype.swipeEnd = function(event) {

//         var _ = this,
//             slideCount,
//             direction;

//         _.dragging = false;
//         _.swiping = false;

//         if (_.scrolling) {
//             _.scrolling = false;
//             return false;
//         }

//         _.interrupted = false;
//         _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

//         if ( _.touchObject.curX === undefined ) {
//             return false;
//         }

//         if ( _.touchObject.edgeHit === true ) {
//             _.$slider.trigger('edge', [_, _.swipeDirection() ]);
//         }

//         if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

//             direction = _.swipeDirection();

//             switch ( direction ) {

//                 case 'left':
//                 case 'down':

//                     slideCount =
//                         _.options.swipeToSlide ?
//                             _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
//                             _.currentSlide + _.getSlideCount();

//                     _.currentDirection = 0;

//                     break;

//                 case 'right':
//                 case 'up':

//                     slideCount =
//                         _.options.swipeToSlide ?
//                             _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
//                             _.currentSlide - _.getSlideCount();

//                     _.currentDirection = 1;

//                     break;

//                 default:


//             }

//             if( direction != 'vertical' ) {

//                 _.slideHandler( slideCount );
//                 _.touchObject = {};
//                 _.$slider.trigger('swipe', [_, direction ]);

//             }

//         } else {

//             if ( _.touchObject.startX !== _.touchObject.curX ) {

//                 _.slideHandler( _.currentSlide );
//                 _.touchObject = {};

//             }

//         }

//     };

//     Slick.prototype.swipeHandler = function(event) {

//         var _ = this;

//         if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
//             return;
//         } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
//             return;
//         }

//         _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
//             event.originalEvent.touches.length : 1;

//         _.touchObject.minSwipe = _.listWidth / _.options
//             .touchThreshold;

//         if (_.options.verticalSwiping === true) {
//             _.touchObject.minSwipe = _.listHeight / _.options
//                 .touchThreshold;
//         }

//         switch (event.data.action) {

//             case 'start':
//                 _.swipeStart(event);
//                 break;

//             case 'move':
//                 _.swipeMove(event);
//                 break;

//             case 'end':
//                 _.swipeEnd(event);
//                 break;

//         }

//     };

//     Slick.prototype.swipeMove = function(event) {

//         var _ = this,
//             edgeWasHit = false,
//             curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

//         touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

//         if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
//             return false;
//         }

//         curLeft = _.getLeft(_.currentSlide);

//         _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
//         _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

//         _.touchObject.swipeLength = Math.round(Math.sqrt(
//             Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

//         verticalSwipeLength = Math.round(Math.sqrt(
//             Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

//         if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
//             _.scrolling = true;
//             return false;
//         }

//         if (_.options.verticalSwiping === true) {
//             _.touchObject.swipeLength = verticalSwipeLength;
//         }

//         swipeDirection = _.swipeDirection();

//         if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
//             _.swiping = true;
//             event.preventDefault();
//         }

//         positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
//         if (_.options.verticalSwiping === true) {
//             positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
//         }


//         swipeLength = _.touchObject.swipeLength;

//         _.touchObject.edgeHit = false;

//         if (_.options.infinite === false) {
//             if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
//                 swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
//                 _.touchObject.edgeHit = true;
//             }
//         }

//         if (_.options.vertical === false) {
//             _.swipeLeft = curLeft + swipeLength * positionOffset;
//         } else {
//             _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
//         }
//         if (_.options.verticalSwiping === true) {
//             _.swipeLeft = curLeft + swipeLength * positionOffset;
//         }

//         if (_.options.fade === true || _.options.touchMove === false) {
//             return false;
//         }

//         if (_.animating === true) {
//             _.swipeLeft = null;
//             return false;
//         }

//         _.setCSS(_.swipeLeft);

//     };

//     Slick.prototype.swipeStart = function(event) {

//         var _ = this,
//             touches;

//         _.interrupted = true;

//         if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
//             _.touchObject = {};
//             return false;
//         }

//         if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
//             touches = event.originalEvent.touches[0];
//         }

//         _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
//         _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

//         _.dragging = true;

//     };

//     Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

//         var _ = this;

//         if (_.$slidesCache !== null) {

//             _.unload();

//             _.$slideTrack.children(this.options.slide).detach();

//             _.$slidesCache.appendTo(_.$slideTrack);

//             _.reinit();

//         }

//     };

//     Slick.prototype.unload = function() {

//         var _ = this;

//         $('.slick-cloned', _.$slider).remove();

//         if (_.$dots) {
//             _.$dots.remove();
//         }

//         if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
//             _.$prevArrow.remove();
//         }

//         if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
//             _.$nextArrow.remove();
//         }

//         _.$slides
//             .removeClass('slick-slide slick-active slick-visible slick-current')
//             .attr('aria-hidden', 'true')
//             .css('width', '');

//     };

//     Slick.prototype.unslick = function(fromBreakpoint) {

//         var _ = this;
//         _.$slider.trigger('unslick', [_, fromBreakpoint]);
//         _.destroy();

//     };

//     Slick.prototype.updateArrows = function() {

//         var _ = this,
//             centerOffset;

//         centerOffset = Math.floor(_.options.slidesToShow / 2);

//         if ( _.options.arrows === true &&
//             _.slideCount > _.options.slidesToShow &&
//             !_.options.infinite ) {

//             _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
//             _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

//             if (_.currentSlide === 0) {

//                 _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
//                 _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

//             } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

//                 _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
//                 _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

//             } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

//                 _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
//                 _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

//             }

//         }

//     };

//     Slick.prototype.updateDots = function() {

//         var _ = this;

//         if (_.$dots !== null) {

//             _.$dots
//                 .find('li')
//                     .removeClass('slick-active')
//                     .end();

//             _.$dots
//                 .find('li')
//                 .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
//                 .addClass('slick-active');

//         }

//     };

//     Slick.prototype.visibility = function() {

//         var _ = this;

//         if ( _.options.autoplay ) {

//             if ( document[_.hidden] ) {

//                 _.interrupted = true;

//             } else {

//                 _.interrupted = false;

//             }

//         }

//     };

//     $.fn.slick = function() {
//         var _ = this,
//             opt = arguments[0],
//             args = Array.prototype.slice.call(arguments, 1),
//             l = _.length,
//             i,
//             ret;
//         for (i = 0; i < l; i++) {
//             if (typeof opt == 'object' || typeof opt == 'undefined')
//                 _[i].slick = new Slick(_[i], opt);
//             else
//                 ret = _[i].slick[opt].apply(_[i].slick, args);
//             if (typeof ret != 'undefined') return ret;
//         }
//         return _;
//     };

// }));


!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});