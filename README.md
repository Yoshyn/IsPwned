# isPwned ?

The "isPwned" repository is a Firefox extension to display a warning when a website has know breaches.
This is based on the data of [haveibeenpwned](https://haveibeenpwned.com).

![Image of isPwned](https://raw.githubusercontent.com/Yoshyn/IsPwned/master/docs/warning.png)

There's 3 types of warnings :

  * Success (green) : No breaches found. Maybe the website has not been pwned, maybe we don't know it yet...
  * Warning (sort of yellow) : One of the top level domain of the current website has been pwned. If there's a number, it indicate the number of breaches found.
  * Danger (sort of red) : Change your password ASAP for this domain.

## Alternative :

  * [BreachAlerts](https://github.com/nhnt11/BreachAlerts) : A Please support him, a such feature will be awesome directly into Firefox !

## Settings

Two simple settings for this extension :
  * The frequency of breaches update from [haveibeenpwned](https://haveibeenpwned.com). (Breaches are store in local to avoid lot of API call)
  * A boolean to know if the extension has to be display near the URL or not.

![Image of isPwned](https://raw.githubusercontent.com/Yoshyn/IsPwned/master/docs/settings.png)


# Not working !

I do my best a JS developer, so maybe this extension will not work for you. In this case please, drop me an issue !

This has been tested with Firefox 57 and should work on newer versions.
This should also be possible to make it work on Chrome without a lot of change.

If you have any issue(s), please leave a ticket or contribute !

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Localy install this extension

  Retrieve the project and follow https://developer.mozilla.org/uk/docs/Tools/about:debugging .

# Thanks & Related

  * https://github.com/gorhill/uBlock : I fully stole your code architecture. Your fault, your job is too great !
  * https://github.com/nhnt11/BreachAlerts : I fully stole your idea but i clearly can't wait you finish your addon to forget this one !

# TODO :

  * Manage a popup with a link to ihavebeenpwned.com & some explications
  * Manage a popup to enter an email if the site is pwned
    * Retrieve all email in field into the page to prefield the popup ?
