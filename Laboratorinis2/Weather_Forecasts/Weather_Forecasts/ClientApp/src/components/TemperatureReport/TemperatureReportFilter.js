import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import { ActionsContainer, Button, CheckBox, DatePicker, Header, Label, Select, Table } from '../Shared/Components';
import { format } from 'date-fns';
import TemperatureHierarchyTable from './components/TemperatureHierarchyTable';
import TemperatureListTable from './components/TemperatureListTable';

export function TemperatureReportFilter() {

    const [cities, setCities] = useState([]);
    
    const [city, setCity] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [confidence, setConfidence] = useState();
    
    const [isFiltered, setIsFiltered] = useState(false);
    const [temperatureReport, setTemperatureReport] = useState([]);
    const [showList, setShowList] = useState(false);
    const [tooltipActive, setTooltipActive] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchCities = () => {
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
        };

        fetchCities();
    }, []);

    useEffect(() => {
        if (isFiltered) {
            fetchTemperatureReport();
        }
    }, [showList]);

    const fetchTemperatureReport = () => {
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            alert(`${Object.values(errors).join("\n")}`);
            return;
        }
        
        let apiUrl;
        if (showList) {
            apiUrl = `api/temperature/report/list/city=${city}&dateFrom=${dateFrom}&dateTo=${dateTo}&confidence=${confidence}`;
        } else {
            apiUrl = `api/temperature/report/object/city=${city}&dateFrom=${dateFrom}&dateTo=${dateTo}&confidence=${confidence}`;
        }
        
        axios.get(apiUrl)
            .then(response => {
                setTemperatureReport(response.data);
                setIsFiltered(true);
                setNotFound(false);
            })
            .catch(error => {
                console.error('Failed to fetch temperature report', error);
                setNotFound(true);
            });
    }
    
    const validate = () => {
        let errors = {};
        if (!city)
            errors.city = "City is required.";
        if (!dateFrom)
            errors.dateFrom = "Date from is required.";
        if (!dateTo)
            errors.dateTo = "Date to is required.";
        if (!confidence)
            errors.confidence = "Confidence is required.";
        
        return errors;
    }
    
    const handleFilter = () => {
        setIsFiltered(false);
        fetchTemperatureReport();
    }
    
    const handleInput = (event) => {
        if (event.target.name === 'city' && event.target.value !== "") {
            setCity(event.target.value);
        } else if (event.target.name === 'showList') {
            setIsFiltered(false)
            setShowList(event.target.checked);
        } else if (event.target.name === 'confidence') {
            setConfidence(event.target.value);
        }
    }

    const handleDateChange = (selectedDate, dateType) => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        if (dateType === 'dateFrom') {
            setDateFrom(formattedDate);
        } else if (dateType === 'dateTo') {
            setDateTo(formattedDate);
        }
    }

    const handleSliderMouseEnter = () => {
        setTooltipActive(true);
    };

    const handleSliderMouseLeave = () => {
        setTooltipActive(false);
    };
    
    return (
        <Container>
            <Header>Temperature report</Header>
            <InputsContainer>
                <Label>Select City to filter</Label>
                <Select type="text" name="city" onChange={handleInput}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </Select>
                <Label>Filter date from</Label>
                <DatePicker
                    selected={dateFrom ? new Date(dateFrom) : null}
                    onChange={(date) => handleDateChange(date, 'dateFrom')}
                    name="dateFrom"
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <Label>Filter date to</Label>
                <DatePicker
                    selected={dateTo ? new Date(dateTo) : null}
                    onChange={(date) => handleDateChange(date, 'dateTo')}
                    name="dateTo"
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <Label>Confidence</Label>
                <SliderContainer
                    onMouseEnter={handleSliderMouseEnter}
                    onMouseLeave={handleSliderMouseLeave}
                >
                    <input
                        name="confidence"
                        type="range"
                        min="1"
                        max="100"
                        value={confidence}
                        onChange={handleInput}
                        className="slider"
                    />
                    <Tooltip active={tooltipActive}>{confidence}</Tooltip>
                </SliderContainer>
                <Label>Show List</Label>
                <CheckBox type="checkbox" name="showList" checked={showList}
                          onChange={handleInput}></CheckBox>
                <ActionsContainer>
                    <Button onClick={handleFilter}>Filter</Button>
                </ActionsContainer>
            </InputsContainer>

            {isFiltered && (
                <TableContainer>
                    <Header>Report of temperatures for {city} between {dateFrom} and {dateTo}</Header>
                    <Table>
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Station code</th>
                                <th>Operational from</th>
                                <th>Operational until</th>
                                <th>Forecast code</th>
                                <th>Confidence</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Temperature</th>
                                <th>Feels like</th>
                            </tr>
                        </thead>
                        {!showList && (
                            <TemperatureHierarchyTable data={temperatureReport}/>
                        )}
                        {showList && (
                            <TemperatureListTable data={temperatureReport}/>
                        )}
                    </Table>
                </TableContainer>
            )}
            {notFound && (
                <Label>No data found for selected filters</Label>
            )}
        </Container>
    )
}

export default TemperatureReportFilter;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const InputsContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
    width: 32rem;
`;

const TableContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;

const SliderContainer = styled.div`
    width: 100%;
    position: relative;
    padding: 10px 0;

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        background: #ddd;
        outline: black;
        transition: opacity 0.2s;
        border-radius: 5px;
    }

    .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: #007bff;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    background: #007bff;
    color: white;
    padding: 5px;
    border-radius: 8px;
    font-size: 12px;
    transform: translate(-100%, -87%);
    white-space: nowrap;
    display: ${({ active }) => (active ? 'block' : 'none')};
`;