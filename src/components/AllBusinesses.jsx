import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as api from "../utils/api";
import BusinessList from "./BusinessList";
import { Link } from "@reach/router";

class AllBusinesses extends Component {
  state = {
    businesses: [],
    activeSite: {},
    mapBoundaries: {},
    params: {},
  };

  handleInput = (event) => {
    const newFilter = event.target.name;
    this.setState((currentState) => {
      console.log({ params: { ...currentState.params, [newFilter]: "yes" } }, "<--- params in state");
      return { params: { ...currentState.params, [newFilter]: "yes" } };
    });
  };

  handleFilter = () => {
    const { params } = this.state;
    console.log(params, this.state.params, "<--- params, this.state.params");
    api.fetchBusinesses(params)
      .then(({ Items }) => {
        this.setState({ businesses: Items })
      })
      .catch((err) => {
        console.log(`Encountered error: ${err}`);
      });
  }

  componentDidMount = () => {
    api
      .fetchBusinesses()
      .then(({ Items }) => {
        this.setState({
          businesses: Items,
          mapBoundaries: {
            west: this.refs.map.leafletElement.getBounds().getWest(),
            north: this.refs.map.leafletElement.getBounds().getNorth(),
            south: this.refs.map.leafletElement.getBounds().getSouth(),
            east: this.refs.map.leafletElement.getBounds().getEast(),
          },
        });
      })
      .then(() => {
        this.setState();
      })
      .catch((err) => {
        console.log(`Encountered error: ${err}`);
      });
  };

  setActiveSite = (business) => {
    this.setState({ activeSite: business });
  };

  changeBoundaries = () => {
    const newBoundaries = this.refs.map.leafletElement.getBounds();
    this.setState({
      mapBoundaries: {
        west: newBoundaries.getWest(),
        north: newBoundaries.getNorth(),
        south: newBoundaries.getSouth(),
        east: newBoundaries.getEast(),
      },
    });
  };

  render() {
    const { businesses, activeSite, mapBoundaries } = this.state;
    const viableBusinesses = businesses.filter(
      (business) =>
        business.businessName &&
        business.verified === "yes" &&
        business.longitude > mapBoundaries.west &&
        business.longitude < mapBoundaries.east &&
        business.latitude > mapBoundaries.south &&
        business.latitude < mapBoundaries.north
    );
    console.log(viableBusinesses, "<-- viableBusinesses");
    return (
      <main>
        <Map
          id="map"
          center={[53.796, -1.55]}
          zoom={12}
          minZoom={12}
          ref="map"
          onzoomend={() => this.changeBoundaries()}
          onmoveend={() => this.changeBoundaries()}
          className="Map"
        >
          {viableBusinesses.map((business) => {
            return (
              <div key={business.businessName}>
                <Marker
                  position={[business.latitude, business.longitude]}
                  className="marker"
                  onClick={() => this.setActiveSite(business)}
                />
                {activeSite.businessName === business.businessName && (
                  <Popup
                    position={[business.latitude + 0.003, business.longitude]}
                  >
                    <h2>
                      <Link to={`/${business.username}`}>
                        {business.businessName}
                      </Link>
                    </h2>
                  </Popup>
                )}
              </div>
            );
          })}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
        <form>
          <select className="cuisine" onChange={this.handleInput}>
            <option value="">
              --SELECT--
          </option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="chinese">Chinese</option>
            <option value="french">French</option>
            <option value="greek">Greek</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="mexican">Mexican</option>
            <option value="other">Other</option>
            <option value="spanish">Spanish</option>
            <option value="thai">Thai</option>
          </select>
          <label htmlFor="vegetarian">Vegetarian</label>
          <input
            type="checkbox"
            id="vegetarian"
            name="vegetarian"
            value="yes"
            onChange={this.handleInput}
          />
          <label htmlFor="vegan">Vegan</label>
          <input
            type="checkbox"
            id="vegan"
            name="vegan"
            value="yes"
            onChange={this.handleInput}
          />
          <label htmlFor="glutenFree">Gluten-free</label>
          <input
            type="checkbox"
            id="glutenFree"
            name="glutenFree"
            value="yes"
            onChange={this.handleInput}
          />
          <label htmlFor="halal">Halal</label>
          <input
            type="checkbox"
            id="halal"
            name="halal"
            value="yes"
            onChange={this.handleInput}
          />
          <button onClick={this.handleFilter}>Filter</button>
        </form>

        <BusinessList
          businesses={viableBusinesses}
          mapBoundaries={mapBoundaries}
        />
      </main>
    );
  }
}

export default AllBusinesses;
