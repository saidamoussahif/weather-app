import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  ImageBackground,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

// const image = {uri: ('https://img.freepik.com/premium-photo/blue-sky-background-white-clouds-bright-sunlight_360074-58953.jpg?size=338&ext=jpg&uid=R75764164&ga=GA1.2.1065634067.1658138070&semt=sph')};

const openWeatherKey = "1e29ac5a08817bae532398435278a136";
let url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${openWeatherKey}`;

const weather = () => {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
    // get the current location
    const location = await Location.getCurrentPositionAsync({
      enableHightAccuracy: true,
    });

    // fetch the weather data from the openweather api
    const response = await fetch(
      url + `&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json(); //convert the response to json

    if (!response.ok) {
      Alert.alert("Error", "something is wrong");
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  };

  // useeffect is a hook thet runs after the component is rendred
  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#5585B5" />
      </SafeAreaView>
    );
  }
  const current = forecast.list[0].weather;
  return (
    // <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          // uri: `https://images.pexels.com/photos/4210918/pexels-photo-4210918.jpeg?auto=compress&cs=tinysrgb&w=600`,
          uri: `https://images.pexels.com/photos/2310648/pexels-photo-2310648.jpeg?auto=compress&cs=tinysrgb&w=600`,
        }}
        resizeMode="cover"
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                loadForecast();
              }}
            />
          }
          style={{ marginTop: 50 }}
        >
          {/* <Text style={styles.title}>Current weather</Text> */}
          <Text style={{ alignItems: "center", textAlign: "center", color: "#F4EAD5", fontSize: 26, marginTop: 20 }}>
            {forecast.city.name}
          </Text>
          <View style={styles.current}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#F4EAD5",
                
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: "#F4EAD5",
                  marginTop: 10,
                }}
              >
                {Math.round(forecast.list[0].main.temp - 273.15)}°C
              </Text>

              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {current[0].description}
              </Text>
              <Image
                source={{
                    uri:`http://openweathermap.org/img/w/${current[0].icon}.png`
                }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 40 / 2,
                    // marginLeft: 45,
                    }}
                />
            </View>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Image
                source={{
                    uri:`http://openweathermap.org/img/w/${current[0].icon}.png`
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 40 / 2,
                  marginLeft: 45,
                }}
              />

              <Text style={styles.text}>
                {forecast.list[0].main.feels_like}°C
              </Text>

              <Text style={styles.text}>Feels like</Text>
            </View>
            <View style={styles.info}>
              <Image
                source={{
                  uri: `https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg`,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40 / 2,
                  marginLeft: 50,
                }}
              />
              <Text style={styles.text}>{forecast.list[0].main.humidity}%</Text>
              <Text style={styles.text}>Humidity</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Hourly Forecast</Text>
          </View>
          <FlatList
          horizontal
          data={forecast.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(hour) => {
            const weather = hour.item.weather[0]
            const date = new Date(hour.item.date * 1000);
            return (
              <View style={styles.hour}>
                  <Text style={{fontWeight: "bold", color:"#346751"}}>
                    {date.toLocaleTimeString().replace(/:\d+ /, ' ')}
                  </Text>
                  <Text style={{fontWeight: "bold", color:"#346751"}}>
                    {Math.round(hour.item.temp - 273.15)}°C
                  </Text>
              </View>
            )
          }}
        />


        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    // </ImageBackground>
  );
};

export default weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#7FBCD2",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "semibold",
    marginBottom: 10,
    fontFamily: "sans-serif",
    color: "#fff",
  },
  current: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  largeIcon: {
    width: 160,
    height: 140,
  },
  currentTemp: {
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
  },
  currentDescription: {
    width: "100%",
    fontWeight: "400",
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    marginTop: 50,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    background: "transparent",
    opacity: 0.8,
    padding: 10,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    marginLeft:7, 
    color: "#C84B31",
  },
});
