// // 
// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import { useRouter } from 'expo-router';

// const WelcomeScreen = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* Logo or Heading */}
//       <View style={styles.logoContainer}>
//         <Text style={styles.logoText}>StressLess</Text>
//         <View style={styles.glowEffect} />
//       </View>

//       {/* Subtitle */}
//       <Text style={styles.subtitle}>Unlock Peace, Anytime, Anywhere!</Text>

//       {/* Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.primaryButton}
//           onPress={() => router.push('/MoodTracker')}
//         >
//           <Text style={styles.primaryButtonText}>GETTING STARTED</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => console.log('Login pressed')}
//         >
//           <Text style={styles.secondaryButtonText}>LOG IN</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Social Login */}
//       <Text style={styles.orText}>OR CONTINUE WITH</Text>
//       <View style={styles.socialIcons}>
//         {/* Google Login */}
//         <TouchableOpacity style={styles.socialButton}>
//           <Image
//             source={{
//               uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.socialButtonText}>Google</Text>
//         </TouchableOpacity>

//         {/* Apple Login */}
//         <TouchableOpacity style={styles.socialButton}>
//           <Image
//             source={{
//               uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
//             }}
//             style={styles.icon}
//           />
//           <Text style={styles.socialButtonText}>Apple</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3E5F5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logoContainer: {
//     marginBottom: 50, // Increased spacing
//     alignItems: 'center',
//   },
//   logoText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#9C27B0',
//     fontFamily: 'serif',
//   },
//   glowEffect: {
//     width: 200, // Increased size of glow
//     height: 200,
//     backgroundColor: '#E1BEE7',
//     borderRadius: 100,
//     position: 'absolute',
//     top: -70, // Adjusted position
//     zIndex: -2,
//     opacity: 0.65,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 70,
//     marginBottom: 20, // Increased spacing
//     textAlign: 'center', // Center-aligned for better symmetry
//   },
//   buttonContainer: {
//     width: '100%',
//     marginBottom: 20, // Adjusted spacing
//     marginTop: 10,
//   },
//   primaryButton: {
//     backgroundColor: '#9C27B0',
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginBottom: 15, // Increased spacing between buttons
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: '#E1BEE7',
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   secondaryButtonText: {
//     color: '#9C27B0',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666',
//     fontSize: 14,
//     marginVertical: 20,
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   socialButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginHorizontal: 10,
//     backgroundColor: 'white',
//   },
//   socialButtonText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',
//   },
//   icon: {
//     width: 40,
//     height: 40,
//   },
// });

// export default WelcomeScreen;

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo or Heading */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>StressLess</Text>
        <View style={styles.glowEffect} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Unlock Peace, Anytime, Anywhere!</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/MoodTracker')}
        >
          <Text style={styles.primaryButtonText}>GETTING STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log('Login pressed')}
        >
          <Text style={styles.secondaryButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>

      {/* Social Login */}
      <Text style={styles.orText}>OR CONTINUE WITH</Text>
      <View style={styles.socialIcons}>
        {/* Local images for Google and Apple logos */}
        <Image
          source={require('../assets/google.png')}
          style={styles.icon}
        />
        <Image
          source={require('../assets/apple.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50, // Increased spacing
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9C27B0',
    fontFamily: 'serif',
  },
  glowEffect: {
    width: 200, // Increased size of glow
    height: 200,
    backgroundColor: '#E1BEE7',
    borderRadius: 100,
    position: 'absolute',
    top: -70, // Adjusted position
    zIndex: -2,
    opacity: 0.65,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop:70,
    marginBottom: 20, // Increased spacing
    textAlign: 'center', // Center-aligned for better symmetry
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20, // Adjusted spacing
    marginTop:10,
  },
  primaryButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15, // Increased spacing between buttons
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E1BEE7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#9C27B0',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: '#666',
    fontSize: 14,
    marginVertical: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
  },
});

export default WelcomeScreen;