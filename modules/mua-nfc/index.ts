import { NativeModule, requireOptionalNativeModule } from "expo";

export type NfcStatus = {
  hasNfc: boolean;
  nfcEnabled: boolean;
  hasHce: boolean;
  isDefaultForAid: boolean;
};

export type ReaderDetectedEvent = {
  credentialSent: boolean;
  response: string;
  timestamp: number;
};

export type ReaderLostEvent = { reason: "linkLoss" | "deselected" };

type MuaNfcEvents = {
  onReaderDetected(event: ReaderDetectedEvent): void;
  onReaderLost(event: ReaderLostEvent): void;
};

declare class MuaNfcModule extends NativeModule<MuaNfcEvents> {
  getStatus(): NfcStatus;
  setCredential(userId: number): void;
  clearCredential(): void;
  getCredential(): number | null;
  setLittleEndian(littleEndian: boolean): void;
  isLittleEndian(): boolean;
  simulateSelect(): { command: string; response: string };
  openNfcSettings(): void;
}

// null en web, iOS o Expo Go: ahí la app funciona, pero no puede emular la credencial.
const MuaNfc = requireOptionalNativeModule<MuaNfcModule>("MuaNfc");

export default MuaNfc;
