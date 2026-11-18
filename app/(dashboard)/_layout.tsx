import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Slot } from 'expo-router';
import { theme } from '../../src/theme';
import { Header } from '../../src/components/common/Header';
import { Sidebar } from '../../src/components/navigation/Sidebar';
import { MobileNav } from '../../src/components/navigation/MobileNav';

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < 768);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsMobile(window.width < 768);
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        {!isMobile && <Sidebar />}
        <View style={styles.mainContent}>
          <Slot />
        </View>
      </View>
      {isMobile && <MobileNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
