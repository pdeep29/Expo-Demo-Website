// __tests__/Dialog.test.js
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { render } from '@testing-library/react-native';
import React = require('react');


describe('Dialog component', () => {
    it('renders the given message when provided', () => {
        const { getByTestId } = render(
            <ConfirmDialog visible={true} message="Hello World" onCancel={function (): void {

            }} onConfirm={function (): void {

            }} />
        );
        expect(getByTestId('dialog-message').props.children).toBe('Hello World');
    });
    it('renders "No message" when message is empty', () => {
        const { getByTestId } = render(
            <ConfirmDialog visible={true} message="" onCancel={function (): void {

            }} onConfirm={function (): void {

            }} />
        );
        expect(getByTestId('dialog-message-empty').props.children).toBe('');
    });
});
