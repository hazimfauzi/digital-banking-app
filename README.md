# Welcome to your Digital Banking app 👋

This is Take Home Assessmeont for Payment Transfer Module with Biometrics Authentication

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   yarn android
   yarn ios
   yarn web
   ```

Download the apk file inside apk folder.
## Features

- Authentication
    - Login with PIN and optional biometric (Face ID / Touch ID / Fingerprint) 
	- PIN fallback for devices without biometric support
	- User Dashboard

- Display total balance
	- Quick access to Add Money, Receive, and Transfer
- Payment Transfers
	- Select recipients from recent contacts or device contacts 
	- Manual recipient entry with phone number validation 
	- Real-time balance validation before transfers 
	- Optional notes for transactions 
	- Transaction confirmation with PIN or biometric authentication
- Transaction History
	- Store all transactions locally 
	- Display recent transactions on the home screen
- Contacts Integration
	- ccess device contacts with permission 
	- Normalize and validate phone numbers 
	- Save frequently used contacts
- Notifications & Toasts
	- Show success/error messages using toast notifications 
	- Local notifications for important events (optional)
- UI & UX
	- Responsive layouts using SafeAreaView and flexbox 
	- Cards, buttons, and lists with clean styling 
	- Helper text for input validation 
	- Loading indicators and modal dialogs


## Demo


## Challenges Faced During Development

- Secure Authentication
	- Implemented login with PIN and optional biometric authentication. 
	- Handled devices without biometric support with a secure PIN fallback.
- Transaction Management
	- Validated balance before transfers to prevent overdrafts. 
	- Maintained transaction history and recent contacts.
- Contacts Integration
	- Accessed device contacts with user permission. 
	- Normalized phone numbers for consistency.
- Navigation & Data Flow
	- Safely passed transfer details between multiple screens using Expo Router. 
	- Validated parameters to prevent crashes.
- Offline Mock API & State Management
	- Simulated backend APIs using AsyncStorage and local mocks. 
	- Efficiently synced user data and transactions.
- UI & UX Design
	- Created responsive screens with proper spacing, cards, and FlatLists. 
	- Added helper text, validation, loading indicators, and toast notifications.
- Build & Deployment
	- Configured native modules and permissions for Android/iOS builds. 
	- Ensured smooth operation in Expo Go, development builds, and standalone APKs.
