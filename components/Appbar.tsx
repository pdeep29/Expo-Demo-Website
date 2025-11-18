import { usePathname, useRouter } from "expo-router";

import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { triggerScrollToSection } from "../helpers/navigationHelpers";
import { useAppbarHeight } from "./context/AppbarHeightContext";
import React = require("react");

export const Appbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const { setHeight } = useAppbarHeight();

  React.useEffect(() => {
    setIsMobile(width < 600);
  }, [width]);

  // const navigateAndClose = (path: string) => {
  //   if (path.path != null) {
  //     router.push(path.path as any);
  //   } else if (path.scrollTo) {
  //     triggerScrollToSection(link.scrollTo);
  //   }
  //   setShowMenu(false);
  // };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/services" },

    { name: "Products", path: "/products" },
    { name: "About Us", path: null, scrollTo: "about" },
    { name: "Admin Login", path: "/admin/login", },

  ];
  // ✅ Filter based on platform
  const links = Platform.OS === "android"
    ? baseLinks
    : baseLinks.filter(link => link.name !== "Admin Login");
  const isActive = (path: string) => pathname === path;

  return (
    <View
      style={styles.container}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      <Text style={styles.logo}>My Website</Text>

      {isMobile ? (
        <Pressable onPress={() => setShowMenu(true)}>
          <Text style={styles.hamburger}>☰</Text>
        </Pressable>
      ) : (
        <View style={styles.links}>
          {links.map((link) => (
            <Pressable
              key={link.path}
              onPress={() => {
                if (link.path != null) {
                  router.replace(link.path as any);
                } else if (link.scrollTo) {
                  if (pathname === "/") {
                    triggerScrollToSection(link.scrollTo as 'about', true);
                  } else {
                    triggerScrollToSection(link.scrollTo as 'about', false);
                    router.replace("/");
                  }
                }
              }}
              style={[
                styles.linkWrapper,
                link.path != null && isActive(link.path) && styles.activeLinkWrapper,
              ]}
            >
              <Text
                style={[
                  styles.linkText,
                  link.path != null && isActive(link.path) && styles.activeLinkText,
                ]}
              >
                {link.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <Modal visible={showMenu} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowMenu(false)} />
        <View style={styles.sidebar}>
          {links.map((link) => (
            <Pressable
              key={link.path}
              onPress={() => {
                if (link.path != null) {
                  router.replace(link.path as any);
                } else if (link.scrollTo) {
                  if (pathname === "/") {
                    triggerScrollToSection(link.scrollTo as 'about', true);
                  } else {
                    triggerScrollToSection(link.scrollTo as 'about', false);
                    router.replace("/");
                  }
                }
                setShowMenu(false);
              }
              }
              style={[
                styles.sidebarLinkWrapper,
                link.path != null && isActive(link.path) && styles.activeSidebarLinkWrapper,
              ]}
            >
              <Text
                style={[
                  styles.sidebarLink,
                  link.path != null && isActive(link.path) && styles.activeSidebarLinkText,
                ]}
              >
                {link.name}
              </Text>
            </Pressable>
          ))}

        </View>
      </Modal >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1e293b",
  },
  logo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  links: {
    flexDirection: "row",
    gap: 16,
  },
  linkWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  activeLinkWrapper: {
    backgroundColor: "#fff",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
  },
  activeLinkText: {
    color: "#1e293b",
    fontWeight: "bold",
  },
  hamburger: {
    color: "#fff",
    fontSize: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 200,
    backgroundColor: "#fff",
    padding: 20,
    // justifyContent: "center",
    elevation: 5,
  },
  sidebarLinkWrapper: {
    marginVertical: 10,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  activeSidebarLinkWrapper: {
    backgroundColor: "#1e293b",
  },
  sidebarLink: {
    fontSize: 18,
    color: "#1e293b",
  },
  activeSidebarLinkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
