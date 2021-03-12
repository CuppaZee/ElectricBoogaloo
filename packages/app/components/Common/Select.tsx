import { IndexPath, Select as UIKittenSelect, SelectItem, SelectProps as UIKittenSelectProps } from "@ui-kitten/components";
import * as React from "react";
import Icon, { IconName } from "./Icon";

export type SelectOption = {
  value: string;
  label: string;
  icon?: IconName;
};

export type SelectProps = Omit<
  UIKittenSelectProps,
  "selectIndex" | "onSelect" | "children" | "multiSelect" | "value"
> & {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
};

export default function Select({ value, onValueChange, options, ...rest }: SelectProps) {
  return (
    <UIKittenSelect
      {...rest}
      multiSelect={false}
      value={options.find(i => i.value === value)?.label || value}
      selectedIndex={new IndexPath(options.findIndex(i => i.value === value))}
      onSelect={value => onValueChange(options[(value as IndexPath).row].value)}>
      {options.map(i => (
        <SelectItem
          accessoryLeft={i.icon ? props => <Icon {...props} name={i.icon} /> : undefined}
          title={i.label}
        />
      ))}
    </UIKittenSelect>
  );
}
