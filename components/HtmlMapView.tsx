import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export const mapHtml = (lat: number, lng: number) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Map</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <style>
      html, body, #map {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var map = L.map('map', {
          center: [${lat}, ${lng}],
          zoom: 15,
          scrollWheelZoom: false,
          dragging: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          zoomControl: true
        });
        L.tileLayer('https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
        var marker = L.marker([${lat}, ${lng}]).addTo(map);
      });
    </script>
  </body>
</html>
`;

const HtmlMapView = ({ lat = 23.0225, lng = 72.5714 }) => {
  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.container}>
      {isWeb ? (
        <iframe
          srcDoc={mapHtml(lat, lng)}
          style={styles.iframe}
          sandbox="allow-scripts allow-same-origin"
          title="Leaflet Map"
        />
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml(lat, lng) }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          allowUniversalAccessFromFileURLs
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  iframe: {
    width: "100%",
    height: "100%",
    borderWidth: 0

  },
});

export default HtmlMapView;
