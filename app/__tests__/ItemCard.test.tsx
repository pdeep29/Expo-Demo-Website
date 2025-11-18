// __tests__/ItemCard.test.tsx
import { ItemCard } from '@/components/ItemCard';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('ItemCard', () => {
    const mockProps = {
        title: 'Test Item',
        category: 'Test Category',
        image: 'https://example.com/image.jpg',
    };

    it('renders correctly with given props', () => {
        const { getByTestId } = render(<ItemCard {...mockProps} />);

        const root = getByTestId('item-card-root');
        const image = getByTestId('item-card-image');
        const title = getByTestId('item-card-title');
        const category = getByTestId('item-card-category');

        expect(root).toBeTruthy();
        expect(image.props.source).toEqual(mockProps.image);
        expect(title.props.children).toBe(mockProps.title);
        expect(category.props.children).toBe(mockProps.category);
    });

    it('applies custom style if provided', () => {
        const customStyle = { backgroundColor: 'red' };
        const { getByTestId } = render(<ItemCard {...mockProps} style={customStyle} />);
        const rootStyle = getByTestId('item-card-root').props.style;

        expect(Array.isArray(rootStyle)).toBe(true);
        expect(rootStyle).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ backgroundColor: '#f9fafb' }),
                expect.objectContaining({ backgroundColor: 'red' }),
            ])
        );
    });

    it('renders image with correct style and contentFit', () => {
        const { getByTestId } = render(<ItemCard {...mockProps} />);
        const image = getByTestId('item-card-image');

        expect(image.props.style).toEqual(
            expect.objectContaining({
                height: 100,
                borderRadius: 8,
            })
        );
        expect(image.props.contentFit).toBe('cover');
    });

    it('matches snapshot', () => {
        const tree = render(<ItemCard {...mockProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
