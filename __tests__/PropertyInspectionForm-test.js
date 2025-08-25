import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PropertyInspectionForm from '../src/screens/PropertyInspectionForm';

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

describe('PropertyInspectionForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('renders without crashing', () => {
        const { getByText } = render(<PropertyInspectionForm />);
        expect(getByText('New Property Inspection')).toBeTruthy();
    });

    test('displays all form sections', () => {
        const { getByText } = render(<PropertyInspectionForm />);

        expect(getByText('Basic Information')).toBeTruthy();
        expect(getByText('Inspection Details')).toBeTruthy();
        expect(getByText('Property Details')).toBeTruthy();
        expect(getByText('Media & Documents')).toBeTruthy();
        expect(getByText('Additional Information')).toBeTruthy();
    });

    test('has all required input fields', () => {
        const { getByPlaceholderText } = render(<PropertyInspectionForm />);

        expect(getByPlaceholderText('Enter property name')).toBeTruthy();
        expect(getByPlaceholderText('Enter full address')).toBeTruthy();
        expect(getByPlaceholderText('Enter inspector name')).toBeTruthy();
    });

    test('updates property name field correctly', () => {
        const { getByPlaceholderText } = render(<PropertyInspectionForm />);
        const propertyNameInput = getByPlaceholderText('Enter property name');

        fireEvent.changeText(propertyNameInput, 'Test Property');
        expect(propertyNameInput.props.value).toBe('Test Property');
    });

    test('updates address field correctly', () => {
        const { getByPlaceholderText } = render(<PropertyInspectionForm />);
        const addressInput = getByPlaceholderText('Enter full address');

        fireEvent.changeText(addressInput, '123 Test Street');
        expect(addressInput.props.value).toBe('123 Test Street');
    });

    test('shows validation errors for empty required fields', async () => {
        const { getByText, queryByText } = render(<PropertyInspectionForm />);
        const submitButton = getByText('Create Inspection');

        fireEvent.press(submitButton);

        // Use queryByText instead of findByText for simpler checking
        await waitFor(() => {
            expect(queryByText('Property name is required')).toBeTruthy();
            expect(queryByText('Address is required')).toBeTruthy();
            expect(queryByText('Inspector selection is required')).toBeTruthy();
        });
    });

    test('validates room count cannot be negative', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<PropertyInspectionForm />);
        const roomCountInput = getByPlaceholderText('0');
        const submitButton = getByTestId('submit-button');

        // Test negative value
        fireEvent.changeText(roomCountInput, '-5');
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(getByText('Room count cannot be negative')).toBeTruthy();
        });

        // Test that positive value doesn't show error
        fireEvent.changeText(roomCountInput, '5');
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(() => getByText('Room count cannot be negative')).toThrow();
        });
    });

    test('clears errors when user starts typing in invalid fields', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<PropertyInspectionForm />);
        const propertyNameInput = getByPlaceholderText('Enter property name');
        const submitButton = getByText('Create Inspection');

        // First trigger validation error
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(queryByText('Property name is required')).toBeTruthy();
        });

        // Then type something to clear the error
        fireEvent.changeText(propertyNameInput, 'Test Property');

        await waitFor(() => {
            expect(queryByText('Property name is required')).toBeNull();
        });
    });

    test('handles reset button click', () => {
        const { getByText } = render(<PropertyInspectionForm />);
        const resetButton = getByText('Reset');

        fireEvent.press(resetButton);

        const Alert = require('react-native/Libraries/Alert/Alert');
        expect(Alert.alert).toHaveBeenCalledWith(
            'Reset Form',
            'Are you sure you want to reset all fields?',
            expect.any(Array)
        );
    });

    test('handles image picker buttons click', () => {
        const { getByText } = render(<PropertyInspectionForm />);
        const cameraButton = getByText('Take Photo');
        const galleryButton = getByText('From Gallery');

        fireEvent.press(cameraButton);
        fireEvent.press(galleryButton);

        const Alert = require('react-native/Libraries/Alert/Alert');
        expect(Alert.alert).toHaveBeenCalledTimes(2);
    });

    test('submits form successfully with valid data', async () => {
        const { getByText, getByPlaceholderText } = render(<PropertyInspectionForm />);

        // Fill in required fields
        fireEvent.changeText(getByPlaceholderText('Enter property name'), 'Test Property');
        fireEvent.changeText(getByPlaceholderText('Enter full address'), '123 Test Street');
        fireEvent.changeText(getByPlaceholderText('Enter inspector name'), 'John Doe');

        const submitButton = getByText('Create Inspection');

        fireEvent.press(submitButton);

        // Advance timers to complete the timeout
        jest.advanceTimersByTime(2000);

        await waitFor(() => {
            const Alert = require('react-native/Libraries/Alert/Alert');
            expect(Alert.alert).toHaveBeenCalledWith(
                'Success',
                'Inspection created successfully!',
                [{ text: 'OK' }]
            );
        });
    });

    test('shows loading state during submission', () => {
        const { getByText, getByPlaceholderText } = render(<PropertyInspectionForm />);

        // Fill in required fields
        fireEvent.changeText(getByPlaceholderText('Enter property name'), 'Test Property');
        fireEvent.changeText(getByPlaceholderText('Enter full address'), '123 Test Street');
        fireEvent.changeText(getByPlaceholderText('Enter inspector name'), 'John Doe');

        const submitButton = getByText('Create Inspection');

        fireEvent.press(submitButton);

        // Button should be disabled during loading
        expect(submitButton.props.disabled).toBe(true);
    });

    test('handles description and notes fields', () => {
        const { getByPlaceholderText } = render(<PropertyInspectionForm />);
        const descriptionInput = getByPlaceholderText('Describe the property and inspection requirements...');
        const notesInput = getByPlaceholderText('Additional notes or observations...');

        fireEvent.changeText(descriptionInput, 'This is a test description');
        fireEvent.changeText(notesInput, 'These are test notes');

        expect(descriptionInput.props.value).toBe('This is a test description');
        expect(notesInput.props.value).toBe('These are test notes');
    });

    test('handles numeric fields correctly', () => {
        const { getByPlaceholderText } = render(<PropertyInspectionForm />);
        const roomCountInput = getByPlaceholderText('0');
        const areaInput = getByPlaceholderText('0');

        fireEvent.changeText(roomCountInput, '5');
        fireEvent.changeText(areaInput, '1500');

        expect(roomCountInput.props.value).toBe('5');
        expect(areaInput.props.value).toBe('1500');
    });
});