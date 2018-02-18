Vue.component('v-save-search', {
  props: ['title', 'description'],
  template: `
    <div class="v-form-group">
      <div class="v-title">
        <span>{{title}}</span>
        <span>
          <b-button variant="info" size="sm" @click="click">
             Save
          </b-button>
        </span><!-- reserved for right aligned content -->
      </div>
      <div class="v-description" v-text="description"></div>
    </div>
  `,
  methods: {
    click() {
      this.$emit('save');
    }
  }
});
