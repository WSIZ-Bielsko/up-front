"use client";

import { Button, CloseButton, Group, NumberInput, Paper, Stack, Text, TextInput, ThemeIcon, Title } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconAdjustments, IconFileText, IconFileUpload, IconHash, IconId, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useUpload } from "@/lib/queries";

const sizeMb = (bytes: number) => Math.ceil(bytes / 2 ** 20); // same rounding as the backend

const typeHint = (t: string) => (
  <Text span size="xs" c="dimmed">
    Typ: <code>{t}</code>
  </Text>
);

export function UploadForm({ onProgress }: { onProgress: (pct: number | null) => void }) {
  const [pid, setPid] = useState<string | number>(101);
  const [album, setAlbum] = useState("s24190");
  const [file, setFile] = useState<File | null>(null);
  const upload = useUpload(onProgress);

  const submit = () => {
    if (!file) return;
    onProgress(0);
    upload.mutate(
      { file, pid: Number(pid), album: album.trim() },
      {
        onSuccess: (meta) => {
          setFile(null);
          notifications.show({ color: "teal", title: "Wysłano", message: `Plik ${meta.filename} został zapisany w bazie.` });
        },
        onError: (err) => notifications.show({ color: "red", title: "Błąd wysyłania", message: err.message }),
        onSettled: () => setTimeout(() => onProgress(null), 500),
      },
    );
  };

  return (
    <Paper p="xl">
      <Title order={2} size="h5" mb="xl" style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
        <Group gap={8}>
          <IconAdjustments size={18} color="var(--mantine-color-text)" /> Metadane pliku
        </Group>
      </Title>

      <Stack gap="md">
        <NumberInput
          label="ID Projektu (pid)"
          description={typeHint("int")}
          inputWrapperOrder={["label", "input", "description"]}
          leftSection={<IconHash size={14} />}
          value={pid}
          onChange={setPid}
          allowDecimal={false}
          required
        />
        <TextInput
          label="Album Studenta (album)"
          description={typeHint("str")}
          inputWrapperOrder={["label", "input", "description"]}
          leftSection={<IconId size={14} />}
          placeholder="np. s12345"
          value={album}
          onChange={(e) => setAlbum(e.currentTarget.value)}
          required
        />

        <div>
          <Text
            size="sm"
            fw={600}
            mb={8}
            style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem" }}
          >
            Wybierz plik
          </Text>
          {file ? (
            <Paper p="md">
              <Group justify="space-between" wrap="nowrap">
                <Group gap="xs" wrap="nowrap" style={{ overflow: "hidden" }}>
                  <IconFileText size={18} color="var(--mantine-color-text)" style={{ flexShrink: 0 }} />
                  <Text size="xs" fw={600} style={{ textTransform: "uppercase" }} truncate>
                    {file.name}
                  </Text>
                </Group>
                <CloseButton size="sm" onClick={() => setFile(null)} disabled={upload.isPending} aria-label="Usuń plik" />
              </Group>
              <Group justify="space-between" mt={8}>
                <Text size="xs" style={{ textTransform: "uppercase", opacity: 0.6 }}>
                  {sizeMb(file.size)} MB ({file.size.toLocaleString("pl-PL")} bajtów)
                </Text>
                <Text size="xs" fw={700} style={{ textTransform: "uppercase" }}>
                  Gotowy
                </Text>
              </Group>
            </Paper>
          ) : (
            <Dropzone onDrop={(files) => setFile(files[0])} multiple={false} p="xl" styles={{ root: { borderWidth: "2px", borderStyle: "dashed", borderColor: "var(--mantine-color-text)" } }}>
              <Stack align="center" gap={12} style={{ pointerEvents: "none" }}>
                <ThemeIcon size={48} radius={0} variant="outline" style={{ color: "var(--mantine-color-text)", borderColor: "var(--mantine-color-text)" }}>
                  <IconFileUpload size={24} />
                </ThemeIcon>
                <Text size="sm" fw={600} ta="center" style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
                  Przeciągnij plik lub{" "}
                  <Text span td="underline" inherit>
                    wybierz z dysku
                  </Text>
                </Text>
              </Stack>
            </Dropzone>
          )}
        </div>

        <Button
          fullWidth
          size="lg"
          mt="md"
          variant="filled"
          leftSection={<IconUpload size={18} />}
          disabled={!file || !album.trim() || pid === ""}
          loading={upload.isPending}
          onClick={submit}
          style={{
            backgroundColor: "var(--mantine-color-text)",
            color: "var(--mantine-color-body)",
          }}
        >
          Prześlij Plik
        </Button>
      </Stack>
    </Paper>
  );
}
