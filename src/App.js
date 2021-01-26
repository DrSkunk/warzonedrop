import React from "react";
import styled from "styled-components";
import mapImage from "./imgs/map.jpg";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Map = styled.div`
  position: relative;
  background-image: url(${mapImage});
  background-size: cover;
  @media (orientation: landscape) {
    height: 90vh;
    width: 90vh;
  }

  @media (orientation: portrait) {
    height: 100vw;
    width: 100vw;
  }
`;

const InnerMap = styled.div`
  margin: 2.8284%;
  width: calc(100% - 5.65693%);
  height: calc(100% - 5.65693%);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
`;
// 1096 whole map
// 1 border = 31px
// 1 border in % = 2.82846715328467 %
// 2 borders = 62px
// 2 borders % = 62 / 1096 = 5.65693%
// 10 squares = 1096-62 = 1034
// 1 square = 1034 / 10 = 103.4px
// 103.4 / 1096 = 9.43430656934307

const Highlight = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: ${({ x }) => x + 1};
  grid-column-end: ${({ x }) => x + 2};
  grid-row-start: ${({ y }) => y + 1};
  grid-row-end: ${({ y }) => y + 2};
  background-color: ${({ active }) => (active ? "green" : "red")};
  opacity: 0.2;
  filter: alpha(opacity=20);
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "gray" : "orange")};
  }
`;

const Chosen = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: ${({ x }) => x + 1};
  grid-column-end: ${({ x }) => x + 2};
  grid-row-start: ${({ y }) => y + 1};
  grid-row-end: ${({ y }) => y + 2};
  background-color: blue;
  opacity: 0.2;
  filter: alpha(opacity=20);
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border: none;
  margin: 0.5em;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  @media (orientation: landscape) {
    width: 45vh;
  }

  @media (orientation: portrait) {
    width: 45vw;
  }
`;

const Text = styled.div`
  font-size: 1.6em;
`;

function countValidLocations(locations) {
  return locations.reduce(
    (count, { active }) => (active ? count + 1 : count),
    0
  );
}

const columnLookup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// TODO add persistent location preference
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
    const { locations, chosenId } = this.state;
    const highlights = locations.map(({ x, y, active, id }, i) => (
      <Highlight
        key={`highlight${x}${y}`}
        x={x}
        y={y}
        active={active}
        onClick={() => this.onHighlightClick(id)}
      />
    ));
    return (
      <Root>
        <Buttons>
          <Button
            onClick={this.findLocation}
            disabled={this.state.amountOfValidLocations === 0}
          >
            Find me a location
          </Button>
          <Button
            onClick={() => {
              this.setState({ chosenId: null });
            }}
            disabled={chosenId === null}
          >
            Mark drop locations
          </Button>
        </Buttons>
        <Map>
          <InnerMap>
            {this.state.chosenId ? (
              <Chosen
                x={locations[this.state.chosenId].x}
                y={locations[this.state.chosenId].y}
              />
            ) : (
              highlights
            )}
          </InnerMap>
        </Map>
        {chosenId && (
          <Text>
            Your location:{" "}
            <strong>
              {columnLookup[locations[chosenId].x]}
              {locations[chosenId].y}
            </strong>
          </Text>
        )}
        <Text>{this.state.amountOfValidLocations} locations available</Text>
      </Root>
    );
  }
}

export default App;
