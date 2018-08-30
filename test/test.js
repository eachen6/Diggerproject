Vue.component('carousel-control', {
  props: ['order'],
  template: '<a @click.prevent="handleClick" :class="buttonClass" href="#carouselExampleControls" role="button" :data-slide="order">/
      <span :class="iconClass" aria-hidden="true"></span>/
      <span class="sr-only"><slot></slot></span>/
    </a>',
  data() {
    return {
      buttonClass: 'carousel-control-${this.order}'
    }
  },
  computed: {
    iconClass() {
      return '${this.buttonClass}-icon';
    }
  },
  methods: {
    handleClick(event) {
      if (this.order === 'next') {
        bus.$emit('goNext');
      } else if (this.order === 'prev') {
        bus.$emit('goPrev');
      }
    }
  }
});

Vue.component('carousel-item', {
  props: ['source', 'text', 'active', 'directionClass'],
  template: '<transition name="slide">/
      <div class="carousel-item" :class="directionClass" v-show="active">/
        <img class="d-block w-100" :src="source" :alt="text">/
      </div>/
    </transition>'
});

Vue.component('carousel', {
  template: '<div id="carouselExampleControls" class="carousel slide">/
    <div class="carousel-inner">/
      <carousel-item v-for="image in images" :source="image.source" :text="image.text" :key="image.id" :active="image.isActive" :directionClass="directionClass"></carousel-item>/
    </div>/
    <carousel-control order="prev">Previous</carousel-control>/
    <carousel-control order="next">Next</carousel-control>/
  </div>',
  data() {
    return {
      directionClass: '',
      images: [
        {
          id: 0,
          source: 'https://vignette.wikia.nocookie.net/marveldatabase/images/f/f7/Movie_-_Black_Panther.jpg/revision/latest/scale-to-width-down/670?cb=20180216040635',
          text: 'Black Panther',
          isActive: true
        },
        {
          id: 1,
          source: 'https://vignette.wikia.nocookie.net/marveldatabase/images/a/aa/Comic_-_Infinity_Countdown.jpg/revision/latest/scale-to-width-down/670?cb=20180216045936',
          text: 'Infinity Countdown',
          isActive: false
        },
        {
          id: 2,
          source: 'https://vignette.wikia.nocookie.net/marveldatabase/images/7/74/TV_-_Marvel%27s_Jessica_Jones.jpg/revision/latest/scale-to-width-down/670?cb=20180216044740',
          text: 'Marvel/'s Jessica Jones',
          isActive: false
        },
        {
          id: 3,
          source: 'https://vignette.wikia.nocookie.net/marveldatabase/images/7/7e/Arc_-_Marvel_Legacy.jpg/revision/latest/scale-to-width-down/670?cb=20170429192509',
          text: 'Marvel Legacy',
          isActive: false
        }
      ]
    }
  },
  methods: {
    getActiveIndex() {
      return this.images.findIndex(obj => obj.isActive);
    },
    next() {
      const activeIndex = this.getActiveIndex();
      let nextIndex = activeIndex + 1;
      let activeItem;
      let nextItem;

      if (nextIndex > this.images.length - 1) {
        nextIndex = 0;
      }
      activeItem = this.images[activeIndex];
      nextItem = this.images[nextIndex];

      nextItem.isActive = true;
      activeItem.isActive = false;
      this.directionClass = 'slide-next';
    },
    prev() {
      const activeIndex = this.getActiveIndex();
      let prevIndex = activeIndex - 1;
      let activeItem;
      let prevItem;

      if (prevIndex < 0) {
        prevIndex = this.images.length - 1;
      }
      activeItem = this.images[activeIndex];
      prevItem = this.images[prevIndex];

      prevItem.isActive = true;
      activeItem.isActive = false;
      this.directionClass = 'slide-prev';
    }
  },
  created() {
    bus
      .$on('goPrev', this.prev)
      .$on('goNext', this.next);
  }
});

const bus = new Vue();

const app = new Vue({
  el: '#app'
});

document.onkeydown = e => {
  switch (e.keyCode) {
    case 37:
      bus.$emit('goPrev');
      break;
    case 39:
      bus.$emit('goNext');
      break;
    default:
      break;
  }
};