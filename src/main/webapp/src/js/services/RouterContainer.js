module.exports = {
  router: null,
  set: function(router){
      this.router = router;
  },
  get: function(){
      return this.router;
  }
};