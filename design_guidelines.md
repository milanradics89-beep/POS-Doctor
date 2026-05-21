{
  "app_name": "POS Doctor",
  "design_personality": {
    "keywords": [
      "dark-only",
      "technician-first",
      "high-contrast",
      "glanceable status",
      "dense but readable",
      "fast + reliable",
      "no-nonsense enterprise"
    ],
    "north_star": "A pocket diagnostic console: scan → connect → run → triage → export. Every screen should answer 'what is broken?' in <5 seconds.",
    "anti_goals": [
      "No decorative gradients (clarity > flair)",
      "No tiny text or low-contrast gray-on-gray",
      "No hidden primary actions",
      "No animation-heavy UI (keep motion functional)"
    ]
  },
  "platform_notes": {
    "primary": "React Native (Expo bare) Android",
    "secondary": "React web preview companion (same visual tokens)",
    "component_policy": "shadcn/ui NOT available in React Native. Use RN built-ins (View, Text, Pressable, TextInput, FlatList, SectionList) + small custom components. For web preview, you may map to shadcn equivalents but keep the same tokens.",
    "file_type": "Use .js (not .tsx).",
    "testing": "All interactive and key informational elements MUST include data-testid (kebab-case)."
  },
  "design_tokens": {
    "colors": {
      "functional_required": {
        "ok": "#22c55e",
        "warning": "#f59e0b",
        "fault": "#ef4444",
        "scanning": "#3b82f6"
      },
      "surfaces_dark": {
        "bg": "#0B0D10",
        "bg_elevated": "#10141A",
        "card": "#121823",
        "card_2": "#0F1520",
        "border": "#243042",
        "divider": "#1B2533"
      },
      "text": {
        "primary": "#EAF0F7",
        "secondary": "#B7C3D4",
        "muted": "#7F8EA3",
        "inverse": "#0B0D10"
      },
      "status_tints": {
        "ok_bg": "rgba(34,197,94,0.14)",
        "warning_bg": "rgba(245,158,11,0.16)",
        "fault_bg": "rgba(239,68,68,0.16)",
        "info_bg": "rgba(59,130,246,0.14)"
      },
      "focus": {
        "ring": "rgba(59,130,246,0.55)",
        "ring_alt": "rgba(234,240,247,0.22)"
      },
      "selection": {
        "selection_bg": "rgba(59,130,246,0.25)",
        "selection_text": "#EAF0F7"
      }
    },
    "typography": {
      "font_family": "System (San Francisco / Roboto). No custom fonts.",
      "scale": {
        "h1": { "rn": 28, "lineHeight": 34, "weight": "700" },
        "h2": { "rn": 18, "lineHeight": 24, "weight": "700" },
        "h3": { "rn": 16, "lineHeight": 22, "weight": "700" },
        "body": { "rn": 15, "lineHeight": 21, "weight": "400" },
        "meta": { "rn": 13, "lineHeight": 18, "weight": "500" },
        "mono": { "rn": 13, "lineHeight": 18, "weight": "500", "family": "monospace" }
      },
      "number_readability": "Prefer tabular numbers where possible on web; in RN, use monospace for IPs/serials/uptime."
    },
    "spacing": {
      "grid": 8,
      "insets": {
        "screen_x": 16,
        "screen_y": 14
      },
      "touch_target_min": 44,
      "card_padding": 14,
      "row_gap": 10
    },
    "radius": {
      "sm": 10,
      "md": 14,
      "lg": 18,
      "pill": 999
    },
    "shadow": {
      "elevation_1": {
        "android": { "elevation": 2 },
        "ios": { "shadowColor": "#000", "shadowOpacity": 0.25, "shadowRadius": 10, "shadowOffset": { "width": 0, "height": 6 } }
      },
      "elevation_2": {
        "android": { "elevation": 5 },
        "ios": { "shadowColor": "#000", "shadowOpacity": 0.35, "shadowRadius": 16, "shadowOffset": { "width": 0, "height": 10 } }
      }
    }
  },
  "layout_system": {
    "mobile_first": {
      "target_width": "375–420px",
      "safe_area": "Use SafeAreaView; keep top nav height 56–60.",
      "scroll": "All main screens scroll; keep primary CTA sticky when appropriate (Diagnostics: bottom action bar)."
    },
    "information_hierarchy": {
      "rule": "One primary action per screen; secondary actions as outline/ghost.",
      "scan_screen": "Inputs → Scan CTA → Results list → Manual connect.",
      "diagnostics_screen": "Overall health summary → action bar (Re-run, Export) → collapsible categories."
    }
  },
  "components": {
    "react_native_custom_components": {
      "TopNav": {
        "description": "Back button (when applicable), app name/logo, language toggle (EN/HU) as segmented control with flags.",
        "behavior": "Language toggle persists (AsyncStorage).",
        "data_testids": [
          "top-nav-back-button",
          "top-nav-language-toggle",
          "top-nav-language-en",
          "top-nav-language-hu"
        ]
      },
      "PrimaryButton": {
        "description": "Full-width, high-contrast, large touch target.",
        "style": {
          "bg": "#EAF0F7",
          "text": "#0B0D10",
          "radius": "md",
          "height": 48
        },
        "states": {
          "pressed": "opacity 0.92 + slight darken",
          "disabled": "opacity 0.45"
        }
      },
      "SecondaryButton": {
        "description": "Outline button for secondary actions (View History, Manual Connect).",
        "style": {
          "border": "#243042",
          "text": "#EAF0F7",
          "bg": "transparent",
          "height": 48
        }
      },
      "IconButton": {
        "description": "Square 44x44 for refresh/export in action bar.",
        "style": { "radius": "sm", "bg": "#10141A", "border": "#243042" }
      },
      "StatusBadge": {
        "description": "Pill badge with icon + label. Never color-only.",
        "variants": {
          "ok": { "bg": "ok_bg", "text": "#22c55e" },
          "warning": { "bg": "warning_bg", "text": "#f59e0b" },
          "fault": { "bg": "fault_bg", "text": "#ef4444" },
          "info": { "bg": "info_bg", "text": "#3b82f6" },
          "unknown": { "bg": "rgba(127,142,163,0.14)", "text": "#B7C3D4" }
        },
        "data_testids": ["status-badge"]
      },
      "DeviceListItem": {
        "description": "Compact card row: left status dot, center device identity, right chevron + connection badge.",
        "fields": ["IP", "Manufacturer", "Model", "Connection status", "Last seen"],
        "data_testids": ["scan-device-list-item"]
      },
      "CollapsibleCard": {
        "description": "Diagnostics category card with header row (title + badge + chevron). Expands to show parsed summary + raw data block.",
        "interaction": "Tap header toggles. Long-press header copies raw block (optional).",
        "data_testids": [
          "diagnostic-card-toggle",
          "diagnostic-card-status-badge",
          "diagnostic-card-raw-data",
          "diagnostic-card-summary"
        ]
      },
      "KeyValueTable": {
        "description": "Two-column key/value list for device info and parsed diagnostics.",
        "typography": "Keys meta, values body; values can be monospace for IDs.",
        "data_testids": ["key-value-row"]
      },
      "BottomActionBar": {
        "description": "Sticky bottom bar on Diagnostics screen: Re-run (primary) + Export (secondary) + Share icon.",
        "data_testids": [
          "diagnostics-rerun-button",
          "diagnostics-export-button",
          "diagnostics-share-button"
        ]
      },
      "Toast": {
        "description": "Use a lightweight toast/snackbar for scan started, connected, export success/fail.",
        "note": "In RN, use react-native-toast-message or a custom animated View. Keep it minimal."
      }
    },
    "web_preview_mapping_optional": {
      "note": "If building the web preview with existing shadcn components, map RN components to these for speed.",
      "component_path": {
        "collapsible": "/app/frontend/src/components/ui/collapsible.jsx",
        "card": "/app/frontend/src/components/ui/card.jsx",
        "badge": "/app/frontend/src/components/ui/badge.jsx",
        "button": "/app/frontend/src/components/ui/button.jsx",
        "input": "/app/frontend/src/components/ui/input.jsx",
        "separator": "/app/frontend/src/components/ui/separator.jsx",
        "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
        "sonner_toast": "/app/frontend/src/components/ui/sonner.jsx"
      }
    }
  },
  "screen_specs": {
    "top_navigation": {
      "layout": "56–60px height; left back (conditional), center title, right language toggle.",
      "language_toggle": {
        "type": "segmented",
        "labels": "EN / HU",
        "flags": "Optional small flag glyphs as images (not emoji).",
        "data_testids": ["top-nav-language-toggle"]
      }
    },
    "scan_screen": {
      "primary_goal": "Discover terminals quickly and connect.",
      "sections": [
        {
          "name": "Subnet input",
          "ui": "TextInput with auto-detected subnet (e.g., 192.168.1.0/24) + small 'Auto' chip.",
          "data_testids": ["scan-subnet-input", "scan-subnet-auto-button"]
        },
        {
          "name": "Scan CTA",
          "ui": "PrimaryButton 'Scan / Keresés' with scanning state (spinner + blue accent).",
          "data_testids": ["scan-start-button"]
        },
        {
          "name": "Manual IP connect",
          "ui": "SecondaryButton opens modal/bottom sheet with IP input + Connect.",
          "data_testids": ["manual-connect-open-button", "manual-connect-ip-input", "manual-connect-submit-button"]
        },
        {
          "name": "Results list",
          "ui": "FlatList of DeviceListItem; filter chips: All / Online / Warning / Fault.",
          "data_testids": ["scan-results-list", "scan-filter-chip-all", "scan-filter-chip-online", "scan-filter-chip-warning", "scan-filter-chip-fault"]
        }
      ],
      "empty_states": {
        "no_devices": {
          "en": "No terminals found. Check Wi‑Fi and subnet.",
          "hu": "Nem található terminál. Ellenőrizd a Wi‑Fi-t és az alhálózatot.",
          "action": "Show Manual Connect button."
        }
      }
    },
    "device_detail_screen": {
      "primary_goal": "Confirm device identity and start diagnostics.",
      "sections": [
        {
          "name": "Device info card",
          "ui": "Card with KeyValueTable: IP, Serial, Manufacturer, Model, Android version, ADB status.",
          "data_testids": ["device-info-card"]
        },
        {
          "name": "Actions",
          "ui": "PrimaryButton: Run Diagnostics; SecondaryButton: View History.",
          "data_testids": ["run-diagnostics-button", "view-history-button"]
        }
      ]
    },
    "diagnostics_screen": {
      "primary_goal": "Triage health fast; drill into raw data when needed.",
      "header": {
        "overall_health": {
          "ui": "Score ring or horizontal meter (0–100) with label: Healthy / Warning / Critical.",
          "colors": "Use green/amber/red thresholds.",
          "data_testids": ["overall-health-score", "overall-health-label"]
        },
        "device_identity": {
          "ui": "Compact line: Model • Serial • IP (serial/IP monospace).",
          "data_testids": ["diagnostics-device-identity"]
        }
      },
      "categories": [
        "Battery",
        "NFC",
        "Card Reader (MSR)",
        "EMV Chip Reader",
        "Contactless/NFC Payment",
        "WiFi",
        "Mobile Network",
        "Device Info",
        "Memory/Storage",
        "System Uptime"
      ],
      "card_content_structure": {
        "collapsed": "Title + StatusBadge + 1-line summary (muted).",
        "expanded": "Parsed summary bullets + KeyValueTable + Raw data block (monospace, selectable).",
        "raw_block": "Use a dark inset panel (#0F1520) with border and horizontal scroll if needed."
      },
      "actions": {
        "rerun": {
          "en": "Re-run diagnostics",
          "hu": "Diagnosztika újrafuttatása",
          "data_testid": "diagnostics-rerun-button"
        },
        "export": {
          "en": "Export report",
          "hu": "Jelentés exportálása",
          "data_testid": "diagnostics-export-button"
        },
        "share": {
          "en": "Share",
          "hu": "Megosztás",
          "data_testid": "diagnostics-share-button"
        }
      }
    },
    "history_screen": {
      "primary_goal": "Review past sessions per terminal quickly.",
      "list_item": "Date/time, overall status badge, short note (e.g., 'NFC warning'), tap to open full report.",
      "data_testids": ["history-list", "history-list-item", "history-open-session-button"]
    }
  },
  "i18n_copy": {
    "status_labels": {
      "ok": { "en": "OK", "hu": "Rendben" },
      "warning": { "en": "Warning", "hu": "Figyelmeztetés" },
      "fault": { "en": "Fault", "hu": "Hiba" },
      "unknown": { "en": "Unknown", "hu": "Ismeretlen" },
      "scanning": { "en": "Scanning", "hu": "Keresés" },
      "connected": { "en": "Connected", "hu": "Csatlakozva" },
      "disconnected": { "en": "Disconnected", "hu": "Nincs kapcsolat" }
    },
    "common_actions": {
      "scan": { "en": "Scan", "hu": "Keresés" },
      "connect": { "en": "Connect", "hu": "Csatlakozás" },
      "run_diagnostics": { "en": "Run Diagnostics", "hu": "Diagnosztika indítása" },
      "view_history": { "en": "View History", "hu": "Előzmények" },
      "export_report": { "en": "Export Report", "hu": "Jelentés exportálása" },
      "share": { "en": "Share", "hu": "Megosztás" },
      "retry": { "en": "Retry", "hu": "Újra" },
      "cancel": { "en": "Cancel", "hu": "Mégse" }
    }
  },
  "motion_microinteractions": {
    "principles": [
      "Motion is functional: indicate state changes (scanning, expanding, exporting).",
      "Keep durations short (120–180ms) and easing standard (ease-out).",
      "Respect reduced motion setting if implemented."
    ],
    "recommended": {
      "collapsible": "Chevron rotates 180deg; content expands with height + opacity (no springy bounce).",
      "pressables": "Pressed state: opacity 0.9 and subtle background shift (no scale if it causes jank).",
      "scanning": "Inline spinner + blue status chip; optional subtle progress bar at top."
    },
    "avoid": ["Parallax", "Particles", "Heavy blur/glass", "Long entrance animations"]
  },
  "accessibility": {
    "contrast": "Target WCAG AA. Use text.primary on surfaces; avoid muted text for critical values.",
    "touch_targets": "Minimum 44x44pt for all Pressables.",
    "focus": "On web preview, show visible focus ring using focus.ring token.",
    "color_plus_label": "Every status color must be paired with label + icon.",
    "readability": "Use monospace for IP/serial/uptime; allow text selection/copy for raw blocks."
  },
  "performance_guidelines": {
    "lists": "Use FlatList with keyExtractor (serial or IP). Use getItemLayout if row height fixed.",
    "async_diagnostics": "Run ADB commands async; show per-card loading skeleton or 'Running…' state.",
    "rendering": "Avoid re-rendering all cards on each command output; store results per category and memoize rows."
  },
  "libraries": {
    "react_native": {
      "recommended": [
        {
          "name": "@react-native-async-storage/async-storage",
          "why": "Persist language toggle, last subnet, recent devices.",
          "install": "npm i @react-native-async-storage/async-storage"
        },
        {
          "name": "react-native-share",
          "why": "Share exported text/PDF.",
          "install": "npm i react-native-share"
        },
        {
          "name": "react-native-view-shot",
          "why": "Optional: capture report view as image for quick share.",
          "install": "npm i react-native-view-shot"
        }
      ],
      "pdf_export": {
        "option_a": {
          "name": "react-native-html-to-pdf",
          "note": "Common RN approach: render report HTML → PDF.",
          "install": "npm i react-native-html-to-pdf"
        },
        "option_b": {
          "name": "expo-print",
          "note": "If Expo modules available: HTML → PDF via printToFileAsync.",
          "install": "npx expo install expo-print"
        }
      }
    },
    "web_preview": {
      "note": "Use existing Tailwind + shadcn for preview only; keep tokens aligned with RN palette.",
      "toast": "Use sonner (/app/frontend/src/components/ui/sonner.jsx)."
    }
  },
  "image_urls": {
    "note": "This app is utility-first; avoid stock photography. Use simple vector icons (lucide-react on web; @expo/vector-icons on RN).",
    "categories": [
      {
        "category": "app_icon",
        "description": "Simple stethoscope + terminal glyph (vector). No gradients.",
        "urls": []
      }
    ]
  },
  "instructions_to_main_agent": [
    "Implement a dark-only theme using the tokens above; do not reuse the current web :root light tokens as-is.",
    "Do not center-align containers globally (avoid App.css default centering).",
    "Ensure every Pressable/TextInput and key status text has data-testid in kebab-case.",
    "Use collapsible diagnostic cards with a consistent header row: title, status badge, chevron.",
    "Use monospace styling for IP, serial, uptime, and raw command output blocks.",
    "Keep motion minimal and functional; no gradients beyond tiny accents (and ideally none).",
    "Language toggle must switch ALL labels/messages/status names EN/HU; store preference in AsyncStorage.",
    "Export must support text + PDF and share action; show toast on success/failure."
  ],
  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
