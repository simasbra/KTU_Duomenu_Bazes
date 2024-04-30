import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Input, Header, ActionsContainer, Label, Select, DatePicker} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherForecastEdit() {
    const navigate = useNavigate();
    const [forecast, setForecast] = useState();
    const [cities, setCities] = useState([]);
    const [stations, setStations] = useState([]);
    const backUrl = useLocation().state?.backUrl;
    const city = useLocation().state?.city;
    const station = useLocation().state?.station;
    const code = useLocation().state?.code;

    useEffect(() => {
        const fetchCities = () => {
            if (!city) {
                axios.get('api/city')
                  .then(response => {
                      const formattedCities = response.data.map(city => ({
                          ...city,
                          foundingDate: format(new Date(city.foundingDate), 'yyyy-MM-dd')
                      }));
                      setCities(formattedCities);
                  })
                  .catch(error => {
                      console.error('Failed to fetch cities', error);
                  });
            } else {
                axios.get(`api/city/${city.name}/${city.country}`)
                  .then(response => {
                      const formattedCity = {
                          ...response.data,
                          foundingDate: format(new Date(response.data.foundingDate), 'yyyy-MM-dd')
                      };
                      setCities([formattedCity]);
                  })
                  .catch(error => {
                      console.error('Failed to fetch city', error);
                  });
            }
        };

        const fetchStations = () => {
            if (!station) {
                axios.get('api/weatherStation')
                  .then(response => {
                      setStations(response.data);
                  })
                  .catch(error => {
                      console.error('Failed to fetch weather stations', error);
                  });
            } else {
                axios.get(`api/weatherStation/${station}`)
                  .then(response => {
                      setStations([response.data]);
                  })
                  .catch(error => {
                      console.error('Failed to fetch weather station', error);
                  });
            }
        };
        
        const fetchWeatherForecast = () => {
            axios.get(`api/weatherForecast/${code}`)
                .then(response => {
                     const formattedData = {
                         ...response.data,
                        date: format(new Date(response.data.date), 'yyyy-MM-dd'),
                    };
                    setForecast(formattedData);
                })
                .catch(error => {
                    console.error('Failed to fetch weather forecast', error);
                });
        }
        
        fetchWeatherForecast()
        fetchStations();
        fetchCities();
    }, []);
    

    const handleInput = (event) => {
        if (event.target.name === 'city') {
            const [fk_CityName, fk_CityCountry] = event.target.value.split(', ');
            setForecast({
                ...forecast,
                fk_CityName,
                fk_CityCountry
            });
        } else if (event.target.name === 'station') {
            setForecast({
                ...forecast,
                fk_WeatherStationCode: event.target.value
            });
        } else {
            setForecast({
                ...forecast,
                [event.target.name]: event.target.value
            });
        }
    }
    

    const handleCancel = () => {
        navigate(`${backUrl}`, {
            state: {
                city: city,
                code: station
            }
        });
    }
    
    const handleSave = (forecast) => {
        if (window.confirm(`Are you sure you want to save ${forecast.code}?`)) {
            axios.post(`api/weatherForecast/insert`, forecast, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert('Weather forecast added successfully');
                    navigate(`${backUrl}`, {
                        state: {
                            city: city,
                            station: station
                        }
                    });
                })
                .catch(error => {
                    console.error('Failed to add the weather forecast' + error);
                });
        }
    }
    
    const handleDateChange = (date) => {
        setForecast({
            ...forecast,
            date: format(date, 'yyyy-MM-dd')
        });
    }

    return (
        <Container>
            <ForecastContainer>
                <Header>Add Weather Forecast</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={forecast?.code} onChange={handleInput}></Input>
                <Label>Date</Label>
                <DatePicker
                    selected={forecast?.date ? new Date(forecast?.date) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <Label>Source</Label>
                <Input type="text" name="source" value={forecast?.source} onChange={handleInput}></Input>
                <Label>Confidence</Label>
                <Input type="text" name="confidence" value={forecast?.confidence} onChange={handleInput}></Input>
                <Label>Weather Station</Label>
                <Select type="text" name="station" value={forecast?.station} onChange={handleInput}>
                    {stations.map((station) => (
                        <option key={station.code} value={station.code}>
                            {station.code}
                        </option>
                    ))}
                </Select>
                <Label>City</Label>
                <Select type="text" name="city" value={forecast?.city} onChange={handleInput}>
                    {cities.map((city) => (
                        <option key={city.name + city.country} value={city.name + ', ' + city.country}>
                            {city.name + ', ' + city.country}
                        </option>
                    ))}
                </Select>
            </ForecastContainer>

            <ActionsContainer>
                <Button onClick={() => handleSave(forecast)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherForecastEdit;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const ForecastContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;