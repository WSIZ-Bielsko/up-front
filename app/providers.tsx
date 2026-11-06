"use client";

import { ActionIcon, Badge, Button, createTheme, MantineProvider, NumberInput, Paper, TextInput } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const theme = createTheme({
  primaryColor: "black",
  defaultRadius: 0,
  colors: {
    black: [
      "#F8F9FA",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#6C757D",
      "#495057",
      "#343A40",
      "#212529",
      "#000000",
    ],
  },
  fontFamily: "'Inter Variable', sans-serif",
  headings: {
    fontFamily: "'Inter Variable', sans-serif",
    sizes: {
      h1: { fontWeight: "900", letterSpacing: "2px" },
      h2: { fontWeight: "900", letterSpacing: "2px" },
      h3: { fontWeight: "900", letterSpacing: "2px" },
      h4: { fontWeight: "900", letterSpacing: "2px" },
      h5: { fontWeight: "900", letterSpacing: "2px" },
    },
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 0,
        variant: "outline",
      },
      styles: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          borderWidth: "2px",
          color: "var(--mantine-color-text)",
          borderColor: "var(--mantine-color-text)",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 0,
      },
      styles: {
        label: {
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          fontSize: "0.75rem",
        },
        input: {
          borderWidth: "2px",
        },
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        radius: 0,
      },
      styles: {
        label: {
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          fontSize: "0.75rem",
        },
        input: {
          borderWidth: "2px",
        },
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        radius: 0,
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-body)",
          borderColor: "var(--mantine-color-border)",
        },
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        radius: 0,
        variant: "outline",
      },
      styles: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontWeight: 600,
          color: "var(--mantine-color-text)",
          borderColor: "var(--mantine-color-text)",
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        radius: 0,
        variant: "outline",
        size: "lg",
      },
      styles: {
        root: {
          color: "var(--mantine-color-text)",
          borderColor: "var(--mantine-color-text)",
          borderWidth: "2px",
        },
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: 1 } } }));
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="bottom-right" />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
