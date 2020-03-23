import { MenuItem, Position } from "@blueprintjs/core";
import { IItemRendererProps, MultiSelect } from "@blueprintjs/select";
import React from "react";

interface FieldMultiSelectProps {
  fieldNames: string[];
  selected: string[];
  setSelected: (fields: string[]) => void;
}

export function FieldMultiSelect({
  fieldNames,
  selected,
  setSelected
}: FieldMultiSelectProps) {
  const fieldRenderer = (
    field: string,
    { modifiers, handleClick }: IItemRendererProps
  ) => {
    const icon = selected.indexOf(field) < 0 ? "blank" : "tick";
    return (
      <MenuItem
        active={modifiers.active}
        key={field}
        text={field}
        icon={icon}
        onClick={handleClick}
      />
    );
  };

  return (
    <MultiSelect
      items={fieldNames}
      selectedItems={selected}
      itemRenderer={fieldRenderer}
      onItemSelect={name => {
        const i = selected.indexOf(name);
        setSelected(
          i < 0
            ? selected.concat([name])
            : selected.slice(0, i).concat(selected.slice(i + 1))
        );
      }}
      tagRenderer={(n: string) => n}
      tagInputProps={{
        onRemove: (_, i) =>
          setSelected(selected.slice(0, i).concat(selected.slice(i + 1)))
      }}
      popoverProps={{ minimal: true, position: Position.BOTTOM }}
    ></MultiSelect>
  );
}
