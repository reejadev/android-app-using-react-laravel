import {View,ScrollView,Text, Image, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/core/Button';
import Input from '../components/core/Input';
import {Link} from 'expo-router';
import axiosInstance from "@/config/axiosConfig";
import axios from 'axios';
import {useTheme} from '@/context/ThemeContext';

const Signup = () => {
  const {currentTheme} = useTheme();
  const [data, setData] = useState({
   name:"",
    email:"",   
    password:"",
    password_confirmation:"",
  });
  const [errors, setErrors] = useState({
     name:"",
    email:"",   
    password:"",
    password_confirmation:"",
  });
 const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState("");

 const handleChange = (key:string, value:string) => { 
  setData({...data, [key]: value});
  };

 const handleSignup = async () => { 
  setLoading(true);
  setErrors({
     name:"",
    email:"",   
    password:"",
    password_confirmation:"",
  });

try {
  console.log("Attempting Signup...");
  await axiosInstance.post('/signup', data);
console.log("Signup SUCCESSFUL. Response received."); // <-- CHECK CONSOLE FOR THIS
    resetForm();

  setSuccessMessage("Signup successful! Please check your email to verify your account.");
} 



catch (error) {


  console.log("Signup FAILED. Error details below:");
        
        // 🛠️ Robust Error Handling Logic (restored and simplified)
        if (axios.isAxiosError(error)) {
            const responseData = error.response?.data;
            const status = error.response?.status;
            
            // Handle Laravel/Validation Errors (Status 422 usually)
            if (status === 422 && responseData?.errors) { 
                console.log("Validation Errors:", responseData.errors);
                setErrors(responseData.errors);
                Alert.alert("Validation Error", "Please check the highlighted fields.");
            } 
            // Handle General API Errors (e.g., 401, 500, or a general message)
            else if (responseData?.message) {
                console.log("API Message:", responseData.message);
                Alert.alert("Signup Error", responseData.message);
            } 
            // Handle Network/Server Down Errors (no response status)
            else {
                console.error("Network/Server Error:", error.message);
                Alert.alert("Connection Error", "Could not connect to the API server. Check your IP/Port configuration.");
            }
        } else {
            // Non-Axios errors (should be rare)
            console.error("Unexpected Error:", error);
            Alert.alert("Unexpected Error", "An unknown error occurred. Please try again.");
        }

  // if (axios.isAxiosError(error)) {
  //   const responseData = error.response?.data;
  //   if ( responseData.errors) { 
  //     setErrors(responseData.errors);
  //   } else if (responseData.message) {
  //     Alert.alert("Signup Error", responseData.message);
  //   }else{
  //     console.error("Error:", error);
  //     Alert.alert("Signup Error", "An unexpected error occurred. Please try again.");
  //   }
  
  // }
} finally {
    setLoading(false);}
  }; 

 const resetForm = () => { 
  setData({
     name:"",
    email:"", 
    password:"",
    password_confirmation:"",
  }); 
   setErrors({
     name:"",
    email:"", 
    password:"",
    password_confirmation:"",
   })
  };

  return (
    <ScrollView>
    <View className={`flex-1 justify-center items-center p-5 
    ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50' }`}>

      <View className="items-center mb-8">
        <Image
        source={require('../assets/images/landing.png')}
        className="w-32 h-32"
        resizeMode='contain'
        
        ></Image>
        <Text className={`text-2xl font-bold mt-4
           ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900' }`}>
          Imaginary
        </Text>
      </View>

      <Text className={`text-3xl font-bold mb-5 ${currentTheme === 'dark' ? 
        'text-white': 'text-gray-900'}`}>Signup</Text>

        {!!successMessage && <Text className='bg-emerald-600 text-white
        rounded-lg py-3 px-4 mb-4'>{successMessage}</Text>}

<Input
        placeholder="Name"
        value={data.name}
        onChangeText={(value) => handleChange('name', value)}
        error={errors.name}
      />  

      <Input
        placeholder="Email"
        value={data.email}  
        onChangeText={(value) => handleChange("email", value)}
        keyboardType='email-address'
        error={errors.email}
        />
        <Input
        placeholder="Password"
        value={data.password}  
        onChangeText={(value) => handleChange("password", value)} 
        secureTextEntry
        error={errors.password}
        />
        <Input
        placeholder="Confirm Password"
        value={data.password_confirmation}  
        onChangeText={(value) => handleChange("password_confirmation", value)} 
        secureTextEntry
        error={errors.password_confirmation}
        />  
        <Button
        className='w-full bg-primary mb-4'
        onPress={handleSignup}
         disabled={loading}
         loading={loading}
        >



          <View className='flex-row items-center justify-center'>


       <Text className='text-white text-center'>Signup</Text>
       </View>
        </Button>
<Text className={`text-lg ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-5`}>
        Already have an account?{' '}
        <Link href="/sign-in">
        <Text className="text-primary"> Sign in</Text>           
        </Link>
</Text>

    </View>
     </ScrollView>
  );

};

export default Signup;