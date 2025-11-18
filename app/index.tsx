import UserSvg from '@/assets/svg/UserSvg';
import { HeroSection } from '@/components/HeroSection';
import HtmlMapView from '@/components/HtmlMapView';
import { setScrollHandler } from '@/helpers/navigationHelpers';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';


export default function HomeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  // const OurProducts = useRef<ScrollView>(null);
  const aboutRef = useRef<View>(null);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();


  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const openModal = (phone: string) => {
    setPhoneNumber(phone);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const services = [
    { id: 1, title: "24/7 Support", image: "https://picsum.photos/200/150" },
    { id: 2, title: "Custom Packages", image: "https://picsum.photos/200/150?2" },
    { id: 3, title: "Fast Delivery", image: "https://picsum.photos/200/150?3" },
  ];

  const products = [
    { id: 1, title: "Premium Membership", image: "https://picsum.photos/200/150?4" },
    { id: 2, title: "Basic Plan", image: "https://picsum.photos/200/150?5" },
    { id: 3, title: "Exclusive Deals", image: "https://picsum.photos/200/150?6" },
  ];
  const testomonies = [
    { id: 1, review: "“Excellent service, very friendly team!”", UserName: 'Ramesh P.' },
    { id: 2, review: "“Loved the product quality and speed!”", UserName: 'Sneha S.' },
    { id: 3, review: "“Amazing support. Highly recommended!”", UserName: 'Amit K.' },
    { id: 4, review: "“Best customer service I’ve ever experienced.”", UserName: 'Priya M.' },
  ]

  // scrollYRef.current !=
  useEffect(() => {
    setScrollHandler((section) => {
      scrollRef.current?.scrollToEnd({ animated: true });
      // const sectionRef = aboutRef.current
      // console.log('sectionRef', sectionRef, scrollRef.current)
      // if (!sectionRef || !scrollRef.current) return;

      // // prevent duplicate scroll if already on that section
      // if (currentSectionRef.current === section) return;

      // sectionRef.measureLayout(
      //   // container ref is the scrollRef's inner view
      //   scrollRef.current.getScrollableNode?.() ?? scrollRef.current,
      //   (_x, y) => {
      //     if (Math.abs(scrollYRef.current - y) < 5) return; // close enough, don't scroll

      //     scrollRef.current?.scrollTo({ y, animated: true });
      //     currentSectionRef.current = section;
      //   },
      //   () => console.warn("Layout measure failed")
      // );
    });
  }, []);
  useEffect(() => {
    if (Platform.OS === "web") {
      window.history.pushState(null, "", "/");
      window.onpopstate = () => {
        window.history.go(1);
      };

      return () => {
        window.onpopstate = null;
      };
    }
  }, []);
  return (
    <View style={{ flex: 1, }}>
      <ScrollView ref={scrollRef}
        contentContainerStyle={styles.container}
      >
        <HeroSection
          onPressLeft={() => {
            openModal('9876543210')
          }}
          onPressRight={() => { openModal('9876543210') }}
        />

        {/* SECTION 2: Services */}
        <View style={[styles.section,]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <Pressable onPress={() => router.push("/services")} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <FlatList data={services}
            style={{ width: screenWidth, paddingHorizontal: Platform.OS === 'web' ? 10 : 0 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (<View style={styles.card} key={item.id}>
              <Image source={item.image} style={styles.cardImage} contentFit="cover" />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Pressable onPress={() => openModal('9876543210')} style={styles.button}>
                <Text style={styles.buttonText}>Contact Us</Text>
              </Pressable>
            </View>)} />

        </View>

        {/* SECTION 3: Products */}
        <View style={[styles.section,]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Products</Text>
            <Pressable onPress={() => router.push("/products")
            } style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <FlatList data={products}
            style={{ width: screenWidth, paddingHorizontal: Platform.OS === 'web' ? 10 : 0, }}

            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (<View style={styles.card} key={item.id}>
              <Image source={item.image} style={styles.cardImage} contentFit="cover" />

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Pressable onPress={() => { openModal('9876543210') }} style={styles.button}>
                <Text style={styles.buttonText}>Contact Us</Text>
              </Pressable>
            </View>)} />
        </View>

        {/* SECTION 4: Testimonials */}
        <View style={[styles.section, { height: screenHeight / 3 }]}>
          <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
            <Text style={[styles.sectionTitle, {
              textAlign: 'center', backgroundColor: '#1e293b',
              paddingVertical: 5,
              borderRadius: 10,
            }]}>What Our Customers Say</Text>
          </View>


          <FlatList data={testomonies}
            style={{ width: screenWidth, paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.testimonialCard}>
                <View style={{}}>
                  <UserSvg width={60} height={60} />
                  <Text style={styles.testimonial} >{item.UserName}</Text>
                </View>
                <Text style={styles.testimonial} numberOfLines={2} >{item.review}</Text>
              </View>
            )}
            contentContainerStyle={{}}
            scrollEnabled
          />
        </View>

        {/* Footer */}
        <View ref={aboutRef} style={styles.footer} >
          <Text style={[styles.sectionTitle, {
            textAlign: 'center', backgroundColor: '#1e293b',
            paddingVertical: 5,
            borderRadius: 10, marginBottom: 10
          }]}>About Us</Text>
          <View style={[styles.footerContent, screenWidth >= 768 ? styles.row : styles.column]}>


            <View style={[styles.mapBox, screenWidth >= 768 && { height: 300, width: '30%' }]}>
              <HtmlMapView lat={22.299798} lng={73.205336} />
            </View>
            <View style={[styles.contactBox, screenWidth >= 768 && { width: '25%' }]}>
              <Text style={styles.footerTitle}>Contact Us</Text>
              <Text>Address : Vadodara, Gujarat, India</Text>
              <Text>Phone   : +91-1251251251</Text>
              <Text>Email   : contact@sahaj.com</Text>
            </View>
          </View>
        </View>
      </ScrollView >

      {/* Contact Modal */}
      < Modal visible={modalVisible} transparent animationType="fade" >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              screenWidth > 700 && { width: 400, alignSelf: 'center' },
            ]}>
            <Text style={styles.modalText}>Call us at: {phoneNumber}</Text>
            <Pressable
              onPress={() => Linking.canOpenURL(`tel:${phoneNumber}`)}
              style={styles.button}>
              <Text style={styles.buttonText}>Call Now</Text>
            </Pressable>
            <Pressable onPress={closeModal}>
              <Text style={{ color: 'red', marginTop: 10 }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal >
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingBottom: 100,
    alignItems: 'center',
  },
  section: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',

  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    margin: 8,
    width: 300,
    elevation: 2,
    // justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#4e4623ff',


  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
  testimonialBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '100%',
  },
  testimonial: {
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    padding: 16,

    backgroundColor: '#e2e8f0',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  horizontalScroll: {
    width: '100%',
  },
  horizontalContent: {
    paddingHorizontal: 16,
  },
  footerContent: {
    width: '100%',

    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  column: {
    flexDirection: 'column',
  },
  contactBox: {
    height: 150,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center'

  },
  mapBox: {
    height: 250,
    width: '90%',

    overflow: 'hidden', alignSelf: 'center'
  },
  arrowButton: {
    position: "absolute",
    top: "40%",
    backgroundColor: "#000a",
    borderRadius: 25,
    padding: 6,
    zIndex: 10,
  },
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#1e293b',
    paddingVertical: 5,
    borderRadius: 10
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
  },
  viewAllText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    margin: 8,
    width: 280, justifyContent: 'center',
    borderWidth: 1, borderColor: '#E2DFD2'
  },
});
