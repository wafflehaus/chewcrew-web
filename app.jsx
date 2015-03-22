'use strict';

// Querystring Parameters. Used to keep track of local state.
var qSession = 'session';
var qVoter = 'voter';

/* ChewCrew */
var ChewCrew = React.createClass({
  render: function() {
    var currentScreen = <SessionScreen session={this.props.session} />;
    if (isEmptyStr(this.props.session.voterid)) {
      // VoterID is empty, so the user must not be in a session
      currentScreen = <StartScreen sessionid={this.props.session.id} />;
    }

    return (
      <div className='container' style={{padding: '5%'}}>
        <center>{currentScreen}</center>
      </div>
    );
  }
});

/* StartScreen. 
Used for starting and joining sessions. */
var StartScreen = React.createClass({
  handleClick: function(event) {
    var name = this.refs.name.getDOMNode().value;
    if (isEmptyStr(name)) return;

    var mode = event.target.value; // Value of the submit button
    if (mode === 'Join') {
      sessionJoin(this.props.sessionid, name, function(session) {
        setQsParameters(session);
      });
    } else {
      // mode equals 'Start'
      sessionCreate(name, function(session) {
        setQsParameters(session);
      });    
    }
  },
  render: function() {
    var mode = 'Join';
    if (isEmptyStr(this.props.sessionid)) mode = 'Start';

    return(
      <div className='start row'>
        <h4>{mode} your Chew Crew!</h4>
        <input id='name' ref='name' placeholder='Your Name' value={this.props.name} />
        <br />
        <input className='button-primary' type='submit' value={mode} onClick={this.handleClick} />
      </div>
    );
  }
});

/* SessionScreen. Displays Voters and Main Game screen. 
Used to Ready, Vote, and View Winner */
var SessionScreen = React.createClass({
  render: function() {
    var show;
    if (isEmptyObj(this.props.session.choices) && isEmptyObj(this.props.session.winner)) {
      // lobby is first stage - when people are first joining
      show = <Lobby currentVoter={this.props.session.currentvoter} sessionid={this.props.session.id} voterid={this.props.session.voterid} />;
    } else if (isEmptyObj(this.props.session.winner)) {
      // choices is second stage - when people are voting
      show = <Choices items={this.props.session.choices} sessionid={this.props.session.id} voterid={this.props.session.voterid} voted={this.props.session.currentvoter.voted} />;
    } else {
      // winner is final stage - when people are hungry
      show = <Winner winner={this.props.session.winner} />;
    } 

    return(
      <div className='session row'>
        <div className='one-half column'>
          <h4>The Crew</h4>
          <Voters items={this.props.session.voters} />
        </div>
        <div className='one-half column'>
          <h4>The Chew</h4>
          {show}
        </div>
      </div>
    );
  }
});

/* Voters */
var Voters = React.createClass({
  voter: function(voter) {
    var flag;
    if (voter.ready) flag='[Ready]';
    if (voter.voted) flag='[Voted]';
    return <code>{voter.name} {flag}</code>;
  },
  render: function() {
    return <voters>{this.props.items.map(this.voter)}</voters>;
  }
});

/* Lobby */
var Lobby = React.createClass({
  ready: function() {
    sessionReady(this.props.sessionid, this.props.voterid, function() {
      // Update page on completion
      refresh();
    });
  },
  render: function() {
    var cv = this.props.currentVoter;
    if (cv.ready) {
      return <h5>Waiting for the others to ready up...</h5>
    } else{
      return <input className='button-primary' value='Ready!' type='submit' onClick={this.ready} />
    }
  }
});

/* Choices */
var Choices = React.createClass({
  choice: function(choice) {
    return <p><input className='button-primary' value={choice.name} type='submit' onClick={this.vote.bind(this, choice.id)} /></p>;
  },
  vote: function(choiceid) {
    sessionVote(this.props.sessionid, this.props.voterid, choiceid, function() {
      // Update page on completion
      refresh();
    });
  },
  render: function() {
    if (this.props.voted) return <h6>Waiting for others to vote</h6>;
    return <choices>{this.props.items.map(this.choice)}</choices>;
  }
});

/* Winner */
var Winner = React.createClass({
  render: function() {
    return (
      <winner>
        <h6>And the winner is...</h6>
        <h4>{this.props.winner.name}</h4>
      </winner>
    );
  }
});

/* Helper functions */
var getQuerystring = function(key) {
  key = key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
  var regex = new RegExp('[\\?&]'+key+'=([^&#]*)');
  var qs = regex.exec(window.location.href);
  if (qs == null) return '';
  return qs[1];
};

var setQsParameters = function(session) {
    clearQuerystring(); // clear to prevent duplicates
    history.pushState({}, {}, 
        window.location.href + '?' + qSession + '=' + session.id + '&' + qVoter + '=' + session.voterid);
    refresh();
};

var clearQuerystring = function(parameter) {
  var baseurl = window.location.href.split('?')[0];
  history.pushState({}, {}, baseurl);
};

var isEmptyObj = function(obj) {
  if (obj === undefined) return true;
  return Object.keys(obj).length === 0;
};

var isEmptyStr = function(str) {
  if (str === undefined) return true;
  if (str.trim() === '') return true;
  return false;
};

// GetSession
// This is the singular source of data, where the data begins
// Used to poll the session for changes
var getSession = function(callback) {
  var sessionId = getQuerystring(qSession);
  var voterId = getQuerystring(qVoter);

  if (sessionId !== '' && voterId !== '') {
    // User is in session
    sessionGet(sessionId, voterId, function(session) {
      if (!isEmptyStr(session.error)) {
        clearQuerystring();
        alert(session.error);
        callback({});
      }

      session.voterid = voterId;
      callback(session);
    });
    return;
  }
  if (sessionId !== '' && voterId === '') {
    // User is joining session
    callback({id: sessionId});
    return;
  }
  // User is at start page
  callback({});
  return;
};

var refresh = function() {
  getSession(function(result) {
      React.render(<ChewCrew session={result} /> , document.getElementsByTagName('chewcrew')[0]);
  });
};

function main() {
  // Start up React on the <chewcrew> element
  refresh();

  // Refresh the session at an interval
  setInterval(function() {
    refresh();
  }, 3000);
}

main();
