package expo.modules.useitplayintegrity

import android.content.pm.PackageManager
import com.google.android.play.core.integrity.PrepareIntegrityTokenRequest
import com.google.android.play.core.integrity.StandardIntegrityManager
import com.google.android.play.core.integrity.StandardIntegrityManagerFactory
import com.google.android.play.core.integrity.StandardIntegrityTokenRequest
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

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

    AsyncFunction("requestIntegrityToken") Coroutine { cloudProjectNumber: Long, requestHash: String ->
      require(cloudProjectNumber > 0) { "cloudProjectNumber must be positive" }
      require(requestHash.isNotBlank()) { "requestHash must not be blank" }
      require(requestHash.length <= 500) { "requestHash must be at most 500 characters" }

      val context = appContext.reactContext ?: error("Android application context is unavailable")
      val provider = providerMutex.withLock {
        if (tokenProvider == null || preparedProjectNumber != cloudProjectNumber) {
          val manager = StandardIntegrityManagerFactory.create(context)
          tokenProvider = manager.prepareIntegrityToken(
            PrepareIntegrityTokenRequest.builder()
              .setCloudProjectNumber(cloudProjectNumber)
              .build()
          ).await()
          preparedProjectNumber = cloudProjectNumber
        }
        tokenProvider ?: error("Play Integrity token provider is unavailable")
      }

      try {
        return@Coroutine provider.request(
          StandardIntegrityTokenRequest.builder()
            .setRequestHash(requestHash)
            .build()
        ).await().token()
      } catch (firstError: Exception) {
        providerMutex.withLock {
          tokenProvider = null
          preparedProjectNumber = null
        }

        val refreshedProvider = providerMutex.withLock {
          val manager = StandardIntegrityManagerFactory.create(context)
          tokenProvider = manager.prepareIntegrityToken(
            PrepareIntegrityTokenRequest.builder()
              .setCloudProjectNumber(cloudProjectNumber)
              .build()
          ).await()
          preparedProjectNumber = cloudProjectNumber
          tokenProvider ?: error("Play Integrity token provider is unavailable")
        }

        try {
          return@Coroutine refreshedProvider.request(
            StandardIntegrityTokenRequest.builder()
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
