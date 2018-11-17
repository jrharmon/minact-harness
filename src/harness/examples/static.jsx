let elements = [];

//simplest element
let element = <img src="img/comics/random_number.png" />;
elements.push(element);


//className and style attributes: image has a red border (className) and is centered (style)
element = <img className="red-border"
               src="img/comics/pointers.png"
               style={{ margin: "0 auto", display: "block", maxWidth: "100%" }} />
elements.push(element);


//nested elements
element = (
    <a href="https://xkcd.com/303/">
        <img src="img/comics/compiling.png" />
    </a>
);
elements.push(element);


//children as explicit array, and literal children
let children = [
    <li>Item 1</li>,
    <li>2</li>,
    <li>Item 3</li>
]
element = (
    <ul>{children}</ul>
);
elements.push(element);


//pure function: centers child content
function ReactCenter(props) {
    const style = { textAlign: 'center' };
    return <div style={ style }>{props.children}</div>;
}
element = <ReactCenter><img src="img/comics/estimation.png" /></ReactCenter>;
elements.push(element);


//ES6 class: displays an XKCD comic that links to the original
class XkcdImage extends React.Component{
    render() {
        return (
            <div className="card bg-light mb-3" style={{width: "18rem"}}>
                <h4 className="card-header">{this.props.title}</h4>
                <div className="card-body">
                    <img className="card-img" src={`img/comics/${this.props.path}.png`} title={this.props.altText}></img>
                    <p class="card-text">{this.props.altText}</p>
                    <a href={`https://xkcd.com/${this.props.number}/`} className="btn btn-primary">View Original</a>
                </div>
            </div>
        );
    }
};
element = <XkcdImage path="duty_calls" number="386" title="Duty Calls" altText="What do you want me to do?  LEAVE?  Then they'll keep being wrong!" />
elements.push(element);


//event handler: write to the console when clicking on image
const mouseClick = function(e) {
    console.log("I was clicked");
}
element = <div onClick={mouseClick} className="visible-div">Event Handler Example</div>;
elements.push(element);


module.exports = <div id="examples">{elements}</div>;