import React from 'react'
import { Alert,
    KeyboardAvoidingView, 
    StyleSheet,
    Text, 
    TextInput, 
    TouchableOpacity,
    View,
    Modal,
    ScrollView, 
    ToastAndroid} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            modalemailId: '',
            modalpassword: '',
            isModalVisible: 'false',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
        }
    }

    userSignUp = async (emailId,password,confirmPassword) => {
        if(password !== confirmPassword){
            return (
                Alert.alert("The password did not match with the confirmed password")
            )
        }
        firebase.auth()
            .createUserWithEmailAndPassword(emailId,password)
            .then(()=> {
                db.collection("users").add({
                    "email_id": emailId,
                    "first_name": this.state.firstName,
                    "last_name": this.state.lastName,
                    "contact": this.state.contact,
                    "address": this.state.address
                })
                this.setState({ isModalVisible: 'false' })
                return (
                    ToastAndroid.show("User added successfully",ToastAndroid.LONG)
                )
            })
            .catch((error)=>{
                //Handle error here
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
          .then(()=>{
            return (
              this.props.navigation.navigate('AppDrawerNavigator')
            )
          })
          .catch((error)=>{
            //Handle error here
            var errorCode = error.code;
            var errorMessage = error.message;
            return (
                Alert.alert(errorMessage)
            )
        })
    }

    showModal = ()=>{
        return(
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={20}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={20}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    modalemailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    modalpassword: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={{ width: '50%', 
                    marginTop: 30, 
                    alignSelf: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#7FFF00' }}
                  onPress={()=>{
                    this.userSignUp(this.state.modalemailId, this.state.modalpassword, this.state.confirmPassword)
                  }}
                >
                <Text style={{ fontSize: 20,fontWeight: 'bold' }}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={{ alignSelf: 'center', 
                    alignItems: 'center', 
                    width: '50%', 
                    marginTop: 15,
                    backgroundColor: '#7FFF00'  }}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{ color:'#ff5722',fontSize: 20,fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }

    render(){
        return (
            <KeyboardAvoidingView style={{ backgroundColor: '#F1D26C',flex: 1 }}>
                {
                    this.showModal()
                }
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.title}>Find A Mechanic</Text>
                </View>
                <View>
                  <TextInput 
                      style={styles.inputBox} 
                      placeholder="abc@gmail.com" 
                      keyboardType="email-address" 
                      onChangeText={(text)=> {
                        this.setState({ emailId: text })
                      }} />
                  <TextInput 
                      style={[styles.inputBox,{marginTop: 50}]} 
                      placeholder="password" 
                      secureTextEntry = {true} 
                      onChangeText={(text)=> {
                        this.setState({ password: text })
                      }} />

                  <TouchableOpacity style={styles.button} 
                      onPress={()=>{
                          this.userLogin(this.state.emailId,this.state.password)
                      }} >
                      <Text style={{ fontSize: 20, 
                          fontWeight: 'bold', 
                          color: '#FFE0B2' }}>Log in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button,{marginTop: 30}]} 
                      onPress={()=>{
                          this.setState({ isModalVisible: true })
                          this.showModal()
                      }} >
                      <Text style={{ fontSize: 20, 
                          fontWeight: 'bold', 
                          color: '#FFE0B2' }}>Sign up</Text>
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#A82810',
        marginTop: 100,
        fontWeight: '300',
        fontSize: 45,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    inputBox: {
        borderBottomWidth: 4,
        borderBottomColor: '#F67B50',
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'brown',
        marginTop: 75,
    },
    button: {
        backgroundColor: '#BA0F30',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 50,
    },
    modalTitle: {
        fontSize: 30,
        textAlign: "center",
    },
    formTextInput: {
        borderWidth: 3,
        marginTop: 15,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    KeyboardAvoidingView: {
        backgroundColor: '#FFFF99'
    },
})