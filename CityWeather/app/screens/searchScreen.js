import React from 'react';
import {TextInput, View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        var navigation = this.props.navigation;
        this.state = {

            searchInput: '',
            searchResult: 0,
            error: 'search for a city...',
             

        }


    }

    searchCity=() =>{
        this.fetchCityTemp(this.state.searchInput)
    }


    fetchCityTemp = (city) => {

        this.setState({
            item:{},
            searchResult:0,
            error: 'Search for a city...'
        });

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0319684c7b3712fb36176a78afa28823&units=metric')
            .then((response) => response.json())
            .then((responseJson) => {
                var r = responseJson.main;
                var obj = responseJson;

                if(responseJson.cod !== 200){
                    this.setState({
                        searchResult:0,
                        error: 'City not found'
                    });

                }else{
                var city = {
                    name: obj.name,
                    //country: country,
                    temp: Math.ceil(r.temp),
                    type: obj.weather[0].main,
                    desc: 'Humidity: '+r.humidity+"% - "+obj.weather[0].main
                };

                //newList.push(city);
                //console.log(this.state.list);

                this.setState({
                   item:city,
                   searchResult:1
                })

            }
            })
    }


    getTempRange = (t) => {
        if (t < 11) {
            return 1;
        }
        if (t > 10 && t < 20) {
            return 2;
        }
        if (t >= 20 && t < 30) {
            return 3;
        }
        if (t >= 30) {
            return 4;
        }

    }

    getEmoji = (type) => {
        
        if( type == 'Clouds'){
            return '☁️';
        }
        if(type == 'Clear'){
            return '🌞';
        }
        
        if(type == 'Haze'){
            return '⛅';
        }
        if(type == 'Thunderstorm'){
            return '🌩️'
        }
        if(type == 'Rain'){
            return '☔'
        }
        if(type == 'Snow'){
            return '⛄'
        }
        if(type == 'Mist'){
            return '💭'
        }
        if(type == 'Drizzle'){
            return '🤷'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <Text style={{width:'100%',textAlign:'center', paddingTop: 40, paddingBottom: 15, backgroundColor: 'blue', color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
                🔆 Big City Weather </Text>

                <View style={{alignItems: 'center', width:'90%'}}>
                    <Text style={{textAlign: 'center', lineHeight: 20, padding: 5, fontSize: 16}}>Search for a city</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({searchInput: text})}
                        value={this.state.searchInput}
                        style={{width:'80%', padding:15, margin:5, backgroundColor: 'black', color: 'white'}}
                    />

                    <TouchableHighlight
                        style={{backgroundColor:'grey',padding: 20, borderRadius: 8}}
                        onPress={ () => this.searchCity()}
                    >
                        <Text style={{fontSize: 14, color: 'white'}}>Search</Text>
                    </TouchableHighlight>
                </View>
              
                {this.state.searchResult==1 ? (

                        <TouchableHighlight
                            underlayColor= "white"
                            onPress = { () => alert(this.state.item.desc) }
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0)']}
                                start={[0, 0.5]}
                            >
                                <View style={styles.row}>
                                    <Text style={[
                                        (this.getTempRange(this.state.item.temp) == 1) ? styles.cold : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 2) ? styles.medium : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 3) ? styles.hot : styles.temp,
                                        (this.getTempRange(this.state.item.temp) == 4) ? styles.vhot : styles.temp,

                                        styles.cityTemp]}>{this.getEmoji(this.state.item.type)} {this.state.    item.temp}°C</Text>
                                    <Text style={styles.cityName}>{this.state.item.name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>
               
               ): (
                <View styles={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{this.state.error }</Text>
                </View>
               )}                           
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cold: { color: 'blue' },
    medium: { color: 'green' },
    hot: { color: 'orange' },
    vhot: { color: 'red' },
    cityTemp: {
        fontSize: 30,
        lineHeight: 40,
        width: 130,
        marginRight: 15,
        fontWeight: 'bold'
    },
    cityName: {
        fontSize: 20,
        lineHeight: 40

    },
    row: {
        flex: 1,
        width: 375,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    }
})