const React = require('react');

// Simulate expo-image's Image component
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
