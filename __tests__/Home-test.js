import React from 'react';
import { render, fireEvent } from '@testing-library/jest-native';
import { useAuth0 } from 'react-native-auth0';
import Home from '../src/screens/LoginWithAuth0';

// Mock useAuth0 so we don’t call real Auth0 API
jest.mock('react-native-auth0', () => ({
  Auth0: jest.fn().mockImplementation(() => ({
    // Mock all the methods you use from Auth0
    webAuth: {
      authorize: jest.fn(),
      clearSession: jest.fn(),
    },
    credentialsManager: {
      saveCredentials: jest.fn(),
      getCredentials: jest.fn(),
      clearCredentials: jest.fn(),
    },
  }))
}));

jest.mock('../AuthService', () => ({
  auth0: {
    webAuth: {
      authorize: jest.fn(),
      clearSession: jest.fn(),
    },
    credentialsManager: {
      saveCredentials: jest.fn(),
      getCredentials: jest.fn(),
      clearCredentials: jest.fn(),
    },
  },
}));

describe('Home Component', () => {
  it('shows "You are not logged in" when no user', () => {
    useAuth0.mockReturnValue({
      authorize: jest.fn(),
      clearSession: jest.fn(),
      user: null,
      getCredentials: jest.fn(),
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<Home />);
    expect(getByText('You are not logged in')).toBeTruthy();
  });

  it('shows "You are logged in" when user exists', () => {
    useAuth0.mockReturnValue({
      authorize: jest.fn(),
      clearSession: jest.fn(),
      user: { name: 'Rida' },
      getCredentials: jest.fn(),
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<Home />);
    expect(getByText('You are logged in')).toBeTruthy();
  });

  it('calls onLogin when pressing Login button', () => {
    const mockAuthorize = jest.fn();
    const mockGetCredentials = jest
      .fn()
      .mockResolvedValue({ accessToken: 'abc' });

    useAuth0.mockReturnValue({
      authorize: mockAuthorize,
      clearSession: jest.fn(),
      user: null,
      getCredentials: mockGetCredentials,
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Log In'));

    expect(mockAuthorize).toHaveBeenCalled();
  });
});
