import { Link, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to home page
  // Otherwise, redirect to login page
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/login" />;
}