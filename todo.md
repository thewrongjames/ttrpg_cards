# To Do

- Save to local storage on any change.
- Load from local storage on initialisation.
- Make the default starting card have some instructions / getting started info.
- Remove the export of the card sections from the index. There should only be one place to import them.
- Support export and import to/from a file.
- Have a button to trigger the print dialogue.
- Support the option to show only the front-of-card pages, only the back-of-card pages, or both, interspersed, for double sided printing.
- Fix the mobile view. I've somehow broken the minimum width of the page. It stays at the a4 width.

- Come up with a name for the project. The card-view component should be project-card, where project is replaced with the project name (and other component names should be changed accordingly.)\
  - Cardio?
- Host it online somewhere.

- Setup testing.
  - Test serialisation and deserialisation.
  - Test the type validators.
  - Test `/js/library/english`
- Decide whether I actually need the card "name" and "type". Could they just be a second?
  - If I want them to be a section, replace them with sections.
  - If I want them to exist, rename them "title" and "subtitle".
- Support having multiple different sets of cards save-able and load-able by names from local storage.
- Support a folder structure for these sets of cards in local storage.
- Zoom in/out on the paper.
- Drag and drop to re-order tags and details.
- Support different paper sizes.
- Support "undo".
- Drag and drop to re-arrange cards
- Investigate more efficient serialisations.
