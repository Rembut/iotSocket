import { AsyncStorage } from 'react-native';

export const API_URL = 'http://d6760285.ngrok.io'

export async function saveToken(value) {
  try {
    await AsyncStorage.setItem('token', value)
  } catch (error) {
    console.log(`Error saving dat ${error}`)
  }
}

export async function resetToken(value) {
  try {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.setItem('token', value);
  } catch (error) {
    console.log(`Error resetting data ${error}`)
  }
}

export async function dropToken(value) {
  try {
    await AsyncStorage.removeItem('token')
  } catch (error) {
    console.log(`Error drop data ${error}`)
  }
}

export async function getToken() {
  try {
    const value = await AsyncStorage.getItem('token')
    return value
  } catch (error) {
    console.log(`Error retrieving data ${error}`)
  }
}





