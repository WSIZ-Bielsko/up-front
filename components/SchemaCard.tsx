import { Badge, Box, Group, Paper, Text } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";

const SCHEMA = `class FileMeta(BaseModel):
    fid: UUID
    pid: int
    album: str
    filename: str
    size_mb: int
    created_at: datetime`;

export function SchemaCard() {
  return (
    <Paper radius="lg" p="md" bg="#0f172a" c="gray.3" style={{ border: "1px solid #1e293b" }}>
      <Group justify="space-between" mb="sm">
        <Group gap={6} c="indigo.3">
          <IconCode size={16} />
          <Text size="xs" fw={700} ff="monospace">
            Model Pydantic (Backend FastAPI)
          </Text>
        </Group>
        <Badge color="dark" variant="filled" radius="sm" tt="none" ff="monospace" fz={10}>
          storage.py
        </Badge>
      </Group>
      <Box component="pre" m={0} ff="monospace" fz={11} lh={1.7} c="indigo.2" style={{ overflowX: "auto" }}>
        {SCHEMA}
      </Box>
    </Paper>
  );
}
