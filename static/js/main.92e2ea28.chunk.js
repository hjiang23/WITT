(this.webpackJsonptrivia=this.webpackJsonptrivia||[]).push([[0],{45:function(e,t,n){},47:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var r,a,i,s,c=n(1),o=n.n(c),l=n(8),u=n.n(l),h=(n(45),n(15)),d=n.n(h),p=n(20),j=n(19),b=n(12),m=n(13),f=n(18),v=n(16),g=(n(47),n(96)),O=n(3),x=(n(26),n(49),n(23)),y=n(17),k=n(37),w=n.n(k),C=n(24),T=n.n(C),I=n(25),P=n.n(I),S=n(2),A={width:"600px",height:"400px"},N={lat:35.85,lng:-78.7},q=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).renderTime=function(e,t,n){var r=n-Math.floor(t);return Object(S.jsx)("div",{className:"time-wrapper",children:Object(S.jsx)("div",{className:"time",children:r})})},r.state={remove:!1},r}return Object(m.a)(n,[{key:"render",value:function(){var e=this;return setTimeout((function(){e.setState((function(e){return{remove:!0}}))}),5e3),this.state.remove?Object(S.jsx)(M,{score:0,question:1}):Object(S.jsx)("div",{id:"loading",children:Object(S.jsx)(x.CountdownCircleTimer,{isPlaying:!0,duration:5,colors:[["#3f51b5"]],children:function(t){var n=t.elapsedTime;return e.renderTime("Loading...",n,5)}})})}}]),n}(o.a.Component),L=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).state={remove:!1},r.handleClick=r.handleClick.bind(Object(j.a)(r)),r}return Object(m.a)(n,[{key:"handleClick",value:function(){_(),this.setState((function(e){return{remove:!0}}))}},{key:"render",value:function(){var e,t=[];for(var n in i)t.push(i[n]);if(this.props.score>a){a=this.props.score,e=this.props.score,O.a.database().ref("users/"+r.uid).set({highscore:e,name:r.displayName});for(var s=0;s<t.length;s++)t[s].name===r.displayName&&(t[s].highscore=this.props.score)}t.sort((function(e,t){return t.highscore-e.highscore}));for(var c=[],o=t.length>10?10:t.length,l=0;l<o;l++)t[l].name===r.displayName?c.push(Object(S.jsxs)("p",{children:[l+1,". ",t[l].name," (You) ",t[l].highscore]})):c.push(Object(S.jsxs)("p",{children:[l+1,". ",t[l].name," ",t[l].highscore]}));return this.state.remove?Object(S.jsx)(q,{}):Object(S.jsx)("div",{id:"leaderboard",children:Object(S.jsxs)(P.a,{children:[Object(S.jsxs)("h1",{children:["Your total score: ",this.props.score]}),Object(S.jsxs)("h3",{children:["Your high score: ",a]}),Object(S.jsx)("p",{children:Object(S.jsx)("u",{children:Object(S.jsxs)("strong",{children:[Object(S.jsx)("em",{children:"Where in the Triangle"})," Leaderboard"]})})}),Object(S.jsx)("div",{id:"specialdiv",children:c}),Object(S.jsx)(g.a,{variant:"contained",color:"primary",size:"large",onClick:this.handleClick,children:"PLAY AGAIN"})]})})}}]),n}(o.a.Component),M=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).renderTime=function(e,t,n){var a=n-Math.floor(t);return 0===a&&r.timesUp(),Object(S.jsx)("div",{className:"time-wrapper",children:Object(S.jsx)("div",{className:"time",children:a})})},r.timesUp=function(){r.state.currentlyPlaying&&r.setState({currentlyPlaying:!1})},r.state={question:r.props.question,score:r.props.score,currentlyPlaying:!0,pos:N,nextQuestion:!1},r}return Object(m.a)(n,[{key:"renderedMarkers",value:function(e){var t=this;return this.state.currentlyPlaying?Object(S.jsx)(y.c,{position:this.state.pos,draggable:!0,onDragEnd:function(e){t.updatePos(e)}}):(this.updateScore(this.state.pos,e),Object(S.jsxs)("div",{children:[Object(S.jsx)(y.c,{position:this.state.pos,draggable:!1}),Object(S.jsx)(y.c,{position:{lat:e[1],lng:e[0]},draggable:!1})]}))}},{key:"updateScore",value:function(e,t){var n,r=this,a=e.lat-t[1],i=e.lng-t[0],s=(.3354-Math.sqrt(a*a+i*i))/.3354;n=s<=0?0:Math.round(1e3*s);var c=this.state.score+n,o=this.state.question+1;setTimeout((function(){return r.setState({score:c,currentlyPlaying:!0,question:o,pos:N,nextQuestion:!0})}),1e3)}},{key:"updatePos",value:function(e){this.setState((function(t){return{pos:{lat:e.latLng.lat(),lng:e.latLng.lng()}}}))}},{key:"render",value:function(){var e,t,r,a=this;return this.state.question<=10&&10===s.length?(e=Object(S.jsxs)("p",{children:["Question ",this.state.question,"/10 | Score: ",this.state.score]}),t="is "+s[this.state.question-1].properties.name+" ?",r=s[this.state.question-1].geometry.coordinates):(e=null,t=null,r=null),this.state.nextQuestion?11===this.state.question?Object(S.jsx)(L,{score:this.state.score}):Object(S.jsx)(n,{question:this.state.question,score:this.state.score}):Object(S.jsxs)("div",{id:"game",children:[Object(S.jsxs)("h1",{id:"whodat",children:["Where in the Triangle ",t]}),e,Object(S.jsxs)(y.a,{className:"yeet",mapContainerStyle:A,center:N,zoom:9,children:[this.renderedMarkers(r),Object(S.jsx)(S.Fragment,{})]}),Object(S.jsx)("div",{className:"gametimer",children:Object(S.jsx)(x.CountdownCircleTimer,{isPlaying:!0,duration:10,colors:[["#3f51b5"]],children:function(e){var t=e.elapsedTime;return a.renderTime("seconds",t,10)}})})]})}}]),n}(o.a.Component);function _(){return B.apply(this,arguments)}function B(){return(B=Object(p.a)(d.a.mark((function e(){var t,n,r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=[],t=0;case 2:if(!(t<10)){e.next=14;break}return"http://api.opentripmap.com/0.1/en/places/bbox?lon_min=-79&lat_min=35.7&lon_max=-78.4&lat_max=36&format=geojson&apikey=5ae2e3f221c38a28845f05b6deb6509bf9aeb18ce2d3929402dc4f14",n=void 0,e.next=7,w()({method:"get",url:"http://api.opentripmap.com/0.1/en/places/bbox?lon_min=-79&lat_min=35.7&lon_max=-78.4&lat_max=36&format=geojson&apikey=5ae2e3f221c38a28845f05b6deb6509bf9aeb18ce2d3929402dc4f14"});case 7:r=e.sent,n=r.data.features,a=Math.floor(Math.random()*n.length),""!==n[a].properties.name&&s.push(n[a]);case 11:t++,e.next=2;break;case 14:alert(JSON.stringify(s));case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).state={remove:!1,highscore:null},r.handleClick=r.handleClick.bind(Object(j.a)(r)),r}return Object(m.a)(n,[{key:"handleClick",value:function(){_(),this.setState((function(e){return{remove:!0}}))}},{key:"render",value:function(){return this.state.remove?Object(S.jsx)(q,{}):Object(S.jsx)("div",{className:"welcome",children:Object(S.jsxs)(P.a,{children:[Object(S.jsxs)("h1",{className:!0,children:[Object(S.jsx)("em",{children:"Where in the Triangle"}),", a game of (mostly) luck."]}),Object(S.jsxs)("p",{children:["Welcome to ",Object(S.jsx)("em",{children:"Where in the Triangle"}),", ",Object(S.jsx)("strong",{children:r.displayName}),". Your High Score: ",Object(S.jsx)("strong",{children:a})," "]}),Object(S.jsx)("p",{children:"You will have 10 seconds to drag the marker where you think (or guess) each place is. "}),Object(S.jsx)("p",{children:"There will be 10 questions, each worth up to 1000 points depending on how close you are."}),Object(S.jsx)("p",{id:"specialp",children:"Click PLAY to get started!"}),Object(S.jsx)(g.a,{variant:"contained",color:"primary",size:"large",onClick:this.handleClick,children:"PLAY"})]})})}}]),n}(o.a.Component);function E(){return(E=Object(p.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.uid,n=O.a.database().ref(),e.next=4,n.child("users").child(t).child("highscore").get();case 4:return a=e.sent,e.abrupt("return",a.val());case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return(F=Object(p.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=O.a.database().ref(),e.next=3,t.child("users").get();case 3:return n=e.sent,e.abrupt("return",n.val());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=function(e){Object(f.a)(s,e);var t=Object(v.a)(s);function s(e){var n;return Object(b.a)(this,s),(n=t.call(this,e)).state={firebased:!1},n}return Object(m.a)(s,[{key:"render",value:function(){if(!this.state.firebased){this.setState((function(e){return{firebased:!0}}));var e=n(75);O.a.apps.length||O.a.initializeApp({apiKey:"AIzaSyBkN4X5xTXBGlIzB5RJ3BTwvw-3fF2UvAQ",authDomain:"trivia-cb134.firebaseapp.com",projectId:"trivia-cb134",databaseURL:"https://trivia-cb134-default-rtdb.firebaseio.com/",storageBucket:"trivia-cb134.appspot.com",messagingSenderId:"701740834760",appId:"1:701740834760:web:483eef67b7474c5759eafd"});var t=new e.auth.AuthUI(O.a.auth());t.start("#firebaseui-auth-container",{signInOptions:[O.a.auth.EmailAuthProvider.PROVIDER_ID],fullLabel:"Login with your email"});var s={callbacks:{signInSuccessWithAuthResult:function(e,t){return r=O.a.auth().currentUser,function(){return E.apply(this,arguments)}().then((function(e){return a=e})),function(){return F.apply(this,arguments)}().then((function(e){return i=e})),T()("#hey").remove(),T()("#about").remove(),setTimeout((function(){u.a.render(Object(S.jsx)(D,{}),document.getElementById("root2"))}),500),!1},uiShown:function(){document.getElementById("loader").style.display="none"}},signInFlow:"popup",signInOptions:[O.a.auth.EmailAuthProvider.PROVIDER_ID],tosUrl:"<your-tos-url>",privacyPolicyUrl:"<your-privacy-policy-url>"};t.start("#firebaseui-auth-container",s)}return Object(S.jsx)("div",{id:"welcomepage",children:Object(S.jsx)(y.b,{googleMapsApiKey:"AIzaSyCA4Cy8aNp9G4mw0VDqb_jpuAp4Zx0f7c8",children:Object(S.jsxs)("div",{id:"root2",children:[Object(S.jsxs)("h1",{id:"hey",children:["Welcome to ",Object(S.jsx)("em",{children:"Where in the Triangle"})]}),Object(S.jsx)("div",{id:"firebaseui-auth-container"}),Object(S.jsx)("div",{id:"loader",children:"Loading..."}),Object(S.jsx)("p",{id:"about",children:"About: This game was created using React, Firebase, and the Google Maps (to load the maps) and OpenTripMap (to generate the random places) APIs."})]})})})}}]),s}(o.a.Component),U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,97)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),i(e),s(e)}))};u.a.render(Object(S.jsx)(R,{}),document.getElementById("root")),U()}},[[82,1,2]]]);
//# sourceMappingURL=main.92e2ea28.chunk.js.map