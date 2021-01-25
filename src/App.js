import React from "react";
import styled from "styled-components";
import mapImage from "./imgs/map.png";

const Root = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Map = styled.div`
  position: relative;
  width: 1096px;
  height: 1096px;
  background-image: url(${mapImage});
  background-size: cover;
`;

const Highlight = styled.div`
  position: absolute;
  left: ${({ x }) => 31 + Math.round(x * 103.5)}px;
  top: ${({ y }) => 31 + Math.round(y * 103.6)}px;
  width: 104px;
  height: 104px;
  background-color: ${({ active }) => (active ? "green" : "red")};
  opacity: 0.2;
  filter: alpha(opacity=20);
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "gray" : "orange")};
  }
`;

const Chosen = styled.div`
  position: absolute;
  left: ${({ x }) => 31 + Math.round(x * 103.5)}px;
  top: ${({ y }) => 31 + Math.round(y * 103.6)}px;
  width: 104px;
  height: 104px;
  background-color: blue;
  opacity: 0.2;
  filter: alpha(opacity=20);
  cursor: pointer;
`;

const Button = styled.button`
  width: 545px;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
  &:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

function countValidLocations(locations) {
  return locations.reduce(
    (count, { active }) => (active ? count + 1 : count),
    0
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
        { id: 0, x: 1, y: 3, active: false },
        { id: 1, x: 1, y: 4, active: false },
        { id: 2, x: 1, y: 5, active: false },
        { id: 3, x: 1, y: 6, active: true },
        { id: 4, x: 1, y: 7, active: false },
        { id: 5, x: 2, y: 1, active: true },
        { id: 6, x: 2, y: 2, active: true },
        { id: 7, x: 2, y: 3, active: true },
        { id: 8, x: 2, y: 4, active: true },
        { id: 9, x: 2, y: 5, active: true },
        { id: 10, x: 2, y: 6, active: true },
        { id: 11, x: 2, y: 7, active: true },
        { id: 12, x: 2, y: 8, active: true },
        { id: 13, x: 3, y: 1, active: true },
        { id: 14, x: 3, y: 2, active: true },
        { id: 15, x: 3, y: 3, active: true },
        { id: 16, x: 3, y: 4, active: true },
        { id: 17, x: 3, y: 5, active: true },
        { id: 18, x: 3, y: 6, active: true },
        { id: 19, x: 3, y: 7, active: true },
        { id: 20, x: 3, y: 8, active: true },
        { id: 21, x: 4, y: 1, active: true },
        { id: 22, x: 4, y: 2, active: true },
        { id: 23, x: 4, y: 3, active: true },
        { id: 24, x: 4, y: 4, active: true },
        { id: 25, x: 4, y: 5, active: true },
        { id: 26, x: 4, y: 6, active: true },
        { id: 27, x: 4, y: 7, active: true },
        { id: 28, x: 4, y: 8, active: true },
        { id: 29, x: 5, y: 1, active: false },
        { id: 30, x: 5, y: 2, active: true },
        { id: 31, x: 5, y: 3, active: true },
        { id: 32, x: 5, y: 4, active: true },
        { id: 33, x: 5, y: 5, active: true },
        { id: 34, x: 5, y: 6, active: true },
        { id: 35, x: 5, y: 7, active: true },
        { id: 36, x: 5, y: 8, active: true },
        { id: 37, x: 6, y: 2, active: true },
        { id: 38, x: 6, y: 3, active: true },
        { id: 39, x: 6, y: 4, active: true },
        { id: 40, x: 6, y: 5, active: true },
        { id: 41, x: 6, y: 6, active: true },
        { id: 42, x: 6, y: 7, active: true },
        { id: 43, x: 6, y: 8, active: true },
        { id: 44, x: 7, y: 2, active: false },
        { id: 45, x: 7, y: 3, active: true },
        { id: 46, x: 7, y: 4, active: true },
        { id: 47, x: 7, y: 5, active: true },
        { id: 48, x: 7, y: 6, active: true },
        { id: 49, x: 7, y: 7, active: true },
        { id: 50, x: 7, y: 8, active: true },
        { id: 51, x: 8, y: 4, active: false },
        { id: 52, x: 8, y: 5, active: true },
        { id: 53, x: 8, y: 6, active: true },
        { id: 54, x: 8, y: 7, active: true },
        { id: 55, x: 8, y: 8, active: true },
      ],
      chosenId: null,
    };
    this.state.amountOfValidLocations = countValidLocations(
      this.state.locations
    );
  }

  onHighlightClick = (i) => {
    this.setState(({ locations }) => {
      const newLocations = [
        ...locations.slice(0, i),
        {
          ...locations[i],
          active: !locations[i].active,
        },
        ...locations.slice(i + 1, locations.length),
      ];

      return {
        locations: newLocations,
        amountOfValidLocations: countValidLocations(newLocations),
      };
    });
  };

  findLocation = () => {
    const locations = this.state.locations.filter(({ active }) => active);
    const chosenId = locations[Math.floor(Math.random() * locations.length)].id;
    this.setState({
      chosenId,
    });
  };

  render() {
    const highlights = this.state.locations.map(({ x, y, active }, i) => (
      <Highlight
        key={`highlight${x}${y}`}
        x={x}
        y={y}
        active={active}
        onClick={() => this.onHighlightClick(i)}
      />
    ));
    return (
      <Root>
        <div>
          <Button
            onClick={this.findLocation}
            disabled={this.state.amountOfValidLocations === 0}
          >
            Find me a location ({this.state.amountOfValidLocations} available)
          </Button>
          <Button
            onClick={() => {
              this.setState({ chosenId: null });
            }}
            disabled={this.state.chosenId === null}
          >
            Mark drop locations
          </Button>
          <Map>
            {this.state.chosenId ? (
              <Chosen
                x={this.state.locations[this.state.chosenId].x}
                y={this.state.locations[this.state.chosenId].y}
              />
            ) : (
              highlights
            )}
          </Map>
        </div>
      </Root>
    );
  }
}

export default App;
