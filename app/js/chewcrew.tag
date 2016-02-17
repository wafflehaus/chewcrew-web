<chewcrew>
  <h3>Chew Crew</h3>
  <screen></screen>

  <script>
    // Router
    var r = riot.route.create();
    r('/',  home);
    r('/*', room);
    riot.route.base('/');
    riot.route.start(true);

    function home() {
	riot.mount('screen', 'home');
    }

    function room(id) {
	riot.mount('screen', 'room', {id});
    }
  </script>

  <style scoped>
    :scope { font-size: 2rem }
    h3 { color: #444 }
    ul { color: #999 }
  </style>
</chewcrew>
