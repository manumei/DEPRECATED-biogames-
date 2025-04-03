# BIOGAMES

## Taxo Bingo

**Step 6 | Game Timer**
_Context:_ The initial panel has 3 options for timers (No Timer, 90 seconds, 120 seconds). A timer must be selected (120 is chosen by default), this is what the HTML looks like for the timer buttons of the panel:

                    <div class="timer-buttons">
                        <button class="timer-btn" timer="None">No Timer</button>
                        <button class="timer-btn" timer="90s">90s</button>
                        <button class="timer-btn selected" timer="120s">120s</button>
                    </div>

_What to add:_ Add a game timer that starts when you click "Play" and the bingo grid starts to show, you win if you complete the game before the timer runs out. When the timer runs out, game is disabled and a "You Lost" screen (similar to the "You Won" screen) is shown.

**Step 7 | "Hard Mode" Button**
_Context:_ Game currently shows organism image and name for each organism by default. However, I want to add a mode which makes it a bit harder.

_What to add:_ Panel will offer an optional "Hard Mode" button, that if selected, will make the game not show the organism names, only displaying the images for the user to play the bingo.

**Step 8 | 'Give Up' option**
_Context:_ There is currently no elegant way to end the game g. Just closing it and forgetting about it which is fine, but could be made nicer with a specific "resign" option.

_What to add:_ Below the grid, a resign button that when clicked, leads directly to the "You Lost" screen, nothing else, very simple.

**Step 9 | Game Progress & Refresh**
_Context:_ Currenly, you switch organisms and fill cells as you go, but when you re-enter the website, you just play again and start a whole new game, while the final purpose of this game is to become a daily challenge.

_What to add:_ Progress is saved (until daily reset), entering on the same day doesnt lead to the panel menu, it leads directly to the already-started game to continue filling the cells (if the timer hasn't already ran out).

With the same grid cells staying the same for the entire day of course, as well as the chosen difficulty (default or hard), and the timer does not reset, otherwise that would be cheating by just closing and reopening the game.

If the current-day game has already been won, leads directly to the "you won" screen, and same if it has already been lost for the "you lost" screen. At 00:00, the game resets and you can play a new game.

_Question before implementing:_ How should we save the progress without having game accounts? Should we save it to the IP? To the current google profile? To the device itself? What is the easiest and most simple way? I know of similar games that don't have accounts, but they are able to store this data when you open the game on the same google profile (yes, it can be bypassed by using incognito mode, but it's the best they can do).

**Step 10 | User Win-Lost Database**
_Context:_ Game doesn't record anything about wins or losses, there are no stats for you to see how much you have won and such.

_What to add:_ I want to record, in the same scale that we record game progress in Step 9 (be it local profile, device, etc.) the statistics of each player. How many times they have won and how many times they have lost. And show a graph of both this results in both the "You Won" and "You Lost" screens.

- mollusca orders ("Gastropoda", "Bivalvia", "Cephalopoda")
- more mammalia orders (eulipotyphla)

## Animal TicTacToe

Potential Change: If the animal matches multiple of the non-disabled cells, give the user a choice between the available cells. Output a message below the input bar saying "{animal_name} matches several options, click on 1 to choose". And then style the available cells with a small blue circle fill, so the user decides to click one of them, fill the selected cell with the animal name and disable it.

Crea un script de python que haga una lista las imagenes de assets/webp/taxo/eukaryota/animalia/ y las pase todas a un notepad.
Pasale a ChatCGT ese notepad y que te devuelva una lista de todas esas especies, pero un formato {nombre_comun, nombre_scientifico}
Que haga un script que tome esa lista, y replique todas las imagenes WEBP de assets/webp/taxo/eukaryota/animalia/, pero que
las haga en assets/webp/tictac/ y que les ponga su nombre_comun en vez de su nombre_cientifico. Que use el hecho de que
cada imagen se llama como su nombre_cientifico.webp, y que use la lista que creamos con {nombre_comun, nombre_scientifico} para renombrarlas
Esto es para poder ejecutar el Step 4 de Animal TicTacToe, en Tasks/tic_tac.txt

Add the timer repeating the Taxo Bingo logic

## Symptoms Link

Add the Input Prediction repeating the Animal TicTacToe logic

## Bio Top8
