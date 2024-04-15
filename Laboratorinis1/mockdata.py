import csv
import random
from datetime import datetime, timedelta

# Parameters
num_rows = 100  # Adjust this for the number of rows to generate per table

# Helper functions
def generate_date(start_year=1990, end_year=2024):
    """Generate a random date within a range."""
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

def generate_time():
    """Generate a random time."""
    hours = random.randint(0, 23)
    minutes = random.randint(0, 59)
    return f"{hours:02}:{minutes:02}"

def generate_boolean():
    """Generate a random boolean value."""
    return random.choice([0, 1])

# Generating data for Cities
cities_data = [
    {
        "Name": f"City{i}",
        "Country": f"Country{i % 5}",
        "Population": random.randint(10000, 1000000),
        "Latitude": round(random.uniform(-90, 90), 7),
        "Longitude": round(random.uniform(-180, 180), 7),
        "Elevation": random.randint(0, 3000),
        "Average_annual_temperature": round(random.uniform(-20, 40), 2),
        "Average_annual_precipitation": random.randint(200, 3000),
        "Founding_date": generate_date().strftime("%Y-%m-%d"),
        "Time_zone": random.randint(-12, 14)
    } for i in range(num_rows)
]

# Generating data for Weather_Stations
weather_stations_data = [
    {
        "Code": f"WS{i}",
        "Managing_organization": f"Org{i % 5}",
        "Latitude": round(random.uniform(-90, 90), 7),
        "Longitude": round(random.uniform(-180, 180), 7),
        "Elevation": random.randint(0, 3000),
        "Type": random.choice(["Type1", "Type2", "Type3"]),
        "fk_CityName": city["Name"],  # Use the city name from the chosen city
        "fk_CityCountry": city["Country"]  # Use the country from the chosen city
    } for i, city in enumerate(random.choices(cities_data, k=num_rows))
]

# Generating data for Operational_Statuses
operational_statuses_data = [
    {
        "Date_from": generate_date().strftime("%Y-%m-%d"),
        "Date_to": generate_date().strftime("%Y-%m-%d"),
        "Status": generate_boolean(),
        "id_Operational_Status": i,
        "fk_Weather_StationCode": ws["Code"]  # Use the code from each weather station
    } for i, ws in enumerate(weather_stations_data)  # Iterate over weather stations
]

# Generating data for Weather_Forecasts
weather_forecasts_data = [
    {
        "Code": f"FC{i}",
        "Date": generate_date().strftime("%Y-%m-%d"),
        "Source": f"Source{i % 3}",
        "Confidence": round(random.uniform(50, 100), 2),
        "fk_CityName": city["Name"],  # Use the city name from the chosen city-country pair
        "fk_CityCountry": city["Country"],  # Use the country from the chosen city-country pair
        "fk_Weather_StationCode": random.choice(weather_stations_data)["Code"]  # Randomly choose a weather station code
    } for i, city in enumerate(random.choices(cities_data, k=num_rows))
]

# Select a single weather forecast entry to use for all related tables
selected_forecast = random.choice(weather_forecasts_data)

# Generating data for Records
records_data = [
    {
        "Date": generate_date().strftime("%Y-%m-%d"),
        "Location": random.choice(cities_data)["Name"],
        "Maximum_temperature": round(random.uniform(-10, 45), 2),
        "Minimum_temperature": round(random.uniform(-20, 30), 2),
        "Maximum_precipitation": random.randint(0, 500),
        "Maximum_wind_speed": round(random.uniform(0, 150), 2),
        "fk_Weather_ForecastCode": selected_forecast["Code"],
        "fk_Weather_ForecastDate": selected_forecast["Date"]
    } for i in range(num_rows)
]

# Generating data for Moonlight
moonlight_data = [
    {
        "Moonrise": generate_time(),
        "Moonset": generate_time(),
        "Phase": random.choice(["New", "Waxing", "Full", "Waning"]),
        "Distance_to_the_Earth": random.randint(363300, 405500),  # in km
        "Brightness": round(random.uniform(0, 100), 2),
        "Duration_in_the_sky": generate_time(),
        "id_Moonlight": i,
        "fk_Weather_ForecastCode": selected_forecast["Code"],
        "fk_Weather_ForecastDate": selected_forecast["Date"]
    } for i in range(num_rows)
]

# Generating data for Sunlight
sunlight_data = [
    {
        "Sunrise": generate_time(),
        "Sunset": generate_time(),
        "Daylight_duration": generate_time(),
        "UV_index_value": random.randint(0, 11),
        "UV_radiation_intensity": random.randint(0, 2000),
        "id_Sunlight": i,
        "fk_Weather_ForecastCode": selected_forecast["Code"],
        "fk_Weather_ForecastDate": selected_forecast["Date"]
    } for i in range(num_rows)
]

# Generating data for Time_Ranges
time_ranges_data = [
    {
        "Date": generate_date().strftime("%Y-%m-%d"),
        "Time_from": generate_time(),
        "Time_to": generate_time(),
        "fk_Weather_ForecastCode": selected_forecast["Code"],
        "fk_Weather_ForecastDate": selected_forecast["Date"]
    } for i in range(num_rows)
]

# Choose one random Time_Range entry
random_time_range = random.choice(time_ranges_data)

# Generating data for Cloudiness
cloudiness_data = [
    {
        "Percentage": round(random.uniform(0, 100), 2),
        "High_clouds": round(random.uniform(0, 100), 2),
        "Middle_clouds": round(random.uniform(0, 100), 2),
        "Low_clouds": round(random.uniform(0, 100), 2),
        "Visibility": round(random.uniform(0, 100), 2),
        "Fog_percentage": round(random.uniform(0, 100), 2),
        "id_Cloudiness": i,
        "fk_Time_RangeTime_from": random_time_range["Time_from"],
        "fk_Time_RangeDate": random_time_range["Date"]
    } for i in range(num_rows)
]

# Generating data for Precipitations
precipitations_data = [
    {
        "Type": random.choice(["Rain", "Snow", "Sleet", "Hail"]),
        "Amount_in_mm": random.randint(0, 100),
        "Intensity": random.choice(["Light", "Moderate", "Heavy"]),
        "Probability": round(random.uniform(0, 100), 2),
        "Duration": generate_time(),
        "id_Precipitation": i,
        "fk_Time_RangeTime_from": random_time_range["Time_from"],
        "fk_Time_RangeDate": random_time_range["Date"]
    } for i in range(num_rows)
]

# Generating data for Pressures
pressures_data = [
    {
        "Average_hPa": random.randint(980, 1050),
        "Maximum_hPa": random.randint(980, 1050),
        "Minimum_hPa": random.randint(980, 1050),
        "Humidity": round(random.uniform(0, 100), 2),
        "Dew_Point": round(random.uniform(-30, 30), 2),
        "id_Pressure": i,
        "fk_Time_RangeTime_from": random_time_range["Time_from"],
        "fk_Time_RangeDate": random_time_range["Date"]
    } for i in range(num_rows)
]

# Generating data for Temperatures
temperatures_data = [
    {
        "Maximum": round(random.uniform(-20, 50), 2),
        "Minimum": round(random.uniform(-20, 50), 2),
        "Average": round(random.uniform(-20, 50), 2),
        "Feels_like": round(random.uniform(-20, 50), 2),
        "Fluctuations": generate_boolean(),
        "id_Temperature": i,
        "fk_Time_RangeTime_from": random_time_range["Time_from"],
        "fk_Time_RangeDate": random_time_range["Date"]
    } for i in range(num_rows)
]

# Generating data for Winds
winds_data = [
    {
        "Speed": round(random.uniform(0, 100), 2),
        "Direction": random.choice(["N", "S", "E", "W", "NE", "NW", "SE", "SW"]),
        "Gust_speed": round(random.uniform(0, 150), 2),
        "Strength": random.choice(["Light", "Moderate", "Strong", "Gale", "Storm"]),
        "id_Wind": i,
        "fk_Time_RangeTime_from": random_time_range["Time_from"],
        "fk_Time_RangeDate": random_time_range["Date"]
    } for i in range(num_rows)
]

# Writing to CSV files
def write_to_csv(file_name, data):
    with open(file_name, 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        # writer.writeheader()
        writer.writerows(data)

csv_files = {
    "Cities.csv": cities_data,
    "Weather_Stations.csv": weather_stations_data,
    "Operational_Statuses.csv": operational_statuses_data,
    "Weather_Forecasts.csv": weather_forecasts_data,
    "Moonlight.csv": moonlight_data,
    "Records.csv": records_data,
    "Sunlight.csv": sunlight_data,
    "Time_Ranges.csv": time_ranges_data,
    "Cloudiness.csv": cloudiness_data,
    "Precipitations.csv": precipitations_data,
    "Pressures.csv": pressures_data,
    "Temperatures.csv": temperatures_data,
    "Winds.csv": winds_data
}

for filename, data in csv_files.items():
    write_to_csv(filename, data)

print("CSV files for all tables have been created.")