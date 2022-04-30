import React, {useState, useRef} from 'react';
import {View, TextInput, Text, Alert, Platform, TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { setLogin } from '../redux/actions/usersActions';
import styles from '../components/Style';

const SignIn = (props) => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.chatuser.users);

    const {navigation} = props;
    const [phno, onChangePhno] = useState('');
    const [pswd, onChangePswd] = useState('');

    const phoneInput = useRef(null);

    const navigate1 = () => {
        navigation.navigate('SignUp');
      }
    const navigate2 = () => {
        navigation.navigate('Home');
      }

    const login = () => {

      const regPswd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      let checkValid = phoneInput.current?.isValidNumber(phno);
      console.log(checkValid)

      if(!checkValid)
        Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      else if (!regPswd.test(pswd))
        Alert.alert('Invalid Password', 'Password must be of minimum eight characters, at least one letter, one number and one special character');
      else 
      {
        const user = users.find(user => user.phoneNumber === phno);
        if(user)
        {
            if(user.password === pswd)
            {
                dispatch(setLogin(user));
                Alert.alert('Successful Sign In');
                navigate2();
            } 
            else 
            { 
                Alert.alert('Error', 'Wrong password');
            }
        }
        else 
        {
            Alert.alert('Error', 'User not found');
        }        
      }
    };
    
    return (
    <>
      <View style={styles.container}>
        <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={styles.title}>SIGN IN</Text>
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
                              withShadow
                          />
                        </View>
                        <View style={styles.inputValues}>
                            <Text style={styles.userInputText}>PASSWORD: </Text>
                            <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={onChangePswd}
                            placeholder="Enter Password"
                            placeholderTextColor="#a8a6a5" 
                            value={pswd}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                        <TouchableHighlight onPress={login}>
                            <View style={styles.button}>
                            <Text style={styles. buttonText}>SIGN IN</Text>
                            </View>
                        </TouchableHighlight>
                        </View>
                        <View style={styles.navigate}>
                            <Text style={styles.navigateText} onPress={navigate1}>New here?  Sign Up</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default SignIn;
