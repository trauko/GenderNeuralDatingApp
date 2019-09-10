import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Constant from '../Utils/ConstUtil.js'

export default class HeaderComponent extends Component {
    incrementCounter(){
        if (++this.state.counter > 4) {
            this.props.deactivateMatches();
        }
        this.setState( { counter : this.state.counter }) ;
    }
    state = {
        counter : 0,
        counterBoxColor : 'white'
    }
    render() {
    return (
      <View style={styles.mainContainer}>  
        <Text style={styles.title} >
            Gender Neural Dating App
        </Text>
        <View style={styles.counterContainer} >
            <Text style={{fontSize : 14}}>
                {this.state.counter}
            </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create(
    {
       mainContainer : {
        flexDirection : 'row',
        backgroundColor: Constant.COLOR_THEME_DARK_GREY,
        justifyContent : 'space-between',
        alignItems : 'center',
        height : 60
       },
       title : {
         fontSize: 18, 
         marginLeft:16 ,
         color: 'white', 
         textAlignVertical : 'center'
       },
       counterContainer :{
        backgroundColor: 'white' ,
        paddingVertical : 4,
        paddingHorizontal:8, 
        borderRadius : 4,
        marginRight:16
       }
    });