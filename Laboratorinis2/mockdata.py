import csv
import random
from datetime import datetime, timedelta

# Parameters
num_rows = 20
forecast_multiplier = 5

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

def maybe_include(probability=0.5):
    """Decide whether to include some data based on a probability."""
    return random.random() < probability

def id_generator():
    """Generate sequential IDs starting from 0 and incrementing by 1 each time."""
    id_count = 1
    while True:
        yield id_count
        id_count += 1


# Generating data for Cities
cities_data = [
    {
        "Name": f"City{i}",
        "Country": f"Country{i % 5}",
        "Population": random.randint(100, 1000000),
        "Latitude": round(random.uniform(-90, 90), 6),
        "Longitude": round(random.uniform(-180, 180), 6),
        "Elevation": random.randint(0, 3000),
        "Average_annual_temperature": round(random.uniform(-20, 40), 2),
        "Average_annual_precipitation": random.randint(200, 3000),
        "Founding_date": generate_date().strftime("%Y-%m-%d"),
        "Time_zone": random.randint(-12, 14)
    } for i in range(num_rows)
]

# Generating data for Weather_Stations with random number of stations per city
weather_stations_data = []
for city in cities_data:
    num_stations = random.randint(1, 5)  # Each city will have 1 to 5 weather stations
    for _ in range(num_stations):
        weather_stations_data.append({
            "Code": f"WS{len(weather_stations_data)}",
            "Managing_organization": f"Org{random.randint(0, 9)}",
            "Latitude": round(random.uniform(-90, 90), 6),
            "Longitude": round(random.uniform(-180, 180), 6),
            "Elevation": random.randint(0, 3000),
            "Type": random.choice(["Type1", "Type2", "Type3"]),
            "fk_CityName": city["Name"],
            "fk_CityCountry": city["Country"]
        })

# Generate data for Operational_Statuses, linked to Weather Stations
operational_statuses_data = [
    {
        "Date_from": generate_date().strftime("%Y-%m-%d"),
        "Date_to": generate_date().strftime("%Y-%m-%d"),
        "Status": generate_boolean(),
        "id_Operational_Status": i,
        "fk_Weather_StationCode": ws["Code"]  # Link to weather station code
    } for i, ws in enumerate(weather_stations_data)
]

# Generating data for Weather_Forecasts with random number of forecasts per weather station
weather_forecasts_data = []
for ws in weather_stations_data:
    num_forecasts = random.randint(1, 20)  # Each weather station will have 1 to 20 weather forecasts
    for _ in range(num_forecasts):
        weather_forecasts_data.append({
            "Code": f"FC{len(weather_forecasts_data)}",
            "Date": generate_date(2023, 2024).strftime("%Y-%m-%d"),
            "Source": f"Source{random.randint(0, 2)}",
            "Confidence": round(random.uniform(50, 100), 2),
            "fk_CityName": ws["fk_CityName"],
            "fk_CityCountry": ws["fk_CityCountry"],
            "fk_Weather_StationCode": ws["Code"]
        })

# Generate data for Records, linked to Weather Forecasts
records_data = [
    {
        "Date": generate_date().strftime("%Y-%m-%d"),
        "Location": random.choice(cities_data)["Name"],
        "Maximum_temperature": round(random.uniform(-10, 45), 2),
        "Minimum_temperature": round(random.uniform(-20, 30), 2),
        "Maximum_precipitation": random.randint(0, 500),
        "Maximum_wind_speed": round(random.uniform(0, 150), 2),
        "fk_Weather_ForecastCode": forecast["Code"],
        "fk_Weather_ForecastDate": forecast["Date"]
    } for forecast in random.choices(weather_forecasts_data, k=num_rows)
]

# Generate data for Time_Stamps, linked to Weather_Forecasts with random number of time stamps per forecast
id_gen = id_generator()
time_stamps_data = []
for forecast in weather_forecasts_data:
    num_time_stamps = random.randint(1, 10) # Each forecast will have 1 to 10 time stamps
    for _ in range(num_time_stamps):
        time_stamps_data.append({
            "id_Time_Stamp": next(id_gen),
            "Date": forecast["Date"],
            "Time": generate_time(),
            "fk_Weather_ForecastCode": forecast["Code"],
            "fk_Weather_ForecastDate": forecast["Date"]
        })

# Generate data for Temperatures with random inclusion
id_gen = id_generator()
temperatures_data = [
    {
        "id": next(id_gen),
        "Maximum": round(random.uniform(-20, 50), 2),
        "Minimum": round(random.uniform(-20, 50), 2),
        "Average": round(random.uniform(-20, 50), 2),
        "Feels_like": round(random.uniform(-20, 50), 2),
        "Fluctuations": generate_boolean(),
        "fk_Time_Stamp": ts["id_Time_Stamp"]
    } for ts in time_stamps_data if maybe_include(0.9)
]

# Generate data for Winds with random inclusion
id_gen = id_generator()
winds_data = [
    {
        "id": next(id_gen),
        "Speed": round(random.uniform(0, 100), 2),
        "Direction": random.choice(["N", "S", "E", "W", "NE", "NW", "SE", "SW"]),
        "Gust_speed": round(random.uniform(0, 150), 2),
        "Strength": random.choice(["Light", "Moderate", "Strong", "Gale", "Storm"]),
        "fk_Time_Stamp": ts["id_Time_Stamp"]
    } for ts in time_stamps_data if maybe_include(0.8)
]

# Generate data for Pressures with random inclusion
id_gen = id_generator()
pressures_data = [
    {
        "id": next(id_gen),
        "Average_hPa": random.randint(980, 1050),
        "Maximum_hPa": random.randint(980, 1050),
        "Minimum_hPa": random.randint(980, 1050),
        "Humidity": round(random.uniform(0, 100), 2),
        "Dew_Point": round(random.uniform(-30, 30), 2),
        "fk_Time_Stamp": ts["id_Time_Stamp"]
    } for ts in time_stamps_data if maybe_include(0.5)
]

# Generate data for Cloudiness with random inclusion
id_gen = id_generator()
cloudiness_data = [
    {
        "id": next(id_gen),
        "Percentage": round(random.uniform(0, 100), 2),
        "High_clouds": round(random.uniform(0, 100), 2),
        "Middle_clouds": round(random.uniform(0, 100), 2),
        "Low_clouds": round(random.uniform(0, 100), 2),
        "Visibility": round(random.uniform(0, 100), 2),
        "Fog_percentage": round(random.uniform(0, 100), 2),
        "fk_Time_Stamp": ts["id_Time_Stamp"]
    } for ts in time_stamps_data if maybe_include(0.7)
]

# Generate data for Precipitations with random inclusion
id_gen = id_generator()
precipitations_data = [
    {
        "id": next(id_gen),
        "Type": random.choice(["Rain", "Snow", "Sleet", "Hail"]),
        "Amount_in_mm": random.randint(0, 100),
        "Intensity": random.choice(["Light", "Moderate", "Heavy"]),
        "Probability": round(random.uniform(0, 100), 2),
        "Duration": generate_time(),
        "fk_Time_Stamp": ts["id_Time_Stamp"]
    } for ts in time_stamps_data if maybe_include(0.6)
]

# Generate data for Sunlight
id_gen = id_generator()
sunlight_data = [
    {
        "id": next(id_gen),
        "Sunrise": generate_time(),
        "Sunset": generate_time(),
        "Daylight_duration": generate_time(),
        "UV_index_value": random.randint(0, 11),
        "UV_radiation_intensity": random.randint(0, 2000),
        "fk_Weather_ForecastCode": forecast["Code"],
        "fk_Weather_ForecastDate": forecast["Date"]
    } for forecast in random.choices(weather_forecasts_data, k=num_rows) if maybe_include(0.6)
]

# Generate data for Moonlight
id_gen = id_generator()
moonlight_data = [
    {
        "id": next(id_gen),
        "MoonRise": generate_time(),
        "MoonSet": generate_time(),
        "Phase": random.choice(["New", "Waxing", "Full", "Waning"]),
        "Distance_to_the_Earth": random.randint(363300, 405500),
        "Brightness": round(random.uniform(0, 100), 2),
        "Duration_in_the_sky": generate_time(),
        "fk_Weather_ForecastCode": forecast["Code"],
        "fk_Weather_ForecastDate": forecast["Date"]
    } for forecast in random.choices(weather_forecasts_data, k=num_rows) if maybe_include(0.6)
]

# Writing to CSV files
def write_to_csv(file_name, data):
    with open(file_name, 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writerows(data)

# Writing data to CSV
csv_files = {
    "Cities.csv": cities_data,
    "Weather_Stations.csv": weather_stations_data,
    "Weather_Forecasts.csv": weather_forecasts_data,
    "Time_Stamps.csv": time_stamps_data,
    "Temperatures.csv": temperatures_data,
    "Winds.csv": winds_data,
    "Pressures.csv": pressures_data,
    "Cloudiness.csv": cloudiness_data,
    "Precipitations.csv": precipitations_data,
    "Sunlight.csv": sunlight_data,
    "Moonlight.csv": moonlight_data,
    "Records.csv": records_data,
    "Operational_Statuses.csv": operational_statuses_data
    # Add more tables as necessary
}

for filename, data in csv_files.items():
    write_to_csv(filename, data)

print("CSV files for all tables have been created.")
