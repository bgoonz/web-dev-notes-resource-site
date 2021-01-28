# Problem with renaming files and folders recursively is if you start renaming your folders, then the paths you're looking inside are changing on the go... So you need to process the insides first.
# 
# Code:
#!/bin/bash


find . -depth -name "*[,&<>*?|\":'()]*" |     # Find all files or folders containing 'bad' characters.
while read FILEDIR                            # Read them line-by-line.
do
        DIR="${FILEDIR%/*}"                   # Get the folder its inside
        FILE="${FILEDIR/*\/}"                 # Get the plain name.
        NEWFILE="${FILE//[,&<>*?|\":\'()]/_}" # Substitute _ for bad things.
        echo mv "$DIR/$FILE" "$DIR/$NEWFILE"  # Rename it.
done

