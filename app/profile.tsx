import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import Theme from '../constants/theme';
import LogoutButton from '../components/LogoutButton';

export default function ProfileScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

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
          const decoded = jwtDecode<{
            CUSTOMER_NUMBER: string;
            FIRST_NAME?: string;
            LAST_NAME?: string;
            EMAILADDRESS?: string;
          }>(token);
          setFullName(
            `${decoded.FIRST_NAME ?? 'Unknown'} ${decoded.LAST_NAME ?? ''}`.trim()
          );
          setEmail(decoded.EMAILADDRESS ?? '');
          setCustomerNumber(decoded.CUSTOMER_NUMBER);
        } else {
          setFullName('Guest');
        }
      } catch {
        setFullName('Error loading profile');
      }
    }
    loadProfile();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { backgroundColor: c.primary }]} />

      <View style={[styles.card, { backgroundColor: c.cardBackground, borderColor: c.border }]}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={[styles.avatar, { borderColor: c.border }]}
        />

        <Text style={[styles.name, { color: c.text, fontFamily: Theme.fonts.bold }]}>
          {fullName}
        </Text>
        {email !== '' && (
          <Text style={[styles.infoText, { color: c.text, fontFamily: Theme.fonts.regular }]}>
            {email}
          </Text>
        )}
        {customerNumber && (
          <Text style={[styles.infoText, { color: c.text, fontFamily: Theme.fonts.regular }]}>
            Company #: {customerNumber}
          </Text>
        )}

        {/* Change Password */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => console.log('Change Password')}
        >
          <Text style={[styles.buttonText, { color: Colors.base.white }]}>
            CHANGE PASSWORD
          </Text>
        </TouchableOpacity>

        {/* Real Log Out */}
<TouchableOpacity
  activeOpacity={0.8}
  style={[styles.button, { backgroundColor: c.tint }]}
>
  <LogoutButton />
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  header: {
    width: '100%',
    height: 60,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 16,
  },
  name: { fontSize: 18, marginBottom: 8 },
  infoText: { fontSize: 16, marginBottom: 8 },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
