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
- I don't think this generic proxy stuff is the path I want to go down. I think I should keep everything strict. The card sections (like, the collection) should be a class that also extends listenable.
- Need some way of telling listeners about additions and removals. Maybe I could have an action type?

- Thinking about modelling pages.
  - Maybe the view should support arbitrary pages with cards in arbitrary positions.
  - And it's the model that provided the array-like behaviour.

- Thinking about modelling pages again.
  - No, the view won't support arbitrary stuff. That just means more work.
  - I think the view should be the only thing that knows about pages.
  - The model is an array, and not the current every increasing keys just ignore the holes situation.
  - It's going to fill itself in if stuff gets removed.
  - The view should handle this, and pages.

- Thinking about it again again.
  - Okay, so, I think the view should actually not care about tracking the arrays.
  - It makes sense that that is a data modelling problem.
  - And I was making up solutions about checking indices are in sync between the model and the view and I don't like that.
  - The view should just be told what to do.
  - Argh damn it, no, this doesn't work well because I loose the benefits of them just sliding back to the previous page.
  - Do I want the controller to have to delete and move everything?
  - Well... that's going to have to happen somewhere
  - Does it really make sense for the view to own that sliding?
  - Okay, so, we're only ever removing one card at a time.
    - So we can fix up that hole, but for every page after the one in which the card was removed, moving the first element to the previous page.
    - This means it would be nice for the view to have the notion of pages.
    - And the model can just have a notion of an array of cards.
    - I think then we want to keep all the page logic in one place, and as the view needs to have some, that one place should be the view.

- I think I had previously been setting this up with the idea that I would have a list of editor controllers.
  - They would be created and destroyed at the same time as the cards so I wouldn't need to worry about disconnecting them.
  - But this would mean multiple editor views.
  - I think it would be nicer if there could be just one.