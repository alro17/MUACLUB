
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  AppState,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";

import MuaNfc, { type NfcStatus } from "../../modules/mua-nfc";
import AppButton from "../components/AppButton";
import Notice from "../components/Notice";
import { fullName } from "../api/monsterball";
import { useSession } from "../session";
import { styles } from "../styles";
import { colors, radius, spacing } from "../theme";

const PHOTO = 112;
const AID_HEX = "F0 12 34 56 78";

type Detection = {
  at: number;
  credentialSent: boolean;
};

function idBytes(id: number, littleEndian: boolean) {
  const bytes = [24, 16, 8, 0].map(
    (shift) => (id >>> shift) & 0xff
  );

  if (littleEndian) bytes.reverse();

  return bytes
    .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

function nfcNotice(status: NfcStatus | null) {
  if (!MuaNfc) {
    return {
      tone: "error" as const,
      title: "NFC no disponible",
      detail:
        "Instala la aplicación compilada en un teléfono Android compatible. Expo Go no incluye este módulo nativo.",
    };
  }

  if (!status?.hasNfc) {
    return {
      tone: "error" as const,
      title: "Dispositivo sin NFC",
      detail:
        "Necesitas un teléfono Android con NFC para presentar tu credencial.",
    };
  }

  if (!status.hasHce) {
    return {
      tone: "error" as const,
      title: "Emulación de tarjeta no compatible",
      detail:
        "Este dispositivo no admite Host Card Emulation (HCE).",
    };
  }

  if (!status.nfcEnabled) {
    return {
      tone: "error" as const,
      title: "NFC desactivado",
      detail:
        "Activa el NFC para poder presentar tu credencial al lector.",
      action: true,
    };
  }

  return {
    tone: "ok" as const,
    title: "Credencial lista para usar",
    detail:
      "Desbloquea el teléfono y acerca su parte trasera al lector.",
  };
}

export default function Credencial() {
  const { user, ready, signOut } = useSession();

  const [status, setStatus] = useState<NfcStatus | null>(
    () => MuaNfc?.getStatus() ?? null
  );
  const [detection, setDetection] = useState<Detection | null>(null);
  const [littleEndian, setLittleEndian] = useState(
    () => MuaNfc?.isLittleEndian() ?? true
  );
  const [apdu, setApdu] = useState<{
    command: string;
    response: string;
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [pulse] = useState(() => new Animated.Value(0));

  const refreshStatus = useCallback(() => {
    setStatus(MuaNfc?.getStatus() ?? null);
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") refreshStatus();
    });

    return () => sub.remove();
  }, [refreshStatus]);

  useEffect(() => {
    if (!MuaNfc) return;

    const sub = MuaNfc.addListener("onReaderDetected", (event) => {
      setDetection({
        at: event.timestamp,
        credentialSent: event.credentialSent,
      });

      pulse.setValue(1);

      Animated.timing(pulse, {
        toValue: 0,
        duration: 1600,
        useNativeDriver: true,
      }).start();
    });

    return () => sub.remove();
  }, [pulse]);

  if (!ready) return <View style={styles.screen} />;
  if (!user) return <Redirect href="/" />;

  const notice = nfcNotice(status);
  const name = fullName(user);

  const changeByteOrder = (value: boolean) => {
    MuaNfc?.setLittleEndian(value);
    setLittleEndian(value);
    setApdu(null);
  };

  const confirmSignOut = () =>
    Alert.alert(
      "Cerrar sesión",
      "Tu credencial dejará de responder al lector hasta que vuelvas a entrar.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/");
          },
        },
      ]
    );

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: spacing.md, paddingBottom: spacing.xl },
      ]}
    >
      {/* ENCABEZADO */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.sm,
        }}
      >
        <View style={{ gap: 3 }}>
          <Text
            style={[
              styles.label,
              { color: colors.accent, letterSpacing: 2 },
            ]}
          >
            MUA CLUB
          </Text>

          <Text
            style={[
              styles.muted,
              { fontSize: 11, letterSpacing: 1 },
            ]}
          >
            MEMBRESÍA DIGITAL
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.text,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: colors.bg,
              fontSize: 10,
              fontWeight: "900",
              letterSpacing: 1,
            }}
          >
            SOCIO ACTIVO
          </Text>
        </View>
      </View>

      {/* CREDENCIAL PRINCIPAL */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {/* FRANJA SUPERIOR */}
        <View
          style={{
            backgroundColor: colors.text,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: 3 }}>
            <Text
              style={{
                color: colors.bg,
                fontSize: 17,
                fontWeight: "900",
                letterSpacing: 2,
              }}
            >
              MUA
            </Text>

            <Text
              style={{
                color: colors.surfaceAlt,
                fontSize: 9,
                letterSpacing: 1.5,
                fontWeight: "700",
              }}
            >
              CLUB DEPORTIVO
            </Text>
          </View>

          <View style={{ alignItems: "flex-end", gap: 3 }}>
            <Text
              style={{
                color: colors.accent,
                fontSize: 10,
                fontWeight: "900",
                letterSpacing: 1.5,
              }}
            >
              DIGITAL PASS
            </Text>

            <Text
              style={{
                color: colors.surfaceAlt,
                fontSize: 10,
              }}
            >
              IDENTIFICACIÓN DE SOCIO
            </Text>
          </View>
        </View>

        {/* NÚMERO DE SOCIO PROTAGONISTA */}
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            paddingBottom: spacing.md,
            backgroundColor: colors.surfaceAlt,
          }}
        >
          <Text
            style={{
              color: colors.muted,
              fontSize: 10,
              fontWeight: "900",
              letterSpacing: 2,
            }}
          >
            NÚMERO DE SOCIO
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacing.sm,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 43,
                fontWeight: "900",
                letterSpacing: 1,
                fontVariant: ["tabular-nums"],
                flexShrink: 1,
              }}
              accessibilityLabel={`Número de socio ${user.id}`}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {user.id}
            </Text>

            <View
              style={{
                backgroundColor: colors.accent,
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.bg,
                  fontWeight: "900",
                  fontSize: 18,
                }}
              >
                M
              </Text>
            </View>
          </View>
        </View>

        {/* FOTO Y DATOS EN DISTRIBUCIÓN HORIZONTAL */}
        <View
          style={{
            padding: spacing.lg,
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.md,
          }}
        >
          <View
            style={{
              width: PHOTO + 12,
              height: PHOTO + 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Animated.View
              pointerEvents="none"
              style={{
                position: "absolute",
                width: PHOTO + 10,
                height: PHOTO + 10,
                borderRadius: radius.md + 6,
                borderWidth: 3,
                borderColor: colors.success,
                opacity: pulse,
                transform: [
                  {
                    scale: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.12, 1],
                    }),
                  },
                ],
              }}
            />

            {user.pfpUrl && !photoFailed ? (
              <Image
                source={{ uri: user.pfpUrl }}
                style={{
                  width: PHOTO,
                  height: PHOTO,
                  borderRadius: radius.md,
                  borderWidth: 2,
                  borderColor: colors.accent,
                }}
                contentFit="cover"
                transition={200}
                onError={() => setPhotoFailed(true)}
                accessibilityLabel={`Foto de ${name}`}
              />
            ) : (
              <View
                style={{
                  width: PHOTO,
                  height: PHOTO,
                  borderRadius: radius.md,
                  backgroundColor: colors.surfaceAlt,
                  borderWidth: 2,
                  borderColor: colors.accent,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 38,
                    fontWeight: "900",
                    color: colors.accent,
                  }}
                >
                  {initials}
                </Text>
              </View>
            )}
          </View>

          <View style={{ flex: 1, gap: spacing.sm }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "900",
                color: colors.accent,
                letterSpacing: 1.5,
              }}
            >
              TITULAR
            </Text>

            <Text
              style={{
                fontSize: 21,
                lineHeight: 26,
                fontWeight: "900",
                color: colors.text,
              }}
            >
              {name}
            </Text>

            <View
              style={{
                height: 2,
                width: 38,
                backgroundColor: colors.accent,
                marginVertical: 2,
              }}
            />

            <Text style={styles.muted}>NOMBRE DE USUARIO</Text>

            <Text
              style={{
                color: colors.text,
                fontWeight: "700",
                fontSize: 14,
              }}
              numberOfLines={2}
              selectable
            >
              @{user.username}
            </Text>

            <Text
              style={{
                color: colors.muted,
                fontSize: 10,
                letterSpacing: 1,
                marginTop: spacing.xs,
              }}
            >
              MEMBRESÍA MUA
            </Text>
          </View>
        </View>

        {/* PIE DE LA CREDENCIAL */}
        <View
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.bg,
              fontSize: 10,
              fontWeight: "900",
              letterSpacing: 1,
            }}
          >
            TU CLUB. TU ACCESO.
          </Text>

          <Text
            style={{
              color: colors.bg,
              fontSize: 10,
              fontWeight: "900",
              letterSpacing: 1,
            }}
          >
            MUA / ID
          </Text>
        </View>
      </View>

      {/* PANEL NFC SEPARADO */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          padding: spacing.lg,
          gap: spacing.md,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Acceso sin contacto
            </Text>

            <Text style={styles.muted}>
              ESTADO DEL SISTEMA NFC
            </Text>
          </View>

          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.surfaceAlt,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.accent,
                fontSize: 21,
                fontWeight: "900",
              }}
            >
              NFC
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.border,
          }}
        />

        <Notice
          tone={notice.tone}
          title={notice.title}
          detail={notice.detail}
        />

        {"action" in notice ? (
          <AppButton
            label="Abrir ajustes de NFC"
            variant="secondary"
            onPress={() => MuaNfc?.openNfcSettings()}
          />
        ) : null}

        <Text
          style={[
            styles.muted,
            { fontSize: 11, textAlign: "center" },
          ]}
        >
          El lector determina si el acceso es autorizado.
        </Text>
      </View>

      {/* RESULTADO DE DETECCIÓN DEL LECTOR */}
      {detection ? (
        <View
          style={{
            borderRadius: 8,
            padding: spacing.md,
            backgroundColor: colors.surfaceAlt,
            borderLeftWidth: 4,
            borderLeftColor: colors.accent,
            gap: spacing.xs,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
              fontWeight: "900",
            }}
          >
            {detection.credentialSent
              ? "Lector detectado"
              : "Lector detectado sin credencial"}
          </Text>

          <Text style={styles.body}>
            {detection.credentialSent
              ? `Tu número de usuario se envió a las ${new Date(
                  detection.at
                ).toLocaleTimeString("es-MX")}. El lector decide si abre la puerta.`
              : "No había una credencial cargada. Cierra sesión y vuelve a entrar."}
          </Text>
        </View>
      ) : null}

      {/* DETALLES TÉCNICOS DESPLEGABLES */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: showDetails }}
          onPress={() => setShowDetails((value) => !value)}
          style={{
            padding: spacing.lg,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 4, flex: 1 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 17,
                fontWeight: "900",
              }}
            >
              Detalles técnicos
            </Text>

            <Text style={styles.muted}>
              Protocolo, bytes y configuración NFC
            </Text>
          </View>

          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: colors.surfaceAlt,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: spacing.sm,
            }}
          >
            <Text
              style={{
                color: colors.accent,
                fontSize: 23,
                fontWeight: "700",
              }}
            >
              {showDetails ? "−" : "+"}
            </Text>
          </View>
        </Pressable>

        {showDetails ? (
          <View
            style={{
              paddingHorizontal: spacing.lg,
              paddingBottom: spacing.lg,
              gap: spacing.md,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: spacing.md,
            }}
          >
            <View style={{ gap: spacing.xs }}>
              <Text style={styles.muted}>
                AID registrado
              </Text>

              <Text style={styles.mono}>
                {AID_HEX}
              </Text>
            </View>

            <View style={{ gap: spacing.xs }}>
              <Text style={styles.muted}>
                Número de usuario en 4 bytes (
                {littleEndian ? "little-endian" : "big-endian"})
              </Text>

              <Text style={styles.mono}>
                {idBytes(user.id, littleEndian)} · 0x
                {user.id
                  .toString(16)
                  .toUpperCase()
                  .padStart(8, "0")}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: spacing.md,
              }}
            >
              <View style={{ flex: 1, gap: spacing.xs }}>
                <Text style={styles.body}>
                  Orden little-endian
                </Text>

                <Text style={styles.muted}>
                  El firmware del ESP32 copia los bytes con
                  memcpy, que los lee al revés.
                </Text>
              </View>

              <Switch
                value={littleEndian}
                onValueChange={changeByteOrder}
                disabled={!MuaNfc}
                trackColor={{
                  true: colors.accentDark,
                  false: colors.border,
                }}
                thumbColor={
                  littleEndian ? colors.accent : colors.muted
                }
              />
            </View>

            {status ? (
              <Text style={styles.muted}>
                Servicio predeterminado para el AID:{" "}
                {status.isDefaultForAid ? "sí" : "no"}
              </Text>
            ) : null}

            {MuaNfc ? (
              <AppButton
                label="Probar respuesta APDU"
                variant="secondary"
                onPress={() =>
                  setApdu(MuaNfc?.simulateSelect() ?? null)
                }
              />
            ) : null}

            {apdu ? (
              <View style={{ gap: spacing.sm }}>
                <View style={{ gap: spacing.xs }}>
                  <Text style={styles.muted}>
                    Comando del lector (SELECT)
                  </Text>

                  <Text style={styles.mono}>
                    {apdu.command}
                  </Text>
                </View>

                <View style={{ gap: spacing.xs }}>
                  <Text style={styles.muted}>
                    Respuesta de la aplicación
                  </Text>

                  <Text style={styles.mono}>
                    {apdu.response}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>

      {/* ACCIONES */}
      <View
        style={{
          gap: spacing.sm,
          paddingTop: spacing.xs,
          paddingBottom: spacing.lg,
        }}
      >
        <AppButton
          label="Créditos"
          variant="secondary"
          onPress={() => router.push("/creditos")}
        />

        <AppButton
          label="Cerrar sesión"
          variant="secondary"
          onPress={confirmSignOut}
        />
      </View>

      <Text
        style={[
          styles.muted,
          {
            textAlign: "center",
            fontSize: 10,
            letterSpacing: 1,
            paddingBottom: spacing.md,
          },
        ]}
      >
        MUA CLUB · IDENTIFICACIÓN DIGITAL
      </Text>
    </ScrollView>
  );
}
