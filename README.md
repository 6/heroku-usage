# heroku-usage

Heroku CLI plugin to show current and estimated dyno + addon usage at the organization level.

```sh-session
$ heroku usage:monthly --org myorg
=== Usage for pay period: May 1st 2016 - Jun 1st 2016
Addons:                 $2964 / month
Dyno units (current):   62
Dyno units (estimated): 155
```

### how to install

TBD

### local development tips

- Use `cli.debug()` from heroku-cli-util to pretty-print an object.
- Run a command with `HEROKU_DEBUG=1` to print debugging statements. `HEROKU_DEBUG_HEADERS=1` to also get the headers.
- Inspect `~/.heroku/error.log` for extra error output.
- Make sure you run `heroku plugins:link .` if it seems old code is being run.
