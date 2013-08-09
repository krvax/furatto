// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window) {
  var Modal;
  Modal = (function() {
    function Modal(el, options) {
      this.onDocumentClick = __bind(this.onDocumentClick, this);
      this.onDocumentKeyup = __bind(this.onDocumentKeyup, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.body = $('body');
      this.isShown = false;
    }

    Modal.prototype.toggle = function() {
      return this[(!this.isShown ? this.show() : this.hide())];
    };

    Modal.prototype.onDocumentKeyup = function(event) {
      if (event.keyCode === 27) {
        return this.hide();
      }
    };

    Modal.prototype.onDocumentClick = function(event) {
      if ($(event.target).is('.modal-overlay') || $(event.target).parent().is('[data-toggle="close"]')) {
        return this.hide();
      }
    };

    Modal.prototype.show = function() {
      var _this = this;
      this.isShown = true;
      setTimeout((function() {
        return _this.body.addClass('modal-active');
      }), 100);
      this.body.append("<div class='modal-popin'>" + (this.$el.html()) + "</div>");
      this.body.bind('keyup', this.onDocumentKeyup);
      return this.body.bind('click', this.onDocumentClick);
    };

    Modal.prototype.hide = function() {
      this.isShown = false;
      this.body.unbind('keyup', this.onDocumentKeyup);
      this.body.unbind('click', this.onDocumentClick);
      this.body.removeClass('modal-active');
      $('.modal-overlay').remove();
      return setTimeout((function() {
        return $('.modal-popin').remove();
      }), 500);
    };

    return Modal;

  })();
  $.fn.extend({
    modal: function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data('modal');
        if (!data) {
          $this.data('modal', (data = new Modal(this, option)));
        }
        if (typeof option === 'string') {
          data[option].apply(data, args);
        }
        $('body').addClass('modal-ready');
        return $('body').append('<div class="modal-overlay"></div>');
      });
    }
  });
  return $(document).on('click', '[data-furatto="modal"]', function(e) {
    var $target, $this;
    $this = $(this);
    $target = $($this.data('target'));
    $target.modal('toggle');
    return e.preventDefault();
  });
})(window.jQuery, window);