const App = new Vue({
  el: '#app',
  data: {
    students: []
  },
  mounted: function () {
    let self = this

    fetch('/users')
      .then(response => response.json())
      .then(response => {
        self.students = response
      })
  }
})
