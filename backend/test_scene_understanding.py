from backend.scene_understanding import normalize_scene_understanding


def test_relationships_only_use_confident_visible_items():
    result = normalize_scene_understanding({
        "items": [
            {"name": "sofa", "confidence": 0.95},
            {"name": "lamp", "confidence": 0.8},
            {"name": "maybe table", "confidence": 0.4},
        ],
        "relations": [
            {"source": "sofa", "target": "lamp", "type": "near", "confidence": 0.9},
            {"source": "sofa", "target": "maybe table", "type": "near", "confidence": 0.99},
        ],
    })
    assert result["relations"] == [{
        "source": "sofa", "target": "lamp", "type": "near", "confidence": 0.9
    }]


def test_relationships_are_deduplicated_and_low_confidence_removed():
    result = normalize_scene_understanding({
        "items": [{"name": "plate", "confidence": 0.9}, {"name": "knife", "confidence": 0.9}],
        "relations": [
            {"source": "plate", "target": "knife", "type": "contains", "confidence": 0.8},
            {"source": "plate", "target": "knife", "type": "contains", "confidence": 0.7},
            {"source": "plate", "target": "knife", "type": "near", "confidence": 0.5},
        ],
    })
    assert len(result["relations"]) == 1
    assert result["relations"][0]["type"] == "contains"
