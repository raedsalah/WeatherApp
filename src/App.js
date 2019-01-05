import React from "react";
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "1d354042fb1f21587d99fa90a19af05c";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    desc: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "," +
        country +
        "&appid=" +
        API_KEY +
        "&units=metric"
    );
    const data = await api_call.json();
    console.log(data);
    if (city && country) {
      if (data.cod === "404") {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: data.message
        });
      } else {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please fill up all text fields"
      });
    }
  };
  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          desc={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
