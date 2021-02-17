/*global Vue*/
Vue.config.devtools = true;
'use strict';
new Vue({
  el: '#app',
  data:{
    dateOfEvent: 'Jul 3, 2021 00:00:00',
    intervalFunc: '',
    stillCount: true,
    contentImage: ['01.jpg','cov1.jpg','cov2.jpg','cov3.jpg'],
    swiper1: null,
    swiper2: null,
    showTimeLine: false,
    timelineLength: 5,
    indexTimeline: 3
  },
  methods:{
    countdown(){
      const self = this,
      second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

      let countDown = new Date(self.dateOfEvent).getTime();
      self.intervalFunc = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

        if (distance < 0) {
          clearInterval(self.intervalFunc);
          self.stillCount = false
        } else {
          self.$refs.days.innerText = Math.floor(distance / (day)),
          self.$refs.hours.innerText = Math.floor((distance % (day)) / (hour)),
          self.$refs.minutes.innerText = Math.floor((distance % (hour)) / (minute)),
          self.$refs.seconds.innerText = Math.floor((distance % (minute)) / second);
        }

      }, second)
    },
    initSwiper(){
      this.swiper1 = new Swiper('.swiper--content', {
          effect: 'fade',
          followFinger: false,
          centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          navigation: {
            nextEl: '.content--next',
            prevEl: '.content--prev',
          }
      });
      const self = this
      this.swiper1.on('slideChange',function(){
        for(let i=0;i<self.timelineLength-1;i++) {
          if(self.swiper1.activeIndex == self.indexTimeline+i) {
            self.swiper2.slideTo(i);
          }
        }
        self.swiper1.activeIndex >= self.indexTimeline && self.swiper1.activeIndex <= self.indexTimeline+(self.timelineLength-2) ? self.showTimeLine = true : self.showTimeLine = false;
      });
    },
    initSwiperTimeline(){
      this.swiper2 = new Swiper('.swipertimeline', {
          direction: "vertical",
          slidesPerView: 2,
          spaceBetween: 0,
          speed: 350
      });
      console.log("jalan k")
    }
  },
  filters: {
    dateFormat: function (val) {
      const listMonth = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      let d = new Date(val);
      let dateNumber = d.getDate() == 1 || d.getDate() == 21 || d.getDate() == 31 ? "ST" : d.getDate() == 2 || d.getDate() == 22 ? "ND" : d.getDate() == 3 || d.getDate() == 23 ? "RD" : "TH";
      dateNumber = d.getDate().toString().length < 2 ? "0"+d.getDate()+dateNumber : d.getDate().dateNumber;
      return listMonth[d.getMonth()]+" "+dateNumber+", "+d.getFullYear();
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.initSwiper();
      this.initSwiperTimeline();
      this.countdown();
    });
  },
  beforeDestroy(){
    this.intervalFunc = ''
  }
}); 