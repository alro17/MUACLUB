# MUA Club — credencial móvil NFC

Aplicación móvil para un club deportivo, desarrollada con React Native, Expo y un módulo Android nativo de Host Card Emulation (HCE).

## Funcionalidad
- Inicio de sesión contra la API de Monsterball Go usada en la práctica.
- Credencial con fotografía, nombre y número de usuario.
- Emulación NFC mediante HCE y protocolo APDU para enviar el identificador de usuario en cuatro bytes.
- Pantalla de créditos con integrantes y tecnologías del sistema.

## Equipo
- Héctor Ulises Hernández Domínguez
- Mariano Labrador Acosta
- Alejandra Roa Alonso
- Grupo: MUA

## Configuración local
1. Instala Node.js LTS, JDK 17 y Android SDK/Platform Tools.
2. Crea `.env.local` en la raíz del proyecto y agrega `EXPO_PUBLIC_MONSTERBALL_TOKEN=...` con el token entregado por el profesor. No publiques ese archivo ni el token.
3. Ejecuta `npm install`.
4. Conecta un Android compatible con NFC/HCE y depuración USB.
5. Ejecuta `npx expo run:android` para compilar e instalar la app nativa. Expo Go no contiene el módulo HCE local.

## Importante para la prueba física
La app transmite el identificador de usuario mediante APDU; no decide si se concede el acceso ni consulta el endpoint del escáner. La decisión corresponde al sistema de acceso. Antes de la entrega, comprobar en el lector del profesor el orden de bytes esperado y la respuesta del firmware.

## Créditos técnicos
El módulo HCE/APDU se adaptó a partir de un proyecto de referencia de la práctica. La adaptación de marca, nombres internos, integrantes y estilo visual no implica que toda la implementación base se haya escrito desde cero. El equipo debe revisar, comprender y atribuir las partes reutilizadas conforme a las indicaciones del docente.
