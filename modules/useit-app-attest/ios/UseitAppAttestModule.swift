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

    Function("isKeyAttested") { (keyId: String) -> Bool in
      return self.readAttestedKeyId() == keyId
    }

    Function("isKeyAttestationPending") { (keyId: String) -> Bool in
      return self.readPendingKeyId() == keyId
    }

    Function("markKeyAttestationPending") { (keyId: String) throws -> Void in
      try self.savePendingKeyId(keyId)
    }

    Function("markKeyAttested") { (keyId: String) throws -> Void in
      try self.saveAttestedKeyId(keyId)
      self.deletePendingKeyId()
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

    AsyncFunction("createNewKeyId") { () -> String in
      return try await withCheckedThrowingContinuation { continuation in
        self.service.generateKey { keyId, error in
          if let error {
            continuation.resume(throwing: error)
            return
          }
          guard let keyId, !keyId.isEmpty else {
            continuation.resume(throwing: NSError(domain: "UseitAppAttest", code: 4, userInfo: [NSLocalizedDescriptionKey: "App Attest returned no replacement key identifier."]))
            return
          }
          do {
            try self.saveKeyId(keyId)
            self.deleteAttestedKeyId()
            self.deletePendingKeyId()
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
    let deleteQuery: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "keyId"
    ]
    SecItemDelete(deleteQuery as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw NSError(domain: "UseitAppAttest", code: Int(status), userInfo: [NSLocalizedDescriptionKey: "Unable to persist App Attest key identifier."])
    }
  }

  private func saveAttestedKeyId(_ keyId: String) throws {
    let data = Data(keyId.utf8)
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "attestedKeyId",
      kSecValueData as String: data,
      kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
    ]
    let deleteQuery: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "attestedKeyId"
    ]
    SecItemDelete(deleteQuery as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw NSError(domain: "UseitAppAttest", code: Int(status), userInfo: [NSLocalizedDescriptionKey: "Unable to persist App Attest enrollment state."])
    }
  }

  private func savePendingKeyId(_ keyId: String) throws {
    let data = Data(keyId.utf8)
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: "pendingKeyId",
      kSecValueData as String: data,
      kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
    ]
    deleteValue(account: "pendingKeyId")
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw NSError(domain: "UseitAppAttest", code: Int(status), userInfo: [NSLocalizedDescriptionKey: "Unable to persist pending App Attest enrollment state."])
    }
  }

  private func readPendingKeyId() -> String? {
    return readValue(account: "pendingKeyId")
  }

  private func deletePendingKeyId() {
    deleteValue(account: "pendingKeyId")
  }

  private func deleteAttestedKeyId() {
    deleteValue(account: "attestedKeyId")
  }

  private func deleteValue(account: String) {
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: account
    ]
    SecItemDelete(query as CFDictionary)
  }

  private func readAttestedKeyId() -> String? {
    return readValue(account: "attestedKeyId")
  }

  private func readKeyId() -> String? {
    return readValue(account: "keyId")
  }

  private func readValue(account: String) -> String? {
    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keychainService,
      kSecAttrAccount as String: account,
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
