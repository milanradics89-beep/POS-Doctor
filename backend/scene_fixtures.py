SCENE_FIXTURES = {
    'room': {'required_scene':'room','must_ground_in':['layout','circulation','furniture','lighting'],'forbidden_assumptions':['exact dimensions','hidden furniture','unseen decor']},
    'table': {'required_scene':'table','must_ground_in':['visible objects','grouping','reuse or organization'],'forbidden_assumptions':['hidden supplies','object ownership','exact materials not visible']},
    'fridge': {'required_scene':'fridge','must_ground_in':['visible ingredients','uncertainty','missing ingredients'],'forbidden_assumptions':['exact quantities','ingredients outside the image']},
    'objects': {'required_scene':'objects','must_ground_in':['visible object properties','practical use','reuse or repair'],'forbidden_assumptions':['hidden components','specialist condition claims']},
}

def fixture_cases():
    return list(SCENE_FIXTURES.items())
