// import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import $ from 'jquery';
import FadeIn from 'react-fade-in';

let user, highscore, highscores, questions;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const renderTime = (dimension, time, total) => {
//   let timeLeft = total - Math.floor(time)
//   return (
//     <div className="time-wrapper">
//       <div className="time">{timeLeft}</div>
//       <div>{dimension}</div>
//     </div>
//   );
// };

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: 35.85,
  lng: -78.7
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false
    };
  }

  renderTime = (dimension, time, total) => {
    let timeLeft = total - Math.floor(time)
    return (
      <div className="time-wrapper">
        <div className="time">{timeLeft}</div>
      </div>
    );
  };

  render() {

    setTimeout(() => {
      this.setState(state => ({
        remove: true
      }));
    }, 5000);

    if (!this.state.remove) {
      return (
        <div id="loading">
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={[["#3f51b5"]]}
          //colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          >
            {({ elapsedTime }) =>
              this.renderTime("Loading...", elapsedTime, 5)
            }
          </CountdownCircleTimer>
        </div>
      )
    }

    else {
      return (<Game score={0} question={1} />);
    }

  }
}

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    getQuestions();

    this.setState(state => ({
      remove: true
    }));

  }

  render() {

    let scoresarray = [];
    //alert(JSON.stringify(highscores));

    for (let x in highscores) {
      scoresarray.push(highscores[x]);
    }

    if (this.props.score > highscore) {
      highscore = this.props.score;
      writeHighScore(this.props.score);
      for (let i = 0; i < scoresarray.length; i++) {
        if (scoresarray[i].name === user.displayName) {
          scoresarray[i].highscore = this.props.score;
        }
      }
    }

    scoresarray.sort(function (a, b) {
      return b.highscore - a.highscore;
    })

    let leaderboard = [];
    let leaderboardLength = scoresarray.length > 10 ? 10 : scoresarray.length;
    for (let i = 0; i < leaderboardLength; i++) {
      if (scoresarray[i].name === user.displayName) {
        leaderboard.push(<p>{i + 1}. {scoresarray[i].name} (You) {scoresarray[i].highscore}</p>);
      }
      else {
        leaderboard.push(<p>{i + 1}. {scoresarray[i].name} {scoresarray[i].highscore}</p>);
      }

    }

    //alert(JSON.stringify(scoresarray));

    if (!this.state.remove) {
      return (
        <div id="leaderboard">
          <FadeIn>
            <h1>Your total score: {this.props.score}</h1>
            <h3>Your high score: {highscore}</h3>
            <p><u><strong><em>Where in the Triangle</em> Leaderboard</strong></u></p>
            <div id="specialdiv">{leaderboard}</div>
            <Button variant="contained" color="primary" size="large" onClick={this.handleClick}>
              PLAY AGAIN
        </Button>
          </FadeIn>
        </div>
      );
    }
    else {
      return (
        <Loading />
      );
    }
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      score: this.props.score,
      currentlyPlaying: true,
      pos: center,
      nextQuestion: false
    };
    //alert(questions.length);
  }

  renderedMarkers(answer) {
    if (this.state.currentlyPlaying) {
      return (
        <Marker
          position={this.state.pos}
          draggable={true}
          onDragEnd={(e) => { this.updatePos(e) }} />
      );
    }
    else {
      this.updateScore(this.state.pos, answer);
      return (
        <div>
          <Marker
            position={this.state.pos}
            draggable={false} />
          <Marker
            position={{ lat: answer[1], lng: answer[0] }}
            draggable={false} />
        </div>
      )
    }
  }

  updateScore(guess, answer) {
    var a = guess.lat - answer[1];
    var b = guess.lng - answer[0];

    var c = Math.sqrt(a * a + b * b);
    var relative = ((0.3354 - c) / 0.3354)
    let tba;
    if (relative <= 0) {
      tba = 0;
    }
    else {
      tba = Math.round(relative * 1000)
    }
    const newScore = this.state.score + tba;
    const newQues = this.state.question + 1;
    setTimeout(
      () => this.setState({
        score: newScore,
        currentlyPlaying: true,
        question: newQues,
        pos: center,
        nextQuestion: true
      }), 1000);
  }

  updatePos(e) {
    //alert((e.latLng.lat()));
    this.setState(state => ({
      pos: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    }));
  }

  renderTime = (dimension, time, total) => {
    let timeLeft = total - Math.floor(time)
    if (timeLeft === 0) {
      this.timesUp();
    }
    return (
      <div className="time-wrapper">
        <div className="time">{timeLeft}</div>
      </div>
    );
  };

  timesUp = () => {
    if (this.state.currentlyPlaying) {
      this.setState({
        currentlyPlaying: false
      });
    }
  }

  render() {

    let questionMsg, isBlank, answer;

    if (this.state.question <= 10 && questions.length === 10) {
      // alert(this.state.question);
      // alert(questions);
      questionMsg = <p>Question {this.state.question}/10 | Score: {this.state.score}</p>;
      isBlank = "is " + questions[this.state.question - 1].properties.name + " ?";
      answer = questions[this.state.question - 1].geometry.coordinates;
    }
    else {
      questionMsg = null;
      isBlank = null;
      answer = null;
    }

    if (!this.state.nextQuestion) {
      return (
        <div id="game">
          {/* <Grid container spacing={3}> */}
          {/* <Grid item xs={12}> */}
          <h1 id="whodat">Where in the Triangle {isBlank}</h1>
          {/* </Grid>
            <Grid item xs={12}> */}
          {questionMsg}
          {/* </Grid>
            <Grid item xs={6}> */}
          {/* <LoadScript
            googleMapsApiKey="AIzaSyCA4Cy8aNp9G4mw0VDqb_jpuAp4Zx0f7c8"
          > */}
          <GoogleMap className="yeet"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
          >
            {this.renderedMarkers(answer)}
            {/* <Marker2 currentlyPlaying={this.state.currentlyPlaying} answer={answer} /> */}
            { /* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
          {/* </LoadScript> */}
          {/* </Grid>
            <Grid item xs={6}> */}
          <div className="gametimer">
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={[["#3f51b5"]]}
            //colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            >
              {({ elapsedTime }) =>
                this.renderTime("seconds", elapsedTime, 10)
              }
            </CountdownCircleTimer>
          </div>
          {/* </Grid> */}
          {/*  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA4Cy8aNp9G4mw0VDqb_jpuAp4Zx0f7c8"
          async></script> */ }
          {/* </Grid> */}
        </div>
      );
    }
    else {
      if (this.state.question === 11) {
        return (<Leaderboard score={this.state.score} />);
      }
      else {
        return (
          <Game question={this.state.question} score={this.state.score} />
        );
      }
    }
  }
}

async function getQuestions() {
  questions = [];

  for (let i = 0; i < 10; i++) {

    const url = 'http://api.opentripmap.com/0.1/en/places/bbox?lon_min=-79&lat_min=35.7&lon_max=-78.4&lat_max=36&format=geojson&apikey=5ae2e3f221c38a28845f05b6deb6509bf9aeb18ce2d3929402dc4f14';
    //alert(url);
    let features;
    const result = await axios({
      method: 'get',
      url: url,
    })
    //alert(JSON.stringify(result));
    features = result.data.features;
    //alert(JSON.stringify(features));
    const idx = Math.floor(Math.random() * features.length);
    if (features[idx].properties.name !== "") {
      questions.push(features[idx]);
    }

  }

  // alert(JSON.stringify(questions));
  // alert(questions.length);
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      highscore: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    getQuestions();

    this.setState(state => ({
      remove: true
    }));

  }

  // componentDidMount() {
  //   checkHighScore().then(score => highscore = score).then(() => this.setState({remove: false, highscore: highscore}));
  // }

  render() {

    if (!this.state.remove) {
      return (
        <div className="welcome">
          <FadeIn>
            {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
            <h1 className><em>Where in the Triangle</em>, a game of (mostly) luck.</h1>
            {/* </Grid>
            <Grid item xs={12}> */}
            <p>Welcome to <em>Where in the Triangle</em>, <strong>{user.displayName}</strong>. Your High Score: <strong>{highscore}</strong> </p>
            <p>You will have 10 seconds to drag the marker where you think (or guess) each place is. </p>
            <p>There will be 10 questions, each worth up to 1000 points depending on how close you are.</p>
            <p id="specialp">Click PLAY to get started!</p>
            {/* </Grid>
            <Grid item xs={12}> */}
            {/* </Grid>
            <Grid item xs={12}> */}
            <Button variant="contained" color="primary" size="large" onClick={this.handleClick}>
              PLAY
              </Button>
          </FadeIn>
          {/* </Grid>
          </Grid> */}
        </div>
      );
    }
    else {
      return (
        <Loading />
      );
    }
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firebased: false
    }
  }

  render() {

    if (!this.state.firebased) {
      this.setState(state => ({
        firebased: true
      }));
      // alert(this.state.firebased);
      // this.state.firebased = true;

      var firebaseui = require('firebaseui');

      const firebaseConfig = {
        apiKey: "AIzaSyBkN4X5xTXBGlIzB5RJ3BTwvw-3fF2UvAQ",
        authDomain: "trivia-cb134.firebaseapp.com",
        projectId: "trivia-cb134",
        databaseURL: "https://trivia-cb134-default-rtdb.firebaseio.com/",
        storageBucket: "trivia-cb134.appspot.com",
        messagingSenderId: "701740834760",
        appId: "1:701740834760:web:483eef67b7474c5759eafd"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        fullLabel: 'Login with your email'
        // Other config options...
      });

      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            //alert("man");
            // const myNode = document.getElementById("root");
            // myNode.innerHTML = '';
            user = firebase.auth().currentUser;
            initializeScores();
            // checkHighScore().then(score => highscore = score);
            // checkHighScores().then(scores => highscores = scores);
            //alert(JSON.stringify(highscores));
            $('#hey').remove();
            $('#about').remove();
            setTimeout(() => { ReactDOM.render(<Home />, document.getElementById('root2')); }, 500);
            //ReactDOM.render(<Home />, document.getElementById('root'));
            return false;
          },
          uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        //signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

      ui.start('#firebaseui-auth-container', uiConfig);

      //database = firebase.database();
    }
    return (
      <div id="welcomepage">
        <LoadScript
          googleMapsApiKey="AIzaSyCA4Cy8aNp9G4mw0VDqb_jpuAp4Zx0f7c8"
        >
          <div id="root2">
            <h1 id="hey">Welcome to <em>Where in the Triangle</em></h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            <p id="about">About: This game was created using React, Firebase, and the Google Maps (to load the maps) and OpenTripMap (to generate the random places) APIs.</p>

          </div>
        </LoadScript>
      </div>
    );
  }
}


function writeHighScore(highscore) {
  firebase.database().ref('users/' + user.uid).set({
    highscore: highscore,
    name: user.displayName
  });
}

function initializeScores() {
  checkHighScore().then(score => highscore = score);
  checkHighScores().then(scores => highscores = scores);
}

async function checkHighScore() {
  var userId = user.uid;
  const dbRef = firebase.database().ref();
  let res = await dbRef.child("users").child(userId).child("highscore").get();
  return res.val();

}

async function checkHighScores() {
  const dbRef = firebase.database().ref();
  let res = await dbRef.child("users").get();
  return res.val();

}

export default Login;
