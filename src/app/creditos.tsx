
import { Image, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import AppButton from "../components/AppButton";
import TechItem from "../components/TechItem";
import {
  APP_STACK,
  COURSE,
  SYSTEM_STACK,
  TEAM,
} from "../data/team";
import { styles } from "../styles";
import { colors, spacing } from "../theme";

export default function Creditos() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: spacing.md,
          paddingBottom: spacing.xl,
          gap: spacing.lg,
        },
      ]}
    >
      {/* PORTADA */}
      <View
        style={{
          backgroundColor: colors.text,
          borderRadius: 10,
          padding: spacing.lg,
          overflow: "hidden",
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
          <Text
            style={{
              color: colors.accent,
              fontWeight: "900",
              fontSize: 11,
              letterSpacing: 2,
            }}
          >
            MUA CLUB
          </Text>

          <Text
            style={{
              color: colors.surfaceAlt,
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 1,
            }}
          >
            CRÉDITOS / 2026
          </Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.muted,
            opacity: 0.6,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.md,
          }}
        >
          <View style={{ flex: 1, gap: spacing.sm }}>
            <Text
              style={{
                color: colors.surfaceAlt,
                fontSize: 11,
                fontWeight: "800",
                letterSpacing: 2,
              }}
            >
              DETRÁS DEL PROYECTO
            </Text>

            <Text
              style={{
                color: colors.bg,
                fontSize: 35,
                lineHeight: 39,
                fontWeight: "900",
              }}
            >
              HECHO{"\n"}EN EQUIPO.
            </Text>

            <Text
              style={{
                color: colors.surfaceAlt,
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              Tecnología, diseño y acceso inteligente.
            </Text>
          </View>

          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 82,
              height: 82,
            }}
            resizeMode="contain"
            accessibilityLabel="Logotipo de MUA Club"
          />
        </View>

        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: colors.accent,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: colors.bg,
              fontWeight: "900",
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            PROYECTO ACADÉMICO
          </Text>
        </View>
      </View>

      {/* EQUIPO DE DESARROLLO */}
      <View style={{ gap: spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={[
                styles.label,
                { color: colors.accent, letterSpacing: 2 },
              ]}
            >
              01 / LAS PERSONAS
            </Text>

            <Text
              style={{
                color: colors.text,
                fontSize: 25,
                fontWeight: "900",
              }}
            >
              Equipo de desarrollo
            </Text>
          </View>

          <Text
            style={{
              color: colors.accent,
              fontSize: 24,
              fontWeight: "900",
            }}
          >
            {String(TEAM.length).padStart(2, "0")}
          </Text>
        </View>

        {TEAM.map((person, index) => (
          <View
            key={person.id}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              padding: spacing.md,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
            }}
          >
            <View
              style={{
                width: 46,
                height: 46,
                backgroundColor:
                  index === 0
                    ? colors.accent
                    : colors.surfaceAlt,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "900",
                  color:
                    index === 0
                      ? colors.bg
                      : colors.text,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Text>
            </View>

            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 15,
                  fontWeight: "800",
                  lineHeight: 21,
                }}
              >
                {person.name}
              </Text>

              <Text
                style={{
                  color: colors.muted,
                  fontSize: 10,
                  letterSpacing: 1,
                  fontWeight: "700",
                }}
              >
                EQUIPO MUA
              </Text>
            </View>

            <Text
              style={{
                color: colors.accent,
                fontSize: 20,
                fontWeight: "900",
              }}
            >
              ↗
            </Text>
          </View>
        ))}
      </View>

      {/* INFORMACIÓN ACADÉMICA */}
      <View
        style={{
          backgroundColor: colors.surfaceAlt,
          borderRadius: 10,
          padding: spacing.lg,
          gap: spacing.md,
          borderLeftWidth: 4,
          borderLeftColor: colors.accent,
        }}
      >
        <Text
          style={[
            styles.label,
            { color: colors.accent, letterSpacing: 2 },
          ]}
        >
          02 / CONTEXTO ACADÉMICO
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            lineHeight: 29,
            fontWeight: "900",
          }}
        >
          El proyecto.
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "800",
          }}
        >
          {COURSE.subject}
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontWeight: "800",
              }}
            >
              Grupo {COURSE.group}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontWeight: "800",
              }}
            >
              {COURSE.date}
            </Text>
          </View>
        </View>

        <Text style={styles.body}>
          Sistema de acceso físico con NFC, Arduino y Android.
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: colors.border,
          }}
        />

        <View style={{ gap: spacing.xs }}>
          <Text style={styles.muted}>DOCENTE</Text>
          <Text style={styles.body}>{COURSE.teacher}</Text>
        </View>

        <View style={{ gap: spacing.xs }}>
          <Text style={styles.muted}>INSTITUCIÓN</Text>
          <Text style={styles.body}>
            Facultad de Ingeniería{"\n"}
            Universidad La Salle México
          </Text>
        </View>
      </View>

      {/* TECNOLOGÍAS DE LA APLICACIÓN */}
      <View style={{ gap: spacing.md }}>
        <View style={{ gap: 4 }}>
          <Text
            style={[
              styles.label,
              { color: colors.accent, letterSpacing: 2 },
            ]}
          >
            03 / SOFTWARE
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 25,
              fontWeight: "900",
            }}
          >
            La aplicación
          </Text>

          <Text style={styles.muted}>
            Herramientas utilizadas para construir MUA Club.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.md,
            gap: spacing.md,
          }}
        >
          {APP_STACK.map((technology, index) => (
            <View
              key={technology.name}
              style={{
                paddingBottom:
                  index === APP_STACK.length - 1
                    ? 0
                    : spacing.sm,
                borderBottomWidth:
                  index === APP_STACK.length - 1 ? 0 : 1,
                borderBottomColor: colors.border,
              }}
            >
              <TechItem {...technology} />
            </View>
          ))}
        </View>
      </View>

      {/* SISTEMA DE ACCESO FÍSICO */}
      <View style={{ gap: spacing.md }}>
        <View style={{ gap: 4 }}>
          <Text
            style={[
              styles.label,
              { color: colors.accent, letterSpacing: 2 },
            ]}
          >
            04 / HARDWARE
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 25,
              fontWeight: "900",
            }}
          >
            El acceso físico
          </Text>

          <Text style={styles.muted}>
            Componentes que permiten la comunicación con el lector.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.md,
            gap: spacing.md,
          }}
        >
          {SYSTEM_STACK.map((technology, index) => (
            <View
              key={technology.name}
              style={{
                paddingBottom:
                  index === SYSTEM_STACK.length - 1
                    ? 0
                    : spacing.sm,
                borderBottomWidth:
                  index === SYSTEM_STACK.length - 1 ? 0 : 1,
                borderBottomColor: colors.border,
              }}
            >
              <TechItem {...technology} />
            </View>
          ))}
        </View>

        <Text
          style={[
            styles.muted,
            { fontSize: 11, lineHeight: 17 },
          ]}
        >
          Logotipos de tecnologías: Simple Icons, bajo sus
          respectivas condiciones de uso.
        </Text>
      </View>

      {/* CIERRE */}
      <View
        style={{
          backgroundColor: colors.text,
          borderRadius: 10,
          padding: spacing.lg,
          alignItems: "center",
          gap: spacing.sm,
        }}
      >
        <Text
          style={{
            color: colors.accent,
            fontSize: 12,
            fontWeight: "900",
            letterSpacing: 3,
          }}
        >
          MUA CLUB
        </Text>

        <Text
          style={{
            color: colors.bg,
            fontSize: 23,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Tecnología que conecta.
        </Text>

        <Text
          style={{
            color: colors.surfaceAlt,
            textAlign: "center",
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          Gracias por conocer nuestro proyecto.
        </Text>
      </View>

      <AppButton
        label="REGRESAR A MI CREDENCIAL"
        onPress={() => router.back()}
      />
    </ScrollView>
  );
}
