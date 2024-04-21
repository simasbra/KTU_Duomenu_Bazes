DROP TABLE IF EXISTS Winds;
DROP TABLE IF EXISTS Temperatures;
DROP TABLE IF EXISTS Pressures;
DROP TABLE IF EXISTS Precipitations;
DROP TABLE IF EXISTS Cloudiness;
DROP TABLE IF EXISTS Time_Stamps;
DROP TABLE IF EXISTS Sunlight;
DROP TABLE IF EXISTS Records;
DROP TABLE IF EXISTS Moonlight;
DROP TABLE IF EXISTS Weather_Forecasts;
DROP TABLE IF EXISTS Operational_Statuses;
DROP TABLE IF EXISTS Weather_Stations;
DROP TABLE IF EXISTS Cities;

CREATE TABLE Cities (
    Name varchar(50) NOT NULL,
    Country varchar(100) NOT NULL,
    Population int NOT NULL,
    Latitude decimal(9,6) NOT NULL,
    Longitude decimal(9,6) NOT NULL,
    Elevation int NOT NULL,
    Average_annual_temperature decimal(4,2) NOT NULL,
    Average_annual_precipitation int NOT NULL,
    Founding_date date NOT NULL,
    Time_zone int NOT NULL,
    PRIMARY KEY (Name, Country)
);

CREATE TABLE Weather_Stations (
    Code varchar(20) NOT NULL PRIMARY KEY,
    Managing_organization varchar(100) NOT NULL,
    Latitude decimal(9,6) NOT NULL,
    Longitude decimal(9,6) NOT NULL,
    Elevation int NOT NULL,
    Type varchar(20) NOT NULL,
    fk_CityName varchar(50) NOT NULL,
    fk_CityCountry varchar(100) NOT NULL,
    FOREIGN KEY (fk_CityName, fk_CityCountry) REFERENCES Cities (Name, Country)
);

CREATE TABLE Operational_Statuses (
    Date_from date NOT NULL,
    Date_to date NULL,
    Status boolean NOT NULL,
    id_Operational_Status integer NOT NULL AUTO_INCREMENT,
    fk_Weather_StationCode varchar(20) NOT NULL,
    PRIMARY KEY (id_Operational_Status, fk_Weather_StationCode),
    CONSTRAINT Has FOREIGN KEY (fk_Weather_StationCode) REFERENCES Weather_Stations (Code)
);

CREATE TABLE Weather_Forecasts (
    Code varchar(20) NOT NULL,
    Date date NOT NULL,
    Source varchar(50) NOT NULL,
    Confidence decimal(5,2) NOT NULL,
    fk_CityName varchar(50) NOT NULL,
    fk_CityCountry varchar(100) NOT NULL,
    fk_Weather_StationCode varchar(20) NOT NULL,
    PRIMARY KEY (Code, Date),
    FOREIGN KEY (fk_CityName, fk_CityCountry) REFERENCES Cities (Name, Country),
    FOREIGN KEY (fk_Weather_StationCode) REFERENCES Weather_Stations (Code)
);

CREATE TABLE Records (
    Date date NOT NULL,
    Location varchar(50) NOT NULL,
    Maximum_temperature decimal(4,2) NULL,
    Minimum_temperature decimal(4,2) NULL,
    Maximum_precipitation int NULL,
    Maximum_wind_speed decimal(5,2) NULL,
    fk_Weather_ForecastCode varchar(20) NOT NULL,
    fk_Weather_ForecastDate date NOT NULL,
    PRIMARY KEY (Date, Location),  -- Composite primary key
    CONSTRAINT Recorded FOREIGN KEY (fk_Weather_ForecastCode, fk_Weather_ForecastDate) REFERENCES Weather_Forecasts (Code, Date)
);

CREATE TABLE Time_Stamps (
    id_Time_Stamp int NOT NULL AUTO_INCREMENT,
    Date date NOT NULL,
    Time time NOT NULL,
    fk_Weather_ForecastCode varchar(20) NOT NULL,
    fk_Weather_ForecastDate date NOT NULL,
    PRIMARY KEY (id_Time_Stamp),
    FOREIGN KEY (fk_Weather_ForecastCode, fk_Weather_ForecastDate) REFERENCES Weather_Forecasts (Code, Date)
);

CREATE TABLE Temperatures (
    id_Temperature SERIAL PRIMARY KEY,
    Maximum decimal(4,2) NOT NULL,
    Minimum decimal(4,2) NOT NULL,
    Average decimal(4,2) NOT NULL,
    Feels_like decimal(4,2) NOT NULL,
    Fluctuations boolean NOT NULL,
    fk_Time_Stamp int NOT NULL,
    FOREIGN KEY (fk_Time_Stamp) REFERENCES Time_Stamps (id_Time_Stamp)
);

CREATE TABLE Winds (
    id_Wind SERIAL PRIMARY KEY,
    Speed decimal(5,2) NOT NULL,
    Direction char(2) NOT NULL,
    Gust_speed decimal(5,2) NOT NULL,
    Strength varchar(20) NOT NULL,
    fk_Time_Stamp int NOT NULL,
    FOREIGN KEY (fk_Time_Stamp) REFERENCES Time_Stamps (id_Time_Stamp)
);

CREATE TABLE Pressures (
    id_Pressure SERIAL PRIMARY KEY,
    Average_hPa int NOT NULL,
    Maximum_hPa int NOT NULL,
    Minimum_hPa int NOT NULL,
    Humidity decimal(5,2) NOT NULL,
    Dew_Point decimal(4,2) NOT NULL,
    fk_Time_Stamp int NOT NULL,
    FOREIGN KEY (fk_Time_Stamp) REFERENCES Time_Stamps (id_Time_Stamp)
);

CREATE TABLE Cloudiness (
    id_Cloudiness SERIAL PRIMARY KEY,
    Percentage decimal(5,2) NOT NULL,
    High_clouds decimal(5,2) NOT NULL,
    Middle_clouds decimal(5,2) NOT NULL,
    Low_clouds decimal(5,2) NOT NULL,
    Visibility decimal(5,2) NOT NULL,
    Fog_percentage decimal(5,2) NOT NULL,
    fk_Time_Stamp int NOT NULL,
    FOREIGN KEY (fk_Time_Stamp) REFERENCES Time_Stamps (id_Time_Stamp)
);

CREATE TABLE Precipitations (
    id_Precipitation SERIAL PRIMARY KEY,
    Type varchar(20) NOT NULL,
    Amount_in_mm int NOT NULL,
    Intensity varchar(20) NOT NULL,
    Probability decimal(5,2) NOT NULL,
    Duration time NOT NULL,
    fk_Time_Stamp int NOT NULL,
    FOREIGN KEY (fk_Time_Stamp) REFERENCES Time_Stamps (id_Time_Stamp)
);

CREATE TABLE Sunlight (
    id_Sunlight SERIAL PRIMARY KEY,
    Sunrise time NOT NULL,
    Sunset time NOT NULL,
    Daylight_duration time NOT NULL,
    UV_index_value int NOT NULL,
    UV_radiation_intensity int NOT NULL,
    fk_Weather_ForecastCode varchar(20) NOT NULL,
    fk_Weather_ForecastDate date NOT NULL,
    FOREIGN KEY (fk_Weather_ForecastCode, fk_Weather_ForecastDate) REFERENCES Weather_Forecasts (Code, Date)
);

CREATE TABLE Moonlight (
    id_Sunglight SERIAL PRIMARY KEY,
    MoonRise time NOT NULL,
    MoonSet time NOT NULL,
    Phase varchar(20) NOT NULL,
    Distance_to_the_Earth int NOT NULL,
    Brightness decimal(5,2) NOT NULL,
    Duration_in_the_sky time NOT NULL,
    fk_Weather_ForecastCode varchar(20) NOT NULL,
    fk_Weather_ForecastDate date NOT NULL,
    FOREIGN KEY (fk_Weather_ForecastCode, fk_Weather_ForecastDate) REFERENCES Weather_Forecasts (Code, Date)
);
