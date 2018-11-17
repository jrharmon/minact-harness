'use strict'

const validEvents = ["onClick"];

let React = {
    createElement: (type, props, ...children) => ({ type, props, children }),
    Component: class { //ES6 classes extend this
        setState(newState) {
            let finalState = Object.assign({}, this.state, newState);
            this.reRender(finalState); //this currently causes a re-render even if the new state is the same as the old state
        }
    }
};

let ReactDOM = {
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

/**
 * Type: ElementConfig
 * {string} type - The main value of the config.  For "dom" configs, it is a string that represents the
 *              name of the node element to be created.  For "component" and "function" configs, it is either a
 *              stateful component function, or a pure function.
 * {any[]} props - an array properties attached to this element
 * {ElementConfig[]} children - an array of child configs
 * {Component} component - an instance of the component, if this element is for a stateful component
 * {DOMNode} node - the DOM node for this config, if this is a DOM config, and not a component/function
 * {ElementConfig} parentConfig - the parent config this one is attached to
 */

/**
 * Creates a method that will be attached to a component object, and when called,
 * will cause the component to be re-rendered, along with its children
 * @param {Object} elementConfig - the config that contains the component this is tied to
 */
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

/**
 * Gets the first DOM node contained by the passed-in config, or its children.
 * A config can either be an HTML tag, where it will have a node directly,
 * or a 'component'/'function' where it won't have a node, but will have a single child.
 * A component/function is guaranteed to have a single rendered child, as the render function can only return a single element.
 * @param {ElementConfig} elementConfig - The config to get the child node from, which must have been already rendered
 */
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

/**
 * Take a config, and run all rendering logic to create a full tree of configs
 * @param {ElementConfig} elementConfig
 * @param {ElementConfig} parentConfig
 * @param {DOMNode} parentNode - Passed in when rendering child configs of a "dom" config.
 * If the child is a "dom" config as well, its rendered node will be appended to it.
 * Otherwise, it will be passed down to any subsequent renderConfig calls, until it gets to a "dom" config.
 */
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
