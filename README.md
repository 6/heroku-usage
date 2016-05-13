# heroku-usage

Heroku CLI plugin to show current and estimated dyno + addon usage at the organization level.

### how to install

TBD

### local development tips

- Use `cli.debug()` from heroku-cli-util to pretty-print an object.
- Run a command with `HEROKU_DEBUG=1` to print debugging statements. `HEROKU_DEBUG_HEADERS=1` to also get the headers.
- Inspect `~/.heroku/error.log` for extra error output.
- Make sure you run `heroku plugins:link .` if it seems old code is being run.
