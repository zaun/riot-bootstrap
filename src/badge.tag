import { domEvent, parentScope } from 'riot-mixin-pack'

<badge>

  <yield/>

  <script>
    this.mixin(parentScope).mixin(domEvent)

    this.on('update', e => {
      if(this.parent && this.parent.root.hasAttribute("option")) {
        this.root.setAttribute("data-parent-option", this.parent.root.getAttribute("option"))
      } else {
        this.root.removeAttribute("data-parent-option")
      }
      if(this.parent && this.parent.root.hasAttribute("size")) {
        this.root.setAttribute("data-parent-size", this.parent.root.getAttribute("size"))
      } else {
        this.root.removeAttribute("data-parent-size")
      }
    });
  </script>

  <style scoped>
    :scope {
      display: inline-block;
      min-width: 1.1em;
      padding: 0 0.5em;
      font-size: inherit;
      line-height: 1;
      height: 1em;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      background-color: #777;
      border-radius: 10px;
      box-sizing: border-box;
    }

    /**
     * Alternate badges
     */

    :scope[option="primary"] {
      background-color: #337ab7;
    }
    :scope[option="success"] {
      background-color: #5cb85c;
    }
    :scope[option="info"] {
      background-color: #5bc0de;
    }
    :scope[option="warning"] {
      background-color: #f0ad4e;
    }
    :scope[option="danger"] {
      background-color: #d9534f;
    }

    :scope[data-parent-option="primary"] {
      color: #337ab7;
      background-color: #fff;
    }
    :scope[data-parent-option="success"] {
      color: #5cb85c;
      background-color: #fff;
    }
    :scope[data-parent-option="info"] {
      color: #5bc0de;
      background-color: #fff;
    }
    :scope[data-parent-option="warning"] {
      color: #f0ad4e;
      background-color: #fff;
    }
    :scope[data-parent-option="danger"] {
      color: #d9534f;
      background-color: #fff;
    }
  </style>

</badge>
