import Vue from 'vue'
import moment from 'moment'

Vue.filter('toDate', function(value) {
  if (value) {
    return moment(value, 'DD/MM/YYYY').utc().format()
  }
});

Vue.filter('toFormated', function(value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY')
  }
});
