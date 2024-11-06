import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import customFetch from '@/utils/customFetch';

const UserContext = createContext();

const initialState = {
    user: null,
    isLoading: true,
    error: null
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case 'REMOVE_USER':
            return {
                ...state,
                user: null,
                isLoading: false
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Get current user details on mount
    useEffect(() => {
        getCurrentUser();
    }, [isLoggedIn]);

    const getCurrentUser = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await customFetch.get('/user');
            console.log({ data })
            dispatch({ type: 'SET_USER', payload: data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.msg || 'Failed to fetch user details' });
        }
    };

    // User actions
    const login = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await customFetch.post('/auth/login', userData);
            dispatch({ type: 'SET_USER', payload: data.user });
            setIsLoggedIn(true);
            return { success: true };
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.msg || 'Login failed' });
            return { error: error.response?.data?.msg || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await customFetch.get('/auth/logout');
            dispatch({ type: 'REMOVE_USER' });
            setIsLoggedIn(false);
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const updateUser = async (updates) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await customFetch.patch('/auth/update-user', updates);
            dispatch({ type: 'SET_USER', payload: data.user });
            return { success: true };
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.msg || 'Update failed' });
            return { error: error.response?.data?.msg || 'Update failed' };
        }
    };

    return (
        <UserContext.Provider value={{
            ...state,
            login,
            logout,
            updateUser,
            getCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 