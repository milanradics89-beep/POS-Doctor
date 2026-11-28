# USEIT – Product Vision, Functional Specification & Design Direction

## 1. What is USEIT?

USEIT is an AI-powered visual assistance and discovery platform designed to help people make better use of the things, spaces, objects and opportunities around them.

The core idea is simple:

**See it. Understand it. Make use of it.**

Users take a photo or select an image from their gallery. USEIT uses artificial intelligence to understand what is visible, interpret the context and generate useful, personalized and actionable suggestions.

USEIT should turn an ordinary photograph into an opportunity.

It is not primarily a chatbot, a traditional image-recognition tool, a shopping application or a recipe application. It is a visual-first AI assistant that connects image understanding with practical real-world outcomes.

The experience must feel natural:
1. The user photographs something.
2. USEIT understands what it sees.
3. The user chooses what they want to achieve.
4. AI generates relevant suggestions.
5. The user can explore, refine, create, improve, fix, cook or discover something new.

The application should make users think:

"I didn't know I could do that with what I already have."

## 2. Core product philosophy

USEIT must be built around five principles:

- **AI-first:** AI is the central intelligence of the product, not an additional feature.
- **Visual-first:** The photograph is the primary input. Users should not have to explain everything manually.
- **Action-oriented:** Results must lead to useful actions, not just generic descriptions.
- **Context-aware:** Recommendations must be based on the actual image, visible objects, relationships, environment and user intent.
- **Delightful simplicity:** A sophisticated AI system should feel incredibly easy to use.

The product must not overwhelm users with settings, technical terminology or unnecessary steps.

The complexity belongs behind the scenes. The experience should remain simple.

## 3. Main user experience

### 3.1 Home screen

The home screen is the most important screen in USEIT.

It should immediately communicate that the user can photograph anything and discover what they can do with it.

The camera/photo action must be the dominant element.

The home screen should include:
- A distinctive USEIT brand identity.
- A prominent camera action.
- An option to select a photo from the gallery.
- A short, clear explanation of what USEIT can do.
- A selection of available intentions.
- Carefully designed examples that demonstrate the product's potential.

The interface should not look like a generic AI chat application.

The user should immediately understand that the starting point is a photograph.

### 3.2 Photo capture and image selection

Users must be able to:
- Take a photograph using the device camera.
- Select an existing image from the gallery.
- Preview the selected image.
- Replace or remove the image.
- Cancel an ongoing image preparation or analysis process.
- Recover gracefully from camera, gallery and permission errors.

Image preparation must preserve visual fidelity.

Orientation, dimensions, image quality and image normalization must be handled correctly. The application must not unnecessarily distort, crop or degrade the original visual information.

The interface must clearly communicate what is happening during image preparation and analysis.

### 3.3 Intent selection

After selecting a photograph, the user should be able to tell USEIT what they want to achieve.

The main intentions are:

**CREATE**
Turn existing things into something new.

Examples:
- Create something from objects already available at home.
- Discover DIY projects.
- Generate creative ideas.
- Find new uses for ordinary objects.
- Create something from materials that would otherwise be unused.

**IMPROVE**
Make an existing object, room or environment better.

Examples:
- Improve a living room.
- Optimize a workspace.
- Make a room more attractive.
- Improve the arrangement of furniture.
- Suggest practical upgrades based on existing items.

**FIX**
Understand what is wrong and what to do next.

Examples:
- Identify visible problems.
- Suggest practical repair approaches.
- Explain the next steps.
- Identify potentially necessary tools or materials.
- Recommend when professional assistance is appropriate.

USEIT must not pretend to diagnose invisible technical problems from an image.

**COOK**
Turn available ingredients into meals.

Examples:
- Photograph the contents of a refrigerator.
- Identify visible ingredients.
- Suggest recipes based on available ingredients.
- Recommend additional ingredients only when necessary.
- Provide preparation instructions.
- Suggest alternatives based on missing ingredients.

**Product discovery (separate capability)**

Product discovery is not a sixth consumer intention. It is an optional follow-up to a photo-grounded result when the image provides a concrete, evidence-backed product need.

Examples:
- Find furniture that fits a photographed room.
- Discover compatible accessories.
- Find replacements for visible objects.
- Compare products that match the user's style and requirements.

The follow-up sends only generic, photo-grounded search terms to the backend product-discovery endpoint. It does not send the image again or start another vision analysis. Product recommendations must be relevant, credible and clearly distinguish verified retailer information from AI-generated suggestions.

**SURPRISE**
Discover something unexpected.

This is the exploratory mode.

USEIT should use the photograph to suggest interesting, creative or unusual opportunities the user might not have considered.

The suggestions must still be relevant to the actual image.

## 4. AI intelligence and reasoning

AI is the core differentiator of USEIT.

The application must go beyond identifying individual objects.

It should understand:
- What objects are visible.
- What those objects are used for.
- How objects relate to each other.
- What materials may be present.
- What the environment represents.
- What opportunities exist within the scene.
- Which suggestions are realistic and actionable.
- What the selected user intention means in the context of the image.

For example:

**A refrigerator photograph**

USEIT should recognize visible ingredients, estimate what can be prepared and generate relevant recipes.

**A living room photograph**

USEIT should understand the room layout, visible furniture, colors and available space. It should suggest improvements and potentially show a redesigned visual concept.

**A messy desk photograph**

USEIT should identify the visible objects and suggest how they could be organized, reused or transformed into something useful.

**A photograph of an ordinary object**

USEIT should explore possible alternative uses, improvements or compatible products.

The AI must not generate generic recommendations that could have been produced without seeing the photograph.

Every recommendation should have a clear connection to the visual context.

### AI output requirements

Results should be structured and easy to understand.

Depending on the selected intention, they may include:
- A short explanation of what the AI understands.
- Relevant findings and identified objects.
- Prioritized recommendations.
- Step-by-step instructions.
- Required materials or ingredients.
- Estimated difficulty.
- Relevant warnings or limitations.
- Related products where appropriate.
- A generated visual concept where applicable.
- Follow-up actions.

The user should be able to refine the result, request alternatives or explore a specific recommendation without restarting the entire process.

The AI provider must be OpenAI. Do not introduce Gemini or additional AI providers.

## 5. Visual concept generation

One of the most important premium features is the ability to transform an existing visual environment into a proposed new concept.

For example, when the user photographs a room and selects IMPROVE, USEIT should be able to:
- Understand the existing room.
- Identify the elements that should remain.
- Identify elements that could be replaced.
- Suggest new objects or arrangements.
- Generate a visual representation of the proposed result.

The generated concept must remain faithful to the original environment.

It must not arbitrarily change the room, remove important structural elements or produce an unrelated image.

The visual result should help the user understand what the proposed improvement would actually look like.

Where possible, show the original and proposed concept in a way that makes comparison easy.

## 6. Results and interaction design

The results screen must be one of the strongest parts of the product.

It should feel like a polished discovery experience rather than a technical AI response.

Use:
- Strong visual hierarchy.
- Clear sectioning.
- High-quality imagery.
- Readable recommendation cards.
- Concise explanations.
- Meaningful action buttons.
- Consistent spacing and typography.

Users should be able to:
- Explore individual recommendations.
- Request more ideas.
- Refine an existing suggestion.
- Compare alternatives.
- Open relevant product information.
- Save useful results where supported.
- Start another analysis.
- Return to the original photograph.

Do not display every possible piece of information at once. Reveal complexity progressively.

## 7. Design direction and brand identity

USEIT must look like a premium, modern consumer technology product.

The design should communicate:
- Intelligence.
- Simplicity.
- Creativity.
- Trust.
- Quality.
- Practical usefulness.

It must not look like a generic AI dashboard, a developer tool or an unfinished startup MVP.

### Color palette

The primary visual direction is based on three core colors:

**Warm off-white**
The main background. It creates a welcoming, calm and premium environment.

**Graphite**
The primary text, strong contrast elements and important interface components.

**Lime**
The distinctive USEIT accent color. Use it for primary actions, active states, selected elements and important visual highlights.

The lime accent should be used with discipline. It must create recognition without overwhelming the interface.

Avoid excessive gradients, random colors, unnecessary shadows and decorative elements without a clear purpose.

### Typography

Typography should be modern, highly readable and confident.

Use:
- Clear hierarchy between headings and supporting text.
- Strong but restrained headline typography.
- Comfortable body text sizes.
- Consistent font weights.
- Proper spacing and line heights.

Typography should make the product feel carefully designed, not assembled from default components.

### Components

Build and maintain a consistent design system covering:
- Primary and secondary buttons.
- Camera and gallery actions.
- Intent selection cards.
- Image preview components.
- Recommendation cards.
- Product cards.
- Result sections.
- Loading and progress indicators.
- Error and empty states.
- Dialogs and confirmation elements.
- Navigation.
- Interactive controls.

Every component must have consistent dimensions, spacing, radius, typography, colors and interaction behavior.

### Motion and micro-interactions

Motion should make the application feel alive and responsive.

Use subtle, purposeful animations for:
- Photo selection.
- Image preparation.
- AI analysis.
- Result appearance.
- Card interactions.
- Screen transitions.
- Visual concept generation.

Avoid excessive animations that slow down the experience.

Every animation must have a purpose.

## 8. Loading, error and recovery states

The application must feel reliable even when something goes wrong.

Design and implement complete states for:
- Camera permission denied.
- Gallery permission denied.
- Invalid image.
- Image preparation failure.
- Network unavailable.
- Backend unavailable.
- AI request failure.
- Request timeout.
- Analysis cancellation.
- Empty results.
- Product discovery failure.
- Visual generation failure.

Loading states should explain what USEIT is doing without pretending that a process has completed.

Cancellation must work correctly. An old request must never overwrite a newer result.

Retry behavior must be safe and must not accidentally create duplicate paid AI requests.

Error messages must be understandable to ordinary users, not developers.

## 9. Privacy and trust

Privacy is a fundamental product requirement.

Photos should remain on the user's device except when the user deliberately initiates an AI operation that requires sending the image for analysis.

The backend must not become a persistent image-storage platform.

Use secure communication, appropriate authentication, platform attestation, request limits and controlled retention of operational data.

Never expose API keys, credentials, tokens or internal infrastructure details in the mobile application.

The user should understand when an image is being processed and how their information is handled.

## 10. Technical and platform requirements

The product must provide a consistent experience across Android and iOS.

The mobile application must:
- Support different screen sizes.
- Handle small and large devices.
- Respect platform-specific interaction conventions.
- Provide accessible labels and controls.
- Maintain smooth scrolling and transitions.
- Handle interrupted requests.
- Preserve application state where appropriate.

The backend must support the actual product workflows, not just return mock responses.

The mobile application, backend, AI services and product discovery functionality must work as one coherent system.

Do not introduce mock functionality as if it were production-ready.

Do not silently replace real functionality with static demo content.

## 11. What USEIT must never become

Avoid these product mistakes:

- A generic chatbot with a camera button.
- A simple object-recognition application.
- A collection of disconnected AI features.
- A generic shopping interface.
- A recipe application with an image upload feature.
- A complicated technical dashboard.
- A visually inconsistent collection of screens.
- An application that generates impressive-looking but irrelevant suggestions.
- An interface that looks good in a screenshot but fails during actual interaction.

The product must feel like one intelligent assistant with multiple useful capabilities.

## 12. Definition of a successful USEIT experience

A successful USEIT experience means:

A user can open the application, take a photograph of something in their everyday life, select an intention and receive useful, visually appealing and contextually relevant results.

The experience should be fast, intuitive, trustworthy and enjoyable.

The user should not need to understand how AI works.

They should simply feel that USEIT understands what they are looking at and helps them do something useful with it.

## 13. Instructions for product development and design review

Treat this document as the product vision and experience reference for USEIT.

When reviewing or changing the application:

1. Understand the intended product experience before modifying individual components.
2. Evaluate the complete user journey, not only isolated screens.
3. Verify that each intention produces a genuinely different and relevant experience.
4. Check that the AI understands the actual photograph and does not return generic content.
5. Evaluate visual consistency across the entire application.
6. Check real interactions, navigation, loading, cancellation and recovery.
7. Test both small and large screen sizes.
8. Preserve the established brand identity and design system.
9. Avoid introducing unnecessary features or changing the product direction.
10. Never claim that functionality works without implementation and test evidence.

The ultimate objective is not to create a collection of attractive screens.

**The objective is to build a complete, coherent, production-quality AI product that people genuinely want to use.**

USEIT should make the ordinary world feel full of possibilities.
