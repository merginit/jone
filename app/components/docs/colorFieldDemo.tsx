'use client';
import React, { useState } from 'react';
import {
  ColorPicker as AriaColorPicker,
  DialogTrigger,
  Button,
  parseColor
} from 'react-aria-components';
import { ColorField } from '@/components/react-aria/ColorField';
import { ColorSwatch } from '@/components/react-aria/ColorSwatch';
import { ColorArea } from '@/components/react-aria/ColorArea';
import { ColorSlider } from '@/components/react-aria/ColorSlider';
import { Dialog } from '@/components/react-aria/Dialog';
import { Popover } from '@/components/react-aria/Popover';
import { Switch } from '@/components/react-aria/Switch';

export function ColorFieldDemo() {
  const [usePicker, setUsePicker] = useState(false);
  const [color, setColor] = useState(parseColor('#ff0000'));

  return (
    <div className="flex flex-col gap-4 items-start">
      <Switch isSelected={usePicker} onChange={setUsePicker}>
        Use ColorPicker instead of ColorSwatch
      </Switch>
      <AriaColorPicker value={color} onChange={(c) => { if (c) setColor(c); }}>
        <ColorField
          label="Color"
          swatchContent={usePicker ? (
            <DialogTrigger>
              <Button className="border-0 bg-transparent p-0 cursor-pointer outline-none shrink-0 mr-2">
                <ColorSwatch className="w-6 h-6 rounded-md border border-black/10" />
              </Button>
              <Popover placement="bottom end">
                <Dialog className="flex flex-col gap-2">
                  <ColorArea
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                  />
                  <ColorSlider colorSpace="hsb" channel="hue" />
                </Dialog>
              </Popover>
            </DialogTrigger>
          ) : undefined}
        />
      </AriaColorPicker>
    </div>
  );
}
