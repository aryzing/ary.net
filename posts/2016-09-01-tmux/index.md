# tmux - Terminal Multiplexer

A great tool for your terminal is `tmux`. It allows you to graphically organize and split your shells, run programs in the background, and even share your shell session with another user.

To install it on Ubuntu,

```sh
sudo apt-get install tmux
```

## Commands and shortcuts

The most common command you will be using is `ctrl-b`. This tells tmux that the next command you are going to type is for tmux, not the shell.

For example, `ctrl-b c` **creates a new window**. You can see the new window at the bottom of your screen.

All your windows are given default names. To **change the default window name**, use `ctrl-b ,`. A prompt asking for a new name will appear. Pressing enter assigns the new name.

To **move between windows**, we can use `ctrl-b n` and `ctrl-b p` for next and previous, respectively.

If you want to see a **list** of all your windows, you can use `ctrl-b w`. You can then use the arrows to select which window you want to switch to, or type the number of the corresponding window.

Each window can be **split into panes** vertically or horizontally with `ctrl-b %` and `ctrl-b "`. Once split, the panes can be resized by **holding down** `ctrl-b` and using the arrows. To move between the panes, use `ctrl-b <arrow>`.

Finally, `ctrl-b :` allows you to give named commands to tmux. For example, you can also split horizontally using `ctrl-b :` and then typing `split-window`.

## Sessions

Upon starting tmux, a new session is created. We can **detach** from a session with `ctrl-b d`, meaning that the tmux server continues running in the background while control is restored to the previous shell.

Every invocation of tmux creates a new session with an auto-increasing integer name starting with `0`. To create a new named session,

```sh
tmux new -s mysession
```

Because detaching does not terminate tmux, child processes will continue to run. This allows us to start long running processes and detach from a session without killing the child processes.

After having created a session, we can attach to it with

```sh
tmux attach -t mysession
```

To list existing sessions,

```sh
tmux list-sessions
```

## Useful commands

All commands can be configured with the `~/.tmux.conf` file. Two options that I find particularly useful to configure are the display times of messages. Starting with [version 2.2][v2.2], options can take a display time of `0` indicating a permanent display of messages until a key is pressed.

```sh
set -g display-panes-time 5000
set -g display-time 5000
```

To display all current key bindings, use `ctrl-b ?`. Below are some useful key bindings.

### Session
`tmux ls` (or tmux `list-sessions`)

`tmux new -s session-name`

`ctrl-b d` Detach from session

`tmux attach -t session-name`

`tmux kill-session -t session-name`


### Window
`ctrl-b c` Create new window

`ctrl-b n` Move to the next window in list

`ctrl-b p` Move to the previous window in list

`ctrl-b l` Move to previously selected window

`ctrl-b w` List windows

`ctrl-b <window-number>` Move to window `<window-number>`

`ctrl-b &` Kill the current window (all panes)

`ctrl-b ,` Rename the current window


### Pane
`ctrl-b q` Show pane numbers (used to switch between panes)

`ctrl-b %` Split  vertically

`ctrl-b "` Split horizontally

`ctrl-b q` Show pane numbers, type number to switch

`ctrl-b {` Move the current pane left

`ctrl-b }` Move the current pane right

`ctrl-b : break-pane` Make pane its own window

## Resources and links

[Manual][man].

[YouTube1][1].

[YouTube2][2].

[1]:https://youtu.be/BHhA_ZKjyxo
[2]:https://youtu.be/norO25P7xHg
[man]: http://man.openbsd.org/OpenBSD-current/man1/tmux.1
[v2.2]: https://raw.githubusercontent.com/tmux/tmux/master/CHANGES
