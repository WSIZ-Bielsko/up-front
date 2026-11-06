"use client";

import { ActionIcon, Badge, Group, Loader, Paper, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconDownload, IconFolderOpen, IconTrash } from "@tabler/icons-react";
import { downloadUrl, type FileMeta } from "@/lib/api";
import { useDeleteFile, useFiles } from "@/lib/queries";

const COLUMNS = ["FID (UUID)", "PID", "Album", "Nazwa pliku", "Rozmiar", "Data utworzenia", ""];

function plural(n: number) {
  if (n === 1) return "plik";
  const [d, h] = [n % 10, n % 100];
  return d >= 2 && d <= 4 && (h < 12 || h > 14) ? "pliki" : "plików";
}

function Placeholder({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Table.Tr>
      <Table.Td colSpan={COLUMNS.length}>
        <Stack align="center" gap={6} py="xl" c="dimmed">
          {icon}
          <Text size="sm">{text}</Text>
        </Stack>
      </Table.Td>
    </Table.Tr>
  );
}

function FileRow({ file }: { file: FileMeta }) {
  const del = useDeleteFile();
  const remove = () =>
    del.mutate(file.fid, {
      onSuccess: () => notifications.show({ color: "teal", message: `Usunięto plik ${file.filename}.` }),
      onError: (err) => notifications.show({ color: "red", title: "Błąd usuwania", message: err.message }),
    });

  const shortFid = file.fid.length > 8 ? `${file.fid.slice(0, 4)}...${file.fid.slice(-4)}` : file.fid;

  return (
    <Table.Tr>
      <Table.Td ff="monospace" fz={10} fw={700}>
        <Tooltip label={file.fid} position="top-start" withArrow>
          <span>{shortFid}</span>
        </Tooltip>
      </Table.Td>
      <Table.Td fw={900}>{file.pid}</Table.Td>
      <Table.Td>
        <Badge variant="outline" fw={700}>
          {file.album}
        </Badge>
      </Table.Td>
      <Table.Td fw={700} style={{ textTransform: "uppercase" }}>{file.filename}</Table.Td>
      <Table.Td style={{ opacity: 0.7 }}>{file.size_mb} MB</Table.Td>
      <Table.Td style={{ opacity: 0.7 }} fz={10}>
        {new Date(file.created_at).toLocaleString("pl-PL")}
      </Table.Td>
      <Table.Td>
        <Group gap={4} wrap="nowrap" justify="flex-end">
          <Tooltip label="Pobierz">
            <ActionIcon
              component="a"
              href={downloadUrl(file.fid)}
              aria-label="Pobierz"
              size="md"
            >
              <IconDownload size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Usuń">
            <ActionIcon
              onClick={remove}
              loading={del.isPending}
              aria-label="Usuń"
              size="md"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

export function FilesTable() {
  const { data: files, isPending, isError } = useFiles();

  return (
    <Paper>
      <Group justify="space-between" p="xl" style={{ borderBottom: "2px solid var(--mantine-color-text)" }}>
        <div>
          <Title order={2} size="h5" style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
            Historia przesłanych plików
          </Title>
          <Text size="xs" style={{ textTransform: "uppercase", opacity: 0.6, letterSpacing: "0.5px" }}>
            Przechowywane dokumenty
          </Text>
        </div>
        <Badge variant="filled" size="lg" style={{ backgroundColor: "var(--mantine-color-text)", color: "var(--mantine-color-body)" }}>
          {files?.length ?? 0} {plural(files?.length ?? 0)}
        </Badge>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table highlightOnHover verticalSpacing="md" fz="xs">
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: "var(--mantine-color-gray-light)" }}>
              {COLUMNS.map((c) => (
                <Table.Th key={c} tt="uppercase" fz={10} fw={900} style={{ letterSpacing: 1, borderBottom: "2px solid var(--mantine-color-text)" }}>
                  {c}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isPending ? (
              <Placeholder icon={<Loader size="sm" />} text="Wczytywanie…" />
            ) : isError ? (
              <Placeholder icon={<IconAlertCircle size={28} />} text="Nie można połączyć się z API FastAPI." />
            ) : files.length === 0 ? (
              <Placeholder icon={<IconFolderOpen size={28} />} text="Brak przesłanych plików. Wybierz plik po lewej stronie." />
            ) : (
              files.map((f) => <FileRow key={f.fid} file={f} />)
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
}
