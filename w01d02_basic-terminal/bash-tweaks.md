# Objective
- Students have a better understanding of what Bash is
- Students have a more usable Bash prompt. 

# Bash: let's make it more friendly. 
- What is Bash? 
  - Bash stands for the Bourne Again SHell. 
  - We've said that you can interact with computers via text and via the GUI, but someone had to write code to make that happen. 
  - And programmers are opinionated, so there's a few to choose from. Bash is one of them. 
- Why did we choose bash? 
  - Comes as standard with every Mac and Linux computer
  - Generally the system default
  - Very widespread; you're likely to see it everywhere. 
- So how friendly is it? 
  - A little friendly. Mostly friendly. Sometimes janky. But we can make it friendlier. 

## How do we configure Bash? 
- There's three files: your .bash_profile, your .bashrc, and your .inputrc. 
- Files that begin with dots are 'hidden' files. You don't see them by default in directory listings.  
  - ls
  - ls -a

## Step 1: let's be more colourful. 
- add `export CLICOLOR=1` to ~/.bashrc
- source file, do 'ls'. 

## Step 2: do we want tab completion to cycle through things? 
- (Explain the options)
- Remove "TAB: menu-complete" from .inputrc, and create a new terminal window. 
  - Which do you prefer? Your choice. 
  - I like the second one. 

## Step 3: Make tab completion friendlier. 
- `brew install bash-completion`
- Add this to your .bashrc: 
  ```
  if [ -f $(brew --prefix)/etc/bash_completion ]; then
    . $(brew --prefix)/etc/bash_completion
  fi
  ```
  - "." is a shortcut for "source"
- We can now tab-complete git commands! 
- And files that are awaiting adding!

## Step 3b: pagination
- If you hit 'tab' first off, then it'll ask you if you want to show them all, and THEN drop you in a thing that says '--more--' at the bottom. 
- And you can use space to scroll through them. 
- This is known as a 'pager'. It lets you go through long output line-by-line. 
- We're using 'more'. Let's have a look at a big text file. 
- cat it. More it. Less it. 
- I like less. Let's use it by default: 'export PAGER=less' in .bashrc
- Do we want to page through things in tab completion? It's a bit lame to get dropped into a pager when trying to tab through things. Knocks off your flow. 
  - `set page-completions off` in .inputrc. Remember you have to restart the whole terminal for that one. 

## Step 4: customise your prompt. 
- That thing to the left with a dollar on the end of it? That's your prompt. 
- You can customise it. 
- echo $PS1 - "\h:\W \u\$ "
- Mine looks like this: export PS1='[\u@\h \W]\$ '
  - \h - hostname, the name of your computer. 
  - \u - your user name. 
  - \W - your working directory. 
  - \$ - a prompt character. 
- Totally a matter of taste! 
- Maybe you'd like to remove the hostname, as it's long and you don't need it. You can! 
- Maybe you'd like to swap the user name and the directory, as you're looking closer to the end of the line and that's the bit that changes the most. 

## Step 5: Git prompts. 
- It's useful to be able to see your status in your command prompt. Michael's had that in his prompt. 
- We can get something similar. Git comes with it as an optional extra. 
- We have to load the file, and configure it. 
  ```
  if [ -f $(brew --prefix)/etc/bash_completion.d/git-prompt.sh ]; then
    . $(brew --prefix)/etc/bash_completion.d/git-prompt.sh
  fi
  ```
  - Add `$(__git_ps1 "(%s) ")` to your PS1 variable somewhere. I like mine at the beginning. 
  - set `export GIT_PS1_SHOWDIRTYSTATE=1` in your .bashrc. 

## Some unrelated hints. 
- You can press 'up' in your terminal to scroll back through your history. 
- You can run 'history' to print it all. 
- And you can use it with 'grep' to find things. 
- Ctrl-a moves to the start of the line. 
- Ctrl-e moves to the end of the line. 

