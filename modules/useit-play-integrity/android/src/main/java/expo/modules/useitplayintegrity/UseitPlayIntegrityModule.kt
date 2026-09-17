package expo.modules.useitplayintegrity

import android.content.pm.PackageManager
import com.google.android.play.core.integrity.IntegrityManagerFactory
import com.google.android.play.core.integrity.StandardIntegrityManager
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.security.MessageDigest
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.tasks.await

class UseitPlayIntegrityModule : Module() {
  private val providerMutex = Mutex()
  private var tokenProvider: StandardIntegrityManager.StandardIntegrityTokenProvider? = null
  private var preparedProjectNumber: Long? = null

  override fun definition() = ModuleDefinition {
    Name("UseitPlayIntegrity")

    Function("isAvailable") {
      val context = appContext.reactContext ?: return@Function false
      return@Function try {
        context.packageManager.getPackageInfo("com.android.vending", 0)
        true
      } catch (_: PackageManager.NameNotFoundException) {
        false
      }
    }

    AsyncFunction("requestIntegrityToken") Coroutine { cloudProjectNumber: Long, challenge: String ->
      require(cloudProjectNumber > 0) { "cloudProjectNumber must be positive" }
      require(challenge.isNotBlank()) { "challenge must not be blank" }
      require(challenge.length <= 512) { "challenge must be at most 512 characters" }

      val requestHash = MessageDigest.getInstance("SHA-256")
        .digest(challenge.toByteArray(Charsets.UTF_8))
        .joinToString("") { "%02x".format(it) }

      val context = appContext.reactContext ?: error("Android application context is unavailable")
      val provider = providerMutex.withLock {
        if (tokenProvider == null || preparedProjectNumber != cloudProjectNumber) {
          val manager = IntegrityManagerFactory.createStandard(context)
          tokenProvider = manager.prepareIntegrityToken(
            StandardIntegrityManager.PrepareIntegrityTokenRequest.builder()
              .setCloudProjectNumber(cloudProjectNumber)
              .build()
          ).await()
          preparedProjectNumber = cloudProjectNumber
        }
        tokenProvider ?: error("Play Integrity token provider is unavailable")
      }

      try {
        return@Coroutine provider.request(
          StandardIntegrityManager.StandardIntegrityTokenRequest.builder()
            .setRequestHash(requestHash)
            .build()
        ).await().token()
      } catch (firstError: Exception) {
        providerMutex.withLock {
          tokenProvider = null
          preparedProjectNumber = null
        }

        val refreshedProvider = providerMutex.withLock {
          val manager = IntegrityManagerFactory.createStandard(context)
          tokenProvider = manager.prepareIntegrityToken(
            StandardIntegrityManager.PrepareIntegrityTokenRequest.builder()
              .setCloudProjectNumber(cloudProjectNumber)
              .build()
          ).await()
          preparedProjectNumber = cloudProjectNumber
          tokenProvider ?: error("Play Integrity token provider is unavailable")
        }

        try {
          return@Coroutine refreshedProvider.request(
            StandardIntegrityManager.StandardIntegrityTokenRequest.builder()
              .setRequestHash(requestHash)
              .build()
          ).await().token()
        } catch (secondError: Exception) {
          throw IllegalStateException("Play Integrity token request failed", secondError)
        }
      }
    }
  }
}
