import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "./theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },

  title: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.text,
    textAlign: "left",
    letterSpacing: -1.5,
  },

  heading: {
    fontSize: 21,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "left",
    lineHeight: 22,
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },

  muted: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 19,
  },

  label: {
    fontSize: 11,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 1.8,
    fontWeight: "900",
  },

  input: {
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
  },

  inputError: {
    borderColor: colors.warn,
  },

  fieldError: {
    fontSize: 13,
    color: colors.warn,
  },

  mono: {
    fontFamily: "monospace",
    fontSize: 14,
    color: colors.text,
  },

  button: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    alignItems: "center",
    minWidth: 200,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.text,
  },

  buttonSecondaryText: {
    color: colors.text,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
