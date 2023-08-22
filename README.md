# Description

We had the wonderful [Lucia Velasco](https://github.com/luciavelasco) working with us as a contractor for a year at Disney Streaming.
This project is based on her brilliant [word-shower](https://github.com/luciavelasco/word-shower) repo.

My version makes the following changes:

* Uses React
* Aims to be playable on a small screen
* Adds speech recognition
* Brings in a couple of things from Scrabble:
  * Distribution of letters:
    * _1 x J,K,Q,X,Z_
    * _2 x B,C,F,H,M,P,V,W,Y_
    * _3 x G_
    * _4 x D,L,S,U_
    * _6 x N,R,T_
    * _8 x O_
    * _9 x A,I_
    * _12 x E_
  * Values of letters for use in scoring:
    * _1: A,E,I,O,U,L,N,S,T,R_
    * _2: D,G_
    * _3: B,C,M,P_
    * _4: F,H,V,W,Y_
    * _5: K_
    * _8: J,X_
    * _10: Q,Z_

# TODO

:construction: This repo is still work-in-progress :construction:

* [x] Animate the active letters
* [ ] Complete the Instructions pane
  * [ ] Main instructions for playing the game
  * [ ] Mention that Web Speech API `continuous` mode may not been supported
* [ ] Complete the Settings pane
  * [ ] New letter interval (say 100ms to 2s, default 500ms)
  * [ ] Letter speed (say 1s to 10s, default 4s)
  * [ ] Strict Mode - in this mode, for the word `KISS` to be valid, there would have to be two instances of the letter `S` in the list of active letters
* [ ] Improve the UI on smaller screens
* [ ] Improve the UI on larger screens

# Links

* [Lucia's Word Shower repo](https://github.com/luciavelasco/word-shower)
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
