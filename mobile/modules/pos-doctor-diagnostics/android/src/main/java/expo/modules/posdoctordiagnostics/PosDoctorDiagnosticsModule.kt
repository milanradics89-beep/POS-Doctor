package expo.modules.posdoctordiagnostics

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.net.wifi.WifiManager
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.nfc.NfcAdapter
import android.os.BatteryManager
import android.os.Build
import android.os.Environment
import android.os.StatFs
import android.os.PowerManager
import android.telephony.TelephonyManager
import android.util.DisplayMetrics
import android.view.WindowManager
import android.hardware.SensorManager
import android.hardware.Sensor
import android.app.ActivityManager
import androidx.core.content.ContextCompat
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.Inet4Address
import java.net.NetworkInterface

class PosDoctorDiagnosticsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("PosDoctorDiagnostics")

    AsyncFunction("runDiagnostics") {
      return@AsyncFunction runDiagnostics()
    }

    AsyncFunction("checkPermissions") {
      val context = appContext.reactContext ?: return@AsyncFunction mapOf(
        "location" to false,
        "phoneState" to false
      )
      
      val hasLocation = ContextCompat.checkSelfPermission(
        context,
        Manifest.permission.ACCESS_FINE_LOCATION
      ) == PackageManager.PERMISSION_GRANTED
      
      val hasPhoneState = ContextCompat.checkSelfPermission(
        context,
        Manifest.permission.READ_PHONE_STATE
      ) == PackageManager.PERMISSION_GRANTED
      
      return@AsyncFunction mapOf(
        "location" to hasLocation,
        "phoneState" to hasPhoneState
      )
    }

    AsyncFunction("getPermissionsInfo") {
      val context = appContext.reactContext ?: return@AsyncFunction mapOf(
        "location" to "unknown",
        "phoneState" to "unknown",
        "simPresent" to false,
        "networkAvailable" to false
      )
      
      val hasLocation = ContextCompat.checkSelfPermission(
        context,
        Manifest.permission.ACCESS_FINE_LOCATION
      ) == PackageManager.PERMISSION_GRANTED
      
      val hasPhoneState = ContextCompat.checkSelfPermission(
        context,
        Manifest.permission.READ_PHONE_STATE
      ) == PackageManager.PERMISSION_GRANTED
      
      // Get basic info that doesn't require sensitive permissions
      val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as? TelephonyManager
      val simPresent = telephonyManager?.simState == TelephonyManager.SIM_STATE_READY
      
      val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
      val networkAvailable = connectivityManager?.activeNetworkInfo?.isConnected == true
      
      return@AsyncFunction mapOf(
        "location" to if (hasLocation) "granted" else "denied",
        "phoneState" to if (hasPhoneState) "granted" else "denied",
        "simPresent" to simPresent,
        "networkAvailable" to networkAvailable
      )
    }
  }

  private fun runDiagnostics(): Map<String, Any?> {
    val context = appContext.reactContext ?: return emptyMap()

    return mapOf(
      "battery" to getBatteryInfo(context),
      "wifi" to getWifiInfo(context),
      "telephony" to getTelephonyInfo(context),
      "nfc" to getNfcInfo(context),
      "device" to getDeviceInfo(),
      "memory" to getMemoryInfo(context),
      "storage" to getStorageInfo(),
      "display" to getDisplayInfo(context),
      "sensors" to getSensorsInfo(context),
      "power" to getPowerInfo(context),
      "features" to getSystemFeatures(context)
    )
  }

  private fun getBatteryInfo(context: Context): Map<String, Any?> {
    val batteryIntent = context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
    val bm = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager

    val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
    val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
    val percentage = if (level >= 0 && scale > 0) (level * 100 / scale) else -1

    val status = batteryIntent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1
    val statusString = when (status) {
      BatteryManager.BATTERY_STATUS_CHARGING -> "Charging"
      BatteryManager.BATTERY_STATUS_DISCHARGING -> "Discharging"
      BatteryManager.BATTERY_STATUS_FULL -> "Full"
      BatteryManager.BATTERY_STATUS_NOT_CHARGING -> "Not Charging"
      else -> "Unknown"
    }

    val health = batteryIntent?.getIntExtra(BatteryManager.EXTRA_HEALTH, -1) ?: -1
    val healthString = when (health) {
      BatteryManager.BATTERY_HEALTH_GOOD -> "Good"
      BatteryManager.BATTERY_HEALTH_OVERHEAT -> "Overheat"
      BatteryManager.BATTERY_HEALTH_DEAD -> "Dead"
      BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE -> "Over Voltage"
      BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE -> "Failure"
      BatteryManager.BATTERY_HEALTH_COLD -> "Cold"
      else -> "Unknown"
    }

    val temperature = batteryIntent?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1) ?: -1
    val voltage = batteryIntent?.getIntExtra(BatteryManager.EXTRA_VOLTAGE, -1) ?: -1
    val technology = batteryIntent?.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY) ?: "Unknown"

    val chargeCounter = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CHARGE_COUNTER)
    } else null

    val cycleCount = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CYCLE_COUNT)
    } else null

    return mapOf(
      "level" to percentage,
      "status" to statusString,
      "health" to healthString,
      "temperature" to (temperature / 10.0),
      "voltage" to voltage,
      "technology" to technology,
      "chargeCounter" to chargeCounter,
      "cycleCount" to cycleCount
    )
  }

  private fun getWifiInfo(context: Context): Map<String, Any?> {
    val wifiManager = context.applicationContext.getSystemService(Context.WIFI_SERVICE) as? WifiManager
    if (wifiManager == null) {
      return mapOf("restricted" to true, "ssid" to "Not Available", "bssid" to "", "rssi" to 0, "linkSpeed" to 0, "frequency" to 0, "ipAddress" to "")
    }

    val hasLocationPermission = ContextCompat.checkSelfPermission(
      context,
      Manifest.permission.ACCESS_FINE_LOCATION
    ) == PackageManager.PERMISSION_GRANTED

    val wifiInfo = wifiManager.connectionInfo
    val ssid = if (hasLocationPermission && Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
      wifiInfo.ssid.replace("\"", "")
    } else if (!hasLocationPermission) {
      "<Requires Location Permission>"
    } else {
      "<unknown ssid>"
    }

    val bssid = if (hasLocationPermission) wifiInfo.bssid ?: "" else ""
    val rssi = wifiInfo.rssi
    val linkSpeed = wifiInfo.linkSpeed
    val frequency = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      wifiInfo.frequency
    } else 0

    val ipAddress = getIpAddress()

    return mapOf(
      "ssid" to ssid,
      "bssid" to bssid,
      "rssi" to rssi,
      "linkSpeed" to linkSpeed,
      "frequency" to frequency,
      "ipAddress" to ipAddress,
      "restricted" to !hasLocationPermission
    )
  }

  private fun getIpAddress(): String {
    try {
      val interfaces = NetworkInterface.getNetworkInterfaces()
      while (interfaces.hasMoreElements()) {
        val intf = interfaces.nextElement()
        val addrs = intf.inetAddresses
        while (addrs.hasMoreElements()) {
          val addr = addrs.nextElement()
          if (!addr.isLoopbackAddress && addr is Inet4Address) {
            return addr.hostAddress ?: ""
          }
        }
      }
    } catch (e: Exception) {
      return ""
    }
    return ""
  }

  private fun getTelephonyInfo(context: Context): Map<String, Any?> {
    val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as? TelephonyManager
    if (telephonyManager == null) {
      return mapOf("restricted" to true, "operator" to "Not Available", "simState" to "Unknown", "networkType" to "Unknown", "dataState" to "Unknown", "isRoaming" to false)
    }

    val hasPhonePermission = ContextCompat.checkSelfPermission(
      context,
      Manifest.permission.READ_PHONE_STATE
    ) == PackageManager.PERMISSION_GRANTED

    val operator = telephonyManager.networkOperatorName ?: "Unknown"
    val simState = when (telephonyManager.simState) {
      TelephonyManager.SIM_STATE_READY -> "Ready"
      TelephonyManager.SIM_STATE_ABSENT -> "Absent"
      TelephonyManager.SIM_STATE_UNKNOWN -> "Unknown"
      else -> "Other"
    }

    val networkType = when (telephonyManager.networkType) {
      TelephonyManager.NETWORK_TYPE_LTE -> "LTE"
      TelephonyManager.NETWORK_TYPE_HSDPA, TelephonyManager.NETWORK_TYPE_HSUPA, TelephonyManager.NETWORK_TYPE_HSPA -> "3G"
      TelephonyManager.NETWORK_TYPE_EDGE, TelephonyManager.NETWORK_TYPE_GPRS -> "2G"
      TelephonyManager.NETWORK_TYPE_UNKNOWN -> "Unknown"
      else -> "Other"
    }

    val dataState = when (telephonyManager.dataState) {
      TelephonyManager.DATA_CONNECTED -> "Connected"
      TelephonyManager.DATA_CONNECTING -> "Connecting"
      TelephonyManager.DATA_DISCONNECTED -> "Disconnected"
      else -> "Unknown"
    }

    val isRoaming = telephonyManager.isNetworkRoaming

    return mapOf(
      "operator" to operator,
      "simState" to simState,
      "networkType" to networkType,
      "dataState" to dataState,
      "isRoaming" to isRoaming,
      "restricted" to !hasPhonePermission
    )
  }

  private fun getNfcInfo(context: Context): Map<String, Any?> {
    val nfcAdapter = NfcAdapter.getDefaultAdapter(context)
    return mapOf(
      "present" to (nfcAdapter != null),
      "enabled" to (nfcAdapter?.isEnabled == true)
    )
  }

  private fun getDeviceInfo(): Map<String, Any?> {
    val serial = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      try {
        Build.getSerial()
      } catch (e: SecurityException) {
        "<Restricted>"
      }
    } else {
      @Suppress("DEPRECATION")
      Build.SERIAL
    }

    return mapOf(
      "manufacturer" to Build.MANUFACTURER,
      "model" to Build.MODEL,
      "brand" to Build.BRAND,
      "device" to Build.DEVICE,
      "product" to Build.PRODUCT,
      "fingerprint" to Build.FINGERPRINT,
      "hardware" to Build.HARDWARE,
      "serial" to serial,
      "androidVersion" to Build.VERSION.RELEASE,
      "sdkVersion" to Build.VERSION.SDK_INT,
      "abis" to Build.SUPPORTED_ABIS.toList()
    )
  }

  private fun getMemoryInfo(context: Context): Map<String, Any?> {
    val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    val memInfo = ActivityManager.MemoryInfo()
    activityManager.getMemoryInfo(memInfo)

    return mapOf(
      "totalRam" to memInfo.totalMem,
      "availableRam" to memInfo.availMem,
      "lowMemory" to memInfo.lowMemory,
      "threshold" to memInfo.threshold
    )
  }

  private fun getStorageInfo(): Map<String, Any?> {
    val statFs = StatFs(Environment.getDataDirectory().path)
    val blockSize = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      statFs.blockSizeLong
    } else {
      @Suppress("DEPRECATION")
      statFs.blockSize.toLong()
    }

    val totalBlocks = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      statFs.blockCountLong
    } else {
      @Suppress("DEPRECATION")
      statFs.blockCount.toLong()
    }

    val availableBlocks = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      statFs.availableBlocksLong
    } else {
      @Suppress("DEPRECATION")
      statFs.availableBlocks.toLong()
    }

    val freeBlocks = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      statFs.freeBlocksLong
    } else {
      @Suppress("DEPRECATION")
      statFs.freeBlocks.toLong()
    }

    return mapOf(
      "totalSpace" to (totalBlocks * blockSize),
      "freeSpace" to (freeBlocks * blockSize),
      "availableSpace" to (availableBlocks * blockSize)
    )
  }

  private fun getDisplayInfo(context: Context): Map<String, Any?> {
    val wm = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    val metrics = DisplayMetrics()
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      val display = context.display
      display?.getRealMetrics(metrics)
    } else {
      @Suppress("DEPRECATION")
      wm.defaultDisplay.getRealMetrics(metrics)
    }

    val refreshRate = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      context.display?.refreshRate
    } else {
      @Suppress("DEPRECATION")
      wm.defaultDisplay.refreshRate
    }

    return mapOf(
      "width" to metrics.widthPixels,
      "height" to metrics.heightPixels,
      "density" to metrics.density,
      "densityDpi" to metrics.densityDpi,
      "refreshRate" to refreshRate
    )
  }

  private fun getSensorsInfo(context: Context): List<Map<String, Any?>> {
    val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    val sensors = sensorManager.getSensorList(Sensor.TYPE_ALL)

    return sensors.take(10).map { sensor ->
      mapOf(
        "name" to sensor.name,
        "type" to getSensorTypeName(sensor.type),
        "vendor" to sensor.vendor
      )
    }
  }

  private fun getSensorTypeName(type: Int): String {
    return when (type) {
      Sensor.TYPE_ACCELEROMETER -> "Accelerometer"
      Sensor.TYPE_GYROSCOPE -> "Gyroscope"
      Sensor.TYPE_MAGNETIC_FIELD -> "Magnetometer"
      Sensor.TYPE_LIGHT -> "Light"
      Sensor.TYPE_PRESSURE -> "Pressure"
      Sensor.TYPE_PROXIMITY -> "Proximity"
      Sensor.TYPE_AMBIENT_TEMPERATURE -> "Temperature"
      else -> "Other ($type)"
    }
  }

  private fun getPowerInfo(context: Context): Map<String, Any?> {
    val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager

    val powerSaveMode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      powerManager.isPowerSaveMode
    } else {
      false
    }

    val interactive = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT_WATCH) {
      powerManager.isInteractive
    } else {
      @Suppress("DEPRECATION")
      powerManager.isScreenOn
    }

    return mapOf(
      "powerSaveMode" to powerSaveMode,
      "interactive" to interactive
    )
  }

  private fun getSystemFeatures(context: Context): Map<String, Any?> {
    val pm = context.packageManager
    return mapOf(
      "nfc" to pm.hasSystemFeature(PackageManager.FEATURE_NFC),
      "telephony" to pm.hasSystemFeature(PackageManager.FEATURE_TELEPHONY),
      "camera" to pm.hasSystemFeature(PackageManager.FEATURE_CAMERA),
      "bluetooth" to pm.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH),
      "location" to pm.hasSystemFeature(PackageManager.FEATURE_LOCATION),
      "wifi" to pm.hasSystemFeature(PackageManager.FEATURE_WIFI)
    )
  }
}
