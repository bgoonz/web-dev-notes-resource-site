sanitize() {
  shopt -s extglob;

  filename=$(basename "$1")
  directory=$(dirname "$1")

  filename_clean=$(echo "$filename" | sed -e 's/[\\/:\*\?"<>\|\x01-\x1F\x7F]//g' -e 's/^\(nul\|prn\|con\|lpt[0-9]\|com[0-9]\|aux\)\(\.\|$\)//i' -e 's/^\.*$//' -e 's/^$/NONAME/')

  if (test "$filename" != "$filename_clean")
  then
    mv -v "$1" "$directory/$filename_clean"
  fi
}

export -f sanitize

sanitize_dir() {
  find "$1" -depth -exec bash -c 'sanitize "$0"' {} \;
}

sanitize_dir './'





find . -name 'fr' -type d -prune -exec rm -rf '{}' +
find . -name 'it' -type d -prune -exec rm -rf '{}' +
find . -name 'ja' -type d -prune -exec rm -rf '{}' +
find . -name 'ko' -type d -prune -exec rm -rf '{}' +
find . -name 'pt-br' -type d -prune -exec rm -rf '{}' +
find . -name 'ru' -type d -prune -exec rm -rf '{}' +
find . -name 'sk' -type d -prune -exec rm -rf '{}' +

find . -name 'th' -type d -prune -exec rm -rf '{}' +
find . -name 'tr' -type d -prune -exec rm -rf '{}' +
find . -name 'zh-cn' -type d -prune -exec rm -rf '{}' +
find . -name 'zh-tw' -type d -prune -exec rm -rf '{}' +

find . -name 'uk' -type d -prune -exec rm -rf '{}' +
find . -name 'uz' -type d -prune -exec rm -rf '{}' +


fdupes -r ./
