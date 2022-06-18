# ESC/POS library

## Features:

- Adapters for Network, Serial, and Console (for debugging)
- Usual text stuff (Bold, Underline, Justification etc.)
- PNG images
- Bar code printing (Regular, QR, PDF417)

## Usage example:

```javascript
import { Printer, Commands } from '@jkassis/escpos'
var { Font, Justification, TextMode } = Commands

const printer = await new Printer(adapter)

printer
  .setFont(Font.A)
  .setJustification(Justification.Center)
  .setTextMode(TextMode.DualWidthAndHeight)
  .writeLine('This is some large centered text')
  .setTextMode(TextMode.Normal)
  .setJustification(Justification.Left)
  .writeLine('Some normal text')
  .feed(4)

var data = printer.flush()
```
