import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as api from "../utils/api";
import BusinessList from "./BusinessList";
import { Link } from "@reach/router";
import LoadingIndicator from "./LoadingIndicator";

class AllBusinesses extends Component {
  state = {
    businesses: [],
    activeSite: {},
    mapBoundaries: {},
    params: {},
    isLoading: false,
  };

  handleInput = (event) => {
    let newFilter = "";
    let value = "";
    if (event.target.name === "select") {
      newFilter = "cuisine";
      value = event.target.value;
    } else {
      newFilter = event.target.name;
      value = "yes";
    }
    this.setState((currentState) => {
      return { params: { ...currentState.params, [newFilter]: value } };
    });
  };

  handleFilter = (event) => {
    event.preventDefault();
    const { params } = this.state;
    console.log(params, this.state.params, "<--- params, this.state.params");
    api
      .fetchBusinesses(params)
      .then(({ Items }) => {
        this.setState({ businesses: Items, isLoading: false });
      })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  handleUnFilter = (event) => {
    event.preventDefault();
    api
      .fetchBusinesses({})
      .then(({ Items }) => {
        this.setState({ businesses: Items, params: {} });
      })
      .then(() => {
        this.refs["vegetarian"].checked = false;
        this.refs["vegan"].checked = false;
        this.refs["halal"].checked = false;
        this.refs["glutenFree"].checked = false;
        this.refs["cuisine"].value = "";
      })
      .catch((err) => {
        this.setState({ error: err.code });
      });
  };

  componentDidMount = () => {
    console.log("mounting");
    api
      .fetchBusinesses()
      .then(({ Items }) => {
        this.setState({
          businesses: Items,
          isLoading: false,
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
        this.setState({ error: err.code });
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
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) return <LoadingIndicator />;
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
        {this.state.error && <p>An error has occurred - please try again</p>}
        <Map
          id="map"
          center={[53.796, -1.55]}
          zoom={11}
          minZoom={11}
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
          <select
            name="select"
            className="cuisine"
            onChange={this.handleInput}
            ref={"cuisine"}
          >
            <option value="">Cuisine</option>
            <option value="american" name="american">
              American
            </option>
            <option value="british" name="british">
              British
            </option>
            <option value="chinese" name="chinese">
              Chinese
            </option>
            <option value="french" name="french">
              French
            </option>
            <option value="greek" name="greek">
              Greek
            </option>
            <option value="indian" name="indian">
              Indian
            </option>
            <option value="italian" name="italian">
              Italian
            </option>
            <option value="japanese" name="japanese">
              Japanese
            </option>
            <option value="mexican" name="mexican">
              Mexican
            </option>
            <option value="other" name="other">
              Other
            </option>
            <option value="spanish" name="spanish">
              Spanish
            </option>
            <option value="thai" name="thai">
              Thai
            </option>
          </select>
          <section className="checkboxes">
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="checkbox"
              id="vegetarian"
              name="vegetarian"
              value="yes"
              onChange={this.handleInput}
              ref={"vegetarian"}
            />
            <label htmlFor="vegan">Vegan</label>
            <input
              type="checkbox"
              id="vegan"
              name="vegan"
              value="yes"
              onChange={this.handleInput}
              ref={"vegan"}
            />
            <label htmlFor="glutenFree">Gluten-free</label>
            <input
              type="checkbox"
              id="glutenFree"
              name="glutenFree"
              value="yes"
              onChange={this.handleInput}
              ref={"glutenFree"}
            />
            <label htmlFor="halal">Halal</label>
            <input
              type="checkbox"
              id="halal"
              name="halal"
              value="yes"
              onChange={this.handleInput}
              ref={"halal"}
            />
          </section>
          <button className="submitButton" onClick={this.handleFilter}>
            Filter
          </button>
          <button className="submitButton" onClick={this.handleUnFilter}>
            Show all
          </button>
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
