# To Do

- Make the card headings display nicely.
- Get the app working again, just displaying and editing card fronts.

- Support the option to show only the front-of-card pages, only the back-of-card pages, or both, interspersed, for double sided printing.
  - Display both the fronts and backs of cards.
  - Actually switch the display based on the radio button.
- Try to make all of Capricia's cards.

- Support export and import to/from a file.
- Make the editor prettier.
- Make the default card a welcome message.
- Add an info button with pop-up links and details.
- Come up with a name for the project. The card-view component should be project-card, where project is replaced with the project name (and other component names should be changed accordingly.)
  - Cardio?
- Fix the mobile view. I've somehow broken the minimum width of the page. It stays at the a4 width.
- Host it online somewhere.

- Icons.
- Setup testing.
  - Test serialisation and deserialisation.
  - Test the type validators.
  - Test `/js/library/english`
- Support having multiple different sets of cards save-able and load-able by names from local storage.
- Support a folder structure for these sets of cards in local storage.
- Zoom in/out on the paper.
- Drag and drop to re-order sections.
- Support different paper sizes.
- Support "undo".
- Drag and drop to re-arrange cards
- Investigate more efficient serialisations.
- Investigate having some eslint plugin enforce the import paths required by the browser.
- Consider naming models explicitly (i.e. CardModel)
- Support more card sections
  - Images
  - "Space" to allow vertically centring. I'm imagining it just has a "weight" property, that determins it's flex-grow.