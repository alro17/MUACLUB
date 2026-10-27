
import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

import AppButton from "../components/AppButton";
import Notice from "../components/Notice";
import { login, LoginError } from "../api/monsterball";
import { useSession } from "../session";
import { styles } from "../styles";
import { colors, spacing } from "../theme";

type FieldErrors = {
  username?: string;
  password?: string;
};

export default function Login() {
  const { user, ready, signIn } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<LoginError | null>(null);

  const passwordRef = useRef<TextInput>(null);

  if (!ready) {
    return <View style={styles.screen} />;
  }

  if (user) {
    return <Redirect href="/credencial" />;
  }

  const submit = async () => {
    const errors: FieldErrors = {
      username: username.trim()
        ? undefined
        : "Escribe tu nombre de usuario",
      password: password
        ? undefined
        : "Escribe tu contraseña",
    };

    setFieldErrors(errors);
    setError(null);

    if (errors.username || errors.password) {
      return;
    }

    setLoading(true);

    try {
      await signIn(await login(username, password));
      setPassword("");
      router.replace("/credencial");
    } catch (e) {
      setError(
        e instanceof LoginError
          ? e
          : new LoginError("format")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.content,
            {
              flexGrow: 1,
              justifyContent: "center",
              paddingTop: spacing.xl,
              paddingBottom: spacing.xl,
            },
          ]}
        >
          {/* ENCABEZADO EDITORIAL */}
          <View style={{ gap: spacing.sm }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.label,
                  { color: colors.accent },
                ]}
              >
                MUA CLUB / ACCESO DIGITAL
              </Text>

              <Text
                style={[
                  styles.label,
                  { color: colors.text },
                ]}
              >
                SOCIOS
              </Text>
            </View>

            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: 76,
                height: 76,
                marginTop: spacing.md,
              }}
              resizeMode="contain"
              accessibilityLabel="Logotipo de MUA Club"
            />

            <Text
              style={[
                styles.title,
                {
                  fontSize: 44,
                  lineHeight: 48,
                  marginTop: spacing.sm,
                },
              ]}
            >
              {"TU CLUB.\nTU ACCESO."}
            </Text>

            <Text style={styles.subtitle}>
              Tu membresía deportiva, siempre contigo.
            </Text>
          </View>

          {/* FORMULARIO */}
          <View
            style={[
              styles.card,
              {
                borderRadius: 8,
                borderTopWidth: 4,
                borderTopColor: colors.accent,
                padding: spacing.lg,
                gap: spacing.md,
              },
            ]}
          >
            <Text style={styles.heading}>
              Inicia sesión
            </Text>

            <Text style={styles.muted}>
              Ingresa tus datos para acceder a tu credencial.
            </Text>

            {/* NOMBRE DE USUARIO */}
            <View style={{ gap: spacing.xs }}>
              <Text
                style={[
                  styles.label,
                  { color: colors.text },
                ]}
              >
                NOMBRE DE USUARIO
              </Text>

              <TextInput
                style={[
                  styles.input,
                  fieldErrors.username && styles.inputError,
                ]}
                value={username}
                onChangeText={setUsername}
                placeholder="Ingresa tu nombre de usuario"
                placeholderTextColor={colors.muted}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordRef.current?.focus()
                }
                editable={!loading}
                accessibilityLabel="Nombre de usuario"
              />

              {fieldErrors.username ? (
                <Text style={styles.fieldError}>
                  {fieldErrors.username}
                </Text>
              ) : null}
            </View>

            {/* CONTRASEÑA */}
            <View style={{ gap: spacing.xs }}>
              <Text
                style={[
                  styles.label,
                  { color: colors.text },
                ]}
              >
                CONTRASEÑA
              </Text>

              <View style={styles.row}>
                <TextInput
                  ref={passwordRef}
                  style={[
                    styles.input,
                    { flex: 1 },
                    fieldErrors.password && styles.inputError,
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={submit}
                  editable={!loading}
                  accessibilityLabel="Contraseña"
                />

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  onPress={() =>
                    setShowPassword((visible) => !visible)
                  }
                  hitSlop={8}
                  style={{
                    justifyContent: "center",
                    paddingHorizontal: spacing.xs,
                  }}
                >
                  <Text
                    style={[
                      styles.muted,
                      {
                        color: colors.accent,
                        fontWeight: "900",
                      },
                    ]}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Pressable>
              </View>

              {fieldErrors.password ? (
                <Text style={styles.fieldError}>
                  {fieldErrors.password}
                </Text>
              ) : null}
            </View>
          </View>

          {/* MENSAJE DE ERROR */}
          {error ? (
            <Notice
              tone="error"
              title={error.message}
              detail={error.detail}
            />
          ) : null}

          {/* BOTONES */}
          <View
            style={{
              alignItems: "stretch",
              gap: spacing.md,
            }}
          >
            <AppButton
              label="ACCEDER A MI CUENTA"
              onPress={submit}
              loading={loading}
            />

            <AppButton
              label="Créditos"
              variant="secondary"
              onPress={() => router.push("/creditos")}
            />
          </View>

          {/* PIE DE PANTALLA */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: spacing.md,
              marginTop: spacing.sm,
            }}
          >
            <Text
              style={[
                styles.muted,
                {
                  textAlign: "center",
                  letterSpacing: 1,
                  fontSize: 11,
                },
              ]}
            >
              MUA CLUB DEPORTIVO · ACCESO DIGITAL
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
