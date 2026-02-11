import { Slot, usePathname } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/context/AuthContext";
import { useSession } from '@/context/AuthContext'
import { useTheme } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";

function Header(){
  const {currentTheme} = useTheme();
  const {session, isLoading} = useSession();
  const pathname = usePathname();

  const isAuthScreen = pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up';

  if (session && !isLoading && isAuthScreen) {
    return (
      <>
      <StatusBar
      style={currentTheme === 'dark' ? 'light' : 'dark'}
      backgroundColor={currentTheme === 'dark' ? '#111827' : '#FFFFFF'} />    

      <Redirect href = "/(app)/(tabs)"/>
      </>
     
    ); 

  }
  
  return (
    <StatusBar
    style ={currentTheme === 'dark' ? 'light' : 'dark'}
    backgroundColor={currentTheme === 'dark' ? '#111827' : '#FFFFFF'} 
    />

  );
}

export default function RootLayout() {
  return <SessionProvider>
    <ThemeProvider>    
      <Header/>
    <Slot/>
      </ThemeProvider>
  </SessionProvider>
}
