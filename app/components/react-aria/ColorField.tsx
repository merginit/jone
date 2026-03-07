'use client';
import React, { useContext } from 'react';
import {
  ColorField as AriaColorField,
  type ColorFieldProps as AriaColorFieldProps,
  ColorFieldStateContext,
  type ValidationResult
} from 'react-aria-components';
import { Description, FieldError, FieldGroup, Input, Label } from '@/components/react-aria/Field';
import { ColorSwatch } from '@/components/react-aria/ColorSwatch';
import { composeTailwindRenderProps } from '@/lib/react-aria/utils';

export interface ColorFieldProps extends AriaColorFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  showSwatch?: boolean;
  swatchContent?: React.ReactNode;
}

function InlineSwatch() {
  const state = useContext(ColorFieldStateContext);
  if (!state?.colorValue) return null;
  return (
    <ColorSwatch
      color={state.colorValue}
      className="w-6 h-6 shrink-0 rounded-md border border-black/10 mr-2"
    />
  );
}

export function ColorField(
  { label, description, errorMessage, showSwatch = true, swatchContent, ...props }: ColorFieldProps
) {
  return (
    <AriaColorField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1 font-sans')}>
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <Input />
        {showSwatch && (swatchContent ?? <InlineSwatch />)}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaColorField>
  );
}
