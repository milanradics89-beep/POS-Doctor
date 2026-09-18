import CryptoKit
import DeviceCheck
import ExpoModulesCore
import Security

public class UseitAppAttestModule: Module {
  private let service = DCAppAttestService.shared
  private let keychainService = "com.useit.appattest"

  public func definition() -> ModuleDefinition {
    Name("UseitAppAttest")

    Function("isAvailable") {
      return self.service.isSupported
    }

    AsyncFunction("getOrCreateKeyId") { () -> String in
      if let existing = self.readKeyId() {
        return existing
      }

      return try await withCheckedThrowingContinuation { continuation in
        self.service.generateKey { keyId, error in
          if let error {
            continuation.resume(throwing: error)
            return
          }
          guard let keyId, !keyId.isEmpty else {
            continuation.resume(throwing: NSError(domain: "UseitAppAttest", code: 1, userInfo: [NSLocalizedDescriptionKey: "App Attest returned no key identifier."]))
            return
          }
          do {
            try self.saveKeyId(keyId)
            continuation.resume(returning: keyId)
          } catch {
            continuation.resume(throwing: error)
          }
        }
      }
    }

    AsyncFunction("attest") { (challenge: String, keyId: String) -> String in
      let challengeHash = Data(SHA256.hash(data: Data(challenge.utf8)))
      return try await withCheckedThrowingContinuation { continuation in
        self.service.attestKey(keyId, clientDataHash: challengeHash) { data, error in
          if let error {
            continuation.resume(throwing: error)
            return
          }
          guard let data else {
            continuation.resume(throwing: NSError(domain: "UseitAppAttest", code: 2, userInfo: [NSLocalizedDescriptionKey: "App Attest returned no attestation object."]))
            return
          }
          continuation.resume(returning: data.base64EncodedString())
        }
      }
    }

    AsyncFunction("generateAssertion") { (challenge: String, keyId: String, clientData: String) -> String in
      let clientDataHash = Data(SHA256.hash(data: Data(clientData.utf8)))
      return try await withCheckedThrowingContinuation { continuation in
        self.service.generateAssertion(keyId, clientDataHash: clientDataHash) { data, error in
          if let error {
            continuation.resume(throwing: error)
            return
          }
          guard let data else {
            continuation.resume(throwing: NSError(domain: "UseitAppAttest", code: 3, userInfo: [NSLocalizedDescriptionKey: "App Attest returned no assertion."]))
            return
          }
          continuation.resume(returning: data.base64EncodedString())
        }
      }
    }
  }

  private func saveKeyId(_ keyId: String) throws {
    let data = Data(keyId.utf8)
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "keyId",
      kSecValueData as String: data,
      kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
    ]
    SecItemDelete(query as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw NSError(domain: "UseitAppAttest", code: Int(status), userInfo: [NSLocalizedDescriptionKey: "Unable to persist App Attest key identifier."])
    }
  }

  private func readKeyId() -> String? {
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "keyId",
      kSecReturnData as String: true,
      kSecMatchLimit as String: kSecMatchLimitOne
    ]
    var result: CFTypeRef?
    guard SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess,
          let data = result as? Data else {
      return nil
    }
    return String(data: data, encoding: .utf8)
  }
}
