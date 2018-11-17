class NumberIncrementer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        }
    }
    handleClick() {
        this.setState({number: this.state.number + 1});
        this.setState({number: this.state.number + 2});
    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()}>Increment</button>
                { this.state.number }
            </div>
        );
    }
};
let element = <NumberIncrementer />


module.exports = element;