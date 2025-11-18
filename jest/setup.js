const React = require('react');
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
// ✅ Simulate expo-image without importing itself
module.exports = {
    Image: ({ testID, source, style, contentFit }) => {
        return React.createElement('Image', {
            testID,
            source,
            style,
            contentFit,
        });
    },
};
