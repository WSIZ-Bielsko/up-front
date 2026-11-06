"use client";

import { Box, Container, Grid, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { FilesTable } from "@/components/FilesTable";
import { SchemaCard } from "@/components/SchemaCard";
import { UploadForm } from "@/components/UploadForm";
import { UploadProgress } from "@/components/UploadProgress";

export default function Home() {
  const [progress, setProgress] = useState<number | null>(null);

  return (
    <>
      <AppHeader />

      <Container component="main" size="1400px" py="xl" w="100%" style={{ flexGrow: 1 }}>
        <Grid gap="xl">
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <UploadForm onProgress={setProgress} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="lg">
              {progress !== null && <UploadProgress value={progress} />}
              <FilesTable />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Box
        component="footer"
        mt="xl"
        py="xl"
        bg="var(--mantine-color-body)"
        style={{ borderTop: "2px solid var(--mantine-color-text)" }}
      >
        <Text ta="center" size="xs" fw={700} style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
          Studencki System Przesyłania Plików • Wersja MVP • 2024
        </Text>
      </Box>
    </>
  );
}
