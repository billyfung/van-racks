/* ===================================================
 * bootstrap-transition.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ) {

  $(function () {

    "use strict"

    /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
     * ======================================================= */

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined

      return support && {
        end: (function () {
          var transitionEnd = "TransitionEnd"
          if ( $.browser.webkit ) {
          	transitionEnd = "webkitTransitionEnd"
          } else if ( $.browser.mozilla ) {
          	transitionEnd = "transitionend"
          } else if ( $.browser.opera ) {
          	transitionEnd = "oTransitionEnd"
          }
          return transitionEnd
        }())
      }
    })()

  })

}( window.jQuery );/* ==========================================================
 * bootstrap-alert.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function ( el ) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype = {

    constructor: Alert

  , close: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.trigger('close')

      e && e.preventDefault()

      $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

      $parent
        .trigger('close')
        .removeClass('in')

      function removeElement() {
        $parent
          .trigger('closed')
          .remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
        $parent.on($.support.transition.end, removeElement) :
        removeElement()
    }

  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}( window.jQuery );/* ============================================================
 * bootstrap-button.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype = {

      constructor: Button

    , setState: function ( state ) {
        var d = 'disabled'
          , $el = this.$element
          , data = $el.data()
          , val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
          state == 'loadingText' ?
            $el.addClass(d).attr(d, d) :
            $el.removeClass(d).removeAttr(d)
        }, 0)
      }

    , toggle: function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent
          .find('.active')
          .removeClass('active')

        this.$element.toggleClass('active')
      }

  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}( window.jQuery );/* ==========================================================
 * bootstrap-carousel.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ){

  "use strict"

 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.carousel.defaults, options)
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function () {
      this.interval = setInterval($.proxy(this.next, this), this.options.interval)
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function () {
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger('slide')
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      } else {
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.trigger('slide')
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = typeof option == 'object' && option
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}( window.jQuery );/* =============================================================
 * bootstrap-collapse.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Collapse = function ( element, options ) {
  	this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options["parent"]) {
      this.$parent = $(this.options["parent"])
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension = this.dimension()
        , scroll = $.camelCase(['scroll', dimension].join('-'))
        , actives = this.$parent && this.$parent.find('.in')
        , hasData

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', 'show', 'shown')
      this.$element[dimension](this.$element[0][scroll])

    }

  , hide: function () {
      var dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', 'hide', 'hidden')
      this.$element[dimension](0)
    }

  , reset: function ( size ) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function ( method, startEvent, completeEvent ) {
      var that = this
        , complete = function () {
            if (startEvent == 'show') that.reset()
            that.$element.trigger(completeEvent)
          }

      this.$element
        .trigger(startEvent)
        [method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  	}

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
  	}

  }

  /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}( window.jQuery );/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function( $ ){

  "use strict"

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function ( element ) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function ( e ) {
      var $this = $(this)
        , selector = $this.attr('data-target')
        , $parent
        , isActive

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()
      !isActive && $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}( window.jQuery );/* =========================================================
 * bootstrap-modal.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function( $ ){

  "use strict"

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function ( content, options ) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this

        if (this.isShown) return

        $('body').addClass('modal-open')

        this.isShown = true
        this.$element.trigger('show')

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          !that.$element.parent().length && that.$element.appendTo(document.body) //don't move modals dom position

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element
          .trigger('hide')
          .removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal( that ) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop( callback ) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}( window.jQuery );/* ===========================================================
 * bootstrap-tooltip.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function ( type, element, options ) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) {
        self.show()
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show()
          }
        }, self.options.delay.show)
      }
    }

  , leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = (title || '').toString().replace(/(^\s*|\s*$)/, "")

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , delay: 0
  , selector: false
  , placement: 'top'
  , trigger: 'hover'
  , title: ''
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  }

}( window.jQuery );/* ===========================================================
 * bootstrap-popover.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      content = content.toString().replace(/(^\s*|\s*$)/, "")

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}( window.jQuery );/* =============================================================
 * bootstrap-scrollspy.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

  "use strict"

  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body').on('click.scroll.data-api', this.selector, process)
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        this.targets = this.$body
          .find(this.selector)
          .map(function () {
            var href = $(this).attr('href')
            return /^#\w/.test(href) && $(href).length ? href : null
          })

        this.offsets = $.map(this.targets, function (id) {
          return $(id).position().top
        })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active

        this.activeTarget = target

        this.$body
          .find(this.selector).parent('.active')
          .removeClass('active')

        active = this.$body
          .find(this.selector + '[href="' + target + '"]')
          .parent('li')
          .addClass('active')

        if ( active.parent('.dropdown-menu') )  {
          active.closest('li.dropdown').addClass('active')
        }
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}( window.jQuery );/* ========================================================
 * bootstrap-tab.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function( $ ){

  "use strict"

 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      $this.trigger({
        type: 'show'
      , relatedTarget: previous
      })

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}( window.jQuery );/* =============================================================
 * bootstrap-typeahead.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Typeahead = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element.val(val)
      this.$element.change();
      return this.hide()
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        if (that.matcher(item)) return item
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}( window.jQuery );
$(function() {
  var center = new google.maps.LatLng(49.2827, -123.1207);
  var mapOptions = {
    center: center,
    disableDoubleClickZoom: true,
    keyboardShortcuts: false,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 19,
    minZoom: 15,
    panControl: false,
    rotateControl: false,
    scaleControl: false,
    scrollwheel: false,
    streetViewControl: true,
    zoom: 15,
    zoomControl: true
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var size = new google.maps.Size(27.0, 37.0);
  var origin = new google.maps.Point(0, 0);
  var anchor = new google.maps.Point(13.0, 18.0);
  var greenMarkerImage = new google.maps.MarkerImage('/images/markers/greenrack.png',
    size,
    origin,
    anchor
  );
  var redMarkerImage = new google.maps.MarkerImage('/images/markers/redrack.png',
    size,
    origin,
    anchor
  );
  var markerShadowImage = new google.maps.MarkerImage('/assets/markers/shadow-c92ff27d07461ca4a8c886de00d6c5fb5ba85ce563073df53721b71ca7babe79.png',
    new google.maps.Size(46.0, 37.0),
    origin,
    anchor
  );
  var activeThingId;
  var activeMarker;
  var activeInfoWindow;
  var isWindowOpen = false;
  var thingIds = [];
  function addMarker(thingId, point, color) {
    if(color === 'green') {
      var image = greenMarkerImage;
    } else if(color === 'red') {
      var image = redMarkerImage;
    }
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon: image,
      map: map,
      position: point,
      shadow: markerShadowImage
    });
    google.maps.event.addListener(marker, 'click', function() {
      if(activeInfoWindow) {
        activeInfoWindow.close();
      }
      var infoWindow = new google.maps.InfoWindow({
        maxWidth: 210
      });
      google.maps.event.addListener(infoWindow, 'closeclick', function() {
        isWindowOpen = false;
      });
      activeInfoWindow = infoWindow;
      activeThingId = thingId;
      activeMarker = marker;
      $.ajax({
        type: 'GET',
        url: '/info_window',
        data: {
          'thing_id': thingId
        },
        success: function(data) {
          // Prevent race condition, which could lead to multiple windows being open at the same time.
          if(infoWindow === activeInfoWindow) {
            infoWindow.setContent(data);
            infoWindow.open(map, marker);
            isWindowOpen = true;
          }
        }
      });
    });
    thingIds.push(thingId);
  }
  function addMarkersAround(lat, lng) {
    var submitButton = $("#address_form input[type='submit']");
    $.ajax({
      type: 'GET',
      url: '/things.json',
      data: {
        'utf8': '✓',
        'lat': lat,
        'lng': lng,
        'limit': $('#address_form input[name="limit"]').val()
      },
      error: function(jqXHR) {
        $(submitButton).attr("disabled", false);
      },
      success: function(data) {
        $(submitButton).attr("disabled", false);
        if(data.errors) {
          $('#address').parent().addClass('error');
          $('#address').focus();
        } else {
          $('#address').parent().removeClass('error');
          var i = -1;
          $(data).each(function(index, thing) {
            if($.inArray(thing.id, thingIds) === -1) {
              i += 1;
            } else {
              // continue
              return true;
            }
            setTimeout(function() {
              var point = new google.maps.LatLng(thing.lat, thing.lng);
              if(thing.user_id) {
                var color = 'green';
              } else {
                var color = 'red';
              }
              addMarker(thing.id, point, color);
            }, i * 100);
          });
        }
      }
    });
  }
  google.maps.event.addListener(map, 'idle', function() {
    var center = map.getCenter();
    addMarkersAround(center.lat(), center.lng());
  });
  $('#address_form').live('submit', function() {
    var submitButton = $("#address_form input[type='submit']");
    $(submitButton).attr("disabled", true);
    if($('#address').val() === '') {
      $(submitButton).attr("disabled", false);
      $('#address').parent().addClass('error');
      $('#address').focus();
    } else {
      $.ajax({
        type: 'GET',
        url: '/address.json',
        data: {
          'utf8': '✓',
          'city_state': $('#city_state').val(),
          'address': $('#address').val()
        },
        error: function(jqXHR) {
          $(submitButton).attr("disabled", false);
          $('#address').parent().addClass('error');
          $('#address').focus();
        },
        success: function(data) {
          $(submitButton).attr("disabled", false);
          if(data.errors) {
            $('#address').parent().addClass('error');
            $('#address').focus();
          } else {
            $('#address').parent().removeClass('error');
            addMarkersAround(data[0], data[1]);
            var center = new google.maps.LatLng(data[0], data[1]);
            map.setCenter(center);
            map.setZoom(19);
          }
        }
      });
    }
    return false;
  });
  // Focus on the first non-empty text input or password field
  function setComboFormFocus() {
    $('#combo-form input[type="email"], #combo-form input[type="text"]:visible, #combo-form input[type="password"]:visible, #combo-form input[type="submit"]:visible, #combo-form input[type="tel"]:visible, #combo-form button:visible').each(function(index) {
      if($(this).val() === "" || $(this).attr('type') === 'submit' || this.tagName.toLowerCase() === 'button') {
        $(this).focus();
        return false;
      }
    });
  }
  $('#combo-form input[type="radio"]').live('click', function() {
    var radioInput = $(this);
    if('new' === radioInput.val()) {
      $('#combo-form').data('state', 'user_sign_up');
      $('#user_forgot_password_fields').slideUp();
      $('#user_sign_in_fields').slideUp();
      $('#user_sign_up_fields').slideDown(function() {
        setComboFormFocus();
      });
    } else if('existing' === radioInput.val()) {
      $('#user_sign_up_fields').slideUp();
      $('#user_sign_in_fields').slideDown(function() {
        $('#combo-form').data('state', 'user_sign_in');
        setComboFormFocus();
        $('#user_forgot_password_link').click(function() {
          $('#combo-form').data('state', 'user_forgot_password');
          $('#user_sign_in_fields').slideUp();
          $('#user_forgot_password_fields').slideDown(function() {
            setComboFormFocus();
            $('#user_remembered_password_link').click(function() {
              $('#combo-form').data('state', 'user_sign_in');
              $('#user_forgot_password_fields').slideUp();
              $('#user_sign_in_fields').slideDown(function() {
                setComboFormFocus();
              });
            });
          });
        });
      });
    }
  });
  $('#combo-form').live('submit', function() {
    var submitButton = $("#combo-form input[type='submit']");
    $(submitButton).attr("disabled", true);
    var errors = []
    if(!/[\w\.%\+]+@[\w]+\.+[\w]{2,}/.test($('#user_email').val())) {
      errors.push($('#user_email'));
      $('#user_email').parent().addClass('error');
    } else {
      $('#user_email').parent().removeClass('error');
    }
    if(!$(this).data('state') || $(this).data('state') === 'user_sign_up') {
      if($('#user_name').val() === '') {
        errors.push($('#user_name'));
        $('#user_name').parent().addClass('error');
      } else {
        $('#user_name').parent().removeClass('error');
      }
      if($('#user_password_confirmation').val().length < 6 || $('#user_password_confirmation').val().length > 20) {
        errors.push($('#user_password_confirmation'));
        $('#user_password_confirmation').parent().addClass('error');
      } else {
        $('#user_password_confirmation').parent().removeClass('error');
      }
      if(errors.length > 0) {
        $(submitButton).attr("disabled", false);
        errors[0].focus();
      } else {
        $.ajax({
          type: 'POST',
          url: '/users.json',
          data: {
            'utf8': '✓',
            'authenticity_token': $('#combo-form input[name="authenticity_token"]').val(),
            'user': {
              'email': $('#user_email').val(),
              'name': $('#user_name').val(),
              'organization': $('#user_organization').val(),
              'voice_number': $('#user_voice_number').val(),
              'sms_number': $('#user_sms_number').val(),
              'password': $('#user_password_confirmation').val(),
              'password_confirmation': $('#user_password_confirmation').val()
            }
          },
          error: function(jqXHR) {
            var data = $.parseJSON(jqXHR.responseText);
            $(submitButton).attr("disabled", false);
            if(data.errors.email) {
              errors.push($('#user_email'));
              $('#user_email').parent().addClass('error');
            }
            if(data.errors.name) {
              errors.push($('#user_name'));
              $('#user_name').parent().addClass('error');
            }
            if(data.errors.organization) {
              errors.push($('#user_organization'));
              $('#user_organization').parent().addClass('error');
            }
            if(data.errors.voice_number) {
              errors.push($('#user_voice_number'));
              $('#user_voice_number').parent().addClass('error');
            }
            if(data.errors.sms_number) {
              errors.push($('#user_sms_number'));
              $('#user_sms_number').parent().addClass('error');
            }
            if(data.errors.password) {
              errors.push($('#user_password_confirmation'));
              $('#user_password_confirmation').parent().addClass('error');
            }
            errors[0].focus();
          },
          success: function(data) {
            $.ajax({
              type: 'GET',
              url: '/sidebar/search',
              data: {
                'flash': {
                  'notice': "Thanks for signing up!"
                }
              },
              success: function(data) {
                $('#content').html(data);
              }
            });
          }
        });
      }
    } else if($(this).data('state') === 'user_sign_in') {
      if($('#user_password').val().length < 6 || $('#user_password').val().length > 20) {
        errors.push($('#user_password'));
        $('#user_password').parent().addClass('error');
      } else {
        $('#user_password').parent().removeClass('error');
      }
      if(errors.length > 0) {
        $(submitButton).attr("disabled", false);
        errors[0].focus();
      } else {
        $.ajax({
          type: 'POST',
          url: '/users/sign_in.json',
          data: {
            'utf8': '✓',
            'authenticity_token': $('#combo-form input[name="authenticity_token"]').val(),
            'user': {
              'email': $('#user_email').val(),
              'password': $('#user_password').val(),
              'remember_me': $('#user_remember_me').val()
            }
          },
          error: function(jqXHR) {
            $(submitButton).attr("disabled", false);
            $('#user_password').parent().addClass('error');
            $('#user_password').focus();
          },
          success: function(data) {
            $.ajax({
              type: 'GET',
              url: '/sidebar/search',
              data: {
                'flash': {
                  'notice': "Signed in!"
                }
              },
              success: function(data) {
                $('#content').html(data);
              }
            });
          }
        });
      }
    } else if($(this).data('state') === 'user_forgot_password') {
      if(errors.length > 0) {
        $(submitButton).attr("disabled", false);
        errors[0].focus();
      } else {
        $.ajax({
          type: 'POST',
          url: '/users/password.json',
          data: {
            'utf8': '✓',
            'authenticity_token': $('#combo-form input[name="authenticity_token"]').val(),
            'user': {
              'email': $('#user_email').val()
            }
          },
          error: function(jqXHR) {
            $(submitButton).attr("disabled", false);
            $('#user_email').parent().addClass('error');
            $('#user_email').focus();
          },
          success: function() {
            $(submitButton).attr("disabled", false);
            $('#user_remembered_password_link').click();
            $('#user_password').focus();
          }
        });
      }
    }
    return false;
  });
  $('#adoption_form').live('submit', function() {
    var submitButton = $("#adoption_form input[type='submit']");
    $(submitButton).attr("disabled", true);
    $.ajax({
      type: 'POST',
      url: '/things.json',
      data: {
        '_method': 'patch',
        'id': $('#thing_id').val(),
        'utf8': '✓',
        'authenticity_token': $('#adoption_form input[name="authenticity_token"]').val(),
        'thing': {
          'user_id': $('#thing_user_id').val(),
          'name': $('#thing_name').val()
        }
      },
      error: function(jqXHR) {
        $(submitButton).attr("disabled", false);
      },
      success: function(data) {
        $.ajax({
          type: 'GET',
          url: '/info_window',
          data: {
            'thing_id': activeThingId,
            'flash': {
              'notice': "You just adopted a bike rack!"
            }
          },
          success: function(data) {
            activeInfoWindow.close();
            activeInfoWindow.setContent(data);
            activeInfoWindow.open(map, activeMarker);
            activeMarker.setIcon(greenMarkerImage);
            activeMarker.setAnimation(google.maps.Animation.BOUNCE);
          }
        });
      }
    });
    return false;
  });
  $('#abandon_form').live('submit', function() {
    var answer = window.confirm("Are you sure you want to abandon this bike rack?")
    if(answer) {
      var submitButton = $("#abandon_form input[type='submit']");
      $(submitButton).attr("disabled", true);
      $.ajax({
        type: 'POST',
        url: '/things.json',
        data: {
          '_method': 'patch',
          'id': $('#thing_id').val(),
          'utf8': '✓',
          'authenticity_token': $('#abandon_form input[name="authenticity_token"]').val(),
          'thing': {
            'user_id': $('#thing_user_id').val(),
            'name': $('#thing_name').val()
          }
        },
        error: function(jqXHR) {
          $(submitButton).attr("disabled", false);
        },
        success: function(data) {
          $.ajax({
            type: 'GET',
            url: '/info_window',
            data: {
              'thing_id': activeThingId,
              'flash': {
                'warning': "Bike rack abandoned!"
              }
            },
            success: function(data) {
              activeInfoWindow.close();
              activeInfoWindow.setContent(data);
              activeInfoWindow.open(map, activeMarker);
              activeMarker.setIcon(redMarkerImage);
              activeMarker.setAnimation(null);
            }
          });
        }
      });
    }
    return false;
  });
  $('#edit_profile_link').live('click', function() {
    var link = $(this);
    $(link).addClass('disabled');
    $.ajax({
      type: 'GET',
      url: '/users/edit',
      error: function(jqXHR) {
        $(link).removeClass('disabled');
      },
      success: function(data) {
        $('#content').html(data);
      }
    });
    return false;
  });
  $('#edit_form').live('submit', function() {
    var submitButton = $("#edit_form input[type='submit']");
    $(submitButton).attr("disabled", true);
    var errors = []
    if(!/[\w\.%\+\]+@[\w\]+\.+[\w]{2,}/.test($('#user_email').val())) {
      errors.push($('#user_email'));
      $('#user_email').parent().addClass('error');
    } else {
      $('#user_email').parent().removeClass('error');
    }
    if($('#user_name').val() === '') {
      errors.push($('#user_name'));
      $('#user_name').parent().addClass('error');
    } else {
      $('#user_name').parent().removeClass('error');
    }
    if($('#user_zip').val() != '' && !/^\d{5}(-\d{4})?$/.test($('#user_zip').val())) {
      errors.push($('#user_zip'));
      $('#user_zip').parent().addClass('error');
    } else {
      $('#user_zip').parent().removeClass('error');
    }
    if($('#user_password').val() && ($('#user_password').val().length < 6 || $('#user_password').val().length > 20)) {
      errors.push($('#user_password'));
      $('#user_password').parent().addClass('error');
    } else {
      $('#user_password').parent().removeClass('error');
    }
    if($('#user_current_password').val().length < 6 || $('#user_current_password').val().length > 20) {
      errors.push($('#user_current_password'));
      $('#user_current_password').parent().addClass('error');
    } else {
      $('#user_current_password').parent().removeClass('error');
    }
    if(errors.length > 0) {
      $(submitButton).attr("disabled", false);
      errors[0].focus();
    } else {
      $.ajax({
        type: 'POST',
        url: '/users.json',
        data: {
          '_method': 'patch',
          'id': $('#id').val(),
          'thing_id': activeThingId,
          'utf8': '✓',
          'authenticity_token': $('#edit_form input[name="authenticity_token"]').val(),
          'user': {
            'email': $('#user_email').val(),
            'name': $('#user_name').val(),
            'organization': $('#user_organization').val(),
            'voice_number': $('#user_voice_number').val(),
            'sms_number': $('#user_sms_number').val(),
            'address_1': $('#user_address_1').val(),
            'address_2': $('#user_address_2').val(),
            'city': $('#user_city').val(),
            'state': $('#user_state').val(),
            'zip': $('#user_zip').val(),
            'password': $('#user_password').val(),
            'password_confirmation': $('#user_password').val(),
            'current_password': $('#user_current_password').val()
          }
        },
        error: function(jqXHR) {
          var data = $.parseJSON(jqXHR.responseText);
          $(submitButton).attr("disabled", false);
          if(data.errors.email) {
            errors.push($('#user_email'));
            $('#user_email').parent().addClass('error');
          }
          if(data.errors.name) {
            errors.push($('#user_name'));
            $('#user_name').parent().addClass('error');
          }
          if(data.errors.organization) {
            errors.push($('#user_organization'));
            $('#user_organization').parent().addClass('error');
          }
          if(data.errors.voice_number) {
            errors.push($('#user_voice_number'));
            $('#user_voice_number').parent().addClass('error');
          }
          if(data.errors.sms_number) {
            errors.push($('#user_sms_number'));
            $('#user_sms_number').parent().addClass('error');
          }
          if(data.errors.address_1) {
            errors.push($('#user_address_1'));
            $('#user_address_1').parent().addClass('error');
          }
          if(data.errors.address_2) {
            errors.push($('#user_address_2'));
            $('#user_address_2').parent().addClass('error');
          }
          if(data.errors.city) {
            errors.push($('#user_city'));
            $('#user_city').parent().addClass('error');
          }
          if(data.errors.state) {
            errors.push($('#user_state'));
            $('#user_state').parent().addClass('error');
          }
          if(data.errors.zip) {
            errors.push($('#user_zip'));
            $('#user_zip').parent().addClass('error');
          }
          if(data.errors.password) {
            errors.push($('#user_password'));
            $('#user_password').parent().addClass('error');
          }
          if(data.errors.current_password) {
            errors.push($('#user_current_password'));
            $('#user_current_password').parent().addClass('error');
          }
          errors[0].focus();
        },
        success: function(data) {
          $('#content').html(data);
        }
      });
    }
    return false;
  });
  $('#sign_out_link').live('click', function() {
    var link = $(this);
    $(link).addClass('disabled');
    $.ajax({
      type: 'DELETE',
      url: '/users/sign_out.json',
      error: function(jqXHR) {
        $(link).removeClass('disabled');
      },
      success: function(data) {
        $.ajax({
          type: 'GET',
          url: '/sidebar/combo_form',
          data: {
            'flash': {
              'warning': "Signed out."
            }
          },
          success: function(data) {
            $('#content').html(data);
          }
        });
      }
    });
    return false;
  });
  $('#sign_in_form').live('submit', function() {
    var submitButton = $("#sign_in_form input[type='submit']");
    $(submitButton).attr("disabled", true);
    $.ajax({
      type: 'GET',
      url: '/users/sign_in',
      error: function(jqXHR) {
        $(submitButton).attr("disabled", false);
      },
      success: function(data) {
        activeInfoWindow.close();
        activeInfoWindow.setContent(data);
        activeInfoWindow.open(map, activeMarker);
      }
    });
    return false;
  });
  $('#back_link').live('click', function() {
    var link = $(this);
    $(link).addClass('disabled');
    $.ajax({
      type: 'GET',
      url: '/sidebar/search',
      error: function(jqXHR) {
        $(link).removeClass('disabled');
      },
      success: function(data) {
        $('#content').html(data);
      }
    });
    return false;
  });
  $('#reminder_form').live('submit', function() {
    var submitButton = $("#reminder_form input[type='submit']");
    $(submitButton).attr("disabled", true);
    $.ajax({
      type: 'POST',
      url: '/reminders.json',
      data: {
        'utf8': '✓',
        'authenticity_token': $('#reminder_form input[name="authenticity_token"]').val(),
        'reminder': {
          'to_user_id': $('#reminder_to_user_id').val(),
          'thing_id': activeThingId
        }
      },
      error: function(jqXHR) {
        $(submitButton).attr("disabled", false);
      },
      success: function(data) {
        $.ajax({
          type: 'GET',
          url: '/info_window',
          data: {
            'thing_id': activeThingId,
            'flash': {
              'notice': "Reminder sent!"
            }
          },
          success: function(data) {
            activeInfoWindow.close();
            activeInfoWindow.setContent(data);
            activeInfoWindow.open(map, activeMarker);
          }
        });
      }
    });
    return false;
  });
  $('.alert-message').alert();
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

