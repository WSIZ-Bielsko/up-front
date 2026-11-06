"use client";

import { Badge, Box, Container, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";
import { useFiles } from "@/lib/queries";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

function ApiStatus() {
  const { isPending, isError } = useFiles();
  const [color, label] = isPending ? ["gray", "Łączenie z API…"] : isError ? ["red", "API Offline"] : ["var(--mantine-color-text)", "API Online"];
  return (
    <Badge
      color={color}
      variant="outline"
      size="lg"
      leftSection={<Box className={isError ? undefined : "pulse"} w={6} h={6} bg={isError ? "red" : "teal"} style={{ borderRadius: 0 }} />}
      style={!isPending && !isError ? { color: "var(--mantine-color-text)", borderColor: "var(--mantine-color-text)" } : undefined}
    >
      {label}
    </Badge>
  );
}

export function AppHeader() {
  return (
    <Box
      component="header"
      pos="sticky"
      top={0}
      style={{
        zIndex: 100,
        borderBottom: "2px solid var(--mantine-color-text)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Container size="xl" h={80}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <ThemeIcon size={48} radius={0} variant="filled" style={{ backgroundColor: "var(--mantine-color-text)", color: "var(--mantine-color-body)" }}>
              <IconCloudUpload size={28} />
            </ThemeIcon>
            <div>
              <Title order={1} size="h3" style={{ textTransform: "uppercase" }}>
                Uploader MVP
              </Title>
              <Text
                size="xs"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "var(--mantine-color-dimmed)",
                }}
                visibleFrom="sm"
              >
                Projekt Studencki FastAPI + Next.js UI
              </Text>
            </div>
          </Group>
          <Group gap="md">
            <ApiStatus />
            <ColorSchemeToggle />
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
