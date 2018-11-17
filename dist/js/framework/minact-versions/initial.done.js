'use strict';

const validEvents = ["onClick"];

let React = {
    createElement(type, props, ...children) {
        //create the element
        let el;
        if (typeof(type) === "string") { //DOM node
            el = document.createElement(type);
            for (let propName in props) {
                if (propName === "style") {
                    for (let propName in props.style) {
                        el.style[propName] = props.style[propName];
                    }
                } else if (propName.startsWith("on") && validEvents.indexOf(propName) >= 0) {
                    el.addEventListener(propName.substr(2).toLowerCase(), props[propName]);
                } else {
                    el[propName] = props[propName];
                }
            }
        } else { //component/function
            const componentProps = Object.assign({children: children}, props);
            if (type.prototype.render) {
                const componentObject = new type(componentProps);
                componentObject.props = componentProps;
                el = componentObject.render();
            } else {
                el = type(componentProps);
            }
        }

        //append all children
        children.forEach(child => {
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
        });

        return el;
    },
    Component: class { }
}

var ReactDOM = {
    render: function(component, container) {
        container.appendChild(component);
    }
};