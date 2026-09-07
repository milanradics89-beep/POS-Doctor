from scene_quality import CONFIDENCE_FLOOR, quality_gate


def test_low_confidence_items_are_removed():
    result = quality_gate({'items': [{'name': 'sofa', 'confidence': 0.91}, {'name': 'possible lamp', 'confidence': CONFIDENCE_FLOOR - 0.01}], 'opportunities': []})
    assert [x['name'] for x in result['items']] == ['sofa']


def test_missing_required_items_are_inferred():
    result = quality_gate({'items': [{'name': 'sofa', 'confidence': 0.9}], 'opportunities': [{'requiredItems': ['sofa', 'wall hooks'], 'missingItems': []}]})
    assert result['opportunities'][0]['missingItems'] == ['wall hooks']


def test_existing_missing_item_is_not_duplicated():
    result = quality_gate({'items': [], 'opportunities': [{'requiredItems': ['hooks'], 'missingItems': ['hooks']}]})
    assert result['opportunities'][0]['missingItems'] == ['hooks']
