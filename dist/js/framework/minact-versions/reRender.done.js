'use strict';

const validEvents = ["onClick"];

let React = {
    createElement: (type, props, ...children) => ({ type, props, children }),
    Component: class {
        setState(newState) {
            let finalState = Object.assign({}, this.state, newState);
            this.reRender(finalState); //this currently causes a re-render even if the new state is the same as the old state
        }
    }
}

var ReactDOM = {
    render(elementConfig, container, prevRenderedNode) {
        const renderedConfig = renderConfig(elementConfig, elementConfig.parentConfig);
        const childNode = getChildNode(renderedConfig);

        if (prevRenderedNode) {
            container.replaceChild(childNode, prevRenderedNode);
        } else {
            container.appendChild(childNode);
        }
    }
};


//PRIVATE FUNCTIONS

function createReRenderer(elementConfig) {
    let hasBeenCalled = false;
    let finalState;
    return (newState) => {
        finalState = newState;
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            window.requestAnimationFrame(() => {
                elementConfig.component.state = finalState;
                const childNode = getChildNode(elementConfig);
                ReactDOM.render(elementConfig, childNode.parentNode, childNode);
            });
        }
    }
}

function getChildNode(elementConfig) {
    if (elementConfig.node) {
        return elementConfig.node;
    }

    let curConfig = elementConfig.children[0];
    while (!curConfig.node) {
        curConfig = curConfig.children[0];
    }

    return curConfig.node;
}

function renderConfig(elementConfig, parentConfig, parentNode) {
    elementConfig.parentConfig = parentConfig;

    //create DOM node
    if (typeof(elementConfig.type) === "string") {
        //create the node itself
        const elementNode = document.createElement(elementConfig.type);
        for (let propName in elementConfig.props) {
            if (propName === "style") {
                for (let propName in elementConfig.props.style) {
                    elementNode.style[propName] = elementConfig.props.style[propName];
                }
            } else if (propName.startsWith("on") && validEvents.indexOf(propName) >= 0) {
                elementNode.addEventListener(propName.substr(2).toLowerCase(), elementConfig.props[propName]);
            } else {
                elementNode[propName] = elementConfig.props[propName];
            }
        }
        elementConfig.node = elementNode;

        //create any children
        if (elementConfig.children) {
            let renderChildConfig = (child) => {
                if (child == null) {
                    return;
                } else if (typeof(child) === "string" || typeof(child) === "number") { //literal
                    elementConfig.node.appendChild(document.createTextNode(child));
                } else if (child.constructor === Array) {
                    for (let c of child) {
                        renderChildConfig(c);
                    }
                } else {
                    renderConfig(child, elementConfig, elementConfig.node);
                }
            }
            elementConfig.children.forEach(child => {
                renderChildConfig(child);
            });
        }

        //if there is a parentNode, attach the newly created node to it
        if (parentNode) {
            parentNode.appendChild(elementConfig.node);
        }
    }

    //component or function
    else {
        const componentProps = Object.assign({children: elementConfig.children}, elementConfig.props);
        if (elementConfig.type.prototype && elementConfig.type.prototype.render) { //component
            //create a new component if needed, otherwise leave it alone, so you don't erase state
            if (!elementConfig.component) {
                const elementComponent = new elementConfig.type(componentProps);
                elementComponent.props = elementConfig.props;
                elementConfig.component = elementComponent;
            }
            elementConfig.children = [ renderConfig(elementConfig.component.render(), elementConfig, parentNode) ];
            elementConfig.component.reRender = createReRenderer(elementConfig);
        } else { //pure function
            elementConfig.children = [ renderConfig(elementConfig.type(componentProps), elementConfig, parentNode) ];
        }
    }

    return elementConfig;
}