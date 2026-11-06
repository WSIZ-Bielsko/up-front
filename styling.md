# SpaceX & Starlink Inspired Design System

A minimalist, technical, and high-contrast design system focused on clarity and a professional "engineering" aesthetic. This style is characterized by sharp corners, bold typography, and a monochrome palette.

## Core Principles

- **Monochrome Palette**: Stick to pure black and white. Use Mantine's theme variables (`var(--mantine-color-text)`, `var(--mantine-color-body)`, `var(--mantine-color-border)`) to ensure compatibility with both Light and Dark modes.
- **Zero Radius**: Use sharp, 90-degree corners for all elements (buttons, inputs, cards, containers).
- **High Contrast**: Ensure interactive elements have distinct states (e.g., outline vs. filled) using black and white.
- **Technical Typography**: Use uppercase text with increased letter spacing to evoke a modern, industrial feel.
- **Dark Mode Support**: The system should seamlessly toggle between Light and Dark themes. All "black" elements must use `var(--mantine-color-text)` and "white" backgrounds must use `var(--mantine-color-body)` to ensure visibility and contrast in both modes. Avoid hardcoding `color="black"`.

## Typography

- **Titles**: Uppercase, heavy weight (900), increased letter spacing (2px).
- **Buttons/Labels**: Uppercase, semi-bold (600), letter spacing (1px).
- **Secondary Text**: Uppercase, small size, subtle letter spacing (0.5px).

## Component Styling (Mantine UI Examples)

### Global Configuration
Preferably set these in your Mantine Theme provider:
- `defaultRadius: 0`
- `primaryColor: 'black'` (if defined in colors)

### 1. Buttons
Buttons should feel solid and mechanical.
- `radius="0"`
- `variant="outline"` (idle) or `variant="filled"` (active/primary)
- `color="black"`
- **Styles**:
  - `textTransform: 'uppercase'`
  - `letterSpacing: '1px'`
  - `fontWeight: 600`
  - `borderWidth: '2px'`

### 2. Input Fields (TextInput, PasswordInput)
Inputs should have clear, high-contrast boundaries.
- `radius="0"`
- **Label Styles**:
  - `textTransform: 'uppercase'`
  - `letterSpacing: '1px'`
  - `fontWeight: 600`
  - `fontSize: '0.75rem'`
- **Input Styles**:
  - `borderWidth: '2px'`
  - `&:focus`: `borderColor: 'black'`

### 3. Cards and Containers
Use whitespace and subtle borders to separate sections without rounding.
- `radius="0"`
- `withBorder`
- **Styles**:
  - `backgroundColor: '#ffffff'`
  - `borderColor: '#e5e5e5'`
  - `padding: 'xl'`

### 4. Alerts and Notifications
Stick to the monochrome theme even for errors or status messages.
- `variant="outline"`
- `color="black"`
- `radius="0"`
- **Title Styles**:
  - `textTransform: 'uppercase'`
  - `letterSpacing: '1px'`
  - `fontWeight: 700`

## Layout Guidelines

- **Spaciousness**: Use generous margins and gaps (e.g., `gap="xl"`, `py="xl"`) to maintain a clean, uncluttered interface.
- **Alignment**: Center-align titles and main containers for a focused, landing-page feel.
- **Grid/Groups**: Use `grow` on button groups to make them fill the available width, emphasizing the "dashboard" or "control panel" look.
