## Something is Wrong on the Internet
## Liu WenYue, 07 March 2019
## Professor: Pippin Barr

This game is about a girl who was ignored by her parents and asked to watch cartoon online on her own. However, some of the videos online containing horrible stuff which are not suitable for kids. The main concept of this game is to illustrate the danger and harmfulness of letting kids watching videos online without any adult accompany, and appeal to the parents to pay more attention to their kids and spend more time with them.

This game uses mainly jQuery and jQuery-UI and some special javascript libraries for particular parts. The paintbrush.js is a library that allows us to set a tint on an image. I used this feature for the image of the girl’s brain to suggest how much bad effect are there for watching a bad video. The other useful library will be the jQuery circle-progress library, it allows me to have a circle-progress bar filling animation to indicate each new round. Most importantly, it gives events like circle-animation-end where I can start a new round. Lastly, the annyang library is able to recognise users' voice input and it allows me to play with the elements when the specifies words is recognised.

During my production phase, I tried using the probability to control the chance of showing bad videos and good videos, however, because of the probability of showing bad videos increases as more bad videos are watched, the probability also builds up in the later part of the game and it starts to show bad videos in all four options. I decided to just have one array that contains both good and bad videos. And by having less good videos in the array, the probability of showing good videos are reduced.

With the help of annyang, I included a secret line of words in this game. If users look closer on the screen, there is one line of small text at the left top corner of the computer screen says that " Say 'do you want to play?' ." Once they say this to the girl, she will stop watching videos and stays as the innocent girl as before. However, if the user did not notice the secret words, they will eventually reach the bad ending when the tint value applied to the brain reaches 1.

Through users' interaction with this game, they will be able to see there are both good and bad videos online. Kids who are not aware of the harmfulness of the bad videos will not be able to protect themselves from this corrosive mental influence. Moreover, the secret words will lead to a happy ending as long as the "brain" is not fully contaminated. This suggests that it is never too late for the parents to spend time with their kids.



Uses:
I created the girl and the bear in Illustrator and had them animated in After Effects. The elements for the videos are the free assets from freepik.com. The following URLs are the links to the assets I used in this game.
https://www.freepik.com/free-vector/hand-drawn-christmas-toy-background_3400353.htm
https://www.freepik.com/free-vector/hand-drawn-cute-christmas-character_3188970.htm
https://www.freepik.com/premium-vector/different-medical-equipments-tools_1296630.htm
https://www.freepik.com/free-vector/surgery-design-concept_1536727.htm


The background music used in this game is called "Mary's Theme" by Wing翼.


Libraries used
paintbrush.js: https://github.com/mezzoblue/PaintbrushJS
jQuery circle-progress: https://github.com/kottenator/jquery-circle-progress
annyang: https://www.talater.com/annyang/
