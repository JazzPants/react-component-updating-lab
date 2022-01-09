import React, { PureComponent } from "react";

class Timer extends PureComponent {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //font color updates in two ways:
  // every update, which is the interval (one second)
  //and by pressing - and +, it also causes App, and subsequently each timer to re-render(update or state change), thus also changing font color
  //to prevent the effect of - and +, use shouldComponentUpdate
  componentDidUpdate() {
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  //this prevents the - and + button from updating the color, because of the App's state changes!
  //control what triggers update, only when |current time !== next time| then update, so only update
  // on the setInterval update!! (NOT the increment update, like with the + and - buttons )
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.time === nextState.time) {
  //     return false //return shouldComponentUpdate is false, so dont change color of the font, on any other App state changes
  //   }
  //   return true
  // }
  //ALTERNATIVE SOLUTION: use PureComponent to compare current and next props/state, it only allows update it it registers a change/difference.

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
