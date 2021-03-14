import * as React from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import firebase from 'firebase';
import db from '../config'

export default class EditProfileScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            email: firebase.auth().currentUser.email,
            name: '',
            contact: '',
            address: '',
        }
    }

    getDetails = async(email) =>{
        /*db.collection("users").where("email_id","==",this.state.email).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                this.setState({
                    name: data.first_name,
                })
            })
        })*/
    db.collection('users').where('email_id','==',email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.setState({
          firstName : doc.data().first_name,
          lastName  : doc.data().last_name,
          address   : doc.data().address,
          contact   : doc.data().contact,
        })
      });
    })
    }

    updateDetails(){

    }

    componentDidMount(){
        this.getDetails(this.state.email);
    }

    render(){
        return (
            <View style={{ backgroundColor: '#FFFF8A',flex: 1 }}>
                <Header 
                   centerComponent={{ 
                       text: "Edit Profile", 
                       style: { color: '#FBAA60', 
                        fontSize:26, 
                        fontWeight:"600", 
                        fontStyle: 'italic' } }}
                   backgroundColor="#A82810" />
                <View>
                    <TextInput
                        placeholder="Your Name" 
                        style={[styles.textInput,{marginTop: 70}]} 
                        keyboardAppearance="dark" 
                        maxLength={20} 
                        keyboardType="default" 
                        onChangeText={(text)=> {
                            this.setState({ name: text })
                        }} 
                        value={this.state.name} />
                    <TextInput 
                        placeholder="Contact number" 
                        style={styles.textInput} 
                        keyboardAppearance="dark"
                        keyboardType="numeric" 
                        maxLength={10} 
                        onChangeText={(text)=> {
                            this.setState({ contact: text })
                        }}
                        value={this.state.contact} />
                    <TextInput 
                        placeholder="address" 
                        style={styles.textInput} 
                        keyboardAppearance="dark" 
                        keyboardType="default" 
                        multiline={true}
                        onChangeText={(text)=> {
                            this.setState({ address: text })
                        }}
                        value={this.state.address} />
                </View>
                    <TouchableOpacity style={styles.passwordButton}>
                        <Text style={styles.passwordButtonText}>Password reset</Text>
                    </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.updateDetails()} >
                        <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        borderBottomWidth: 3,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: "10%",
        fontSize: 20,
        fontStyle: 'italic',
        borderColor: '#FF2400'
    },
    button:{
        width: '65%',
        height: '8%',
        backgroundColor: '#A82810',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: "15%",
        paddingTop: '0.5%',
        borderRadius: 13
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 35,
        color: '#FBAA60',
        fontWeight: '600',
        fontStyle: 'italic'
    },
    passwordButton: {
        marginTop: '10%',
        textAlign: 'center',
        alignItems:"center",
        alignSelf: "flex-end",
        marginLeft: 20
    },
    passwordButtonText: {
        color: '#0000EE',
        textDecorationLine: 'underline',
        textDecorationColor: '#0000EE',
        fontSize: 20,
        paddingRight: "5%"
    }
})