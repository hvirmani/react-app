import React, { Component } from "react";

class Meme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeIng = this.state.allMemeImgs[randNum].url;
    this.setState({
      randomImage: randMemeIng,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="meme col-md-7 px-3"
            style={{ position: "relative", textAlign: "center" }}
          >
            <img
              src={this.state.randomImage}
              alt=""
              height="400px"
              width="90%"
            />
            <h2
              className="topText"
              style={{
                position: "absolute",
                top: "0%",
                right: "50%",
                transform: "translateX(50%)",
                color: "#7d758b",
              }}
            >
              {this.state.topText}
            </h2>
            <h2
              className="bottomText"
              style={{
                position: "absolute",
                bottom: "0%",
                right: "50%",
                transform: "translateX(50%)",
                color: "#7d758b",
              }}
            >
              {this.state.bottomText}
            </h2>
          </div>

          <div className="col-md-5">
            <form className="memeForm px-3" onSubmit={this.handleSubmit}>
              <div className="form-group mb-3">
                <label>
                  <h4>Top text:</h4>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Top Text:"
                  name="topText"
                  value={this.state.topText}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <h4>Bottom text:</h4>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bottom Text:"
                  name="bottomText"
                  value={this.state.bottomText}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-success">Generate Meme</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Meme;
