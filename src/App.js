import React from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather'

const API_KEY = '9684d40459b3c0ae18bd8e7ca81bf61b';

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
  const data = await api_call.json();
  console.log(data);

  if (city && country) {
    this.setState({
      temperature: data.main.temp,
      city: data.main,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: undefined
  });
  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please input values"
  });

  }
}

  render() {
      return (
        <div>
          <Title />
          <Form getWeather = {this.getWeather}/>
          <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.humidity}
          error={this.state.error}/>
        </div>
      );
  }
};

export default App;
