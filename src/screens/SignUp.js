import React, {useState, useRef} from 'react';
import {View, TextInput, Text, Alert,  Platform, TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { setUsers } from '../redux/actions/usersActions';
import styles from '../components/Style';

const SignUp = props => {
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.chatuser.users);

  const {navigation} = props;
  const [name, onChangeName] = useState('');
  const [pswd, onChangePswd] = useState('');
  const [phno, onChangePhno] = useState('');

  const phoneInput = useRef(null);

  const navigate = () => {
    navigation.navigate('SignIn');
  }

  const signUpAlert = () => {
    const regName =  /(.*[a-z0-9]){5}/i;
    const regPswd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      
    const checkValid = phoneInput.current?.isValidNumber(phno);

    if(!regName.test(name))
    {  
      Alert.alert('Name Invalid', 'Name must be atleast 5 letters long');
    }
    else if(!checkValid)
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
    else if (!regPswd.test(pswd))
      Alert.alert('Invalid Password', 'Password must be of minimum eight characters, at least one letter, one number and one special character');
    else 
    {
      const user = users.find(user => user.phoneNumber === phno);
        if(user)
        {
          Alert.alert(
            'Phone Number Taken',
            'This phone number is already associated with another Chatterbox account, please try again with a different number',
          );
        }
        else{
          dispatch(setUsers({ name: name, phoneNumber: phno, password: pswd, isLogin: false }));
          Alert.alert(
            'Successful Sign Up',
            'Your account was created successfully',
          );
          navigate();
        }
    }
  } 

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                        <View style={styles.inputValues}>
                          <Text style={styles.userInputText}>NAME: </Text>
                          <TextInput
                          style={styles.signUpinput}
                          onChangeText={onChangeName}
                          placeholder="  Enter Name"
                          placeholderTextColor="#a8a6a5" 
                          value={name}
                          />
                        </View>
                        <View style={styles.inputValues}>
                          <Text style={styles.userInputText}>PHONE NUMBER: </Text>
                          <PhoneInput
                              ref={phoneInput}
                              defaultValue={phno}
                              defaultCode="IN"
                              layout="first"
                              onChangeFormattedText={(text) => {
                                onChangePhno(text);
                              }}
                              withDarkTheme={true}
                          />
                        </View>
                        <View style={styles.inputValues}>
                          <Text style={styles.userInputText}>PASSWORD: </Text>
                          <TextInput
                            style={styles.signUpinput}
                            onChangeText={onChangePswd}
                            secureTextEntry={true}
                            placeholder="  Enter Password"
                            placeholderTextColor="#a8a6a5" 
                            value={pswd}
                          />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight onPress={signUpAlert}>
                              <View style={styles.button}>
                                <Text style={styles. buttonText}>SIGN UP</Text>
                              </View>
                            </TouchableHighlight>
                        </View>  
                        <View style={styles.navigate}>
                          <Text style={styles.navigateText} onPress={navigate}>Already a member?   Sign In</Text>
                        </View>
                      </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
export default SignUp;
