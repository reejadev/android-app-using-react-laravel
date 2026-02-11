import { useContext, createContext, type PropsWithChildren, useEffect } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from 'expo-router';
import axios from "axios";
import axiosInstance from "../config/axiosConfig";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    credits: number | null;
}

interface AuthContextType {
    signIn: (token: string, user: User) => void;
    signOut: () => void;
    session?: string | null;
    user?: User | null;
    isLoading: boolean;
    updateUser: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    signIn:() => null,
    signOut:() => null,
    session: null,
    user: null,
    isLoading: false,
    updateUser: async () => { },
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');

        }
    }
    return value;
}
    export function SessionProvider({ children }: PropsWithChildren) {
        const [[isSessionLoading, session], setSession] = useStorageState('session');
        const [[isUserLoading,user], setUser] = useStorageState('user');

        
        const updateUser = async (userData: User) => {
            await setUser
        };

        const handleSignOut = async () => {
            try {
                if (session) {
                    await axiosInstance.post('/logout', null, {
                        headers: {
                            Authorization: `Bearer ${ session }`
                        },
                    });

                    setSession(null);
                    setUser(null);
                    router.replace('/sign-in');
                }
            } catch (error) {

                console.error('Error during sign out:', error);
                setSession(null);
                setUser(null);
                router.replace('/sign-in');     
            }
        };

        const loadUserInfo = async (token: string) => {
            try {
                const response = await axiosInstance.get('/user', {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    },
                });
                setUser(JSON.stringify(response.data));
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    setSession(null);
                    setUser(null);
                    router.replace('/sign-in');
                } else {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        useEffect(() => {
            if (session) {
                loadUserInfo(session);   
            }
        }, [session]);           

        const parsedUser = user ? (() => {
            try {
                return JSON.parse(user) as User;
            } catch (e){
                console.error('Error parsing user data:', e);
                return null;            
            }               
         })() : null;

        const handleUpdateUser = async (userData: User) => {
            try {
                const userString = JSON.stringify(userData);
                await setUser(userString);
               
            } catch (e) {
                console.error('Error updating user data:', e);      
                throw e;
            }
        };

        const handleSignIn = async (token: string, userData: User) => {

            try{
                await setSession(token);
                await setUser(JSON.stringify(userData));
            } catch (e) {
                console.error('Error during sign in:', e);
                throw e;
            }
        };
        return (
            <AuthContext.Provider
                value={{
                    signIn: handleSignIn,
                    signOut: handleSignOut,     
                    session,
                    user: parsedUser,
                    // isLoading: false,
                    isLoading: isSessionLoading || isUserLoading,
                    updateUser: handleUpdateUser               
                
                
                }}>
                {children}
            </AuthContext.Provider>
        );
    }  