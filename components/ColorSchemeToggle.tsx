"use client";

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "light" ? (
        <IconMoon size={22} stroke={1.5} />
      ) : (
        <IconSun size={22} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
