import riot from 'riot';

var domEvent = {
  /**
   * Trigger Event on DOM (root element of the tag)
   * @param { string } eventName - the name of the event. ex: 'change'
   */
  triggerDomEvent: function triggerDomEvent(eventName) {
    var _this = this;

    setTimeout(function () {
      var e;
      if (typeof Event == 'function') {
        // Standard browsers
        e = new Event(eventName);
      } else {
        // IE 9 ~ 11
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
      }
      /** dispatch an event */
      _this.root.dispatchEvent(e);
    }, 0);
    return this; // return this for method chain
  }
};

var syncEvent = {
  /** Init mixin on each tag */
  init: function init() {
    var _this = this;

    this._shouldSyncFromOpts = true;
    this.on('update', function () {
      if (_this._shouldSyncFromOpts) _this.trigger('sync');
      _this._shouldSyncFromOpts = true;
    });
  },

  /** Skip sync event once */
  skipSync: function skipSync() {
    this._shouldSyncFromOpts = false;
    return this; // return this for method chain
  }
};

/** Return all property names */
function getAllPropertyNames(obj) {
  var arr = [];
  for (var key in obj) {
    arr.push(key);
  }return arr;
}

/** Call original method and update automatically */
function hook(p, key) {
  var h = function h(e) {
    // update only when the argument is an Event object
    if (e && e instanceof Event) {
      // suppress updating on the inherit tag
      e.preventUpdate = true;
      // call original method
      p[key](e);
      // update automatically
      p.update();
    } else {
      p[key](e);
    }
  };
  h._inherited = true;
  return h;
}

var parentScope = {
  /**
   * Inject properties from parents
   */
  init: function init() {
    var _this = this;

    /** Store the keys originally belonging to the tag */
    this.one('update', function () {
      _this._ownPropKeys = getAllPropertyNames(_this);
      _this._ownOptsKeys = getAllPropertyNames(_this.opts);
    });
    /** Inherit the properties from parents on each update */
    this.on('update', function () {
      var ignoreProps = ['root', 'triggerDomEvent'];
      getAllPropertyNames(_this.parent)
      // TODO:
      //   Skipping 'triggerDomEvent' is a temporal workaround.
      //   In some cases function on the child would be overriden.
      //   This issue needs more study...
      .filter(function (key) {
        return !~_this._ownPropKeys.concat(ignoreProps).indexOf(key);
      }).forEach(function (key) {
        _this[key] = typeof _this.parent[key] != 'function' || _this.parent[key]._inherited ? _this.parent[key] : hook(_this.parent, key);
      });
      getAllPropertyNames(_this.parent.opts).filter(function (key) {
        return !~_this._ownOptsKeys.indexOf(key) && key != 'riotTag';
      }).forEach(function (key) {
        _this.opts[key] = typeof _this.parent.opts[key] != 'function' || _this.parent.opts[key]._inherited ? _this.parent.opts[key] : hook(_this.parent, key);
      });
    });
  }
};

riot.tag2('time-picker-popup', '<ul if="{active}" riot-style="top: {top}px; left: {left}px"> <li each="{hours}"> {hh % 2 ? \'&middot;\' : hh + \':00\'} </li> </ul> <ol if="{active}" riot-style="top: {top2}px; left: {left2}px; display: {subMenuIsOpen ? \'block\' : \'none\'}" class="{roundLeft: roundLeft}"> <li onmouseover="{mouseover(\'00\')}" onclick="{done}">{hh}:{mm}</li> <li onmouseover="{mouseover(\'05\')}" onclick="{done}">&middot;</li> <li onmouseover="{mouseover(\'10\')}" onclick="{done}">10</li> <li onmouseover="{mouseover(\'15\')}" onclick="{done}">&middot;</li> <li onmouseover="{mouseover(\'20\')}" onclick="{done}">20</li> <li onmouseover="{mouseover(\'25\')}" onclick="{done}">&middot;</li> <li onmouseover="{mouseover(\'30\')}" onclick="{done}">30</li> <li onmouseover="{mouseover(\'35\')}" onclick="{done}">&middot;</li> <li onmouseover="{mouseover(\'40\')}" onclick="{done}">40</li> <li onmouseover="{mouseover(\'45\')}" onclick="{done}">&middot;</li> <li onmouseover="{mouseover(\'50\')}" onclick="{done}">50</li> <li onmouseover="{mouseover(\'55\')}" onclick="{done}">&middot;</li> </ol>', 'time-picker-popup ul,[riot-tag="time-picker-popup"] ul,[data-is="time-picker-popup"] ul{ position: absolute; z-index: 1000; float: left; padding: 10px 0; margin: 0; font-size: 14px; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box; border: 1px solid #ccc; border: 1px solid rgba(0, 0, 0, .15); border-radius: 4px; box-shadow: 0 6px 12px rgba(0, 0, 0, .175); } time-picker-popup ul > li,[riot-tag="time-picker-popup"] ul > li,[data-is="time-picker-popup"] ul > li{ padding: 0 15px; line-height: 16px; color: #666; position: relative; text-align: center; } time-picker-popup ol,[riot-tag="time-picker-popup"] ol,[data-is="time-picker-popup"] ol{ position: absolute; white-space: nowrap; z-index: 1001; list-style: none; padding: 3px 13px; margin: 0; color: white; text-decoration: none; background-color: #3879d9; cursor: pointer; border-top-right-radius: 4px; border-bottom-right-radius: 4px; box-shadow: 0 3px 6px rgba(0, 0, 0, .175); transition: left .2s; } time-picker-popup ol.roundLeft,[riot-tag="time-picker-popup"] ol.roundLeft,[data-is="time-picker-popup"] ol.roundLeft{ border-top-left-radius: 4px; border-bottom-left-radius: 4px; } time-picker-popup ol > li,[riot-tag="time-picker-popup"] ol > li,[data-is="time-picker-popup"] ol > li{ display: inline-block; margin: 0; padding: 0 2px; min-width: 13px; text-align: center; line-height: 24px; border-radius: 4px; } time-picker-popup ol > li + li,[riot-tag="time-picker-popup"] ol > li + li,[data-is="time-picker-popup"] ol > li + li{ margin-left: -4px; color: rgba(255,255,255,.65) } time-picker-popup ol > li:hover,[riot-tag="time-picker-popup"] ol > li:hover,[data-is="time-picker-popup"] ol > li:hover{ background-color: #528ce1; color: white; }', '', function (opts) {
  var _this = this;

  var ITEM_HEIGHT = 16;
  var popupWidth, popupHeight;
  var minutesPositions = [];

  this.hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'].map(function (hh) {
    return { hh: hh, mm: '00' };
  });
  this.value = opts.value || '00:00';
  this.hh = this.value.split(':')[0];
  this.mm = this.value.split(':')[1];
  this.top = 0;
  this.left = 0;
  this.top2 = 0;
  this.left2 = 0;
  this.roundLeft = false;
  this.active = false;
  this.subMenuIsOpen = false;
  this.deviceType = 'pc';

  this.activate = function (top, left, deviceType) {
    switch (_this.deviceType = deviceType) {
      case 'pc':
        _this.activateForPC(top, left);break;
      case 'tablet':
        _this.activateForTablet(top, left);break;
    }
  };

  this.activateForPC = function (top, left) {
    _this.update({
      active: true,
      subMenuIsOpen: true,
      top: top,
      left: left,
      top2: top + _this.hh * ITEM_HEIGHT + 4,
      left2: left,
      roundLeft: false
    });
    var ul = _this.root.querySelector('ul');
    popupWidth = ul.clientWidth;
    popupHeight = ul.clientHeight;
    var w = _this.root.querySelector('ol').clientWidth;
    if (_this.left2 + w > document.body.clientWidth) _this.update({
      left2: document.body.clientWidth - w - 5,
      roundLeft: true
    });
    document.addEventListener('mousemove', _this.move);
    document.addEventListener('click', _this.deactivate, true);
  };

  this.activateForTablet = function (top, left) {
    _this.update({
      active: true,
      subMenuIsOpen: false,
      top: top,
      left: left,
      top2: top + _this.hh * ITEM_HEIGHT + 4,
      left2: left,
      roundLeft: false
    });
    var ul = _this.root.querySelector('ul');
    popupWidth = ul.clientWidth;
    popupHeight = ul.clientHeight;
    document.addEventListener('touchstart', _this.touchstart, true);
  };

  this.deactivate = function (e) {
    _this.update({
      active: false
    });
    document.removeEventListener('mousemove', _this.move);
    document.removeEventListener('click', _this.deactivate, true);
    document.removeEventListener('touchstart', _this.touchstart, true);
    document.removeEventListener('touchmove', _this.move, false);
    document.removeEventListener('touchend', _this.done, false);
  };

  this.touchstart = function (e) {
    var x = document.body.scrollLeft + e.touches[0].clientX,
        y = document.body.scrollTop + e.touches[0].clientY,
        hh = Math.floor((y - _this.top - 8) / ITEM_HEIGHT);

    if (x - _this.left < 0 || popupWidth < x - _this.left || y - _this.top < 0 || popupHeight < y - _this.top) {
      _this.deactivate(e);
      return;
    }

    _this.update({
      top2: _this.top + hh * ITEM_HEIGHT + 4,
      hh: hh < 10 ? '0' + hh : hh + '',
      subMenuIsOpen: true
    });

    var w = _this.root.querySelector('ol').clientWidth;
    if (_this.left2 + w > document.body.clientWidth) _this.update({
      left2: document.body.clientWidth - w - 5,
      roundLeft: true
    });

    var lis = _this.root.querySelectorAll('ol>li');
    minutesPositions = [].map.call(lis, function (c) {
      var rect = c.getBoundingClientRect();
      return rect.left + document.body.scrollLeft;
    });

    document.addEventListener('touchmove', _this.move, false);
    document.addEventListener('touchend', _this.done, false);
  };

  this.move = function (e) {

    e.preventDefault();

    var x = document.body.scrollLeft;
    var y = document.body.scrollTop;
    if (_this.deviceType == 'pc') {
      x += e.clientX;
      y += e.clientY;
      if (x - _this.left < 0 || popupWidth < x - _this.left) return;
    } else {
      x += e.touches[0].clientX;
      y += e.touches[0].clientY;
    }

    var hh = Math.floor((y - _this.top - 8) / ITEM_HEIGHT);
    hh = hh < 0 ? 0 : hh > 23 ? 23 : hh;

    var mm = minutesPositions.filter(function (c) {
      return c < x;
    }).length || 1;
    mm = (mm - 1) * 5;

    if (_this.hh - hh || _this.mm - mm) {
      _this.hh = hh < 10 ? '0' + hh : hh + '';
      _this.mm = mm < 10 ? '0' + mm : mm + '';
      _this.top2 = _this.top + hh * ITEM_HEIGHT + 4;
      _this.update();
    }
  };

  this.mouseover = function (mm) {
    return function (e) {
      _this.mm = mm;
    };
  };

  this.done = function (e) {
    _this.trigger('change', _this.hh + ':' + _this.mm);
    _this.deactivate(e);
  };
});

riot.tag2('time-picker', '<button onclick="{click}" ontouchstart="{click}">{value} <span class="caret"></span></button> <input if="{opts.name}" name="{opts.name}" type="hidden" value="{value}">', 'time-picker,[riot-tag="time-picker"],[data-is="time-picker"]{ display: inline-block; background-color: white; } time-picker .caret::after,[riot-tag="time-picker"] .caret::after,[data-is="time-picker"] .caret::after{ content: "\\25BE"; } time-picker button,[riot-tag="time-picker"] button,[data-is="time-picker"] button{ display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.4; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none; border: 1px solid transparent; border-radius: 4px; } time-picker button:focus,[riot-tag="time-picker"] button:focus,[data-is="time-picker"] button:focus{ outline: thin dotted; outline: 5px auto -webkit-focus-ring-color; outline-offset: -2px; } time-picker button:hover,[riot-tag="time-picker"] button:hover,[data-is="time-picker"] button:hover,time-picker button:focus,[riot-tag="time-picker"] button:focus,[data-is="time-picker"] button:focus{ color: #333; text-decoration: none; } time-picker button:active,[riot-tag="time-picker"] button:active,[data-is="time-picker"] button:active,time-picker button[data-active="yes"],[riot-tag="time-picker"] button[data-active="yes"],[data-is="time-picker"] button[data-active="yes"]{ background-image: none; outline: 0; box-shadow: inset 0 3px 2px rgba(0, 0, 0, .1); } time-picker button[disabled],[riot-tag="time-picker"] button[disabled],[data-is="time-picker"] button[disabled]{ pointer-events: none; cursor: not-allowed; box-shadow: none; opacity: .65; } time-picker button,[riot-tag="time-picker"] button,[data-is="time-picker"] button{ color: #333; background-color: #fff; border-color: #ccc } time-picker button:hover,[riot-tag="time-picker"] button:hover,[data-is="time-picker"] button:hover,time-picker button:focus,[riot-tag="time-picker"] button:focus,[data-is="time-picker"] button:focus,time-picker button:active,[riot-tag="time-picker"] button:active,[data-is="time-picker"] button:active,time-picker button[data-active="yes"],[riot-tag="time-picker"] button[data-active="yes"],[data-is="time-picker"] button[data-active="yes"]{ color: #333; background-color: #e6e6e6; border-color: #adadad }', '', function (opts) {
  var _this = this;

  this.mixin(domEvent).mixin(syncEvent);

  var popupDom = document.createElement('div'),
      popup = riot.mount(popupDom, 'time-picker-popup', opts)[0];

  this.click = function (e) {
    var deviceType = e.type == 'touchstart' ? 'tablet' : 'pc',
        rect = _this.root.getBoundingClientRect(),
        y = rect.top + document.body.scrollTop,
        x = rect.left + document.body.scrollLeft,
        top = y - 4 - _this.value.split(':')[0] * 16,
        left = x - 3;
    popup.activate(top < 5 ? 5 : top, left, deviceType);
  };

  this.on('mount', function () {
    _this.root.value = _this.value;
    document.body.appendChild(popupDom);
  });

  this.on('unmount', function () {
    document.body.removeChild(popupDom);
  });

  this.on('sync', function () {
    _this.value = opts.value || '00:00';
  });

  popup.on('change', function (newValue) {

    _this.root.value = _this.value = newValue;
    _this.skipSync();
    _this.update();

    _this.triggerDomEvent('change');
  });
});

riot.tag2('btn-group', '<yield></yield>', 'btn-group,[riot-tag="btn-group"],[data-is="btn-group"]{ position: relative; display: inline-block; vertical-align: middle; } btn-group btn,[riot-tag="btn-group"] btn,[data-is="btn-group"] btn{ position: relative; float: left; } btn-group btn + btn,[riot-tag="btn-group"] btn + btn,[data-is="btn-group"] btn + btn{ margin-left: -1px; } btn-group btn[toggle]:not(:first-child) > *,[riot-tag="btn-group"] btn[toggle]:not(:first-child) > *,[data-is="btn-group"] btn[toggle]:not(:first-child) > *{ padding-right: 8px; padding-left: 8px; } btn-group > btn:hover,[riot-tag="btn-group"] > btn:hover,[data-is="btn-group"] > btn:hover,btn-group > btn:focus,[riot-tag="btn-group"] > btn:focus,[data-is="btn-group"] > btn:focus,btn-group > btn:active,[riot-tag="btn-group"] > btn:active,[data-is="btn-group"] > btn:active{ z-index: 2; } btn-group > btn:not(:first-child):not(:last-child):not([toggle]) > *,[riot-tag="btn-group"] > btn:not(:first-child):not(:last-child):not([toggle]) > *,[data-is="btn-group"] > btn:not(:first-child):not(:last-child):not([toggle]) > *{ border-radius: 0; } btn-group > btn:first-child,[riot-tag="btn-group"] > btn:first-child,[data-is="btn-group"] > btn:first-child{ margin-left: 0; } btn-group > btn:first-child:not(:last-child):not([toggle]) > *,[riot-tag="btn-group"] > btn:first-child:not(:last-child):not([toggle]) > *,[data-is="btn-group"] > btn:first-child:not(:last-child):not([toggle]) > *{ border-top-right-radius: 0; border-bottom-right-radius: 0; } btn-group > btn:last-child:not(:first-child) > *,[riot-tag="btn-group"] > btn:last-child:not(:first-child) > *,[data-is="btn-group"] > btn:last-child:not(:first-child) > *,btn-group > btn:not(:first-child)[toggle] > *,[riot-tag="btn-group"] > btn:not(:first-child)[toggle] > *,[data-is="btn-group"] > btn:not(:first-child)[toggle] > *{ border-top-left-radius: 0; border-bottom-left-radius: 0; }', '', function (opts) {
    this.mixin(parentScope);
});

riot.tag2('btn', '<button type="button" __disabled="{disabled}" data-option="{opts.option}" data-size="{opts.size}" data-active="{active ? \'yes\' : \'no\'}" onclick="{click}"><yield></yield></button>', 'btn button,[riot-tag="btn"] button,[data-is="btn"] button{ display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none; border: 1px solid transparent; border-radius: 4px; } btn button:focus,[riot-tag="btn"] button:focus,[data-is="btn"] button:focus{ outline: thin dotted; outline: 5px auto -webkit-focus-ring-color; outline-offset: -2px; } btn button:hover,[riot-tag="btn"] button:hover,[data-is="btn"] button:hover,btn button:focus,[riot-tag="btn"] button:focus,[data-is="btn"] button:focus{ color: #333; text-decoration: none; } btn button:active,[riot-tag="btn"] button:active,[data-is="btn"] button:active,btn button[data-active="yes"],[riot-tag="btn"] button[data-active="yes"],[data-is="btn"] button[data-active="yes"]{ background-image: none; outline: 0; box-shadow: inset 0 3px 2px rgba(0, 0, 0, .1); } btn button[disabled],[riot-tag="btn"] button[disabled],[data-is="btn"] button[disabled]{ pointer-events: none; cursor: not-allowed; box-shadow: none; opacity: .65; } btn button,[riot-tag="btn"] button,[data-is="btn"] button{ color: #333; background-color: #fff; border-color: #ccc } btn button:hover,[riot-tag="btn"] button:hover,[data-is="btn"] button:hover,btn button:focus,[riot-tag="btn"] button:focus,[data-is="btn"] button:focus,btn button:active,[riot-tag="btn"] button:active,[data-is="btn"] button:active,btn button[data-active="yes"],[riot-tag="btn"] button[data-active="yes"],[data-is="btn"] button[data-active="yes"]{ color: #333; background-color: #e6e6e6; border-color: #adadad } btn button[data-option="primary"],[riot-tag="btn"] button[data-option="primary"],[data-is="btn"] button[data-option="primary"]{ color: #fff; background-color: #337ab7; border-color: #2e6da4 } btn button[data-option="primary"]:hover,[riot-tag="btn"] button[data-option="primary"]:hover,[data-is="btn"] button[data-option="primary"]:hover,btn button[data-option="primary"]:focus,[riot-tag="btn"] button[data-option="primary"]:focus,[data-is="btn"] button[data-option="primary"]:focus,btn button[data-option="primary"]:active,[riot-tag="btn"] button[data-option="primary"]:active,[data-is="btn"] button[data-option="primary"]:active{ color: #fff; background-color: #286090; border-color: #204d74 } btn button[data-option="success"],[riot-tag="btn"] button[data-option="success"],[data-is="btn"] button[data-option="success"]{ color: #fff; background-color: #5cb85c; border-color: #4cae4c } btn button[data-option="success"]:hover,[riot-tag="btn"] button[data-option="success"]:hover,[data-is="btn"] button[data-option="success"]:hover,btn button[data-option="success"]:focus,[riot-tag="btn"] button[data-option="success"]:focus,[data-is="btn"] button[data-option="success"]:focus,btn button[data-option="success"]:active,[riot-tag="btn"] button[data-option="success"]:active,[data-is="btn"] button[data-option="success"]:active{ color: #fff; background-color: #449d44; border-color: #398439 } btn button[data-option="info"],[riot-tag="btn"] button[data-option="info"],[data-is="btn"] button[data-option="info"]{ color: #fff; background-color: #5bc0de; border-color: #46b8da } btn button[data-option="info"]:hover,[riot-tag="btn"] button[data-option="info"]:hover,[data-is="btn"] button[data-option="info"]:hover,btn button[data-option="info"]:focus,[riot-tag="btn"] button[data-option="info"]:focus,[data-is="btn"] button[data-option="info"]:focus,btn button[data-option="info"]:active,[riot-tag="btn"] button[data-option="info"]:active,[data-is="btn"] button[data-option="info"]:active{ color: #fff; background-color: #31b0d5; border-color: #269abc } btn button[data-option="warning"],[riot-tag="btn"] button[data-option="warning"],[data-is="btn"] button[data-option="warning"]{ color: #fff; background-color: #f0ad4e; border-color: #f0ad4e } btn button[data-option="warning"]:hover,[riot-tag="btn"] button[data-option="warning"]:hover,[data-is="btn"] button[data-option="warning"]:hover,btn button[data-option="warning"]:focus,[riot-tag="btn"] button[data-option="warning"]:focus,[data-is="btn"] button[data-option="warning"]:focus,btn button[data-option="warning"]:active,[riot-tag="btn"] button[data-option="warning"]:active,[data-is="btn"] button[data-option="warning"]:active{ color: #fff; background-color: #ec971f; border-color: #d58512 } btn button[data-option="danger"],[riot-tag="btn"] button[data-option="danger"],[data-is="btn"] button[data-option="danger"]{ color: #fff; background-color: #d9534f; border-color: #d43f3a } btn button[data-option="danger"]:hover,[riot-tag="btn"] button[data-option="danger"]:hover,[data-is="btn"] button[data-option="danger"]:hover,btn button[data-option="danger"]:focus,[riot-tag="btn"] button[data-option="danger"]:focus,[data-is="btn"] button[data-option="danger"]:focus,btn button[data-option="danger"]:active,[riot-tag="btn"] button[data-option="danger"]:active,[data-is="btn"] button[data-option="danger"]:active{ color: #fff; background-color: #c9302c; border-color: #ac2925 } btn button[data-option="link"],[riot-tag="btn"] button[data-option="link"],[data-is="btn"] button[data-option="link"]{ font-weight: normal; color: #337ab7; border-radius: 0; background-color: transparent; border-color: transparent; box-shadow: none; } btn button[data-option="link"]:hover,[riot-tag="btn"] button[data-option="link"]:hover,[data-is="btn"] button[data-option="link"]:hover,btn button[data-option="link"]:focus,[riot-tag="btn"] button[data-option="link"]:focus,[data-is="btn"] button[data-option="link"]:focus{ color: #23527c; text-decoration: underline; } btn button[data-size="lg"],[riot-tag="btn"] button[data-size="lg"],[data-is="btn"] button[data-size="lg"]{ padding: 10px 16px; font-size: 18px; line-height: 1.3333333; border-radius: 6px; } btn button[data-size="sm"],[riot-tag="btn"] button[data-size="sm"],[data-is="btn"] button[data-size="sm"]{ padding: 5px 10px; font-size: 12px; line-height: 1.5; border-radius: 3px; } btn button[data-size="xs"],[riot-tag="btn"] button[data-size="xs"],[data-is="btn"] button[data-size="xs"]{ padding: 1px 5px; font-size: 12px; line-height: 1.5; border-radius: 3px; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent);
  this.disabled = undefined;
  var binded = opts.toggle || '';

  this.click = function (e) {
    e.stopPropagation();
    if (_this.disabled) return;
    if (_this.parent && binded) _this.parent.trigger('inner-btn-toggle');
    if (opts.href) {
      e.preventUpdate = true;
      location.href = opts.href;
      return;
    }
    _this.triggerDomEvent('click');
  };

  this.on('update', function (e) {
    _this.disabled = opts.hasOwnProperty('__disabled') ? opts.__disabled === true : opts.hasOwnProperty('disabled') ? opts.disabled === '' || opts.disabled === 'disabled' : false;
    _this.active = opts.hasOwnProperty('active') ? opts.active === '' || opts.active === 'active' || opts.active === true : false;
  });
});

var en = { "monthFormat": "%M %Y", "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "weekdays": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] };
var fr = { "monthFormat": "%M %Y", "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], "weekdays": ["L", "Ma", "Me", "J", "V", "S", "D"] };
var ja = { "monthFormat": "%Y年%M月", "months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], "weekdays": ["日", "月", "火", "水", "木", "金", "土"] };
var zh = { "monthFormat": "%Y年%M月", "months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], "weekdays": ["一", "二", "三", "四", "五", "六", "日"] };
var i18n = {
	en: en,
	fr: fr,
	ja: ja,
	zh: zh
};

riot.tag2('calendar', '<table> <thead> <tr> <th><btn onclick="{prev}">&laquo;</btn></th> <th colspan="5">{title}</th> <th><btn onclick="{next}">&raquo;</btn></th> </tr> </thead> <tbody> <tr><th each="{day in weekdays}">{day}</th></tr> <tr each="{week in calendar}"> <td each="{week}"><btn active="{selected}" __disabled="{!currentMonth}" onclick="{dayclick}">{daynum}</btn></td> </tr> </tbody> </table>', 'calendar,[riot-tag="calendar"],[data-is="calendar"]{ display: inline-block; vertical-align: top; padding: 3px; text-align: center; } calendar thead th,[riot-tag="calendar"] thead th,[data-is="calendar"] thead th{ font-size: 90%; } calendar tbody th,[riot-tag="calendar"] tbody th,[data-is="calendar"] tbody th{ padding: 6px 0; font-size: 90%; } calendar td,[riot-tag="calendar"] td,[data-is="calendar"] td{ text-align: center; padding: 1px; } calendar btn,[riot-tag="calendar"] btn,[data-is="calendar"] btn{ width: 100%; display: block; } calendar btn button,[riot-tag="calendar"] btn button,[data-is="calendar"] btn button{ color: #333; display: block; width: 100%; border: none; padding: 4px 5px; } calendar btn button:hover,[riot-tag="calendar"] btn button:hover,[data-is="calendar"] btn button:hover,calendar btn button:focus,[riot-tag="calendar"] btn button:focus,[data-is="calendar"] btn button:focus{ color: #000; text-decoration: none; background: #f7f7f7; } calendar btn button:disabled,[riot-tag="calendar"] btn button:disabled,[data-is="calendar"] btn button:disabled{ color: #bbb; } calendar btn button[data-active="yes"],[riot-tag="calendar"] btn button[data-active="yes"],[data-is="calendar"] btn button[data-active="yes"]{ box-shadow: none; background-color: #337ab7; color: white; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent).mixin(syncEvent);

  var selected = typeof opts.value == 'string' ? opts.value.split(',') : opts.value || [];
  var firstDate = selected[0] ? new Date(selected[0]) : new Date(),
      getDayOf1st = function getDayOf1st(y, m) {
    return new Date(y, m, 1).getDay();
  },
      getNumOfDays = function getNumOfDays(y, m) {
    return new Date(y, m + 1, 0).getDate();
  },
      getDateString = function getDateString(y, m, d) {
    return y + '-' + (m < 9 ? '0' + (m + 1) : m + 1) + '-' + (d < 10 ? '0' + d : d);
  },
      isSelected = function isSelected(d) {
    return selected.some(function (day) {
      return d == day;
    });
  };

  this.calendar = [];
  this.lang = i18n[opts.lang] ? opts.lang : i18n[document.documentElement.lang] ? document.documentElement.lang : 'en';
  this.weekdays = i18n[this.lang].weekdays;
  this.currentYear = firstDate.getFullYear();
  this.currentMonth = firstDate.getMonth();
  this.title = '';
  this.multi = false;
  this.value = this.multi ? selected : selected[0];

  this.prev = function (e) {
    if (0 <= --_this.currentMonth) return;
    _this.currentMonth = 11;
    _this.currentYear--;
  };

  this.next = function (e) {
    if (++_this.currentMonth < 12) return;
    _this.currentMonth = 0;
    _this.currentYear++;
  };

  this.dayclick = function (e) {
    var d = getDateString(_this.currentYear, _this.currentMonth, e.item.daynum);
    if (!_this.multi) selected = [d];else if (isSelected(d)) selected = selected.filter(function (day) {
      return d != day;
    });else selected.push(d);
    _this.root.value = _this.value = _this.multi ? selected : selected[0];
    _this.update();
    _this.triggerDomEvent('change');
  };

  this.on('update', function () {
    _this.multi = opts.hasOwnProperty('multi') ? opts.multi === '' || opts.multi === 'multi' || opts.multi === true : false;
    _this.title = i18n[_this.lang].monthFormat.replace('%M', i18n[_this.lang].months[_this.currentMonth]).replace('%Y', _this.currentYear);

    var y = _this.currentYear,
        m = _this.currentMonth,
        d0 = getDayOf1st(y, m),
        dn = getNumOfDays(y, m),
        numberOfRows = Math.ceil((d0 + dn) / 7);

    var cal = [];
    for (var i = 0, w; i < numberOfRows; i++) {
      w = [];
      for (var j = 0, d, s; j < 7; j++) {
        d = new Date(y, m, 7 * i + j + 1 - d0);
        s = getDateString(d.getFullYear(), d.getMonth(), d.getDate());
        w.push({
          daynum: d.getDate(),
          selected: isSelected(s),
          currentMonth: d.getMonth() == m
        });
      }
      cal.push(w);
    }
    _this.calendar = cal;
  });
});

riot.tag2('caret', '', 'caret,[riot-tag="caret"],[data-is="caret"]{ display: inline-block; width: 0; height: 0; margin-left: 2px; vertical-align: middle; border-top: 4px dashed; border-right: 4px solid transparent; border-left: 4px solid transparent; }', '', function (opts) {});

riot.tag2('inp', '<input type="text" placeholder="{opts.placeholder}" __disabled="{disabled}" data-option="{opts.option}" data-size="{opts.size}" value="{value}" onkeyup="{keyup}"></input>', 'inp input,[riot-tag="inp"] input,[data-is="inp"] input{ display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: left; white-space: nowrap; background-image: none; border: 1px solid #ccc; border-radius: 4px; } inp input[disabled],[riot-tag="inp"] input[disabled],[data-is="inp"] input[disabled]{ background-color: #eee; } inp input[data-size="lg"],[riot-tag="inp"] input[data-size="lg"],[data-is="inp"] input[data-size="lg"]{ padding: 10px 16px; font-size: 18px; line-height: 1.3333333; border-radius: 6px; } inp input[data-size="sm"],[riot-tag="inp"] input[data-size="sm"],[data-is="inp"] input[data-size="sm"]{ padding: 5px 10px; font-size: 12px; line-height: 1.5; border-radius: 3px; } inp input[data-size="xs"],[riot-tag="inp"] input[data-size="xs"],[data-is="inp"] input[data-size="xs"]{ padding: 1px 5px; font-size: 12px; line-height: 1.5; border-radius: 3px; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent);
  this.disabled = undefined;

  this.on('update', function (e) {
    _this.disabled = opts.hasOwnProperty('__disabled') ? opts.__disabled === true : opts.hasOwnProperty('disabled') ? opts.disabled === '' || opts.disabled === 'disabled' : false;
    _this.value = opts.value ? opts.value : '';
  });

  this.keyup = function (e) {
    e.stopPropagation();
    if (_this.disabled) return;
    _this.root.value = _this.value = e.target.value;
    _this.triggerDomEvent('keyup');
  };
});

riot.tag2('inp-group', '<yield></yield>', 'inp-group,[riot-tag="inp-group"],[data-is="inp-group"]{ position: relative; display: inline-block; vertical-align: middle; border-collapse: separate; font-size: 0; } inp-group inp input,[riot-tag="inp-group"] inp input,[data-is="inp-group"] inp input,inp-group inp input[data-size="lg"],[riot-tag="inp-group"] inp input[data-size="lg"],[data-is="inp-group"] inp input[data-size="lg"],inp-group inp input[data-size="sm"],[riot-tag="inp-group"] inp input[data-size="sm"],[data-is="inp-group"] inp input[data-size="sm"],inp-group inp input[data-size="xs"],[riot-tag="inp-group"] inp input[data-size="xs"],[data-is="inp-group"] inp input[data-size="xs"]{ border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 0; } inp-group inp:first-child input,[riot-tag="inp-group"] inp:first-child input,[data-is="inp-group"] inp:first-child input{ border-top-left-radius: 4px; border-bottom-left-radius: 4px; } inp-group inp:last-child input,[riot-tag="inp-group"] inp:last-child input,[data-is="inp-group"] inp:last-child input{ border-top-right-radius: 4px; border-bottom-right-radius: 4px; } inp-group inp:first-child input[data-size="lg"],[riot-tag="inp-group"] inp:first-child input[data-size="lg"],[data-is="inp-group"] inp:first-child input[data-size="lg"]{ border-top-left-radius: 6px; border-bottom-left-radius: 6px; } inp-group inp:last-child input[data-size="lg"],[riot-tag="inp-group"] inp:last-child input[data-size="lg"],[data-is="inp-group"] inp:last-child input[data-size="lg"]{ border-top-right-radius: 6px; border-bottom-right-radius: 6px; } inp-group inp:first-child input[data-size="sm"],[riot-tag="inp-group"] inp:first-child input[data-size="sm"],[data-is="inp-group"] inp:first-child input[data-size="sm"]{ border-top-left-radius: 3px; border-bottom-left-radius: 3px; } inp-group inp:last-child input[data-size="sm"],[riot-tag="inp-group"] inp:last-child input[data-size="sm"],[data-is="inp-group"] inp:last-child input[data-size="sm"]{ border-top-right-radius: 3px; border-bottom-right-radius: 3px; } inp-group inp:first-child input[data-size="xs"],[riot-tag="inp-group"] inp:first-child input[data-size="xs"],[data-is="inp-group"] inp:first-child input[data-size="xs"]{ border-top-left-radius: 3px; border-bottom-left-radius: 3px; } inp-group inp:last-child input[data-size="xs"],[riot-tag="inp-group"] inp:last-child input[data-size="xs"],[data-is="inp-group"] inp:last-child input[data-size="xs"]{ border-top-right-radius: 3px; border-bottom-right-radius: 3px; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope);

  this.on('update', function (e) {
    var nodes = _this.root.querySelectorAll('inp, inp-group-addon');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('size', _this.opts.size);
    }
  });
});

riot.tag2('inp-group-addon', '<yield></yield>', 'inp-group-addon,[riot-tag="inp-group-addon"],[data-is="inp-group-addon"]{ position: relative; display: inline-block; padding: 6px 12px; margin: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; color: #555; text-align: center; background-color: #eee; border: 1px solid #ccc; } inp-group-addon[size="lg"],[riot-tag="inp-group-addon"][size="lg"],[data-is="inp-group-addon"][size="lg"]{ padding: 10px 16px; font-size: 18px; line-height: 1.3333333; } inp-group-addon[size="sm"],[riot-tag="inp-group-addon"][size="sm"],[data-is="inp-group-addon"][size="sm"]{ padding: 5px 10px; font-size: 12px; line-height: 1.5; } inp-group-addon[size="xs"],[riot-tag="inp-group-addon"][size="xs"],[data-is="inp-group-addon"][size="xs"]{ padding: 1px 5px; font-size: 12px; line-height: 1.5; } inp-group-addon:first-child,[riot-tag="inp-group-addon"]:first-child,[data-is="inp-group-addon"]:first-child{ border-top-left-radius: 4px; border-bottom-left-radius: 4px; } inp-group-addon:last-child,[riot-tag="inp-group-addon"]:last-child,[data-is="inp-group-addon"]:last-child{ border-top-right-radius: 4px; border-bottom-right-radius: 4px; } inp-group-addon:first-child btn button,[riot-tag="inp-group-addon"]:first-child btn button,[data-is="inp-group-addon"]:first-child btn button{ border-top-right-radius: 0; border-bottom-right-radius: 0; } inp-group-addon:last-child btn button,[riot-tag="inp-group-addon"]:last-child btn button,[data-is="inp-group-addon"]:last-child btn button{ border-top-left-radius: 0; border-bottom-left-radius: 0; } inp-group-addon[size="lg"] btn button,[riot-tag="inp-group-addon"][size="lg"] btn button,[data-is="inp-group-addon"][size="lg"] btn button{ padding: 10px 16px; margin: -11px -17px; vertical-align: inherit; } inp-group-addon btn button,[riot-tag="inp-group-addon"] btn button,[data-is="inp-group-addon"] btn button{ padding: 6px 12px; margin: -7px -13px; vertical-align: inherit; } inp-group-addon[size="sm"] btn button,[riot-tag="inp-group-addon"][size="sm"] btn button,[data-is="inp-group-addon"][size="sm"] btn button{ padding: 5px 10px; margin: -6px -11px; vertical-align: inherit; } inp-group-addon[size="xs"] btn button,[riot-tag="inp-group-addon"][size="xs"] btn button,[data-is="inp-group-addon"][size="xs"] btn button{ padding: 1px 5px; margin: -2px -6px; vertical-align: inherit; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope);

  this.on('update', function (e) {
    var nodes = _this.root.querySelectorAll('btn');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('size', _this.opts.size);
    }
  });
});

riot.tag2('input-img', '<img riot-src="{value || opts.placeholder}" width="{opts.width || 100}" height="{opts.height || 100}"> <input if="{opts.name}" name="{opts.name}" type="hidden" value="{value}">', 'input-img { position: relative; display: inline-block; vertical-align: middle; padding: 4px; line-height: 1em; border: 1px solid #ccc; border-radius: 5px; overflow: hidden; } input-img.highlight { box-shadow: 0 0 5px #419bf9; } input-img > img { display: block; border-radius: 3px; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent).mixin(syncEvent);

  var readerOnLoad = function readerOnLoad(e) {
    _this.root.value = _this.value = e.target.result;
    _this.triggerDomEvent('change');
    _this.skipSync();
    _this.update();
  },
      highlight = function highlight(e) {
    e.stopPropagation();
    e.preventDefault();
    _this.root.setAttribute('class', 'highlight');
  },
      dehightlight = function dehightlight(e) {
    _this.root.removeAttribute('class');
  },
      processFiles = function processFiles(e) {
    e.stopPropagation();
    e.preventDefault();
    dehightlight();
    var file = e.dataTransfer.files[0],
        reader = new FileReader();
    if (!file.type.match('image.*')) return;
    reader.onload = readerOnLoad;
    reader.readAsDataURL(file);
  };

  this.on('sync', function () {
    _this.value = opts.value || '';
  });
  if (isDroppable()) {
    this.on('mount', function () {
      _this.root.addEventListener('drop', processFiles, false);
      _this.root.addEventListener('dragover', highlight, false);
      _this.root.addEventListener('dragenter', highlight, false);
      _this.root.addEventListener('dragleave', dehightlight, false);
    });
  }

  function isDroppable() {
    return window.File && window.FileReader && window.FileList && window.Blob;
  }
});

riot.tag2('menu-divider', '', 'menu-divider,[riot-tag="menu-divider"],[data-is="menu-divider"]{ display: block; height: 1px; margin: 9px 0; overflow: hidden; background-color: #e5e5e5; }', '', function (opts) {});

riot.tag2('menu-header', '<yield></yield>', 'menu-header,[riot-tag="menu-header"],[data-is="menu-header"]{ display: block; padding: 3px 20px; font-size: 12px; line-height: 1.42857143; color: #777; white-space: nowrap; }', '', function (opts) {
    this.mixin(parentScope);
});

riot.tag2('menu-item', '<yield></yield>', 'menu-item { display: block; padding: 3px 20px; clear: both; font-weight: normal; line-height: 1.42857143; color: #333; white-space: nowrap; cursor: pointer; } menu-item:hover, menu-item:focus { color: #262626; text-decoration: none; background-color: #f5f5f5; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent).mixin(syncEvent);

  var click = function click(e) {
    _this.root.value = opts.value || _this.root.innerText;
    _this.triggerDomEvent('menuItemClicked');
  };

  this.one('mount', function () {
    _this.root.addEventListener('touchstart', click, false);
    _this.root.addEventListener('click', click, false);
  }).one('unmount', function () {
    _this.root.removeEventListener('touchstart', click);
    _this.root.removeEventListener('click', click);
  });
});

riot.tag2('menu', '<yield></yield>', 'menu,[riot-tag="menu"],[data-is="menu"]{ position: absolute; top: 100%; left: 0; z-index: 1000; display: none; float: left; min-width: 160px; padding: 5px 0; margin: 2px 0 0; font-size: 14px; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box; border: 1px solid #ccc; border: 1px solid rgba(0, 0, 0, .15); border-radius: 4px; box-shadow: 0 6px 12px rgba(0, 0, 0, .175); } menu[align="right"],[riot-tag="menu"][align="right"],[data-is="menu"][align="right"]{ left: auto; right: 0; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent).mixin(syncEvent);

  var opened = false;

  var menuOpen = function menuOpen(e) {
    if (opened) return;
    opened = true;
    _this.root.style.display = 'block';
    setTimeout(function () {
      document.addEventListener('touchstart', menuClose, false);
      document.addEventListener('click', menuClose, false);
    }, 100);
  },
      menuClose = function menuClose(e) {
    opened = false;
    _this.root.style.display = 'none';
    document.removeEventListener('touchstart', menuClose);
    document.removeEventListener('click', menuClose);
  },
      itemSelect = function itemSelect(value) {
    _this.root.value = _this.value = value;
    _this.triggerDomEvent('select');
    menuClose();
  };

  this.on('mount', function () {
    var menuItems = _this.tags['menu-item'] || [];
    _this.root.addEventListener('change', function (e) {
      itemSelect(e.target.value);
    }, true);
    _this.root.addEventListener('menuItemClicked', function (e) {
      itemSelect(e.target.value);
    }, true);
  }).on('sync', function () {
    _this.value = opts.value;
  });

  if (this.parent) this.parent.on('inner-btn-toggle', menuOpen);
});

riot.tag2('radio-group', '<yield></yield>', 'radio-group,[riot-tag="radio-group"],[data-is="radio-group"]{ position: relative; display: inline-block; vertical-align: middle; } radio-group radio,[riot-tag="radio-group"] radio,[data-is="radio-group"] radio{ position: relative; float: left; } radio-group radio + radio,[riot-tag="radio-group"] radio + radio,[data-is="radio-group"] radio + radio{ margin-left: -1px; } radio-group radio[toggle]:not(:first-child) > *,[riot-tag="radio-group"] radio[toggle]:not(:first-child) > *,[data-is="radio-group"] radio[toggle]:not(:first-child) > *{ padding-right: 8px; padding-left: 8px; } radio-group > radio:hover,[riot-tag="radio-group"] > radio:hover,[data-is="radio-group"] > radio:hover,radio-group > radio:focus,[riot-tag="radio-group"] > radio:focus,[data-is="radio-group"] > radio:focus,radio-group > radio:active,[riot-tag="radio-group"] > radio:active,[data-is="radio-group"] > radio:active{ z-index: 2; } radio-group > radio:not(:first-child):not(:last-child):not([toggle]) > *,[riot-tag="radio-group"] > radio:not(:first-child):not(:last-child):not([toggle]) > *,[data-is="radio-group"] > radio:not(:first-child):not(:last-child):not([toggle]) > *{ border-radius: 0; } radio-group > radio:first-child,[riot-tag="radio-group"] > radio:first-child,[data-is="radio-group"] > radio:first-child{ margin-left: 0; } radio-group > radio:first-child:not(:last-child):not([toggle]) > *,[riot-tag="radio-group"] > radio:first-child:not(:last-child):not([toggle]) > *,[data-is="radio-group"] > radio:first-child:not(:last-child):not([toggle]) > *{ border-top-right-radius: 0; border-bottom-right-radius: 0; } radio-group > radio:last-child:not(:first-child) > *,[riot-tag="radio-group"] > radio:last-child:not(:first-child) > *,[data-is="radio-group"] > radio:last-child:not(:first-child) > *,radio-group > radio:not(:first-child)[toggle] > *,[riot-tag="radio-group"] > radio:not(:first-child)[toggle] > *,[data-is="radio-group"] > radio:not(:first-child)[toggle] > *{ border-top-left-radius: 0; border-bottom-left-radius: 0; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent).mixin(syncEvent);

  var radioSelect = function radioSelect(value) {
    _this.root.value = _this.value = value;
    _this.skipSync();
    _this.update();
    _this.triggerDomEvent('change');
  };

  this.on('mount', function () {
    var radios = _this.tags['radio'] || [];
    radios.forEach(function (radio) {
      return radio.on('radioClicked', radioSelect);
    });
  }).on('sync', function () {
    _this.value = opts.value;
  });
});

riot.tag2('radio', '<button type="button" __disabled="{opts.disabled}" data-selected="{selected ? \'yes\' : \'no\'}" data-size="{opts.size}" onclick="{click}"><input type="radio" __checked="{selected}" onclick="{click}"> <yield></yield></button>', 'radio button,[riot-tag="radio"] button,[data-is="radio"] button{ display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: normal; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none; border: 1px solid transparent; border-radius: 4px; } radio button:focus,[riot-tag="radio"] button:focus,[data-is="radio"] button:focus{ outline: thin dotted; outline: 5px auto -webkit-focus-ring-color; outline-offset: -2px; } radio button:hover,[riot-tag="radio"] button:hover,[data-is="radio"] button:hover,radio button:focus,[riot-tag="radio"] button:focus,[data-is="radio"] button:focus{ color: #333; text-decoration: none; } radio button:active,[riot-tag="radio"] button:active,[data-is="radio"] button:active{ background-image: none; outline: 0; box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); } radio button[disabled],[riot-tag="radio"] button[disabled],[data-is="radio"] button[disabled]{ pointer-events: none; cursor: not-allowed; box-shadow: none; opacity: .65; } radio button,[riot-tag="radio"] button,[data-is="radio"] button{ color: #333; background-color: #fff; border-color: #ccc } radio button:hover,[riot-tag="radio"] button:hover,[data-is="radio"] button:hover,radio button:focus,[riot-tag="radio"] button:focus,[data-is="radio"] button:focus,radio button:active,[riot-tag="radio"] button:active,[data-is="radio"] button:active,radio button[data-selected="yes"],[riot-tag="radio"] button[data-selected="yes"],[data-is="radio"] button[data-selected="yes"]{ color: #333; background-color: #e6e6e6; border-color: #adadad } radio button[data-size="lg"],[riot-tag="radio"] button[data-size="lg"],[data-is="radio"] button[data-size="lg"]{ padding: 10px 16px; font-size: 18px; line-height: 1.3333333; border-radius: 6px; } radio button[data-size="sm"],[riot-tag="radio"] button[data-size="sm"],[data-is="radio"] button[data-size="sm"]{ padding: 5px 10px; font-size: 12px; line-height: 1.5; border-radius: 3px; } radio button[data-size="xs"],[riot-tag="radio"] button[data-size="xs"],[data-is="radio"] button[data-size="xs"]{ padding: 1px 5px; font-size: 12px; line-height: 1.5; border-radius: 3px; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope);

  this.click = function (e) {
    e.stopPropagation();
    _this.selected = true;
    _this.trigger('radioClicked', opts.value || _this.root.innerText);
  };

  this.on('update', function () {
    _this.selected = opts.value == _this.parent.value;
  });
});

riot.tag2('icon-battery', '<span title="{name}" data-author="{author}" data-license="{license}" data-origial="{url}"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="{viewbox}"> <g> <path riot-d="{path}"></path> </g> </svg> </span>', 'icon-battery,[riot-tag="icon-battery"],[data-is="icon-battery"]{ display: inline-block; width: 1em; height: 1em; } icon-battery svg,[riot-tag="icon-battery"] svg,[data-is="icon-battery"] svg{ display: inline-block; margin: 0.05em; width: 0.9em; height: 0.9em; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var icon;
  this.viewbox = "";

  this.on('update', function (e) {
    icon = opts.state || 'empty';

    _this.name = capitalizeFirstLetter(icon);
    _this.author = "EpicCoders";
    _this.license = "CC 3.0 BY";
    _this.url = "http://www.flaticon.com/packs/interface-icons/2";

    switch (icon) {
      case 'low':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z";
        break;
      case 'half':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z";
        break;
      case 'high':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629h-34.236V99.475z";
        break;
      case 'full':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M44.454,99.481H78.69v114.616H44.454C44.454,214.097,44.454,99.481,44.454,99.481z M96.422,99.481h34.236v114.616H96.422V99.481z M148.376,99.481h34.236v114.623h-34.236V99.481z M200.337,99.481h34.242v114.616h-34.242V99.481z";
        break;
      case 'charging':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M107.232,158.344H138.8l-20.733,44.088l58.683-55.02l-31.337,0.026l14.705-36.286L107.232,158.344z";
        break;
      case 'outlet':
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M218.275,167.792h-27.34V145.78h26.524c3.843,0,6.954-3.104,6.954-6.96c0-3.843-3.111-6.96-6.954-6.96h-26.524v-16.311h-22.218v0.084c-0.54-0.019-1.067-0.084-1.607-0.084c-20.206,0-36.993,14.55-40.528,33.741H63.748c-4.152,0-7.5,3.355-7.5,7.5s3.348,7.5,7.5,7.5h62.835c3.528,19.184,20.315,33.741,40.528,33.741c0.54,0,1.067-0.071,1.607-0.084v0.096h22.218v-16.324h27.34c3.843,0,6.967-3.117,6.967-6.96C225.241,170.909,222.118,167.792,218.275,167.792z";
        break;
      case 'empty':
      default:
        _this.viewbox = "0 0 313.585 313.585";
        _this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M229.914,149.372h-29.255v-29.229h-14.814v29.229h-29.236v14.827h29.236v29.236h14.814v-29.236h29.255V149.372z M51.807,149.379h73.292v14.827H51.807V149.379z";
    }
  });
});

riot.tag2('icon-face', '<span title="{name}" data-author="{author}" data-license="{license}" data-origial="{url}"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="{viewbox}"> <g> <path riot-d="{path}"></path> </g> </svg> </span>', 'icon-face,[riot-tag="icon-face"],[data-is="icon-face"]{ display: inline-block; width: 1em; height: 1em; } icon-face svg,[riot-tag="icon-face"] svg,[data-is="icon-face"] svg{ display: inline-block; margin: 0.05em; width: 0.9em; height: 0.9em; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var icon;
  this.viewbox = "";

  this.on('update', function (e) {
    icon = opts.mood || 'empty';

    _this.name = capitalizeFirstLetter(icon);
    _this.author = "EpicCoders";
    _this.license = "CC 3.0 BY";
    _this.url = "http://www.flaticon.com/packs/interface-icons/2";

    switch (icon) {
      case 'angel':
        _this.viewbox = "0 0 343.649 343.649";
        _this.path = "M171.812,343.649c-84.648,0-153.518-68.876-153.518-153.531c0-84.648,68.87-153.518,153.518-153.518c84.654,0,153.544,68.87,153.544,153.518C325.355,274.773,256.472,343.649,171.812,343.649z M171.812,49.454c-77.559,0-140.664,63.105-140.664,140.664c0,77.572,63.099,140.677,140.664,140.677c77.578,0,140.69-63.099,140.69-140.677C312.502,112.56,249.39,49.454,171.812,49.454z M248.175,233.339c3.953-3.567,4.267-9.653,0.688-13.606c-3.567-3.965-9.653-4.267-13.606-0.701c-17.41,15.714-39.917,24.364-63.356,24.364c-23.522,0-46.068-8.702-63.484-24.506c-3.933-3.567-10.026-3.291-13.612,0.656c-3.58,3.94-3.284,10.045,0.662,13.618c20.971,19.03,48.111,29.512,76.441,29.512C200.122,262.671,227.211,252.253,248.175,233.339z M171.825,111.788c-58.851,0-118.434-19.203-118.434-55.901C53.391,19.197,112.974,0,171.825,0s118.434,19.197,118.434,55.888C290.258,92.591,230.675,111.788,171.825,111.788zM171.825,32.141c-53.812,0-85.291,16.877-86.3,23.779c0.977,6.851,32.43,23.734,86.3,23.734c53.863,0,85.323-16.883,86.3-23.792C257.122,49.017,225.63,32.141,171.825,32.141z M159.427,157.695c0-5.328-4.319-9.64-9.64-9.64c-5.321,0-9.64,4.312-9.64,9.64c0,4.454-3.618,8.079-8.072,8.079c-4.454,0-8.072-3.625-8.072-8.079c0-5.328-4.319-9.64-9.64-9.64c-5.321,0-9.64,4.312-9.64,9.64c0,15.084,12.269,27.365,27.353,27.365C147.158,185.061,159.427,172.785,159.427,157.695z M236.157,157.695c0-5.328-4.319-9.64-9.64-9.64s-9.64,4.312-9.64,9.64c0,4.454-3.625,8.079-8.072,8.079c-4.454,0-8.072-3.625-8.072-8.079c0-5.328-4.319-9.64-9.64-9.64c-5.321,0-9.64,4.312-9.64,9.64c0,15.084,12.262,27.365,27.353,27.365C223.882,185.061,236.157,172.785,236.157,157.695z";
        break;
      case 'angry':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM97.148,229.833c19.152-17.385,43.966-26.961,69.853-26.961c25.804,0,50.56,9.525,69.699,26.813c3.953,3.567,10.052,3.265,13.618-0.688c3.567-3.952,3.265-10.045-0.688-13.618c-22.693-20.495-52.044-31.781-82.63-31.781c-30.688,0-60.104,11.363-82.81,31.973c-3.94,3.58-4.242,9.666-0.662,13.606c1.902,2.095,4.512,3.162,7.134,3.162C92.983,232.327,95.304,231.504,97.148,229.833z M136.371,115.275c-9.203-5.386-21.016-2.301-26.395,6.896c-5.386,9.19-2.307,21.016,6.89,26.395s21.016,2.294,26.395-6.89C148.659,132.48,145.561,120.667,136.371,115.275zM155.697,135.911c2.693-4.595,1.15-10.501-3.445-13.194L93.568,88.334c-4.595-2.693-10.495-1.157-13.188,3.445c-2.693,4.595-1.15,10.501,3.445,13.194l58.683,34.384c1.53,0.9,3.207,1.324,4.865,1.324C150.684,140.674,153.903,138.971,155.697,135.911z M190.568,141.676c5.386,9.19,17.198,12.275,26.395,6.89s12.275-17.211,6.89-26.395c-5.386-9.203-17.198-12.282-26.395-6.896C188.274,120.667,185.176,132.48,190.568,141.676zM191.327,139.356l58.683-34.384c4.595-2.693,6.138-8.599,3.451-13.194c-2.699-4.602-8.612-6.131-13.194-3.445l-58.683,34.384c-4.595,2.693-6.138,8.599-3.438,13.194c1.793,3.066,5.007,4.769,8.323,4.769C188.126,140.674,189.791,140.25,191.327,139.356z";
        break;
      case 'confused':
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M166.911,333.832C74.879,333.832,0,258.96,0,166.921S74.873,0.01,166.911,0.01c92.045,0,166.931,74.879,166.931,166.918S258.956,333.832,166.911,333.832z M166.911,12.863c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058c84.956,0,154.077-69.114,154.077-154.058C320.982,81.971,251.868,12.863,166.911,12.863zM203.872,97.331c-14.21,0-25.72,11.504-25.72,25.72c0,14.197,11.51,25.72,25.72,25.72c14.21,0,25.72-11.523,25.72-25.72C229.592,108.835,218.082,97.331,203.872,97.331z M123.537,97.331c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C142.83,105.962,134.192,97.331,123.537,97.331z M251.418,211.388c3.978-3.503,4.37-9.525,0.9-13.541c-3.464-3.991-9.537-4.441-13.573-0.99c-1.112,0.951-27.423,22.822-62.655-0.726c-47.231-31.569-91.049-1.144-92.893,0.161c-4.325,3.078-5.334,9.049-2.275,13.394s9.049,5.373,13.419,2.346c1.407-0.99,35.046-23.94,71.042,0.129c15.489,10.354,30.405,14.068,43.535,14.068C228.21,226.221,243.661,218.188,251.418,211.388z";
        break;
      case 'cool':
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M166.911,333.842C74.879,333.842,0,258.963,0,166.918C0,74.885,74.873,0,166.911,0c92.045,0,166.931,74.879,166.931,166.918C333.835,258.963,258.956,333.842,166.911,333.842z M166.911,12.86c-84.95,0-154.058,69.114-154.058,154.064c0,84.956,69.108,154.07,154.058,154.07c84.956,0,154.077-69.114,154.077-154.07C320.982,81.974,251.868,12.86,166.911,12.86z M234.74,252.87c15.945-5.977,29.024-17.59,36.819-32.713c2.442-4.724,0.585-10.546-4.152-12.989c-4.724-2.436-10.54-0.591-12.989,4.152c-5.604,10.855-15,19.197-26.459,23.496c-11.485,4.325-24.088,4.21-35.483-0.315c-4.942-1.967-10.553,0.456-12.513,5.411c-1.967,4.949,0.456,10.553,5.411,12.513c8.124,3.22,16.684,4.833,25.251,4.833C218.789,257.26,226.957,255.801,234.74,252.87z M237.639,99.475c-24.428,0-47.321,10.077-68.915,9.068c-0.559-0.039-1.163-0.051-1.806-0.045c-0.643-0.006-1.24,0.006-1.812,0.045c-21.575,1.009-44.474-9.068-68.902-9.068c-24.531,0-49.506,7.963-49.506,7.963v12.172c0,0,6.189,5.116,7.738,9.216c1.542,4.094,8.554,32.366,13.259,37.713c4.704,5.347,7.963,16.253,38.227,15.964c43.105-1.028,51.479-45.631,53.047-51.53c0.945-4.004,5.135-3.798,7.95-3.863c2.821,0.064,7.018-0.141,7.95,3.863c1.575,5.9,9.949,50.496,53.041,51.53c30.277,0.289,33.542-10.617,38.233-15.964s11.71-33.619,13.259-37.713c1.542-4.1,7.738-9.216,7.738-9.216v-12.172C287.145,107.437,262.163,99.475,237.639,99.475z";
        break;
      case 'crying':
        _this.viewbox = "0 0 351.721 351.721";
        _this.path = "M295.274,314.561c4.402-2.012,6.986-4.441,6.986-7.07c0-4.794-8.689-8.927-21.305-11.009c5.251-4.28,10.225-8.863,14.923-13.734c0.405,0.039,0.797,0.129,1.208,0.129c8.059,0,14.595-6.53,14.595-14.589c0-1.305-0.219-2.545-0.553-3.753c19.885-27.475,31.652-61.19,31.652-97.617C342.782,74.879,267.903,0,175.851,0C83.819,0,8.94,74.879,8.94,166.918c0,36.434,11.768,70.155,31.646,97.617c-0.328,1.208-0.546,2.449-0.546,3.753c0,8.059,6.536,14.589,14.595,14.589c0.411,0,0.803-0.09,1.208-0.129c5.649,5.848,11.71,11.298,18.156,16.266C41.112,304.15,19.345,312.961,19.345,323c0,15.868,54.069,28.721,120.773,28.721c39.461,0,74.384-4.518,96.422-11.472c9.415,3.49,23.31,5.726,38.921,5.726c28.387,0,51.402-7.32,51.402-16.343C326.862,322.846,313.829,317.036,295.274,314.561zM175.851,12.86c84.956,0,154.077,69.108,154.077,154.064c0,31.941-9.775,61.653-26.498,86.28l-12.899-15.315l-7.5,26.498l0.064-0.013c-0.353,1.253-0.598,2.545-0.598,3.914c0,2.789,0.823,5.373,2.185,7.584c-27.899,27.854-66.383,45.116-108.832,45.116c-42.443,0-80.92-17.262-108.813-45.116c1.362-2.211,2.185-4.794,2.185-7.584c0-1.369-0.244-2.661-0.598-3.914l0.064,0.013l-7.5-26.498l-12.905,15.315c-16.716-24.628-26.491-54.339-26.491-86.28C21.793,81.968,90.901,12.86,175.851,12.86z M105.034,80.47c0-15.971,12.989-28.966,28.966-28.966S162.965,64.5,162.965,80.47c0,5.328-4.319,9.64-9.64,9.64s-9.64-4.312-9.64-9.64c0-5.341-4.345-9.685-9.685-9.685s-9.685,4.345-9.685,9.685c0,5.328-4.319,9.64-9.64,9.64S105.034,85.798,105.034,80.47zM188.756,80.47c0-15.971,12.989-28.966,28.966-28.966S246.688,64.5,246.688,80.47c0,5.328-4.319,9.64-9.64,9.64c-5.321,0-9.64-4.312-9.64-9.64c0-5.341-4.345-9.685-9.685-9.685s-9.685,4.345-9.685,9.685c0,5.328-4.319,9.64-9.64,9.64S188.756,85.798,188.756,80.47z M175.536,122.92c39.204,0,72.694,26.684,86.422,64.423c4.28,11.761,2.635,30.238-6.086,34.191c-11.324,5.135-75.592-32.044-107.36-26.421c-31.768,5.623-49.14,25.592-55.868,16.78c-2.558-3.348-7.796-12.789-3.515-24.551C102.849,149.604,136.332,122.92,175.536,122.92z M252.105,132.245c0-1.356,0.244-2.648,0.598-3.901l-0.064,0.013l7.5-26.498l18.246,21.665h-0.051c1.832,2.449,2.956,5.45,2.956,8.721c0,8.059-6.536,14.595-14.595,14.595C258.635,146.84,252.105,140.304,252.105,132.245z M70.425,132.245c0-3.278,1.125-6.279,2.956-8.721H73.33l18.246-21.665l7.5,26.498l-0.064-0.013c0.353,1.253,0.598,2.545,0.598,3.901c0,8.059-6.536,14.595-14.595,14.595S70.425,140.304,70.425,132.245zM48.201,200.273c0-3.291,1.118-6.292,2.95-8.721l-0.051-0.013l18.252-21.665l7.494,26.498l-0.064-0.013c0.353,1.253,0.604,2.545,0.604,3.914c0,8.059-6.543,14.589-14.595,14.589S48.201,208.326,48.201,200.273z M274.863,196.365l7.507-26.498l18.239,21.665l-0.051,0.013c1.832,2.436,2.963,5.437,2.963,8.721c0,8.059-6.543,14.589-14.595,14.589c-8.053,0-14.589-6.53-14.589-14.589c0-1.369,0.238-2.661,0.591-3.914L274.863,196.365z";
        break;
      case 'dead':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM158.691,213.927v23.233c0,15.63,15.187,28.291,33.927,28.291c18.753,0,33.94-12.667,33.94-28.291v-23.233H158.691zM252.215,210.566c0-5.321-4.319-9.64-9.64-9.64H91.261c-5.321,0-9.64,4.319-9.64,9.64c0,5.321,4.319,9.64,9.64,9.64h151.313C247.896,220.206,252.215,215.887,252.215,210.566z M147.271,149.44c3.766-3.76,3.766-9.872,0-13.631l-44.12-44.12c-3.766-3.766-9.865-3.766-13.631,0c-3.766,3.76-3.766,9.872,0,13.631l44.12,44.12c1.883,1.883,4.351,2.821,6.819,2.821S145.388,151.323,147.271,149.44z M103.144,149.434l44.12-44.114c3.766-3.76,3.766-9.865,0-13.631c-3.766-3.766-9.865-3.766-13.631,0l-44.12,44.114c-3.766,3.76-3.766,9.865,0,13.631c1.883,1.883,4.351,2.821,6.819,2.821S101.261,151.317,103.144,149.434z M244.323,149.44c3.766-3.76,3.766-9.872,0-13.631l-44.12-44.12c-3.766-3.766-9.865-3.766-13.631,0c-3.766,3.76-3.766,9.872,0,13.631l44.12,44.12c1.883,1.883,4.357,2.821,6.819,2.821C239.978,152.268,242.439,151.323,244.323,149.44z M200.196,149.434l44.12-44.114c3.766-3.76,3.766-9.865,0-13.631c-3.766-3.766-9.865-3.766-13.631,0l-44.12,44.114c-3.766,3.76-3.766,9.865,0,13.631c1.883,1.883,4.357,2.821,6.819,2.821C195.858,152.261,198.313,151.317,200.196,149.434z";
        break;
      case 'devil':
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M289.6,53.889c6.35-17.7,10.212-42.308,5.81-45.399c-4.518-3.188-25.283,6.041-40.386,16.755C229.432,9.274,199.238,0.006,166.911,0.006c-32.321,0-62.514,9.267-88.099,25.238C63.703,14.531,42.944,5.302,38.426,8.49c-4.402,3.091-0.54,27.7,5.81,45.399C16.793,83.645,0,123.357,0,166.924c0,92.039,74.873,166.911,166.911,166.911c92.045,0,166.931-74.873,166.931-166.911C333.836,123.35,317.036,83.645,289.6,53.889z M166.911,320.982c-84.95,0-154.058-69.114-154.058-154.058c0-38.285,14.062-73.317,37.256-100.291c2.044,3.201,4.152,5.283,6.202,5.514c11.485,1.311,43.246-16.279,38.413-30.463c-0.81-2.365-2.802-5.013-5.463-7.738c22.822-13.374,49.345-21.08,77.649-21.08s54.834,7.706,77.655,21.086c-2.661,2.725-4.647,5.366-5.456,7.738c-4.846,14.184,26.916,31.774,38.407,30.463c2.05-0.231,4.158-2.314,6.202-5.514c23.194,26.973,37.269,62.013,37.269,100.291C320.982,251.874,251.868,320.982,166.911,320.982z M276.09,183.91c-10.585,51.717-56.64,89.262-109.513,89.262c-52.025,0-96.75-35.296-108.761-85.856c-1.234-5.174,1.967-10.366,7.147-11.6c5.193-1.279,10.379,1.973,11.607,7.14c9.949,41.826,46.961,71.036,90.008,71.036c43.754,0,81.865-31.054,90.625-73.844c1.073-5.225,6.183-8.561,11.382-7.519C273.796,173.595,277.157,178.692,276.09,183.91zM80.38,118.434c2.693-4.602,8.599-6.144,13.188-3.445l58.683,34.384c4.595,2.693,6.138,8.599,3.445,13.188c-1.793,3.066-5.013,4.769-8.323,4.769c-1.125,0-2.243-0.276-3.336-0.681c-0.257,0.566-0.45,1.144-0.771,1.69c-5.386,9.19-17.205,12.282-26.395,6.896c-9.203-5.386-12.282-17.211-6.896-26.401c0.283-0.482,0.649-0.874,0.958-1.317l-27.108-15.881C79.23,128.935,77.688,123.029,80.38,118.434z M178.145,162.56c-2.693-4.589-1.15-10.495,3.445-13.188l58.683-34.384c4.589-2.686,10.489-1.157,13.188,3.445c2.693,4.595,1.15,10.501-3.445,13.194l-27.108,15.881c0.315,0.443,0.675,0.835,0.958,1.318c5.386,9.19,2.301,21.016-6.896,26.401c-9.197,5.386-21.016,2.294-26.395-6.896c-0.321-0.546-0.514-1.125-0.771-1.69c-1.093,0.405-2.211,0.681-3.336,0.681C183.158,167.329,179.939,165.62,178.145,162.56z";
        break;
      case 'embarrassed':
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M166.911,0.006C74.879,0.006,0,74.879,0,166.924c0,92.032,74.873,166.911,166.911,166.911c92.045,0,166.931-74.873,166.931-166.911C333.835,74.879,258.956,0.006,166.911,0.006z M166.911,320.975c-84.95,0-154.058-69.114-154.058-154.058c0-84.956,69.108-154.064,154.058-154.064c84.956,0,154.077,69.108,154.077,154.064C320.982,251.868,251.868,320.975,166.911,320.975z M290.21,197.548c0,20.463-16.588,37.057-37.057,37.057c-20.469,0-37.057-16.594-37.057-37.057s16.588-37.057,37.057-37.057C273.622,160.491,290.21,177.091,290.21,197.548zM117.733,197.548c0,20.463-16.588,37.057-37.057,37.057s-37.057-16.594-37.057-37.057s16.588-37.057,37.057-37.057S117.733,177.091,117.733,197.548z M206.841,147.091c-10.656,0-19.293-8.644-19.293-19.293c0-0.617,0.129-1.195,0.18-1.787c-4.531-0.784-7.989-4.711-7.989-9.473c0-5.328,4.319-9.64,9.64-9.64h68.009c5.321,0,9.64,4.312,9.64,9.64c0,5.321-4.319,9.64-9.64,9.64h-31.421c0.045,0.54,0.161,1.06,0.161,1.62C226.135,138.447,217.497,147.091,206.841,147.091zM146.114,126.005c0.058,0.598,0.18,1.176,0.18,1.787c0,10.649-8.638,19.293-19.293,19.293s-19.293-8.644-19.293-19.293c0-0.559,0.122-1.08,0.161-1.62H76.46c-5.321,0-9.64-4.319-9.64-9.64c0-5.328,4.319-9.64,9.64-9.64h68.009c5.321,0,9.64,4.312,9.64,9.64C154.109,121.294,150.645,125.22,146.114,126.005z M186.218,219.406c0,10.656-8.638,19.293-19.293,19.293s-19.293-8.638-19.293-19.293s8.638-19.293,19.293-19.293S186.218,208.75,186.218,219.406z";
        break;
      case 'kiss':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM154.019,120.776c0-15.971-12.989-28.966-28.959-28.966s-28.972,12.995-28.972,28.966c0,5.328,4.319,9.64,9.64,9.64s9.64-4.312,9.64-9.64c0-5.341,4.351-9.685,9.692-9.685c5.334,0,9.679,4.345,9.679,9.685c0,5.328,4.319,9.64,9.64,9.64S154.019,126.098,154.019,120.776z M237.741,120.776c0-15.971-12.989-28.966-28.972-28.966c-15.964,0-28.959,12.995-28.959,28.966c0,5.328,4.319,9.64,9.64,9.64c5.321,0,9.64-4.312,9.64-9.64c0-5.341,4.345-9.685,9.679-9.685c5.347,0,9.692,4.345,9.692,9.685c0,5.328,4.319,9.64,9.64,9.64S237.741,126.098,237.741,120.776z M189.302,178.592c-11.022,0.366-17.661,9.769-22.378,9.428c-4.73-0.341-8.747-10.052-19.332-10.077c-19.82-0.039-35.007,34.384-46.145,41.909c12.153,6.98,30.039,46.46,65.477,46.46c35.431,0,51.627-39.814,65.47-46.46C218.551,212.873,209.11,177.943,189.302,178.592z M163.486,226.491c-13.259,0-24.011-1.491-24.011-3.329c0-1.838,10.759-3.316,24.011-3.316c13.265,0,24.023,1.478,24.023,3.316C187.509,225,176.751,226.491,163.486,226.491z";
        break;
      case 'mad':
        _this.viewbox = "0 0 333.848 333.848";
        _this.path = "M166.911,0.01C74.879,0.01,0,74.889,0,166.927s74.873,166.911,166.911,166.911c92.052,0,166.937-74.873,166.937-166.911S258.963,0.01,166.911,0.01z M166.911,320.979c-84.95,0-154.058-69.114-154.058-154.058c0-84.95,69.108-154.064,154.058-154.064c84.956,0,154.083,69.108,154.083,154.064C320.995,251.871,251.874,320.979,166.911,320.979z M249.638,215.379c3.94,3.58,4.255,9.679,0.688,13.618c-3.593,3.953-9.666,4.255-13.618,0.688c-19.133-17.282-43.882-26.813-69.693-26.813c-25.887,0-50.701,9.576-69.853,26.961c-1.845,1.671-4.158,2.5-6.478,2.5c-2.622,0-5.231-1.067-7.134-3.162c-3.586-3.94-3.284-10.032,0.662-13.606c22.706-20.611,52.115-31.973,82.81-31.973C197.606,183.592,226.957,194.891,249.638,215.379z M81.377,91.785c2.693-4.602,8.586-6.138,13.188-3.445l58.683,34.384c4.595,2.693,6.138,8.599,3.445,13.194c-1.71,2.911-4.698,4.544-7.834,4.704c-0.739,0.36-1.517,0.662-2.365,0.816l-40.155,7.674c-0.611,0.122-1.215,0.174-1.819,0.174c-4.531,0-8.573-3.213-9.46-7.834c-0.996-5.231,2.429-10.283,7.661-11.279l18.933-3.618l-36.832-21.581C80.226,102.286,78.684,96.38,81.377,91.785z M252.472,91.785c2.699,4.595,1.157,10.501-3.438,13.194l-36.839,21.581l18.94,3.618c5.231,0.996,8.663,6.048,7.654,11.279c-0.88,4.614-4.923,7.834-9.454,7.834c-0.604,0-1.215-0.058-1.819-0.174l-40.168-7.674c-0.855-0.161-1.632-0.463-2.371-0.823c-3.123-0.167-6.112-1.8-7.821-4.698c-2.686-4.595-1.144-10.501,3.451-13.194l58.683-34.384C243.873,85.66,249.772,87.183,252.472,91.785z";
        break;
      case 'moustache':
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M166.911,333.835C74.879,333.835,0,258.963,0,166.931C0,74.892,74.873,0.006,166.911,0.006c92.045,0,166.931,74.879,166.931,166.924C333.835,258.963,258.956,333.835,166.911,333.835z M166.911,12.867c-84.95,0-154.058,69.114-154.058,154.07c0,84.95,69.108,154.051,154.058,154.051c84.956,0,154.077-69.101,154.077-154.051C320.982,81.974,251.868,12.867,166.911,12.867z M205.672,97.341c-10.656,0-19.293,8.625-19.293,19.293c0,10.643,8.638,19.293,19.293,19.293s19.293-8.651,19.293-19.293C224.965,105.966,216.327,97.341,205.672,97.341z M125.336,97.341c-10.656,0-19.293,8.625-19.293,19.293c0,10.643,8.638,19.293,19.293,19.293s19.293-8.651,19.293-19.293C144.629,105.966,135.992,97.341,125.336,97.341z M244.875,201.501c-14.396-3.4-30.797-24.216-46.106-26.434c-19.409-2.147-28.58,6.324-31.845,14.55c-3.271-8.22-12.455-16.697-31.851-14.55c-15.302,2.224-31.71,23.034-46.113,26.434c-14.403,3.4-22.61-9.402-22.61-9.402s11.607,43.002,53.812,42.803c31.813-0.148,43.175-16.999,46.755-28.291c3.573,11.298,14.93,28.143,46.742,28.291c42.205,0.199,53.812-42.803,53.812-42.803S259.278,204.9,244.875,201.501z";
        break;
      case 'rich':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM276.09,183.901c1.067-5.225-2.294-10.315-7.519-11.382c-5.186-1.041-10.309,2.294-11.375,7.519c-8.76,42.79-46.871,73.844-90.625,73.844c-43.047,0-80.059-29.21-90.001-71.036c-1.221-5.174-6.42-8.426-11.607-7.14c-5.186,1.228-8.387,6.427-7.147,11.6c12.012,50.56,56.736,85.856,108.755,85.856C219.444,273.163,265.499,235.617,276.09,183.901zM236.578,143.206c0-14.563-12.05-20.36-20.521-20.707h-2.635v-8.233h12.719c4.884,0,8.85-3.959,8.85-8.85c0-4.884-3.965-8.843-8.85-8.843h-12.725V81.283c0-4.891-3.965-8.85-8.85-8.85s-8.837,3.959-8.837,8.85v15.347c-13.207,0.296-22.378,9.03-22.378,21.511c0,13.336,8.773,21.96,22.378,22.044v7.018h-14.332c-4.884,0-8.837,3.959-8.837,8.85c0,4.884,3.952,8.843,8.837,8.843h14.332v15.283c0,4.884,3.953,8.85,8.837,8.85s8.85-3.965,8.85-8.85v-15.373C234.804,163.836,236.578,148.135,236.578,143.206z M191.05,118.135c0-1.382,0.064-3.618,4.685-3.837v8.188C191.288,122.441,191.05,120.879,191.05,118.135z M213.416,147.133v-6.941h2.275c3.188,0.135,3.188,2.294,3.188,3.014C218.879,145.282,218.827,146.831,213.416,147.133z M161.288,143.206c0-14.563-12.05-20.36-20.521-20.707h-2.635v-8.233h12.719c4.884,0,8.85-3.959,8.85-8.85c0-4.884-3.965-8.843-8.85-8.843h-12.719V81.283c0-4.891-3.965-8.85-8.85-8.85c-4.884,0-8.85,3.959-8.85,8.85v15.347c-13.194,0.296-22.365,9.03-22.365,21.511c0,13.336,8.773,21.96,22.365,22.044v7.018h-14.325c-4.884,0-8.85,3.959-8.85,8.85c0,4.884,3.965,8.843,8.85,8.843h14.325v15.283c0,4.884,3.965,8.85,8.85,8.85c4.884,0,8.85-3.965,8.85-8.85v-15.373C159.52,163.836,161.288,148.135,161.288,143.206z M115.747,118.135c0-1.382,0.064-3.618,4.685-3.837v8.188C115.998,122.441,115.747,120.879,115.747,118.135z M138.132,147.133v-6.941h2.275c3.188,0.135,3.188,2.294,3.188,3.014C143.588,145.282,143.543,146.831,138.132,147.133z";
        break;
      case 'sad':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM205.672,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C224.965,105.956,216.327,97.325,205.672,97.325z M125.336,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C144.629,105.956,135.998,97.325,125.336,97.325z M97.347,229.833c19.152-17.385,43.966-26.961,69.853-26.961c25.817,0,50.56,9.525,69.686,26.813c3.953,3.567,10.045,3.265,13.618-0.688c3.567-3.94,3.265-10.045-0.688-13.618c-22.68-20.489-52.019-31.781-82.617-31.781c-30.688,0-60.104,11.363-82.81,31.973c-3.94,3.58-4.242,9.666-0.662,13.606c1.902,2.095,4.512,3.162,7.134,3.162C93.189,232.327,95.503,231.504,97.347,229.833z";
        break;
      case 'sleepy':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.829C74.879,333.829,0,258.956,0,166.918S74.873,0,166.911,0c92.045,0,166.918,74.873,166.918,166.918C333.829,258.956,258.956,333.829,166.911,333.829z M166.911,12.86c-84.95,0-154.058,69.114-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.968,251.868,12.86,166.911,12.86zM154.019,131.84c0-5.321-4.319-9.64-9.64-9.64s-9.64,4.319-9.64,9.64c0,5.341-4.345,9.685-9.679,9.685c-5.341,0-9.692-4.345-9.692-9.685c0-5.321-4.319-9.64-9.64-9.64s-9.64,4.319-9.64,9.64c0,15.971,12.995,28.966,28.972,28.966C141.03,160.806,154.019,147.817,154.019,131.84z M237.741,131.84c0-5.321-4.319-9.64-9.64-9.64s-9.64,4.319-9.64,9.64c0,5.341-4.345,9.685-9.692,9.685c-5.334,0-9.679-4.345-9.679-9.685c0-5.321-4.319-9.64-9.64-9.64c-5.321,0-9.64,4.319-9.64,9.64c0,15.971,12.989,28.966,28.959,28.966C224.753,160.806,237.741,147.817,237.741,131.84z M220.196,218.962c-8.085,0-14.621,6.543-14.621,14.621c0,8.072,6.543,14.621,14.621,14.621c8.079,0,14.621-6.555,14.621-14.621C234.817,225.505,228.281,218.962,220.196,218.962z";
        break;
      case 'smile':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM205.672,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C224.965,105.956,216.327,97.325,205.672,97.325z M125.336,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C144.629,105.956,135.998,97.325,125.336,97.325z M249.817,213.4c3.953-3.567,4.255-9.666,0.688-13.618c-3.58-3.94-9.666-4.242-13.618-0.688c-19.133,17.295-43.882,26.813-69.686,26.813c-25.887,0-50.701-9.563-69.853-26.948c-3.927-3.58-10.039-3.291-13.612,0.656c-3.586,3.94-3.284,10.045,0.662,13.618c22.706,20.611,52.115,31.961,82.81,31.961C197.786,245.181,227.137,233.901,249.817,213.4z";
        break;
      case 'surprised':
        _this.viewbox = "0 0 333.829 333.829";
        _this.path = "M166.911,333.826C74.879,333.826,0,258.953,0,166.915S74.879,0.003,166.911,0.003c92.045,0,166.918,74.879,166.918,166.918S258.956,333.826,166.911,333.826z M166.911,12.857c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058s154.064-69.114,154.064-154.058C320.975,81.965,251.868,12.857,166.911,12.857zM207.092,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C226.385,105.956,217.748,97.325,207.092,97.325z M126.756,97.325c-10.656,0-19.293,8.631-19.293,19.293c0,10.649,8.638,19.293,19.293,19.293s19.293-8.644,19.293-19.293C146.05,105.956,137.412,97.325,126.756,97.325z M166.911,221.131c-8.072,0-14.621,6.543-14.621,14.621c0,8.072,6.555,14.621,14.621,14.621c8.079,0,14.634-6.555,14.634-14.621C181.545,227.674,174.996,221.131,166.911,221.131z";
        break;
      case 'happy':
      default:
        _this.viewbox = "0 0 333.842 333.842";
        _this.path = "M166.911,333.832C74.879,333.832,0,258.96,0,166.921S74.873,0.01,166.911,0.01c92.045,0,166.931,74.879,166.931,166.918S258.956,333.832,166.911,333.832z M166.911,12.863c-84.95,0-154.058,69.108-154.058,154.064c0,84.943,69.108,154.058,154.058,154.058c84.956,0,154.077-69.114,154.077-154.058C320.982,81.971,251.868,12.863,166.911,12.863zM154.026,106.181c0-15.971-12.989-28.966-28.966-28.966S96.094,90.21,96.094,106.181c0,5.328,4.319,9.64,9.64,9.64c5.321,0,9.64-4.312,9.64-9.64c0-5.341,4.345-9.685,9.685-9.685c5.341,0,9.685,4.345,9.685,9.685c0,5.328,4.319,9.64,9.64,9.64S154.026,111.509,154.026,106.181z M237.741,106.181c0-15.971-12.989-28.966-28.966-28.966S179.81,90.21,179.81,106.181c0,5.328,4.319,9.64,9.64,9.64c5.321,0,9.64-4.312,9.64-9.64c0-5.341,4.345-9.685,9.685-9.685s9.685,4.345,9.685,9.685c0,5.328,4.319,9.64,9.64,9.64S237.741,111.509,237.741,106.181z M166.918,263.908c56.563,0,102.431-45.855,102.431-102.424H64.487C64.487,218.053,110.342,263.908,166.918,263.908z";
    }
  });
});

riot.tag2('icon-social', '<span title="{name}" data-author="{author}" data-license="{license}" data-origial="{url}"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="{viewbox}"> <g> <path riot-d="{path}"></path> </g> </svg> </span>', 'icon-social,[riot-tag="icon-social"],[data-is="icon-social"]{ display: inline-block; width: 1em; height: 1em; } icon-social svg,[riot-tag="icon-social"] svg,[data-is="icon-social"] svg{ display: inline-block; margin: 0.05em; width: 0.9em; height: 0.9em; }', '', function (opts) {
  var _this = this;

  this.mixin(parentScope).mixin(domEvent);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var icon;
  this.viewbox = "";

  this.on('update', function (e) {
    icon = opts.network || 'facebook';

    _this.name = capitalizeFirstLetter(icon);
    _this.author = "EpicCoders";
    _this.license = "CC 3.0 BY";
    _this.url = "http://www.flaticon.com/packs/interface-icons/2";

    switch (icon) {
      case 'behance':
        _this.viewbox = "0 0 326.329 326.329";
        _this.path = "M107.579,165.385H44.564v64.795h6.427h53.883c19.107-0.443,29.628-11.697,29.628-31.684C134.501,172.307,116.904,165.385,107.579,165.385z M104.719,217.327H57.417v-39.088h50.168c2.346,0.032,14.062,1.15,14.062,20.257C121.647,214.743,113.016,217.134,104.719,217.327z M127.759,118.681c0-21.08-13.214-26.652-20.193-26.652H44.557v56.241h59.512C120.015,148.27,127.759,138.592,127.759,118.681z M57.417,104.883h50.161c0.084,0,7.339,0.154,7.339,13.798c0,16.735-5.264,16.735-10.842,16.735H57.417C57.417,135.417,57.417,104.883,57.417,104.883z M307.428,129.099c-12.911-14.698-31.678-22.153-55.753-22.153c-41.903,0-61.8,22.243-71.119,40.894c-4.904,9.814-7.391,19.57-8.663,26.961c-2.05-5.906-5.154-11.883-9.852-16.851c-2.59-2.744-5.489-5.007-8.676-6.793c8.483-6.504,15.649-17.622,15.649-35.483c0-35.348-24.113-58.195-61.447-58.195H0v207.24l107.373-0.006l0.887,0.013c4.537,0,20.54-0.611,35.99-8.522c11.877-6.073,25.605-17.783,30.026-39.699c2.847,9.627,7.783,20.219,16.369,29.416c14.152,15.167,34.679,22.854,60.631,22.854c0.019,0,0.039,0,0.058,0c0,0,1.093,0.077,3.027,0.077c33.972,0,70.297-15.283,70.29-58.176v-6.427h-47.417l0.366,6.78c0.006,0.039,0,4.12-3.374,7.686c-3.985,4.21-11.382,6.433-21.774,6.453l-0.797,0.019c-2.05,0-9.242-0.289-15.495-4.01c-5.861-3.483-9.435-9.19-10.636-17.005h99.487l0.726-5.591C325.95,196.851,330.982,155.931,307.428,129.099z M162.901,200.938c0,20.752-8.246,35.502-24.506,43.831c-13.226,6.767-27.423,7.102-30.129,7.102H12.854V70.345h94.706c30.425,0,48.593,16.954,48.593,45.341c0,27.7-21.318,30.373-23.709,30.585l0.476,12.834c8.393,0,14.859,2.5,19.743,7.648C163.916,178.605,162.92,200.373,162.901,200.938z M313.366,191.324H212.182v6.427c0,19.949,9.46,29.763,17.385,34.474c8.824,5.231,18.381,5.81,22.076,5.81c0.726,0,1.234-0.032,1.324-0.039c13.747-0.019,24.023-3.535,30.579-10.444c3.355-3.548,5.096-7.333,5.99-10.456h21.896c-4.255,35.977-44.326,38.902-57.077,38.902c-1.395,0-2.217-0.051-2.654-0.064c-22.597,0-39.943-6.285-51.575-18.696c-18.368-19.595-16.723-48.465-16.69-49.185c0-0.167,0.084-17.352,8.631-34.461c11.202-22.417,31.26-33.792,59.622-33.792c20.2,0,35.688,5.958,46.035,17.738C312.813,154.678,313.771,180.148,313.366,191.324zM252.452,135.417c-28.175,0-38.857,23.227-40.573,35.508l-1.022,7.314h77.591l0.084-6.337c0.006-0.662,0.084-16.118-10.456-26.781C271.72,138.682,263.102,135.417,252.452,135.417z M226.739,165.385c3.014-7.204,10.007-17.115,25.707-17.115c7.057,0,12.571,1.954,16.427,5.81c3.368,3.387,5.071,7.757,5.932,11.305H226.739z M296.496,68.931h-93.054v36.794h93.054V68.931zM283.642,92.865h-67.347V81.778h67.347V92.865z";
        break;
      case 'blogger':
        _this.viewbox = "0 0 297.659 297.659";
        _this.path = "M203.927,297.659H89.535c-47.604,0-89.359-43.33-89.359-92.726V96.885C0.177,42.552,42.735,0,97.068,0h60.252c42.443,0,89.044,47.019,89.044,89.841v7.969c0,6.099,5.244,10.199,13.053,10.199h12.5c25.566,0,25.566,20.862,25.566,27.719v68.369C297.489,254.811,254.641,297.659,203.927,297.659z M97.068,12.854c-47.122,0-84.037,36.909-84.037,84.031v108.054c0,41.8,36.466,79.873,76.505,79.873h114.391c43.747,0,80.708-36.961,80.708-80.715v-68.369c0-11.53-2.847-14.865-12.712-14.865h-12.5c-17.005,0-25.907-11.6-25.907-23.053v-7.969c0-35.977-40.585-76.987-76.19-76.987C157.326,12.854,97.068,12.854,97.068,12.854z M199.794,223.872H97.068c-12.687,0-23.002-10.321-23.002-23.008c0-12.68,10.315-22.995,23.002-22.995h102.727c12.68,0,22.995,10.315,22.995,22.995C222.796,213.551,212.474,223.872,199.794,223.872z M97.068,190.723c-5.501,0-10.148,4.647-10.148,10.142c0,5.598,4.55,10.154,10.148,10.154h102.727c5.495,0,10.142-4.653,10.142-10.154c0-5.591-4.55-10.142-10.142-10.142H97.068z  			 M148.765,120.863H97.068c-12.687,0-23.002-10.321-23.002-23.008c0-12.68,10.315-22.989,23.002-22.989h51.697c12.687,0,23.002,10.309,23.002,22.989C171.767,110.542,161.452,120.863,148.765,120.863z M97.068,87.72c-5.501,0-10.148,4.64-10.148,10.135c0,5.598,4.55,10.154,10.148,10.154h51.697c5.501,0,10.148-4.653,10.148-10.154c0-5.591-4.55-10.135-10.148-10.135H97.068z";
        break;
      case 'deviantart':
        _this.viewbox = "0 0 318.458 318.458";
        _this.path = "M12.502,244.407l-2.429-4.531c-5.54-10.309-9.049-22.931-9.884-35.547c-2.596-39.3,21.742-74.121,65.419-94.179L54.02,85.6l6.947-2.256c10.662-3.464,22.057-6.234,34.827-8.483l4.627-0.81l12.121,23.13c14.537-2.68,30.926-4.081,47.726-4.081c55.489,0,124.918,15.463,153.364,58.863l4.827,7.359l-155.182,43.163l-0.006-0.013L12.502,244.407z M71.925,93.441l11.016,23.336l-6.26,2.571c-42.205,17.333-66.01,48.78-63.671,84.127c0.591,8.998,2.751,17.95,6.157,25.733l129.205-35.939l-38.484-73.459l8.805-1.427c15.527-2.513,29.358-3.734,42.295-3.734c35.868,0,63.658,9.833,82.611,29.223l7.892,8.066l-63.343,15.418l-19.531-32.88c-4.917-0.341-9.91-0.405-15.045-0.174c-3.515,0.206-7.5,0.566-11.883,1.08l28.021,51.955l127.765-35.534c-28.779-33.689-90.644-45.862-137.213-45.862c-17.802,0-35.052,1.639-49.879,4.749l-4.756,0.996L93.403,88.364C85.768,89.835,78.667,91.506,71.925,93.441z M180.076,128.602l14.274,24.024l31.054-7.564C213.412,136.314,198.244,130.806,180.076,128.602z M53.159,200.236l-1.208-6.742c-5.019-28.053,5.27-49.981,29.743-63.414l5.99-3.291l27.533,58.33L53.159,200.236z M82.041,144.958c-13.599,9.499-19.64,22.507-18.323,39.48l33.143-8.072L82.041,144.958z";
        break;
      case 'digg':
        _this.name = "digg";
        _this.viewbox = "0 0 325.776 325.776";
        _this.path = "M31.292,200.607h31.633v-69.178H31.292V200.607z M44.146,144.282h5.926v43.471h-5.926V144.282z M200.614,131.429h-31.633v69.178h31.633V131.429z M187.76,187.754h-5.926v-43.471h5.926V187.754z M231.899,106.383h-0.341h-93.53V62.578H94.217h-0.334H50.078v43.805H0v119.25h93.877h0.334h43.478v37.565h93.87h0.341h93.877V106.383H231.899z M81.357,212.78H12.854v-93.543h50.071V75.432h18.432V212.78z M106.73,75.432h18.439V93.87H106.73V75.432z M125.169,212.78H106.73v-93.543h18.439V212.78zM219.046,250.338h-68.504v-12.192h50.071V212.78h-50.071v-93.543h68.504V250.338z M312.923,250.338h-68.504v-12.192h50.065V212.78h-50.065v-93.543h68.504V250.338z M294.484,131.429h-31.626v69.178h31.626C294.484,200.607,294.484,131.429,294.484,131.429zM281.63,187.754h-5.919v-43.471h5.919C281.63,144.282,281.63,187.754,281.63,187.754z";
        break;
      case 'evernote':
        _this.viewbox = "0 0 303.436 303.436";
        _this.path = "M203.832,303.436c-41.067,0-59.39-6.478-59.39-44.879c0-35.206,16.247-42.276,42.449-42.276c3.014,0,6.195,0.077,9.531,0.161c3.618,0.09,5.604,1.812,6.626,3.246c2.301,3.246,1.183,6.722,0.437,9.017c-0.521,1.6-1.054,3.258-1.054,5.18c0,1.992,0.289,3.541,0.54,4.91c0.424,2.346,1.022,5.553-1.363,8.419c-1.549,1.864-3.773,2.809-6.613,2.809l-4.512-0.039c-8.464,0-8.464,1.311-8.464,3.695c0,3.47,0.456,5.469,1.363,5.932c2.185,1.125,8.104,1.125,13.323,1.125h3.123c19.37,0,19.37-0.906,19.37-15.99c0-30.598-8.181-31.536-16.106-32.449c-17.545-2.063-29.576-4.216-35.765-6.414c-5.431-1.928-9.383-5.096-12.269-8.85c-0.476,1.761-1.015,3.56-1.62,5.386c-1.703,4.814-2.404,6.639-2.796,7.487l0.006,0.006c-3.599,7.552-9.332,11.221-17.539,11.221c-3.387,0-7.037-0.591-10.9-1.215c-1.986-0.321-4.1-0.662-6.35-0.945c-15.077-1.922-45.592-8.4-59.088-14.184c-7.796-3.612-10.765-7.603-14.19-14.679c-8.863-18.278-17.449-77.565-17.532-78.144c-1.253-10.045-1.324-15.341-1.324-15.566c-0.013-5.855,0.476-12.455,3.863-18.419l-3.824,1.877l5.489-16.453l1.234-1.054L84.64,8.651l2.018-0.604l13.978-3.496L99.75,6.228c2.943-1.845,6.337-3.329,9.994-4.351C113.792,0.739,121.607,0,129.641,0c9.293,0,22.687,0.932,33.715,5.366c6.967,2.802,12.912,9.537,15.688,17.352c2.147-0.039,4.46-0.064,6.896-0.064c10.996,0,20.649,0.482,28.683,1.427c17.905,2.108,31.729,4.698,38.927,7.301c10.129,3.663,17.217,12.564,19.428,24.428c3.715,19.923,8.535,99.307,6.048,126.268c-4.306,46.665-11.555,70.798-12.969,75.155C251.725,301.669,237.496,303.436,203.832,303.436z M186.891,229.136c-21.022,0-29.589,2.661-29.589,29.422c0,25.585,5.482,32.025,46.53,32.025c29.917,0,37.963,0,49.994-37.308c0.823-2.545,8.136-26.112,12.397-72.392c2.359-25.56-2.359-103.864-5.887-122.733c-1.857-9.949-7.789-13.483-11.157-14.698c-6.112-2.211-19.595-4.685-36.061-6.62c-7.539-0.887-16.684-1.337-27.179-1.337c-4.39,0-8.387,0.084-11.652,0.18l-5.733,0.174l-0.829-5.668c-0.932-6.356-5.424-11.395-9.178-12.905c-7.115-2.86-17.385-4.435-28.921-4.435c-8.406,0-14.428,0.835-16.433,1.401c-4.865,1.356-8.94,3.856-10.913,6.684c-1.671,2.391-2.455,5.276-2.461,9.075c0,2.911,0.077,9.537,0.141,15.759l0.186,13.715c-0.013,9.872-7.719,17.565-17.166,17.577H55.694c-4.447,0-8.156,0.656-11.003,1.947c-2.179,0.99-3.805,2.275-5.122,4.055c-2.153,2.886-3.021,6.722-3.008,13.259l0,0c0,0,0.077,4.839,1.215,13.991c1.652,12.295,9.627,60.322,16.35,74.191c2.635,5.444,3.734,6.633,7.86,8.548c12.127,5.199,41.472,11.382,55.483,13.169c2.41,0.308,4.666,0.668,6.774,1.009c3.49,0.566,6.504,1.054,8.856,1.054c2.963,0,4.319-0.572,5.861-3.734c0.264-0.675,1.157-3.046,2.307-6.292c4.338-13.124,4.846-25.065,4.846-32.893c0-3.927,3.188-7.121,7.102-7.121c3.972,0,7.076,3.13,7.076,7.121l-0.006,1.247c-0.103,10.739,1.093,23.529,11.324,27.166c3.625,1.285,12.301,3.336,32.957,5.758c19.763,2.275,27.468,14.942,27.468,45.213c0,24.493-8.438,28.844-32.224,28.844h-3.123c-8.869,0-14.589-0.167-19.203-2.545c-7.468-3.843-8.336-11.748-8.336-17.359c0-15.836,14.685-16.517,20.572-16.549c-0.096-0.97-0.154-2.057-0.154-3.239c0-1.742,0.193-3.329,0.469-4.724C188.986,229.149,187.926,229.136,186.891,229.136z M54.865,56.267h23.214c-0.084-5.649-0.219-16.376-0.27-22.764L54.865,56.267zM237.316,158.029l-9.088-4.042c-4.936-2.198-10.881-3.47-17.211-3.695c-3.445-0.116-6.8,0.084-9.974,0.604l-8.458,1.369l1.054-8.503c2.487-20.077,14.653-23.072,21.684-23.072l0.925,0.013c7.796,0.27,20.894,4.19,21.022,27.378L237.316,158.029zM209.102,137.406c0.784,0,1.568,0.013,2.365,0.045c4.004,0.135,7.918,0.63,11.645,1.446c-1.883-5.154-5.354-5.276-7.32-5.347c-2.031,0-5.013-0.006-7.172,3.856C208.787,137.406,208.942,137.406,209.102,137.406z";
        break;
      case 'flickr':
        _this.viewbox = "0 0 223.66 223.66";
        _this.path = "M174.289,75.313c20.135,0,36.517,16.382,36.517,36.524c0,20.129-16.382,36.511-36.517,36.511c-20.142,0-36.53-16.382-36.53-36.511C137.759,91.695,154.148,75.313,174.289,75.313 M174.289,62.459c-27.263,0-49.384,22.102-49.384,49.377s22.115,49.365,49.384,49.365s49.371-22.095,49.371-49.365C223.654,84.561,201.552,62.459,174.289,62.459L174.289,62.459z M49.371,75.313c20.135,0,36.517,16.382,36.517,36.524c0,20.129-16.382,36.511-36.517,36.511s-36.517-16.382-36.517-36.511C12.854,91.695,29.236,75.313,49.371,75.313 M49.371,62.459C22.108,62.459,0,84.561,0,111.837s22.102,49.365,49.371,49.365s49.371-22.095,49.371-49.365C98.735,84.561,76.634,62.459,49.371,62.459L49.371,62.459z";
        break;
      case 'google-plus':
        _this.name = "Google+";
        _this.viewbox = "0 0 305.538 305.538";
        _this.path = "M292.575,41.852h-25.193v-25.2V3.798h-12.854h-19.03h-12.854v12.854v25.2h-25.193h-12.854v12.854v4.569c-1.363-5.431-3.252-10.566-5.713-15.251l2.815-2.956l18.426-19.351L220.807,0h-29.988h-82.463C59.795,0,18.773,35.566,18.773,77.668c0,41.17,26.716,70.798,66.029,74.744c-0.096,1.118-0.141,2.237-0.141,3.342c0,3.329,0.424,6.35,1.157,9.107c-51.633,3.824-85.715,41.684-85.715,77.173c0,37.385,41.62,63.504,101.203,63.504c63.272,0,101.081-38.143,101.081-75.014c0-30.605-8.689-46.453-37.173-67.822l-1.755-1.311c-3.728-2.77-14.698-10.913-17.359-15.142c0.148-3.104,1.382-5.219,11.594-13.194c16.735-13.091,26.575-29.03,28.818-46.46h10.945h25.193v25.2v12.854h12.854h19.03h12.854v-12.854v-25.2h25.193h12.854V73.741v-19.03V41.858h-12.86V41.852z M149.777,122.92c-13.914,10.868-16.556,15.424-16.556,24.679c0,7.892,16.633,19.66,24.281,25.38c26.639,19.981,32.031,32.545,32.031,57.539c0,31.17-33.599,62.16-88.228,62.16c-47.918,0-88.35-19.48-88.35-50.65c0-31.659,33.548-64.635,81.46-64.635c5.225,0,10.007-0.129,14.962-0.129c-6.562-6.388-11.864-11.89-11.864-21.523c0-5.72,1.825-11.176,4.383-16.074c-2.609,0.186-5.257,0.328-8.001,0.328c-39.352,0-62.263-27.655-62.263-62.34c0-33.947,34.872-64.815,76.73-64.815c21.562,0,82.469,0,82.469,0L172.4,32.198h-21.652c15.27,8.753,23.407,26.774,23.407,46.64C174.154,97.064,164.039,111.763,149.777,122.92z M292.575,73.735h-38.047v38.053h-19.03V73.735h-38.047v-19.03h38.047V16.652h19.03v38.053h38.047V73.735z M95.933,26.266c-0.321-0.006-0.636-0.013-0.951-0.013c-21.691,0-36.132,22.121-32.34,50.901c3.843,29.184,24.962,49.577,47.192,50.239c0.386,0.013,0.758,0.013,1.138,0.013c21.523,0,33.818-18.638,30.045-47.334C137.181,50.888,118.151,26.935,95.933,26.266z M123.151,109.578c-2.943,3.355-6.928,4.981-12.185,4.981l-0.752-0.006c-16.993-0.508-31.967-17.307-34.827-39.069c-1.626-12.352,0.906-23.715,6.774-30.412c3.47-3.953,7.783-5.958,12.828-5.964l0.572,0.006c15.007,0.45,29.686,19.576,32.713,42.636C129.861,93.909,127.997,104.044,123.151,109.578z M105.272,187.156c-0.289-0.006-0.578-0.006-0.868-0.006c-32.732,0-60.322,21.144-60.322,45.611c0,25.193,23.921,46.158,57.038,46.158c46.562,0,62.803-19.685,62.803-44.872c0-3.04-0.392-6.016-1.054-8.888c-3.638-14.261-18.149-22.07-36.138-34.57C120.195,188.473,112.997,187.227,105.272,187.156z M150.414,228.333c0.411,1.787,0.656,3.805,0.656,5.707c0,7.918,0,32.018-49.949,32.018c-24.775,0-44.184-14.627-44.184-33.304c0-17.14,22.629-32.758,47.469-32.758l0.72,0.006c5.508,0.051,10.861,0.823,15.945,2.275c2.069,1.433,4.094,2.796,6.054,4.126C140.78,215.64,148.601,221.212,150.414,228.333z";
        break;
      case 'linkedin':
        _this.viewbox = "0 0 288.693 288.693";
        _this.path = "M74.609,288.359H4.544V91.698h70.065V288.359z M17.397,275.506h44.358V104.552H17.397V275.506z M39.589,79.423C17.764,79.423,0,61.678,0,39.872S17.764,0.334,39.589,0.334c21.819,0,39.564,17.738,39.564,39.538C79.153,61.685,61.408,79.423,39.589,79.423z M39.589,13.188c-14.743,0-26.736,11.973-26.736,26.684c0,14.724,11.992,26.697,26.736,26.697c14.73,0,26.71-11.98,26.71-26.697C66.299,25.161,54.32,13.188,39.589,13.188zM288.693,288.359h-69.969v-95.798c0-28.67-3.483-42.314-23.297-42.314c-20.045,0-27.854,11.427-27.854,40.759v97.354H97.63V91.698h67.642v13.914c10.771-10.148,27.096-18.477,48.439-18.477c66.068,0,74.975,47.514,74.975,93.992v107.232H288.693zM231.578,275.506h44.262v-94.378c0-50.091-10.392-81.139-62.122-81.139c-25.515,0-42.019,14.145-48.4,26.254l-1.806,3.432h-11.086v-25.116H110.49v170.954h44.236v-84.506c0-14.66,0-53.613,40.708-53.613c36.151,0,36.151,35.887,36.151,55.168v82.945H231.578z";
        break;
      case 'pinrest':
        _this.viewbox = "0 0 296.039 296.039";
        _this.path = "M87.569,296.039c-4.319,0-7.879-3.078-8.471-7.32l-0.103-0.701c-2.037-13.959-4.666-40.759,0.72-63.491l20.418-86.55c-1.677-4.171-4.859-13.779-4.859-26.337c0-27.218,16.594-48.535,37.777-48.535c16.967,0,28.362,12.397,28.362,30.849c0,10.456-3.978,23.355-8.194,37.012c-2.262,7.346-4.608,14.93-6.33,22.192c-1.407,5.964-0.264,11.658,3.213,16.054c3.708,4.685,9.621,7.365,16.208,7.365c25.315,0,45.149-35.161,45.149-80.059c0-34.486-23.471-55.907-61.254-55.907c-47.841,0-73.664,36.832-73.664,71.486c0,11.523,2.924,20.341,9.21,27.732c3.843,4.576,5.456,8.124,3.644,14.885c-0.437,1.645-1.17,4.531-1.857,7.282l-1.465,5.752c-1.954,7.519-9.525,11.363-16.774,8.387c-23.368-9.525-37.314-34.988-37.314-68.092C31.983,54.937,77.871,0,154.652,0c68.484,0,109.404,50.65,109.404,99.616c0,68.317-39.615,117.9-94.192,117.9c-13.631,0-27.269-5.071-36.582-12.982c-2.95,11.652-7.127,28.079-8.393,32.7c-6.356,23.059-23.194,46.158-30.135,55.02C92.762,294.825,90.268,296.039,87.569,296.039z M133.052,75.959c-13.978,0-24.923,15.669-24.923,35.682c0,13.49,4.46,22.809,4.512,22.899l1.003,2.063l-0.514,2.256l-20.906,88.626c-3.098,13.091-3.683,30.213-1.735,48.966c7.603-10.694,17.661-26.838,22.012-42.629c1.941-7.082,11.305-44.197,11.395-44.577l4.113-16.292l7.815,14.872c4.345,8.271,18.265,16.832,34.043,16.832c47.886,0,81.338-43.195,81.338-105.047c0-42.648-36.112-86.762-96.55-86.762c-75.747,0-109.815,55.663-109.815,95.188c0,27.892,10.521,48.272,28.876,56.016l1.356-5.199c0.707-2.815,1.459-5.784,1.909-7.462c0.289-1.086,0.321-1.485,0.328-1.594c-0.051,0.084-0.264-0.36-1.375-1.677c-8.233-9.692-12.243-21.485-12.243-36.029c0-48.079,37.192-84.339,86.518-84.339c45.02,0,74.108,26.993,74.108,68.761c0,52.97-24.93,92.913-58.002,92.913c-10.546,0-20.129-4.454-26.286-12.237c-5.971-7.545-7.969-17.134-5.643-26.999c1.819-7.68,4.229-15.476,6.562-23.021c3.92-12.706,7.629-24.705,7.629-33.22C148.56,88.542,147.049,75.959,133.052,75.959z";
        break;
      case 'skype':
        _this.viewbox = "0 0 297.331 297.331";
        _this.path = "M211.109,139.359c-6.748-4.383-14.962-8.149-24.441-11.189c-9.036-2.879-19.191-5.534-30.084-7.873c-8.419-1.947-14.576-3.451-18.246-4.473c-3.213-0.893-6.44-2.14-9.595-3.715c-2.577-1.298-4.563-2.776-5.881-4.37c-0.848-1.048-1.208-2.159-1.208-3.734c0-1.825,0.617-4.319,5.399-7.455c4.717-3.098,11.331-4.672,19.64-4.672c11.658,0,16.575,2.41,18.458,3.843c3.882,2.95,7.314,7.23,10.328,12.982c3.284,5.643,6.24,9.525,9.28,12.198c3.895,3.458,9.21,5.212,15.784,5.212c7.159,0,13.516-2.661,18.368-7.706c4.769-4.955,7.288-10.964,7.288-17.372c0-6.041-1.665-12.198-4.949-18.304c-3.175-5.9-8.13-11.504-14.724-16.658c-6.478-5.045-14.595-9.107-24.139-12.076c-9.415-2.924-20.553-4.409-33.117-4.409c-15.714,0-29.679,2.224-41.492,6.6c-12.404,4.582-22.102,11.356-28.85,20.142c-6.902,9.004-10.405,19.428-10.405,30.984c0,12.095,3.381,22.462,10.064,30.83c6.324,7.905,14.904,14.21,25.495,18.715c9.756,4.152,21.941,7.802,36.26,10.861c9.955,2.082,18.014,4.081,23.953,5.932c4.891,1.517,8.856,3.676,11.787,6.414c2.179,2.037,3.143,4.512,3.143,8.014c0,3.046-0.81,7.089-7.108,11.382c-5.72,3.901-13.561,5.887-23.323,5.887c-7.095,0-12.712-0.951-16.684-2.834c-3.85-1.819-6.825-4.087-8.83-6.722c-2.423-3.207-4.756-7.359-6.909-12.275c-2.519-5.919-5.739-10.579-9.608-13.876c-4.422-3.721-9.775-5.604-15.932-5.604c-7.159,0-13.509,2.391-18.361,6.935c-4.968,4.685-7.603,10.669-7.603,17.314c0,9.178,3.265,18.548,9.711,27.841c6.228,8.965,14.39,16.202,24.293,21.549c13.516,7.179,30.643,10.823,50.913,10.823c16.87,0,31.768-2.641,44.281-7.847c12.969-5.386,23.053-13.072,29.968-22.854c6.986-9.904,10.534-21.202,10.534-33.574c0-10.334-2.108-19.325-6.266-26.704C224.187,150.234,218.403,144.128,211.109,139.359zM213.525,210.389c-5.489,7.77-13.702,13.959-24.409,18.4c-10.932,4.55-24.171,6.857-39.339,6.857c-18.149,0-33.246-3.13-44.846-9.293c-8.079-4.364-14.743-10.27-19.801-17.539c-4.923-7.102-7.417-14.01-7.417-20.514c0-3.143,1.131-5.675,3.541-7.944c2.487-2.32,5.617-3.451,9.57-3.451c3.085,0,5.591,0.842,7.629,2.558c2.307,1.967,4.364,5.026,6.112,9.158c2.584,5.906,5.437,10.926,8.471,14.949c3.278,4.312,7.847,7.873,13.573,10.579c5.707,2.706,13.169,4.075,22.179,4.075c12.397,0,22.68-2.738,30.572-8.13c8.438-5.752,12.719-13.156,12.719-21.999c0-7.057-2.423-12.905-7.217-17.404c-4.37-4.081-10.007-7.204-16.742-9.3c-6.324-1.973-14.782-4.068-25.11-6.228c-13.49-2.892-24.891-6.292-33.882-10.116c-8.612-3.67-15.502-8.696-20.489-14.917c-4.807-6.028-7.249-13.696-7.249-22.802c0-8.663,2.609-16.453,7.751-23.162c5.238-6.832,13.014-12.185,23.117-15.913c10.379-3.85,22.847-5.797,37.031-5.797c11.273,0,21.131,1.285,29.306,3.83c8.053,2.5,14.801,5.848,20.045,9.936c5.186,4.042,8.985,8.291,11.311,12.609c2.269,4.21,3.413,8.323,3.413,12.211c0,3.104-1.208,5.874-3.689,8.458c-2.449,2.539-5.431,3.766-9.113,3.766c-2.294,0-5.418-0.341-7.275-1.999c-1.941-1.703-4.19-4.737-6.549-8.779c-3.766-7.179-8.406-12.892-13.792-16.993c-5.726-4.351-14.306-6.465-26.241-6.465c-10.855,0-19.84,2.282-26.691,6.78c-7.429,4.872-11.196,10.996-11.196,18.201c0,4.524,1.382,8.509,4.126,11.877c2.487,3.021,5.868,5.611,10.064,7.719c3.901,1.954,7.911,3.503,11.915,4.608c3.747,1.048,10.064,2.596,18.882,4.64c10.585,2.275,20.335,4.82,28.966,7.571c8.381,2.693,15.566,5.964,21.344,9.724c5.54,3.618,9.917,8.22,12.995,13.696c3.059,5.437,4.608,12.301,4.608,20.405C221.7,193.904,218.943,202.702,213.525,210.389zM287.582,178.062c1.851-9.178,2.796-18.554,2.796-27.905c0-77.308-62.899-140.201-140.214-140.201c-7.262,0-14.512,0.553-21.575,1.658C115.696,4.01,101.03,0,86.004,0C39.673,0,1.986,37.687,1.986,84.012c0,14.107,3.567,28.002,10.328,40.348c-1.581,8.554-2.378,17.224-2.378,25.797c0,77.315,62.906,140.221,140.227,140.221c7.899,0,15.778-0.662,23.464-1.967c11.639,5.842,24.615,8.92,37.7,8.92c46.331,0,84.018-37.681,84.018-83.999C295.345,200.999,292.736,189.148,287.582,178.062z M211.327,284.484c-11.729,0-23.362-2.918-33.632-8.438l-1.999-1.073l-2.23,0.411c-7.603,1.42-15.444,2.14-23.31,2.14c-70.239,0-127.373-57.141-127.373-127.367c0-8.516,0.874-17.14,2.584-25.63l0.482-2.41l-1.24-2.121c-6.395-10.887-9.775-23.336-9.775-35.984c0-39.236,31.929-71.158,71.164-71.158c13.426,0,26.517,3.779,37.854,10.926l2.089,1.317l2.442-0.424c7.095-1.234,14.422-1.864,21.781-1.864c70.232,0,127.361,57.128,127.361,127.348c0,9.178-0.996,18.374-2.956,27.346l-0.482,2.211l1.003,2.024c4.917,9.872,7.404,20.502,7.404,31.594C282.491,252.568,250.563,284.484,211.327,284.484z";
        break;
      case 'twitter':
        _this.viewbox = "0 0 341.117 341.117";
        _this.path = "M115.394,304.407c-33.085,0-65.862-9.158-94.777-26.479L0,265.582l24.024,0.405c0.778,0.039,2.031,0.103,4.004,0.103c9.145,0,38.278-1.472,68.15-18.329c-22.455-6.677-41.01-24.036-48.651-46.762l-3.785-11.253l10.309,2.68c-16.523-12.693-27.333-32.205-28.516-53.953l-0.566-10.411l9.557,4.171c1.742,0.765,3.515,1.44,5.315,2.024c-13.573-18.998-21.787-48.355-4.659-79.538l4.717-8.593l5.996,7.757c28.728,37.141,71.325,59.789,117.778,62.899c-0.283-2.886-0.482-5.54-0.482-6.369c0-34.474,26.234-70.13,70.13-70.13c18.426,0,36.164,7.32,49.23,20.206c17.513-4.113,34.249-14.325,34.429-14.435l15.18-9.345l-5.733,16.883c-2.751,8.085-6.941,15.534-12.314,22.038c2.931-0.958,5.81-2.057,8.773-3.348l18.233-8.908l-7.661,16.453c-6.324,13.593-16.87,24.808-29.968,31.98c2.879,44.994-15.624,95.194-48.908,132.059c-24.705,27.372-68.703,60.084-138.016,60.528L115.394,304.407z M47.841,277.472c21.427,9.248,44.409,14.075,67.546,14.075l1.099-0.006c64.628-0.411,105.586-30.836,128.556-56.286c32.031-35.483,49.397-83.999,45.309-126.621l-0.431-4.524l4.113-1.915c6.523-3.04,12.365-7.262,17.269-12.397c-5.488,1.388-11.343,2.423-18.092,3.239l-4.929,0.598l-3.843-9.743l4.473-3.445c6.266-3.67,11.729-8.451,16.144-14.049c-6.986,2.976-15.232,5.887-23.477,7.423l-3.522,0.656l-2.41-2.648c-10.836-11.89-26.254-18.702-42.321-18.702c-35.849,0-57.276,29.12-57.276,57.276c0,1.703,0.848,9.454,1.15,11.446l2.918,8.297l-9.28-0.199c-49.744-1.073-96.023-22.873-128.511-60.181c-12.854,33.754,8.728,60.721,19.036,68.799l15.071,11.819l-19.146-0.334c-5.996-0.103-11.864-0.919-17.552-2.436c5.058,22.558,22.886,40.682,46.048,45.656l25.354,5.45l-24.962,7.025c-4.351,1.221-9.287,1.838-14.672,1.838c-2.519,0-4.929-0.135-7.153-0.341c10.039,17.674,28.734,29.551,49.416,30.56l18.072,0.887L117.264,249.4C92.283,267.774,66.37,274.85,47.841,277.472z";
        break;
      case 'facebook':
      default:
        _this.viewbox = "0 0 288.861 288.861";
        _this.path = "M167.172,288.861h-62.16V159.347H70.769v-59.48h34.242v-33.4C105.011,35.804,124.195,0,178.284,0c19.068,0,33.066,1.787,33.651,1.864l5.739,0.746l-1.382,55.663l-6.324-0.058c-0.013,0-14.223-0.135-29.724-0.135c-11.536,0-13.066,2.847-13.066,14.171v27.629h50.913l-2.821,59.48h-48.086v129.501H167.172z M117.858,276.007h36.453V146.5h48.677l1.607-33.779h-50.284V72.238c0-13.368,3.078-27.025,25.919-27.025c9.178,0,17.899,0.045,23.509,0.09l0.778-31.292c-5.675-0.508-15.116-1.157-26.247-1.157c-44.544,0-60.419,27.693-60.419,53.613v46.254H83.61V146.5h34.242v129.507H117.858z";
    }
  });
});