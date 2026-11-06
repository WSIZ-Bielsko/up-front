import { Group, Paper, Progress, Text } from "@mantine/core";

const status = (pct: number) =>
  pct < 100 ? "Przesyłanie danych (multipart/form-data)…" : "Zapisywanie na serwerze FastAPI…";

export function UploadProgress({ value }: { value: number }) {
  return (
    <Paper p="xl">
      <Group justify="space-between" mb="md">
        <Text size="sm" fw={900} style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
          Status Przesyłania
        </Text>
        <Text size="sm" fw={900}>
          {value}%
        </Text>
      </Group>
      <Progress
        value={value}
        size="xl"
        radius={0}
        animated={value < 100}
        style={{
          border: "2px solid var(--mantine-color-text)",
          backgroundColor: "var(--mantine-color-body)",
        }}
        styles={{
          section: {
            backgroundColor: "var(--mantine-color-text)",
          },
        }}
      />
      <Text size="xs" mt="sm" style={{ textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
        {status(value)}
      </Text>
    </Paper>
  );
}
