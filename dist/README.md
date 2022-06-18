# ESC/POS library

## Features:
- Adapters for Network, Serial, and Console (for debugging)
- Usual text stuff (Bold, Underline, Justification etc.)
- PNG images
- Bar code printing (Regular, QR, PDF417)
                           
## Usage example:
```javascript
import Printer from 'escpos-print/Printer';
import { Font, Justification, TextMode } from 'escpos-print/Commands';
import { Network } from 'escpos-print/Adapters';

const adapter = new Network("192.168.0.102", 9100);
const printer = await new Printer(adapter).open();
                           
printer.setFont(Font.A)
       .setJustification(Justification.Center)
       .setTextMode(TextMode.DualWidthAndHeight)
       .writeLine("This is some large centered text")
       .setTextMode(TextMode.Normal)
       .setJustification(Justification.Left)
       .writeLine("Some normal text")
       .feed(4)
       .close()
       .then(() => console.log("Done printing..."));
```
