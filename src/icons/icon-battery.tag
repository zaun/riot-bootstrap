import { domEvent, parentScope } from 'riot-mixin-pack'

<icon-battery>
  <span title="{ name }" data-author="{ author }" data-license="{ license }" data-origial="{ url }">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="{ viewbox }">
    <g>
    	<path d="{ path }"/>
    </g>
    </svg>
  </span>

  <script>

    this.mixin(parentScope).mixin(domEvent)

    function capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    var icon;
    this.viewbox = ""

    this.on('update', e => {
      icon = opts.state || 'empty'

      // defaults
      this.name = capitalizeFirstLetter (icon);
      this.author = "EpicCoders"
      this.license = "CC 3.0 BY"
      this.url = "http://www.flaticon.com/packs/interface-icons/2"

      switch (icon) {
        case 'low':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z"
          break;
        case 'half':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z"
          break;
        case 'high':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629h-34.236V99.475z"
          break;
        case 'full':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M44.454,99.481H78.69v114.616H44.454C44.454,214.097,44.454,99.481,44.454,99.481z M96.422,99.481h34.236v114.616H96.422V99.481z M148.376,99.481h34.236v114.623h-34.236V99.481z M200.337,99.481h34.242v114.616h-34.242V99.481z"
          break;
        case 'charging':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M107.232,158.344H138.8l-20.733,44.088l58.683-55.02l-31.337,0.026l14.705-36.286L107.232,158.344z"
          break;
        case 'outlet':
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M218.275,167.792h-27.34V145.78h26.524c3.843,0,6.954-3.104,6.954-6.96c0-3.843-3.111-6.96-6.954-6.96h-26.524v-16.311h-22.218v0.084c-0.54-0.019-1.067-0.084-1.607-0.084c-20.206,0-36.993,14.55-40.528,33.741H63.748c-4.152,0-7.5,3.355-7.5,7.5s3.348,7.5,7.5,7.5h62.835c3.528,19.184,20.315,33.741,40.528,33.741c0.54,0,1.067-0.071,1.607-0.084v0.096h22.218v-16.324h27.34c3.843,0,6.967-3.117,6.967-6.96C225.241,170.909,222.118,167.792,218.275,167.792z"
          break;
        case 'empty':
        default:
          this.viewbox = "0 0 313.585 313.585"
          this.path = "M260.287,69.493c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.162c0,3.548-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.548-2.886,6.427-6.427,6.427H19.281c-3.554,0-6.427-2.879-6.427-6.427V75.92c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.64H19.281C8.631,56.64,0,65.271,0,75.92v161.744c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281v-26.511h14.737c10.636,0,19.28-8.638,19.28-19.281v-70.162c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.92C279.567,65.264,270.93,56.64,260.287,56.64L260.287,56.64z M229.914,149.372h-29.255v-29.229h-14.814v29.229h-29.236v14.827h29.236v29.236h14.814v-29.236h29.255V149.372z M51.807,149.379h73.292v14.827H51.807V149.379z"
      }
    })
  </script>

  <style scoped>
    :scope {
      display: inline-block;
      width: 1em;
      height: 1em;
    }
    :scope svg {
      display: inline-block;
      margin: 0.05em;
      width: 0.9em;
      height: 0.9em;
    }
  </style>
</icon-battery>
