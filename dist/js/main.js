!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){function r(e){return React.createElement("button",{className:"square",onClick:e.onClick},e.value)}class n extends React.Component{renderSquare(e){return React.createElement(r,{value:this.props.squares[e],onClick:()=>this.props.onClick(e)})}render(){return React.createElement("div",null,React.createElement("div",{className:"status"},status),React.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),React.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),React.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}function a(e){const t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let r=0;r<t.length;r++){const[n,a,s]=t[r];if(e[n]&&e[n]===e[a]&&e[n]===e[s])return e[n]}return null}e.exports=React.createElement(class extends React.Component{constructor(e){super(e),this.state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0}}handleClick(e){const t=this.state.history.slice(0,this.state.stepNumber+1),r=t[t.length-1].squares.slice();a(r)||r[e]||(r[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:r}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}jumpTo(e){this.setState({stepNumber:e,xIsNext:0==e%2})}render(){const e=this.state.history,t=e[this.state.stepNumber],r=a(t.squares),s=e.map((e,t)=>{const r=t?"Go to move #"+t:"Go to start of game";return React.createElement("li",{key:t},React.createElement("button",{onClick:()=>this.jumpTo(t)},r))});let o;return o=r?"Winner: "+r:"Next Player: "+(this.state.xIsNext?"X":"O"),React.createElement("div",{className:"game"},React.createElement("div",{className:"game-board"},React.createElement(n,{squares:t.squares,onClick:e=>this.handleClick(e)})),React.createElement("div",{className:"game-info"},React.createElement("div",null,o),React.createElement("ol",null,s)))}},null)},function(e,t,r){window.performance.now();let n=r(0);ReactDOM.render(n,document.getElementById("app"));window.performance.now()}]);