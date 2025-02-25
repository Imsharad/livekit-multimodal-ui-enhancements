# LiveKit Multimodal UI Enhancements

This repository contains UI enhancements for the LiveKit multimodal voice assistant application, focusing on improved animations and visual indicators for different AI states.

## Features

### Enhanced Voice Assistant Animations

- **Visual State Indicators**:
  - **Listening State** (Blue): Visual feedback when the AI is processing the user's voice
  - **Thinking State** (Purple): Indicates the server is connected and processing
  - **Speaking State** (Green): Shows when the AI is responding
  - **Idle State**: Subtle pulsing animation when the system is ready but not active

- **Accessibility Improvements**:
  - Added aria-live region for screen readers
  - Status text indicators for each state
  - Subtle animations designed for users with visual sensitivities

- **Company Branding**:
  - Placeholder logo component (to be replaced with actual company logo)
  - Centered design with modern aesthetics

## Components

### EnhancedVoiceAssistant

The main component that provides visual feedback for different AI states:

```tsx
<EnhancedVoiceAssistant onStateChange={setAgentState} />
```

### CompanyLogo

A placeholder component for the company logo:

```tsx
<CompanyLogo className="absolute z-10" />
```

## Implementation Details

- Uses Framer Motion for smooth animations
- Tailwind CSS for styling
- Responsive design that works on various screen sizes
- State-specific color coding for intuitive user experience

## Screenshots

(Screenshots will be added once the UI is deployed)