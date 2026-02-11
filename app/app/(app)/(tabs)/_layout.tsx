import { Tabs } from "expo-router";
import {MaterialIcons} from '@expo/vector-icons';
import { useThemeColors } from "@/hooks/useThemeColors";    
import { Alert } from "react-native";
import { useSession } from "@/context/AuthContext";


export default function TabsLayout() {
    const colors = useThemeColors();

    const { signOut } = useSession(); // 2. Destructure signOut

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => signOut() }
            ]
        );
    };

    return(
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondaryText,
            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopColor: colors.border,
            },
            headerShown: false,
        }}>

<Tabs.Screen 
    name="index"
    options ={{
        title: "Home",
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size}/>
        ),
    }}/>
    
    <Tabs.Screen 
    name="operations"
    options ={{
        title: "Operations",
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="auto-fix-high" color={color} size={size}/>
        ),
    }}/>
    
    <Tabs.Screen 
    name="profile"
    options ={{
        title: "Profile",
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" color={color} size={size}/>
        ),
    }}/>
 

 

 <Tabs.Screen 
    name="logout"
    options ={{
        title: "Logout",
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="logout" color={color} size={size}/>
        ),
    }}
    
    listeners={{
                    tabPress: (e) => {
                        e.preventDefault(); // Prevents navigating to a non-existent page
                        handleLogout();     // Runs your logout logic
                    },
                }}
    />



        </Tabs>
    )
}