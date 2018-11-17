'use strict';

const validEvents = ["onClick"];

let React = {
    createElement: (type, props, ...children) => ({ type, props, children }),
    Component: class { }
}

var ReactDOM = {
    render: function(elementConfig, container) {
        const renderedConfig = renderConfig(elementConfig);

        container.appendChild(renderedConfig);
    }
};


//PRIVATE FUNCTIONS

function renderConfig(elementConfig) {
    //create the element
    let el;
    if (typeof(elementConfig.type) === "string") { //DOM node
        el = document.createElement(elementConfig.type);
        for (let propName in elementConfig.props) {
            if (propName === "style") {
                for (let propName in elementConfig.props.style) {
                    el.style[propName] = elementConfig.props.style[propName];
                }
            } else if (propName.startsWith("on") && validEvents.indexOf(propName) >= 0) {
                el.addEventListener(propName.substr(2).toLowerCase(), elementConfig.props[propName]);
            } else {
                el[propName] = elementConfig.props[propName];
            }
        }
    } else { //component/function
        const componentProps = Object.assign({children: elementConfig.children}, elementConfig.props);
        if (elementConfig.type.prototype && elementConfig.type.prototype.render) { //component
            const componentObject = new elementConfig.type(componentProps);
            componentObject.props = componentProps;
            el = renderConfig(componentObject.render());
        } else { //pure function
            el = renderConfig(elementConfig.type(componentProps));
        }
    }

    //append all children
    elementConfig.children.forEach(child => {
        if (child == null) {
            return;
        } else if (typeof(child) === "string" || typeof(child) === "number") { //literal
            el.appendChild(document.createTextNode(child));
        } else if (child.constructor === Array) { //array of children
            for (let c of child) {
                el.appendChild(renderConfig(c)); //NOTE: only handles arrays of elements (no literals, nulls or sub-arrays)
            }
        } else {
            el.appendChild(renderConfig(child));
        }
    });

    return el;
}