import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.findParking": "Find Parking",
      "nav.myBookings": "My Bookings",
      "nav.dashboard": "Dashboard",
      "nav.manageSlots": "Manage Slots",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.logout": "Logout",
      
      // Home Page
      "home.title": "Find & Book Parking",
      "home.titleHighlight": "Instantly",
      "home.subtitle": "Smart parking solution with real-time availability, dynamic pricing, and seamless payments",
      "home.getStarted": "Get Started Free",
      "home.signIn": "Sign In",
      "home.whyChoose": "Why Choose ParkLink?",
      "home.howItWorks": "How It Works",
      "home.ready": "Ready to Park Smarter?",
      "home.joinNow": "Join thousands of drivers who've made parking stress-free",
      "home.startParking": "Start Parking Now",
      
      // Features
      "feature.realtime": "Real-Time Availability",
      "feature.realtimeDesc": "Live slot status powered by IoT sensors. Know before you go!",
      "feature.navigation": "Smart Navigation",
      "feature.navigationDesc": "Google Maps integration for turn-by-turn directions to your parking spot",
      "feature.payment": "Seamless Payments",
      "feature.paymentDesc": "Multiple payment options via Razorpay - UPI, Cards, Wallets",
      "feature.pricing": "Dynamic Pricing",
      "feature.pricingDesc": "Fair time-based pricing with peak hour adjustments",
      "feature.booking": "Book in Advance",
      "feature.bookingDesc": "Reserve your spot ahead of time and drive stress-free",
      "feature.management": "Easy Management",
      "feature.managementDesc": "Track bookings, view history, and manage payments all in one place",
      
      // Steps
      "step.search": "Search Location",
      "step.searchDesc": "Find available parking near your destination",
      "step.book": "Book Your Slot",
      "step.bookDesc": "Reserve your spot with just a few clicks",
      "step.navigate": "Navigate & Park",
      "step.navigateDesc": "Follow GPS directions and park hassle-free",
      
      // Auth
      "auth.login": "Sign In",
      "auth.register": "Create Account",
      "auth.email": "Email Address",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.name": "Full Name",
      "auth.phone": "Phone Number",
      "auth.accountType": "Account Type",
      "auth.user": "User (Find & Book Parking)",
      "auth.admin": "Admin (Manage Parking Slots)",
      "auth.loginBtn": "Sign In",
      "auth.registerBtn": "Create Account",
      "auth.noAccount": "Don't have an account?",
      "auth.hasAccount": "Already have an account?",
      "auth.signUpHere": "Sign up here",
      "auth.signInHere": "Sign in here",
      "auth.backHome": "Back to Home",
      
      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.stats": "Quick Stats",
      "dashboard.totalBookings": "Total Bookings",
      "dashboard.activeBookings": "Active Bookings",
      "dashboard.totalSpent": "Total Spent",
      "dashboard.recentBookings": "Recent Bookings",
      "dashboard.location": "Location",
      "dashboard.date": "Date",
      "dashboard.time": "Time",
      "dashboard.amount": "Amount",
      "dashboard.status": "Status",
      
      // Common
      "common.loading": "Loading...",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.book": "Book",
      "common.pay": "Pay Now",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.viewAll": "View All",
      "common.noData": "No data available"
    }
  },
  hi: {
    translation: {
      // Navbar
      "nav.home": "होम",
      "nav.findParking": "पार्किंग खोजें",
      "nav.myBookings": "मेरी बुकिंग",
      "nav.dashboard": "डैशबोर्ड",
      "nav.manageSlots": "स्लॉट प्रबंधित करें",
      "nav.login": "लॉगिन",
      "nav.register": "रजिस्टर",
      "nav.logout": "लॉगआउट",
      
      // Home Page
      "home.title": "पार्किंग खोजें और बुक करें",
      "home.titleHighlight": "तुरंत",
      "home.subtitle": "रीयल-टाइम उपलब्धता, डायनामिक प्राइसिंग और सहज भुगतान के साथ स्मार्ट पार्किंग समाधान",
      "home.getStarted": "फ्री में शुरू करें",
      "home.signIn": "साइन इन करें",
      "home.whyChoose": "ParkLink क्यों चुनें?",
      "home.howItWorks": "यह कैसे काम करता है",
      "home.ready": "स्मार्ट पार्किंग के लिए तैयार?",
      "home.joinNow": "हजारों ड्राइवरों में शामिल हों जिन्होंने पार्किंग को तनाव मुक्त बनाया है",
      "home.startParking": "अभी पार्किंग शुरू करें",
      
      // Features
      "feature.realtime": "रीयल-टाइम उपलब्धता",
      "feature.realtimeDesc": "IoT सेंसर द्वारा संचालित लाइव स्लॉट स्थिति। जाने से पहले जानें!",
      "feature.navigation": "स्मार्ट नेविगेशन",
      "feature.navigationDesc": "आपकी पार्किंग स्पॉट के लिए टर्न-बाय-टर्न दिशाओं के लिए Google Maps एकीकरण",
      "feature.payment": "सहज भुगतान",
      "feature.paymentDesc": "Razorpay के माध्यम से कई भुगतान विकल्प - UPI, कार्ड, वॉलेट",
      "feature.pricing": "डायनामिक प्राइसिंग",
      "feature.pricingDesc": "पीक आवर समायोजन के साथ उचित समय-आधारित मूल्य निर्धारण",
      "feature.booking": "पहले से बुक करें",
      "feature.bookingDesc": "समय से पहले अपनी जगह आरक्षित करें और तनाव मुक्त ड्राइव करें",
      "feature.management": "आसान प्रबंधन",
      "feature.managementDesc": "बुकिंग ट्रैक करें, इतिहास देखें और सभी भुगतानों को एक जगह प्रबंधित करें",
      
      // Steps
      "step.search": "स्थान खोजें",
      "step.searchDesc": "अपने गंतव्य के पास उपलब्ध पार्किंग खोजें",
      "step.book": "अपना स्लॉट बुक करें",
      "step.bookDesc": "कुछ क्लिक में अपनी जगह आरक्षित करें",
      "step.navigate": "नेविगेट करें और पार्क करें",
      "step.navigateDesc": "GPS दिशाओं का पालन करें और परेशानी मुक्त पार्क करें",
      
      // Auth
      "auth.login": "साइन इन करें",
      "auth.register": "खाता बनाएं",
      "auth.email": "ईमेल पता",
      "auth.password": "पासवर्ड",
      "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
      "auth.name": "पूरा नाम",
      "auth.phone": "फोन नंबर",
      "auth.accountType": "खाता प्रकार",
      "auth.user": "उपयोगकर्ता (पार्किंग खोजें और बुक करें)",
      "auth.admin": "व्यवस्थापक (पार्किंग स्लॉट प्रबंधित करें)",
      "auth.loginBtn": "साइन इन करें",
      "auth.registerBtn": "खाता बनाएं",
      "auth.noAccount": "खाता नहीं है?",
      "auth.hasAccount": "पहले से खाता है?",
      "auth.signUpHere": "यहां साइन अप करें",
      "auth.signInHere": "यहां साइन इन करें",
      "auth.backHome": "होम पर वापस जाएं",
      
      // Dashboard
      "dashboard.welcome": "वापसी पर स्वागत है",
      "dashboard.stats": "त्वरित आंकड़े",
      "dashboard.totalBookings": "कुल बुकिंग",
      "dashboard.activeBookings": "सक्रिय बुकिंग",
      "dashboard.totalSpent": "कुल खर्च",
      "dashboard.recentBookings": "हाल की बुकिंग",
      "dashboard.location": "स्थान",
      "dashboard.date": "तारीख",
      "dashboard.time": "समय",
      "dashboard.amount": "राशि",
      "dashboard.status": "स्थिति",
      
      // Common
      "common.loading": "लोड हो रहा है...",
      "common.save": "सहेजें",
      "common.cancel": "रद्द करें",
      "common.delete": "हटाएं",
      "common.edit": "संपादित करें",
      "common.book": "बुक करें",
      "common.pay": "अभी भुगतान करें",
      "common.search": "खोजें",
      "common.filter": "फ़िल्टर",
      "common.viewAll": "सभी देखें",
      "common.noData": "कोई डेटा उपलब्ध नहीं है"
    }
  },
  te: {
    translation: {
      // Navbar
      "nav.home": "హోమ్",
      "nav.findParking": "పార్కింగ్ కనుగొనండి",
      "nav.myBookings": "నా బుకింగ్‌లు",
      "nav.dashboard": "డాష్‌బోర్డ్",
      "nav.manageSlots": "స్లాట్‌లను నిర్వహించండి",
      "nav.login": "లాగిన్",
      "nav.register": "రిజిస్టర్",
      "nav.logout": "లాగ్అవుట్",
      
      // Home Page
      "home.title": "పార్కింగ్ కనుగొని బుక్ చేయండి",
      "home.titleHighlight": "తక్షణమే",
      "home.subtitle": "రియల్-టైమ్ అందుబాటు, డైనమిక్ ప్రైసింగ్ మరియు సరళమైన చెల్లింపులతో స్మార్ట్ పార్కింగ్ పరిష్కారం",
      "home.getStarted": "ఉచితంగా ప్రారంభించండి",
      "home.signIn": "సైన్ ఇన్ చేయండి",
      "home.whyChoose": "ParkLink ఎందుకు ఎంచుకోవాలి?",
      "home.howItWorks": "ఇది ఎలా పనిచేస్తుంది",
      "home.ready": "స్మార్ట్‌గా పార్క్ చేయడానికి సిద్ధంగా ఉన్నారా?",
      "home.joinNow": "పార్కింగ్‌ను ఒత్తిడి రహితంగా చేసిన వేలాది డ్రైవర్లలో చేరండి",
      "home.startParking": "ఇప్పుడే పార్కింగ్ ప్రారంభించండి",
      
      // Features
      "feature.realtime": "రియల్-టైమ్ అందుబాటు",
      "feature.realtimeDesc": "IoT సెన్సార్లచే శక్తివంతం చేయబడిన లైవ్ స్లాట్ స్థితి. వెళ్ళడానికి ముందు తెలుసుకోండి!",
      "feature.navigation": "స్మార్ట్ నావిగేషన్",
      "feature.navigationDesc": "మీ పార్కింగ్ స్థలానికి టర్న్-బై-టర్న్ దిశల కోసం Google Maps ఏకీకరణ",
      "feature.payment": "సరళమైన చెల్లింపులు",
      "feature.paymentDesc": "Razorpay ద్వారా బహుళ చెల్లింపు ఎంపికలు - UPI, కార్డ్‌లు, వాలెట్‌లు",
      "feature.pricing": "డైనమిక్ ప్రైసింగ్",
      "feature.pricingDesc": "పీక్ అవర్ సర్దుబాట్లతో న్యాయమైన సమయ-ఆధారిత ధరలు",
      "feature.booking": "ముందుగానే బుక్ చేయండి",
      "feature.bookingDesc": "ముందుగానే మీ స్థలాన్ని రిజర్వ్ చేసుకోండి మరియు ఒత్తిడి లేకుండా డ్రైవ్ చేయండి",
      "feature.management": "సులభ నిర్వహణ",
      "feature.managementDesc": "బుకింగ్‌లను ట్రాక్ చేయండి, చరిత్రను చూడండి మరియు అన్ని చెల్లింపులను ఒకే చోట నిర్వహించండి",
      
      // Steps
      "step.search": "స్థానాన్ని శోధించండి",
      "step.searchDesc": "మీ గమ్యస్థానం సమీపంలో అందుబాటులో ఉన్న పార్కింగ్‌ను కనుగొనండి",
      "step.book": "మీ స్లాట్‌ను బుక్ చేయండి",
      "step.bookDesc": "కొన్ని క్లిక్‌లతో మీ స్థలాన్ని రిజర్వ్ చేయండి",
      "step.navigate": "నావిగేట్ చేసి పార్క్ చేయండి",
      "step.navigateDesc": "GPS దిశలను అనుసరించండి మరియు ఇబ్బంది లేకుండా పార్క్ చేయండి",
      
      // Auth
      "auth.login": "సైన్ ఇన్ చేయండి",
      "auth.register": "ఖాతా సృష్టించండి",
      "auth.email": "ఇమెయిల్ చిరునామా",
      "auth.password": "పాస్‌వర్డ్",
      "auth.confirmPassword": "పాస్‌వర్డ్‌ను నిర్ధారించండి",
      "auth.name": "పూర్తి పేరు",
      "auth.phone": "ఫోన్ నంబర్",
      "auth.accountType": "ఖాతా రకం",
      "auth.user": "వినియోగదారు (పార్కింగ్ కనుగొని బుక్ చేయండి)",
      "auth.admin": "నిర్వాహకుడు (పార్కింగ్ స్లాట్‌లను నిర్వహించండి)",
      "auth.loginBtn": "సైన్ ఇన్ చేయండి",
      "auth.registerBtn": "ఖాతా సృష్టించండి",
      "auth.noAccount": "ఖాతా లేదా?",
      "auth.hasAccount": "ఇప్పటికే ఖాతా ఉందా?",
      "auth.signUpHere": "ఇక్కడ సైన్ అప్ చేయండి",
      "auth.signInHere": "ఇక్కడ సైన్ ఇన్ చేయండి",
      "auth.backHome": "హోమ్‌కు తిరిగి వెళ్లండి",
      
      // Dashboard
      "dashboard.welcome": "తిరిగి స్వాగతం",
      "dashboard.stats": "త్వరిత గణాంకాలు",
      "dashboard.totalBookings": "మొత్తం బుకింగ్‌లు",
      "dashboard.activeBookings": "క్రియాశీల బుకింగ్‌లు",
      "dashboard.totalSpent": "మొత్తం ఖర్చు",
      "dashboard.recentBookings": "ఇటీవలి బుకింగ్‌లు",
      "dashboard.location": "స్థానం",
      "dashboard.date": "తేదీ",
      "dashboard.time": "సమయం",
      "dashboard.amount": "మొత్తం",
      "dashboard.status": "స్థితి",
      
      // Common
      "common.loading": "లోడ్ అవుతోంది...",
      "common.save": "సేవ్ చేయండి",
      "common.cancel": "రద్దు చేయండి",
      "common.delete": "తొలగించండి",
      "common.edit": "సవరించండి",
      "common.book": "బుక్ చేయండి",
      "common.pay": "ఇప్పుడే చెల్లించండి",
      "common.search": "శోధించండి",
      "common.filter": "ఫిల్టర్",
      "common.viewAll": "అన్నీ చూడండి",
      "common.noData": "డేటా అందుబాటులో లేదు"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
