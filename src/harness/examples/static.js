//simplest element
let element = React.createElement("img", { src: "img/comics/random_number.png" });
















































//className and style attributes: image has a red border (className) and is centered (style)
// element = React.createElement("img", {
//     className: "red-border",
//     src: "img/comics/pointers.png",
//     style: { margin: "0 auto", display: "block", maxWidth: "100%" }
// });
















//nested/children elements
// element = React.createElement("a", { href: "https://xkcd.com/303/" },
//     React.createElement("img", {
//         src: "img/comics/compiling.png",
//     })
// );
















//children as explicit array, and literal children
// let children = [
//     React.createElement("li", {}, "Item 1"),
//     React.createElement("li", {}, 2),
//     React.createElement("li", {}, "Item 3")
// ]
// element = React.createElement("ul", {}, children);
















//pure function: centers child content, shows how to use props.children
// function ReactCenter(props) {
//     const style = { textAlign: 'center' };
//     return React.createElement('div', { style }, props.children);
// }
// element = React.createElement(ReactCenter, {},
//     React.createElement("img", { src: "img/comics/estimation.png" })
// );
















//Stateful Component: displays an XKCD comic that links to the original
// let XkcdImage = React.createClass({
//     getInitialState: () => ({
//         width: "22rem"
//     }),
//     render: function() {
//         return (
//             React.createElement('div', { className: "card bg-light mb-3", style: { width: this.state.width } },
//                 React.createElement('h4', { className: "card-header" }, this.props.title),
//                 React.createElement('div', { className: "card-body" },
//                     React.createElement('img', { className: "card-img", src: `img/comics/${this.props.path}.png`, title: this.props.altText }),
//                     React.createElement('p', { className: "card-text" }, this.props.altText),
//                     React.createElement('a', { className: "btn btn-primary", href: `https://xkcd.com/${this.props.number}/` }, "View Original")))
//         );
//     }
// });
// element = React.createElement(XkcdImage, {
//     path: 'duty_calls', number: '386', title: "Duty Calls", altText: "What do you want me to do?  LEAVE?  Then they'll keep being wrong!"
// });
















//ES6 class: displays an XKCD comic that links to the original
// class XkcdImage2 extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             width: "22rem"
//         };
//     }

//     render() {
//         return (
//             React.createElement('div', { className: "card bg-light mb-3", style: { width: this.state.width } },
//                 React.createElement('h4', { className: "card-header" }, this.props.title),
//                 React.createElement('div', { className: "card-body" },
//                     React.createElement('img', { className: "card-img", src: `img/comics/${this.props.path}.png`, title: this.props.altText }),
//                     React.createElement('p', { className: "card-text" }, this.props.altText),
//                     React.createElement('a', { className: "btn btn-primary", href: `https://xkcd.com/${this.props.number}/` }, "View Original")))
//         );
//     }
// };
// element = React.createElement(XkcdImage2, {
//     path: 'duty_calls', number: '386', title: "Duty Calls", altText: "What do you want me to do?  LEAVE?  Then they'll keep being wrong!"
// });
















//event handler: write to the console when clicking on image
// const mouseClick = function(e) {
//     console.log("I was clicked");
// }
// element = React.createElement('div', { onClick: mouseClick, className: "visible-div" }, "Event Handler Example");








module.exports = element;