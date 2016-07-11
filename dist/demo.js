(function (riot) {
  'use strict';

  riot = 'default' in riot ? riot['default'] : riot;

  riot.tag2('app', '<header> <h1>Riot Bootstrap</h1> <h2>Bootstrap-like Components for Riot.js</h2> <p>CURRENTLY EXPERIMENTAL</p> </header> <article> <h2>Getting started</h2> <p><a href="https://github.com/cognitom/riot-bootstrap">See our repo</a> on GitHub.</p> </article> <app-btn></app-btn> <app-btn-group></app-btn-group> <app-dropdown></app-dropdown> <app-radio-group></app-radio-group> <app-time-picker></app-time-picker> <app-calendar></app-calendar> <app-inp></app-inp> <app-inp-group></app-inp-group> <app-input-img></app-input-img> <footer> <p> Maintained by <a href="https://github.com/cognitom">@cognitom</a> with the help of our contributors.<br> Code licensed under MIT, documentation under CC BY 3.0 </p> </footer>', 'app,[riot-tag="app"],[data-is="app"]{ display: block; } app code,[riot-tag="app"] code,[data-is="app"] code{ font-family: Menlo, Monaco, Consolas, "Courier New", monospace; } app code,[riot-tag="app"] code,[data-is="app"] code{ padding: 2px 4px; font-size: 90%; color: #c7254e; background-color: #f9f2f4; border-radius: 4px; } app header,[riot-tag="app"] header,[data-is="app"] header{ background: #333; color: white; padding: 2em; } app > *:not(header):not(footer),[riot-tag="app"] > *:not(header):not(footer),[data-is="app"] > *:not(header):not(footer){ padding: 2em; border-bottom: 1px solid #eee; } app h2,[riot-tag="app"] h2,[data-is="app"] h2{ margin: 0; } app section,[riot-tag="app"] section,[data-is="app"] section{ border: 1px solid #ddd; padding: 1em; border-top-left-radius: .25em; border-top-right-radius: .25em; } app section + highlight,[riot-tag="app"] section + highlight,[data-is="app"] section + highlight{ border-top: none; border-top-left-radius: 0; border-top-right-radius: 0; } app section p.comment,[riot-tag="app"] section p.comment,[data-is="app"] section p.comment{ margin: .5em 0 0; color: #999; font-size: 95%; } app footer,[riot-tag="app"] footer,[data-is="app"] footer{ font-size: 90%; line-height: 1.4em; color: #999; padding: 2em; }', '', function (opts) {});

  riot.tag2('app-btn', '<h2>Buttons</h2> <p>Use the <code>&lt;btn&gt;</code> elements.</p> <h3>Disabled</h3> <section> <btn>Normal</btn> <btn disabled>Disabled</btn> <btn disabled="disabled">Disabled</btn> <btn __disabled="{false}">Normal</btn> <btn __disabled="{true}">Disabled</btn> </section> <highlight> &lt;btn&gt;Normal&lt;/btn&gt;<br> &lt;btn disabled&gt;Disabled&lt;/btn&gt;<br> &lt;btn disabled="disabled"&gt;Disabled&lt;/btn&gt;<br> &lt;btn disabled=\\{ false }&gt;Normal&lt;/btn&gt;<br> &lt;btn disabled=\\{ true }&gt;Disabled&lt;/btn&gt; </highlight> <h3>Active (pushed)</h3> <section> <btn>Normal</btn> <btn active>Active</btn> <btn active="active">Active</btn> <btn active="{false}">Normal</btn> <btn active="{true}">Active</btn> </section> <highlight> &lt;btn&gt;\\Normal&lt;/btn&gt;<br> &lt;btn active&gt;\\Active&lt;/btn&gt;<br> &lt;btn active="active"&gt;\\Active&lt;/btn&gt;<br> &lt;btn active=\\{ false }&gt;Normal&lt;/btn&gt;<br> &lt;btn active=\\{ true }&gt;Active&lt;/btn&gt; </highlight> <h3>Events</h3> <section> <btn onclick="{click}">{message}</btn> <btn onclick="{send}" __disabled="{isSending}">Send something!</btn> </section> <highlight> &lt;btn onclick=\\{ click }&gt;\\{ message }&lt;/btn&gt;<br> &lt;btn onclick=\\{ send } disabled=\\{ isSending }&gt;\\Send something!&lt;/btn&gt;<br> </highlight> <h3>Options</h3> <p>Use any of the available button <code>option</code> to quickly create a styled button.</p> <section> <btn>Default</btn> <btn option="primary">Primary</btn> <btn option="success">Success</btn> <btn option="info">Info</btn> <btn option="warning">Warning</btn> <btn option="danger">Danger</btn> <btn option="link">Link</btn> </section> <highlight> &lt;btn&gt;Default&lt;/btn&gt;<br> &lt;btn option="primary"&gt;Primary&lt;/btn&gt;<br> &lt;btn option="success"&gt;Success&lt;/btn&gt;<br> &lt;btn option="info"&gt;Info&lt;/btn&gt;<br> &lt;btn option="warning"&gt;Warning&lt;/btn&gt;<br> &lt;btn option="danger"&gt;Danger&lt;/btn&gt;<br> &lt;btn option="link"&gt;Link&lt;/btn&gt; </highlight> <h3>Sizes</h3> <p>Fancy larger or smaller buttons? Set the <code>size</code> attributes for additional sizes: <code>lg</code>, <code>sm</code>, or <code>xs</code></p> <section> <p> <btn option="primary" size="lg">Large button</btn> <btn size="lg">Large button</btn> </p> <p> <btn option="primary">Default button</btn> <btn>Default button</btn> </p> <p> <btn option="primary" size="sm">Small button</btn> <btn size="sm">Small button</btn> </p> <p> <btn option="primary" size="xs">Extra small button</btn> <btn size="xs">Extra small button</btn> </p> </section> <highlight> &lt;btn option="primary" size="lg"&gt;Large button&lt;/btn&gt;<br> &lt;btn size="lg"&gt;Large button&lt;/btn&gt;<br> <br> &lt;btn option="primary"&gt;Default button&lt;/btn&gt;<br> &lt;btn&gt;Default button&lt;/btn&gt;<br> <br> &lt;btn option="primary" size="sm"&gt;Small button&lt;/btn&gt;<br> &lt;btn size="sm"&gt;Small button&lt;/btn&gt;<br> <br> &lt;btn option="primary" size="xs"&gt;Extra small button&lt;/btn&gt;<br> &lt;btn size="xs"&gt;Extra small button&lt;/btn&gt;<br> </highlight> <h3>Simple link</h3> <section> <btn href="https://github.com/cognitom/riot-bootstrap">Go to repo</btn> </section> <highlight> &lt;btn href="https://github.com/cognitom/riot-bootstrap"&gt;Go to repo&lt;/btn&gt;<br> </highlight>', 'app-btn,[riot-tag="app-btn"],[data-is="app-btn"]{ display: block; }', '', function (opts) {
    var _this = this;

    this.message = 'Click me!';
    this.isSending = false;

    this.click = function (e) {
      _this.message = 'Thanks.';
    };

    this.send = function (e) {
      _this.isSending = true;
    };
  });

  riot.tag2('app-btn-group', '<h2>Button groups</h2> <p>Group a series of buttons together on a single line with the button group. </p> <section> <btn-group> <btn onclick="{clickL}">Left</btn> <btn onclick="{clickM}">Middle</btn> <btn onclick="{clickR}">Right</btn> </btn-group> <btn-group> <btn onclick="{toggle}" __disabled="{isOn}">Turn On</btn> <btn onclick="{toggle}" __disabled="{!isOn}">Turn Off</btn> </btn-group> <p class="comment">{comment}</p> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn onclick=\\{ clickL }&gt;Left&lt;/btn&gt;<br> &nbsp;&lt;btn onclick=\\{ clickM }&gt;Middle&lt;/btn&gt;<br> &nbsp;&lt;btn onclick=\\{ clickR }&gt;Right&lt;/btn&gt;<br> &lt;/btn-group&gt;<br> &lt;btn-group&gt;<br> &nbsp;&lt;btn onclick=\\{ toggle } disabled=\\{ isOn }&gt;Turn Off&lt;/btn&gt;<br> &nbsp;&lt;btn onclick=\\{ toggle } disabled=\\{ !isOn }&gt;Turn On&lt;/btn&gt;<br> &lt;/btn-group&gt; </highlight>', 'app-btn-group,[riot-tag="app-btn-group"],[data-is="app-btn-group"]{ display: block; }', '', function (opts) {
    var _this = this;

    this.comment = 'Click me!';
    this.isOn = false;

    this.clickL = function (e) {
      _this.comment = 'Left button was clicked.';
    };
    this.clickM = function (e) {
      _this.comment = 'Middle button was clicked.';
    };
    this.clickR = function (e) {
      _this.comment = 'Right button was clicked.';
    };
    this.toggle = function (e) {
      _this.isOn = !_this.isOn;
    };
  });

  riot.tag2('app-calendar', '<h2>Calendar</h2> <p>Calendar control. You can choose a single day:</p> <section> <calendar value="2015-10-01"></calendar> </section> <highlight> &lt;calendar value="2015-10-01"&gt;&lt;/calendar&gt;<br> </highlight> <h3>Multiple selection</h3> <section> <calendar multi value="2015-09-01,2015-09-08,2015-09-15"></calendar> </section> <highlight> &lt;calendar multi value="2015-09-01,2015-09-08,2015-09-15"&gt;&lt;/calendar&gt;<br> </highlight> <h3>Language support</h3> <section class="lang-support"> <calendar lang="fr"></calendar> <calendar lang="ja"></calendar> <calendar lang="zh"></calendar> </section> <highlight> &lt;calendar lang="fr"&gt;&lt;/calendar&gt;<br> &lt;calendar lang="ja"&gt;&lt;/calendar&gt;<br> &lt;calendar lang="zh"&gt;&lt;/calendar&gt;<br> </highlight> <h3>Popup (Datepicker)</h3> <section> <btn-group> <btn toggle="menu">{date} <caret></caret></btn> <menu onselect="{select}"> <calendar value="{date}"></calendar> </menu> </btn-group> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;\\{ date } &lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu onselect=\\{ select }&gt;<br> &nbsp;&nbsp;&lt;calendar value=\\{ date }&gt;&lt;/calendar&gt;<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight>', 'app-calendar,[riot-tag="app-calendar"],[data-is="app-calendar"]{ display: block; } app-calendar .lang-support calendar:not(last-child),[riot-tag="app-calendar"] .lang-support calendar:not(last-child),[data-is="app-calendar"] .lang-support calendar:not(last-child){ margin-right: 10px; } app-calendar .lang-support calendar + calendar,[riot-tag="app-calendar"] .lang-support calendar + calendar,[data-is="app-calendar"] .lang-support calendar + calendar{ border-left: 1px solid #eee; padding-left: 10px; }', '', function (opts) {
      var _this = this;

      this.date = '2015-09-01';
      this.select = function (e) {
          _this.date = e.target.value;
      };
  });

  riot.tag2('app-dropdown', '<h2>Dropdowns</h2> <p>Toggleable, contextual menu for displaying lists of links.</p> <section> <btn-group> <btn toggle="menu">Default <caret></caret></btn> <menu onselect="{select}"> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <btn-group> <btn toggle="menu" option="primary">Primary <caret></caret></btn> <menu onselect="{select}"> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <p class="comment">Selected: <strong>{selected}</strong></p> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;Default &lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu onselect=\\{ select }&gt;<br> &nbsp;&nbsp;&lt;menu-item value="action"&gt;Action&lt;/menu-item&gt;<br> &nbsp;&nbsp;&lt;menu-item value="another"&gt;Another action&lt;/menu-item&gt;<br> &nbsp;&nbsp;&lt;menu-item value="something"&gt;Something else here&lt;/menu-item&gt;<br> &nbsp;&nbsp;&lt;menu-item value="separated"&gt;Separated link&lt;/menu-item&gt;<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight> <h3>Headers</h3> <p>Add a header to label sections of actions in any dropdown menu.</p> <section> <btn-group> <btn toggle="menu">Default <caret></caret></btn> <menu> <menu-header>Dropdown header</menu-header> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-header>Dropdown header</menu-header> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <btn-group> <btn toggle="menu" option="primary">Primary <caret></caret></btn> <menu> <menu-header>Dropdown header</menu-header> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-header>Dropdown header</menu-header> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;Default &lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu&gt;<br> &nbsp;&nbsp;&lt;menu-header&gt;Dropdown header&lt;/menu-header&gt;<br> &nbsp;&nbsp;&lt;menu-item value="action"&gt;Action&lt;/menu-item&gt;<br> &nbsp;&nbsp;...<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight> <h3>Divider</h3> <p>Add a divider to separate series of links in a dropdown menu.</p> <section> <btn-group> <btn toggle="menu">Default <caret></caret></btn> <menu> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <btn-group> <btn toggle="menu" option="primary">Primary <caret></caret></btn> <menu> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;Default &lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu&gt;<br> &nbsp;&nbsp;...<br> &nbsp;&nbsp;&lt;menu-divider&gt;&lt;/menu-divider&gt;<br> &nbsp;&nbsp;...<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight> <h3>Split button dropdowns</h3> <section> <btn-group> <btn>Default</btn> <btn toggle="menu"><caret></caret></btn> <menu> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <btn-group> <btn option="primary">Primary</btn> <btn toggle="menu" option="primary"><caret></caret></btn> <menu> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn&gt;Default&lt;/btn&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;&lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu&gt;<br> &nbsp;&nbsp;...<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight> <h3>Right-aligned menu</h3> <section> <btn-group> <btn>Default</btn> <btn toggle="menu"><caret></caret></btn> <menu align="right"> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> <btn-group> <btn option="primary">Primary</btn> <btn toggle="menu" option="primary"><caret></caret></btn> <menu align="right"> <menu-item value="action">Action</menu-item> <menu-item value="another">Another action</menu-item> <menu-item value="something">Something else here</menu-item> <menu-divider></menu-divider> <menu-item value="separated">Separated link</menu-item> </menu> </btn-group> </section> <highlight> &lt;btn-group&gt;<br> &nbsp;&lt;btn&gt;Default&lt;/btn&gt;<br> &nbsp;&lt;btn toggle="menu"&gt;&lt;caret /&gt;&lt;/btn&gt;<br> &nbsp;&lt;menu align="right"&gt;<br> &nbsp;&nbsp;...<br> &nbsp;&lt;/menu&gt;<br> &lt;/btn-group&gt; </highlight>', 'app-dropdown,[riot-tag="app-dropdown"],[data-is="app-dropdown"]{ display: block; }', '', function (opts) {
      var _this = this;

      this.selected = 'none';
      this.select = function (e) {
          _this.selected = e.target.value;
      };
  });

  riot.tag2('app-inp', '<h2>Inputs</h2> <p>Use the <code>&lt;inp&gt;</code> elements.</p> <section> <inp placeholder="Enabled input"></inp> <inp disabled placeholder="Disabled input"></inp> <inp disabled="disabled" placeholder="Disabled input"></inp> <inp __disabled="{false}" placeholder="Enabled input"></inp> <inp __disabled="{true}" placeholder="Disabled input"></inp> </section> <highlight> &lt;inp&gt;&lt;/inp&gt;<br> &lt;inp disabled&gt;&lt;/inp&gt;<br> &lt;inp disabled="disabled"&gt;&lt;/inp&gt;<br> &lt;inp disabled=\\{ false }&gt;&lt;/inp&gt;<br> &lt;inp disabled=\\{ true }&gt;&lt;/inp&gt; </highlight> <h3>Example</h3> <section> <p> <inp value="{inputValue}" placeholder="No value entered" onkeyup="{keyup}"></inp> </p> <p> <span><strong>Value:</strong> {inputValue}</span> </p> </section> <highlight> &lt;p&gt;<br> &nbsp;&nbsp;&lt;inp value=\\{ inputValue } placeholder="No value entered" onkeyup=\\{ keyup }&gt;&lt;/inp&gt;<br> &lt;/p&gt;<br> &lt;p&gt;<br> &nbsp;&nbsp;&lt;span&gt;&lt;strong&gt;Value:&lt;/strong&gt; \\{ inputValue }&lt;/span&gt;<br> &lt;/p&gt;<br> <br> &lt;script&gt;<br> &nbsp;&nbsp;this.inputValue = "Some value"<br> <br> &nbsp;&nbsp;this.keyup = e =&gt; {<br>         &nbsp;&nbsp;&nbsp;&nbsp;this.inputValue = e.target.value;<br>       &nbsp;&nbsp;}<br> &lt;/script&gt; </highlight> <h3>Sizes</h3> <p>Fancy larger or smaller inputs? Set the <code>size</code> attributes for additional sizes: <code>lg</code>, <code>sm</code>, or <code>xs</code></p> <section> <p> <inp size="lg" placeholder="Large input"></inp> </p> <p> <inp placeholder="Default input"></inp> </p> <p> <inp size="sm" placeholder="Small input"></inp> </p> <p> <inp size="xs" placeholder="Extra small input"></inp> </p> </section>', 'app-inp,[riot-tag="app-inp"],[data-is="app-inp"]{ display: block; }', '', function (opts) {
      var _this = this;

      this.inputValue = "Some value";

      this.keyup = function (e) {
          _this.inputValue = e.target.value;
      };
  });

  riot.tag2('app-inp-group', '<h2>Input Groups</h2> <p>Use the <code>&lt;inp-group&gt;</code> and <code>&lt;inp-group-addon&gt;</code> elements.</p> <section> <inp-group> <inp-group-addon>$</inp-group-addon> <inp placeholder="0"></inp> <inp-group-addon>.00</inp-group-addon> </inp-group> <inp-group> <inp-group-addon>@</inp-group-addon> <inp placeholder="Username"></inp> </inp-group> <inp-group> <inp placeholder="first.last"></inp> <inp-group-addon>@gmail.com</inp-group-addon> </inp-group> </section> <highlight> &lt;inp-group&gt;<br> &nbsp;&nbsp;&lt;inp-group-addon&gt;$/in&lt;p-group-addon&gt;<br> &nbsp;&nbsp;&lt;inp placeholder="0"&gt;&lt;/inp&gt;<br> &nbsp;&nbsp;&lt;inp-group-addon&gt;.00&lt;/inp-group-addon&gt;<br> &lt;/inp-group&gt;<br> &lt;inp-group&gt;<br> &nbsp;&nbsp;&lt;inp-group-addon&gt;@&lt;/inp-group-addon&gt;<br> &nbsp;&nbsp;&lt;inp placeholder="Username"&gt;&lt;/inp&gt;<br> &lt;/inp-group&gt;<br> &lt;inp-group&gt;<br> &nbsp;&nbsp;&lt;inp placeholder="first.last"&gt;&lt;/inp&gt;<br> &nbsp;&nbsp;&lt;inp-group-addon&gt;@gmail.com&lt;/inp-group-addon&gt;<br> &lt;/inp-group&gt;<br> </highlight> <h3>Sizes</h3> <p>Fancy larger or smaller inputs? Set the <code>size</code> attributes for additional sizes: <code>lg</code>, <code>sm</code>, or <code>xs</code></p> <section> <p> <inp-group size="lg"> <inp-group-addon>@</inp-group-addon> <inp value="{value}" placeholder="Large input"></inp> </inp-group> </p> <p> <inp-group> <inp-group-addon>@</inp-group-addon> <inp value="{value}" placeholder="Default input"></inp> </inp-group> </p> <p> <inp-group size="sm"> <inp-group-addon>@</inp-group-addon> <inp value="{value}" placeholder="Small input"></inp> </inp-group> </p> <p> <inp-group size="xs"> <inp-group-addon>@</inp-group-addon> <inp value="{value}" placeholder="Extra small input"></inp> </inp-group> </p> </section> <h3>Button Inputs</h3> <section> <p> <inp-group size="lg"> <inp-group-addon> <btn>Normal</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="lg"> <inp-group-addon> <btn option="primary">Primary</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="lg"> <inp-group-addon> <btn option="success">Success</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> </p> <p> <inp-group> <inp-group-addon> <btn>Normal</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group> <inp-group-addon> <btn option="primary">Primary</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group> <inp-group-addon> <btn option="success">Success</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> </p> <p> <inp-group size="sm"> <inp-group-addon> <btn>Normal</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="sm"> <inp-group-addon> <btn option="primary">Primary</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="sm"> <inp-group-addon> <btn option="success">Success</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> </p> <p> <inp-group size="xs"> <inp-group-addon> <btn>Normal</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="xs"> <inp-group-addon> <btn option="primary">Primary</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> <inp-group size="xs"> <inp-group-addon> <btn option="success">Success</btn> </inp-group-addon> <inp placeholder="Buttons"></inp> </inp-group> </p> </section> <highlight> &lt;inp-group&gt;<br> &nbsp;&nbsp;&lt;inp-group-addon&gt;<br> &nbsp;&nbsp;&nbsp;&nbsp;&lt;btn option="success"&gt;Success&lt;/btn&gt;<br> &nbsp;&nbsp;&lt;/inp-group-addon&gt;<br> &nbsp;&nbsp;&lt;inp placeholder="Buttons"&gt;&lt;/inp&gt;<br> &lt;/inp-group&gt; </highlight> <h3>Dropdown Inputs</h3> <section> <p> <inp-group size="lg"> <inp-group-addon> <btn-group> <btn toggle="menu">Default <caret></caret></btn> </btn-group> </inp-group-addon> <inp placeholder="Dropdowns"></inp> </inp-group> </p> </section> <highlight> </highlight>', 'app-inp-group,[riot-tag="app-inp-group"],[data-is="app-inp-group"]{ display: block; }', '', function (opts) {});

  riot.tag2('app-input-img', '<h2>Input Image</h2> <p>Missing input element for image.</p> <section> <input-img value="{image}" onchange="{change}"></input-img> <p class="comment">{comment}</p> </section> <highlight> &lt;input-img name="profile" placeholder="some.png" onchange=\\{ change } /&gt; </highlight>', 'app-input-img,[riot-tag="app-input-img"],[data-is="app-input-img"]{ display: block; }', '', function (opts) {
    var _this = this;

    this.image = "https://avatars1.githubusercontent.com/u/16032?v=3&s=100";
    this.comment = 'Drag your image here!';

    this.change = function (e) {
      _this.image = e.target.value;
      console.log(_this.image);
      _this.comment = 'Image dropped!';
    };
  });

  riot.tag2('app-radio-group', '<h2>Radio groups</h2> <p>Group a series of radio buttons together on a single line. </p> <section> <radio-group name="position" value="{position}" onchange="{change}"> <radio value="first">First</radio> <radio value="second">Second</radio> <radio value="third">Third</radio> </radio-group> <p class="comment">Your selection is <strong>{position}</strong>.</p> </section> <highlight> &lt;radio-group name=\\{ position } value=\\{ position } onchange=\\{ change }&gt;<br> &nbsp;&lt;radio value="first"&gt;First&lt;/radio&gt;<br> &nbsp;&lt;radio value="second"&gt;Second&lt;/radio&gt;<br> &nbsp;&lt;radio value="third"&gt;Third&lt;/radio&gt;<br> &lt;/radio-group&gt; </highlight>', 'app-radio-group,[riot-tag="app-radio-group"],[data-is="app-radio-group"]{ display: block; }', '', function (opts) {
      var _this = this;

      this.position = 'first';

      this.change = function (e) {
          _this.position = e.target.value;
      };
  });

  riot.tag2('app-time-picker', '<h2>Time picker</h2> <p>Use the <code>&lt;time-picker&gt;</code> elements.</p> <section> <time-picker value="{selectedTime}" onchange="{change}"></time-picker> <p class="comment">selected time: {selectedTime}</p> </section> <highlight> &lt;time-picker value=\\{ selectedTime } onchange=\\{ change } /&gt; </highlight>', 'app-time-picker,[riot-tag="app-time-picker"],[data-is="app-time-picker"]{ display: block; }', '', function (opts) {
      var _this = this;

      this.selectedTime = '12:00';

      this.change = function (e) {
          _this.selectedTime = e.target.value;
      };
  });

  riot.tag2('highlight', '<yield></yield>', 'highlight,[riot-tag="highlight"],[data-is="highlight"]{ display: block; font-family: monospace; border: 1px solid #ddd; border-radius: .25em; padding: 1em !important; }', '', function (opts) {
    this.on('mount', function () {
      hljs.highlightBlock(this.root);
    });
  });

  riot.mount('app');

}(riot));