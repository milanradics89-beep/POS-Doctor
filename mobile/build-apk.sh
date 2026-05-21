#!/bin/bash

# POS Doctor - Build Script
# This script builds the Android APK for the POS Doctor app

set -e

echo "======================================"
echo "POS Doctor - Android APK Build Script"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed"
    exit 1
fi
echo "✓ Yarn found: $(yarn --version)"

if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed"
    echo "Please install Java JDK 17 or higher"
    exit 1
fi
echo "✓ Java found: $(java -version 2>&1 | head -n 1)"

# Navigate to mobile directory
cd "$(dirname "$0")"
echo ""
echo "Working directory: $(pwd)"
echo ""

# Install dependencies
echo "Installing dependencies..."
yarn install
echo ""

# Check if android directory exists
if [ ! -d "android" ]; then
    echo "Native Android project not found. Running prebuild..."
    npx expo prebuild --platform android --clean
    echo ""
fi

# Build the APK
echo "Building Android APK (Release)..."
cd android
chmod +x gradlew
./gradlew assembleRelease

echo ""
echo "======================================"
echo "✅ Build Complete!"
echo "======================================"
echo ""
echo "APK Location:"
echo "  $(pwd)/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "To install on device via ADB:"
echo "  adb install -r app/build/outputs/apk/release/app-release.apk"
echo ""
echo "File size:"
ls -lh app/build/outputs/apk/release/app-release.apk | awk '{print "  " $5}'
echo ""
