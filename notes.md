# Notes

- How do I want this to work?
- We definitely need some kind of JavaScript representation of a card and the sections.
- Do I want to write an entire reactive state management library for this? Maybe not?
- It's going to get complicated because at the top level I'm going to have an array of cards, which I probably want to be mutating, rather than re-creating every time.'
- I guess every change could know how to update the UI.
- But I probably don't want the models code to be bogged down with UI stuff.
- Perhaps the UI can register to be bound to a value.
- I think this all amounts to making the models on their own to begin with, and working out what I want to do with them afterwards.
- Hmm. Strike that. Maybe the easiest thing to do right now is to have the models know how to render themselves.
- Do I want to use web components?
- I guess then I could have views and models...
- Some controller would own the state, and create components as required to display the state?
- Can I just have them take the model in their constructor?
- Do I still want to bind things to listeners?
- How does that work for arrays?