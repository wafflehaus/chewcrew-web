<room>
  <h4>Room</h4>
  
  <script>
    addressFunc(e) {
      this.address = e.target.value; 
    }

    newFunc(e) {
      console.log(e);
      api.create(this.address, function(result) {
	// Update the URL to include the RoomID
        util.setState(result.id);

	// Refresh the router after the URL change
	riot.route.exec();
	
	// Set the HostID
	sessionStorage.setItem('hostid', result.hostid);
      });
    }
  </script>

  <script>
    console.log(opts);
    console.log(opts.id);
  </script>
</room>
