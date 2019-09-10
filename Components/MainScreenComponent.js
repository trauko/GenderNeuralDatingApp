import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderComponent from './HeaderComponent.js'
import PersonComponent from './PersonComponent.js'
import * as Constant from '../Utils/ConstUtil.js'

export default class MainScreenComponent extends Component {
  
  state =  { 
    areButtonsActivated : true,
    matchesReached : false 
  };
  activateButtons() {
    if(!this.state.matchesReached) this.setState({areButtonsActivated : true});
  }
  deactivateButtons(){
    this.setState({areButtonsActivated : false});
  }
  deactivateMatches(){
    this.setState({ areButtonsActivated : false, matchesReached: true});
  }
  render() {

    return (
      <View style={styles.mainContainer}>
        <HeaderComponent ref={instance => { this.headerComponent = instance; }} deactivateMatches={()=>{ this.deactivateMatches(this)}} />
        <PersonComponent ref={instance => { this.personComponent = instance; }} activateParentButtons={()=>{ this.activateButtons(this)} } />
        <View style={styles.btnContainer} >
            <TouchableOpacity disabled = { !this.state.areButtonsActivated } 
              onPress = { ()=>{ this.deactivateButtons(); 
                       this.personComponent.loadNextPerson(); }} 
              style={[ styles.actionBtn, { backgroundColor : this.state.areButtonsActivated? Constant.COLOR_THEME_DARK_GREY: Constant.COLOR_THEME_LIGHT_GREY } ]}>
              <Text style={styles.btnText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled = { !this.state.areButtonsActivated }  onPress = {()=>{ this.headerComponent.incrementCounter(); this.personComponent.loadNextPerson(); }} 
            style={[ styles.actionBtn, 
              { backgroundColor : this.state.areButtonsActivated? Constant.COLOR_THEME_ORANGE: Constant.COLOR_THEME_LIGHT_GREY }]}>
              <Text style={styles.btnText}>Yes</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create(
{
   mainContainer : {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
   btnContainer : {
      flexDirection:'row', 
      height: 60
   },
   actionBtn :{
      flex:1 ,
      alignItems : 'center', 
      justifyContent : 'center',
 
   },
   btnText : {
    color:'white', 
    fontSize : 18
   }  
});