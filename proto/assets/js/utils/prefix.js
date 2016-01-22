var Prefix = {

    dom: null,
    pre: null,
    css: null,
    js: null,

    detect: function() {
      var styles = window.getComputedStyle(document.documentElement, '');
      this.pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
      this.dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + this.pre + ')', 'i'))[1];
      this.css = '-' + this.pre + '-';
      this.js = this.pre[0].toUpperCase() + this.pre.substr(1);
    }
  }

  Prefix.detect();