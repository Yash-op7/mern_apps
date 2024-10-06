Container resizing: - min-h-screen
Container's children resizing: - flex-grow

- relative mt-4 or mb-4
- flex-wrap

- border border-white

⭐ - w-full & object-cover for images

- border-red-400 text-red-700
- h-screen: take the full size of the viewport

# for forms in particular you could try:

- shadow-md:
- rounded-lg:
  on label-> block: Makes the label a block element, taking the full width.

for input tag:
border: Applies a border to the input.
border-gray-300: Sets the border color to a light gray.
rounded-md: Rounds the corners of the input with a medium radius.
p-2: Adds padding of 0.5rem (8px) inside the input.
w-full: Makes the input take the full width of its parent.
focus:outline-none: Removes the default focus outline.
focus:ring-2: Applies a ring effect on focus, with a thickness of 2.
focus:ring-blue-400: Sets the color of the focus ring to a blue shade.

for the submit buttno:

````html
<input
  type="submit"
  value="Submit"
  className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
/>
```
````
