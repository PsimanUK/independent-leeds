import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import * as api from "../utils/api";
import BusinessList from "./BusinessList";
import { Link } from "@reach/router";

class AllBusinesses extends Component {
  state = {
    businesses: [
      {
        businessName: "Jodi's place",
        latitude: 53.797465,
        longitude: -1.540356,
        id: "35",
        businessEmail: "jodi@place.com",
        about: "Wonderful food for all!",
        postCode: "LS7 4DP",
        logoURL: "https://images.unsplash.com/photo-1580821082847-c53037ecfe0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        tables: "12",
        businessUsername: "jodiplace",
        comments: [],
      },
      {
        businessName: "Simeon's place",
        latitude: 53.78549,
        longitude: -1.556449,
        id: "36",
        businessEmail: "simeon@place.com",
        about: "Pretty good food for some of us!",
        postCode: "LS7 4XL",
        logoURL: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
        tables: "14",
        businessUsername: "simeonplace",
        comments: [],
      },
    ],
    activeSite: {},
    mapBoundaries: {},
  };

  //   componentDidMount = () => {
  //     api
  //       .fetchBusinesses()
  //       .then(({ Items }) => {
  //         this.setState({ businesses: Items });
  //       })
  //       .catch((err) => {
  //         console.log(`Encountered error: ${err}`);
  //       });
  //   };

  componentDidMount = () => {
    this.setState({
      mapBoundaries: {
        west: this.refs.map.leafletElement.getBounds().getWest(),
        north: this.refs.map.leafletElement.getBounds().getNorth(),
        south: this.refs.map.leafletElement.getBounds().getSouth(),
        east: this.refs.map.leafletElement.getBounds().getEast(),
      },
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
    return (
      <main>
        <Map
          id="map"
          center={[53.796, -1.55]}
          zoom={13}
          minZoom={13}
          ref="map"
          onzoomend={() => this.changeBoundaries()}
          onmoveend={() => this.changeBoundaries()}
          className="Map"
        >
          {businesses.map((business) => {
            return (
              <div key={business.id}>
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
                      <Link to={`/business/${business.id}`}>
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
        <select className="cuisine">
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
        //onChange={this.handleInput}
        />
        <label htmlFor="vegan">Vegan</label>
        <input
          type="checkbox"
          id="vegan"
          name="vegan"
          value="yes"
        //onChange={this.handleInput}
        />
        <label htmlFor="glutenFree">Gluten-free</label>
        <input
          type="checkbox"
          id="glutenFree"
          name="glutenFree"
          value="yes"
        //onChange={this.handleInput}
        />
        <label htmlFor="halal">Halal</label>
        <input
          type="checkbox"
          id="halal"
          name="halal"
          value="yes"
        //onChange={this.handleInput}
        />
        <BusinessList
          businesses={this.state.businesses}
          mapBoundaries={mapBoundaries}
        />
      </main>
    );
  }
}

export default AllBusinesses;
