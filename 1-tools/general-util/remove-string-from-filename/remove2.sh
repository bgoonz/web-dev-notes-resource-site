find . -type d -exec rename 's/html/''/' {} \;

find . -type d -exec rename 's/\_/''/' {} \;
find . -type d -exec rename 's/_//' {} \;
