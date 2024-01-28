# To Do

- Setup input fields to modify the sections.
- The controls shouldn't scroll with the page.
- Support outside-of-constructor setup and tear-down of top level listeners in the controllers. I believe this will be a pre-requisite for handling multiple cards.
- Handle adding new cards.
- Handle selecting which card you want to edit.
- Handle deleting cards, including removing listeners.
- Remove any styles associated with components from the root styles file.
- Add serialisation.
- Save to local storage on any change.
- Load from local storage on initialisation.
  - I think this will need some way to trigger all the triggers after the objects are created. Perhaps they could all have a trigger-all method. Maybe they all implement an interface that requires it.
- Support export and import to/from a file.
- Support the option to show only the front-of-card pages, only the back-of-card pages, or both, interspersed, for double sided printing.

- Come up with a name for the project. The card-view component should be project-card, where project is replaced with the project name (and other component names should be changed accordingly.)