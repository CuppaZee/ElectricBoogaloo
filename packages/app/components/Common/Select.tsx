import * as React from "react";
import Icon, { IconName } from "./Icon";
import { Select as NativeBaseSelect, ISelectProps } from "native-base";

export type SelectOption = {
  value: string;
  label: string;
  icon?: IconName;
};

export type SelectProps = Omit<
  ISelectProps,
  "selectIndex" | "onSelect" | "children" | "multiSelect" | "value"
> & {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
};

export default function Select({ value, onValueChange, options, ...rest }: SelectProps) {
  return (
    <NativeBaseSelect
      {...rest}
      selectedValue={value}
      onValueChange={value => onValueChange(value)}>
      {options.map(i => (
        <NativeBaseSelect.Item
          key={i.value}
          startIcon={i.icon ? <Icon style={{ height: 24 }} name={i.icon} /> : undefined}
          value={i.value}
          label={i.label}
        />
      ))}
    </NativeBaseSelect>
  );
}
