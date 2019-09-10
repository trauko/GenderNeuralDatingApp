import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import * as Constant from '../Utils/ConstUtil.js'

export default class PersonComponent extends Component {
    state = {
        name :'',
        imageUri : "https://i.stack.imgur.com/l60Hf.png",
        ageInYears : 0,
        isLoadingContent : false

    }
    componentDidMount(){
        this.loadNextPerson();
    }
    loadNextPerson(){
        this.getPersonApiAsync();  
    }
    getPersonApiAsync() {
        this.setState({ isLoadingContent : true });
        return fetch(Constant.API_GETPERSON_PATH)
          .then((response) => response.json())
          .then((responseJson) => {
            var person = responseJson.results[0]; 
            var personName = `${person.name.first} ${person.name.last}`;
            var personAgeInYears = this.calcAgeInYears(person.dob.date);
            this.setState({ name : personName, imageUri : person.picture.large , ageInYears : personAgeInYears});
            this.setState({ isLoadingContent: false });
            this.props.activateParentButtons();
          })
          .catch((error) => {
            console.error(error);
          });
    }
    calcAgeInYears(dateTime){
        var personBOD = new Date(dateTime);
        var diff =(Date.now() - personBOD.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff/365.25));
    }
    render() {
        if(this.state.isLoadingContent) {
            return (
                <View style={ styles.mainContainer}>
                  <Text style={{ fontSize : 32, color : 'black', textAlign : 'center'}} >
                      Loading...
                  </Text>   
                </View>
              ); 
        } else {
            return (
                <View style={ styles.mainContainer }>
                  <Image style={styles.personImg} source={{ uri : this.state.imageUri }}/>  
                  <Text style={styles.personName} >
                      {this.state.name}
                  </Text>
                  <Text style={{fontSize : 14}}>
                         ({this.state.ageInYears})
                  </Text>
                </View>
              );
        }
    }
}
const styles = StyleSheet.create(
{
    mainContainer : {
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    },
    personImg : {
        height : 150, 
        width : 150, 
        borderRadius: 80
    },
    personName :{
        fontSize : 32, 
        color : 'black', 
        textTransform:'capitalize', 
        textAlign : 'center'
    }
});