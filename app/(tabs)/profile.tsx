// app/(tabs)/profile.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../../constants/theme';
import LogoutButton from '../../components/LogoutButton';

interface DecodedToken {
  CUSTOMER_NUMBER: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  EMAILADDRESS?: string;
  iat: number;
  exp: number;
}

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('Loading…');
  const [email, setEmail] = useState('');
  const [customerNumber, setCustomerNumber] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token =
          Platform.OS === 'web'
            ? localStorage.getItem('userToken')
            : await AsyncStorage.getItem('userToken');

        if (token) {
          const decoded = jwtDecode.default<DecodedToken>(token);
          const name = `${decoded.FIRST_NAME ?? 'Unknown'} ${
            decoded.LAST_NAME ?? ''
          }`.trim();
          setFullName(name);
          setEmail(decoded.EMAILADDRESS ?? '');
          setCustomerNumber(decoded.CUSTOMER_NUMBER);
        } else {
          setFullName('Guest');
        }
      } catch (e) {
        console.error('Error decoding token:', e);
        setFullName('Error loading profile');
      }
    }

    loadProfile();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: Theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: Theme.colors.primary }]}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />

      <Text style={[styles.name, { color: Theme.colors.text }]}>{fullName}</Text>
      <Text style={[styles.email, { color: Theme.colors.text }]}>{email}</Text>

      {customerNumber && (
        <View style={styles.row}>
          <Ionicons
            name="business"
            size={20}
            color={Theme.colors.secondary}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.company, { color: Theme.colors.text }]}>
            Company #: {customerNumber}
          </Text>
        </View>
      )}

      <TouchableOpacity style={[styles.button, { backgroundColor: Theme.colors.primary }]}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: Theme.colors.primary }]}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: -40,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -40,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  company: {
    fontSize: 14,
  },
  button: {
    width: '90%',
    maxWidth: 400,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});