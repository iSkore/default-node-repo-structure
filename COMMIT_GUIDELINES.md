Commit Messages must be in the following standard:

1) contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
    - be entirely in lowercase with the exception of proper nouns, acronyms, function/variable names
2) followed by a new line with no text
3) a description of additions, updates, deletions, etc.
4) followed by a new line with no text
5) reference to the issues fixed by this commit and references to relevant material to the commit
    - Denoted with `Fixes:`, `Refs:`, etc.
    - `Fixes` must include an issue number - tagged by doing: `issue#123`

Example:
```
all lower case summary

Description of primary changes
- Added new feature
- Edited old feature
- Removed obsolete feature

Fixes: issue#xx
Refs: https://guides.github.com/
```

Git Commit Template:

1) cd into repository
2) add the git commit template to your git configuration
    - `git config --global commit.template ./.github/.gitmessage`
3) commit something with `git commit` and the template message will appear
4) complete the message and push your changes

> lines beginning with `#` are ignored
> remove `#` to include the line in your message
 
Template:
```
#------------------------------MAX LENGTH------------------------------|
# all lower case summary

# description of primary changes
# - added:
# - updated:
# - deleted:

# Fixes: issue#xxx
# Refs:
#
#
```