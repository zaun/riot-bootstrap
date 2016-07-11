<app-badge>

  <h2>Badges</h2>

  <p>
    Easily highlight new or unread items by adding a <code>&lt;badge&gt;</code>
    element, Bootstrap navs, and more.
  </p>

  <section>
    <p>
      Some text here <badge>4</badge> with a badge in it.
    </p>
    <p>
      Some text here <badge option="primary">4</badge> with a badge in it.
    </p>
    <p>
      Some text here <badge option="success">4</badge> with a badge in it.
    </p>
    <p>
      Some text here <badge option="info">4</badge> with a badge in it.
    </p>
    <p>
      Some text here <badge option="warning">4</badge> with a badge in it.
    </p>
    <p>
      Some text here <badge option="danger">4</badge> with a badge in it.
    </p>
  </section>
  <highlight>
    &lt;p&gt;<br />
      Some text here &lt;badge&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;<br />
    &lt;p&gt;<br />
      Some text here &lt;badge option="primary"&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;<br />
    &lt;p&gt;<br />
      Some text here &lt;badge option="success"&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;<br />
    &lt;p&gt;<br />
      Some text here &lt;badge option="info"&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;<br />
    &lt;p&gt;<br />
      Some text here &lt;badge option="warning"&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;<br />
    &lt;p&gt;<br />
      Some text here &lt;badge option="danger"&gt;4&lt;/badge&gt; with a badge in it.<br />
    &lt;/p&gt;
  </highlight>

  <h3>Buttons with a badge</h3>

  <section>
    <p>
      <btn size="lg">Default <badge>4</badge></btn>
      <btn size="lg" option="primary">Primary <badge>40</badge></btn>
      <btn size="lg" option="success">Success <badge>400</badge></btn>
      <btn size="lg" option="info">Info <badge>4000</badge></btn>
      <btn size="lg" option="warning">Warning <badge>400</badge></btn>
      <btn size="lg" option="danger">Danger <badge>40</badge></btn>
      <btn size="lg" option="link">Link <badge>4</badge></btn>
    </p>
    <p>
      <btn>Default <badge>4</badge></btn>
      <btn option="primary">Primary <badge>40</badge></btn>
      <btn option="success">Success <badge>400</badge></btn>
      <btn option="info">Info <badge>4000</badge></btn>
      <btn option="warning">Warning <badge>400</badge></btn>
      <btn option="danger">Danger <badge>40</badge></btn>
      <btn option="link">Link <badge>4</badge></btn>
    </p>
    <p>
      <btn size="xs">Default <badge>4</badge></btn>
      <btn size="xs" option="primary">Primary <badge>40</badge></btn>
      <btn size="xs" option="success">Success <badge>400</badge></btn>
      <btn size="xs" option="info">Info <badge>4000</badge></btn>
      <btn size="xs" option="warning">Warning <badge>400</badge></btn>
      <btn size="xs" option="danger">Danger <badge>40</badge></btn>
      <btn size="xs" option="link">Link <badge>4</badge></btn>
    </p>
  </section>
  <highlight>
    &lt;btn&gt;Default &lt;badge&gt;4&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="primary"&gt;Primary &lt;badge&gt;40&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="success"&gt;Success &lt;badge&gt;400&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="info"&gt;Info &lt;badge&gt;4000&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="warning"&gt;Warning &lt;badge&gt;400&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="danger"&gt;Danger &lt;badge&gt;40&lt;/badge&gt;&lt;/btn&gt;<br />
    &lt;btn option="link"&gt;Link &lt;badge&gt;4&lt;/badge&gt;&lt;/btn&gt;
  </highlight>


  <style scoped>
    :scope {
      display: block;
    }
  </style>

</app-badge>
