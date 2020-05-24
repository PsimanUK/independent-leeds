import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import * as api from "../utils/api";
import BusinessList from "./BusinessList";

class AllBusinesses extends Component {
  state = {
    businesses: [
      {
        businessName: "Jodi's place",
        latitude: 53.8,
        longitude: -1.54,
        id: "35",
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
    this.setState({ mapBoundaries: this.refs.map.leafletElement.getBounds() });
  };

  setActiveSite = (business) => {
    this.setState({ activeSite: business });
  };

  render() {
    const { businesses, activeSite, mapBoundaries } = this.state;
    return (
      <main>
        <Map id="map" center={[53.796, -1.55]} zoom={13} minZoom={13} ref="map">
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
                    <h2>{business.businessName}</h2>
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
        <BusinessList
          businesses={this.state.businesses}
          mapBoundaries={mapBoundaries}
        />
      </main>
    );
  }
}

export default AllBusinesses;
