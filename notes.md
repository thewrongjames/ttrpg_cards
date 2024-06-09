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

- Deletion bug
  - Steps to replicate
    - All with the page size reduced to three cards.
    - 1st try:
      - add 2nd
      - add 3rd
      - add 4th
      - add 5th
      - add 6th
      - add 7th
      - add 8th
      - remove 2nd
      - remove 3rd
      - remove 2nd
    - 2nd try:
      - add 2nd
      - add 3rd
      - add 4th
      - add 5th
      - add 6th
      - add 7th
      - remove 3rd
      - remove 2nd
    - 3rd try:
      - same as above, but the order of the last removals can be switched.
    - 4th try:
      - Add cards until you have seven cards.
      - Remove any two cards from the first page.
      - Then you get a gap on the first page.
  - Notes
    - Just by doing two deletions anywhere you can get weird behaviour, but it isn't as predicatable.
  - Okay there is actually a much simpler, but invisible, bug.
    - Replicate:
      - Fill a page with cards, and add one card to the next page.
      - Delete any one card.
    - The pages component's pages array will now only contain the empty page.
  - There we go. I was removing the wrong page from the pages array because I was using the index in the remaining pages as the actual index of the page.

- Okay, it's been a while.
  - I need to work out what I was doing with the card back stuff.
  - I've remembered that I've decided that I'm always rendering both the card fronts and backs.
  - I just might be hiding some of them, maybe just with data attributes and a CSS selector.
  - So, the pages need to know if they are for fronts or backs.
  - Each card view will only be dispalying one of the fronts or backs.
  - And the editor will only be editing either the front of the back at one time... is that weird?
  - I guess the editor could be editing both? Maybe that makes the most sense.
  - I think I should start by just getting the app working again, but with only the card fronts being visible.

```
{"version":0,"content":[{"name":"Message","type":"Cantrip 1","sections":[{"type":"CardTags","tags":["Auditory","Cantrip","Illusion","Linguistic","Mental"]},{"type":"CardDetails","details":[["Cast","1 action, verbal"],["Range","120 feet"],["Targets","1 creature"]]},{"type":"CardText","text":"You mouth words quietly, but instead of coming out of your mouth, they're transferred directly to the ears of the target. While others can't hear your words any better than if you normally mouthed them, the target can hear your words as if they were standing next to you. The target can give a brief response as a reaction, or as a free action on their next turn if they wish, but they must be able to see you and be within range to do so. If they respond, their response is delivered directly to your ear, just like the original message."},{"type":"CardDetails","details":[["Heightened (3rd)","The spell's range increases to 500 feet."]]}]},{"name":"","type":"","sections":[{"type":"CardText","text":"saghsdgf"}]}]}
```

- Some version 0 JSON from local storage. Saving here because I think I'll lose it after changing anything.