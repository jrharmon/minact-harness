'use strict';

let React = {
    createElement(type, props) {
        //create the element
        let el = document.createElement(type);
        for (let propName in props) {
            el[propName] = props[propName];
        }

        return el;
    }
}

var ReactDOM = {
    render: function(component, container) {
        container.appendChild(component);
    }
};































//ADDITIONS

//style support
//replace 'el[propName] = props[propName];' with this
if (propName === "style") {
    for (let propName in props.style) {
        el.style[propName] = props.style[propName];
    }
} else {
    el[propName] = props[propName];
}
















//children support
//add ...children to signature

//append all children
children.forEach(child => {
    el.appendChild(child);
});
















//advanced children support
//overwrite el.appendChild(child);
if (child == null) {
    return;
} else if (typeof(child) === "string" || typeof(child) === "number") { //literal
    el.appendChild(document.createTextNode(child));
} else if (child.constructor === Array) { //array of children
    for (let c of child) {
        el.appendChild(c); //NOTE: only handles arrays of elements (no literals, nulls or sub-arrays)
    }
} else {
    el.appendChild(child);
}
















//pure function support
//add this at the start of the function, and wrap the element creation code
//remove the 'let' from the start of the existing el creation line
let el;
if (typeof(type) === "string") { //DOM node
    //element creation code
} else { //component/function
    const componentProps = Object.assign({children: children}, props);
    el = type(componentProps);
}
















//Stateful Class support
let React = {
    createClass(configuration) {
        const ResultClass = function() {};
        ResultClass.prototype.render = configuration.render;
        ResultClass.prototype.getInitialState = configuration.getInitialState;

        return ResultClass;
    }
}

//place inside the else statement, below componentProps definition, and wrap the pure function code
if (type.prototype.render) {
    const componentObject = new type(componentProps);
    componentObject.props = componentProps;
    if (componentObject.getInitialState) {
        componentObject.state = componentObject.getInitialState();
    }
    el = componentObject.render();
} else {
    //pure function code
}
















//ES6 Class Support
//add to React, after createElement()
Component: class { }

//remove the getInitialState code from component creation
















//event support
//add at the top of the file
const validEvents = ["onClick"];
//add after if (propName === "style") {) when creating a DOM element
if (propName === "style") {} //don't copy this line
else if (propName.startsWith("on") && validEvents.indexOf(propName) >= 0) {
    el.addEventListener(propName.substr(2).toLowerCase(), props[propName]);
}