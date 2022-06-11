# somewhat-snake
not quite like the classic snake game
a bit of pacman in there too

i have now four ghosts chasing you shouting stuff to you. they speed up and slow down at (for now) fixed intervals
the game over logic is working for now.I still want to overlay a big "GAME OVER" banner over the canvas.. hasn't happened yet so for now a simple popup will do
the ghosts are regenerated but are for some reason dead when I spawn them.. need to look into why that's happening.
the game is now using cookies to store the gamespeed and the amount of apples it will each time spawn randomly. Both of which the player can now set and will be remembered throughout each refresh. the update cookie button also functions as a reload game button (the only thing I haven't solved with cookies yet is the create new cookie prompt will always happen each reload.. which is only needed if you decide to delete a key/value pair from the game cookies like i did myself. which without the prompt will kill the game in your browser)
