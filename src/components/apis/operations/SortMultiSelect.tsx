import { MenuItem, Position } from "@blueprintjs/core";
import { IItemRendererProps, MultiSelect } from "@blueprintjs/select";
import React from "react";
import { SortDefinition, SortOrder } from "../../../graphql/types";

interface SortMultiSelectProps {
  fieldNames: string[];
  selected: SortDefinition[];
  setSelected: (sort: SortDefinition[]) => void;
}

export function SortMultiSelect({
  fieldNames,
  selected: sort,
  setSelected: setSort
}: SortMultiSelectProps) {
  const sortOptions: SortDefinition[] = [];
  fieldNames.forEach(field => {
    sortOptions.push({
      field,
      order: SortOrder.Asc
    });
    sortOptions.push({
      field,
      order: SortOrder.Desc
    });
  });

  const sortRenderer = (
    def: SortDefinition,
    { modifiers, handleClick }: IItemRendererProps
  ) => {
    const icon = sort.some(d => d.field === def.field && d.order === def.order)
      ? "tick"
      : "blank";
    const text = `${def.field} ${def.order}`;
    return (
      <MenuItem
        active={modifiers.active}
        key={text}
        text={text}
        icon={icon}
        onClick={handleClick}
      />
    );
  };

  return (
    <MultiSelect
      items={sortOptions}
      selectedItems={sort}
      itemRenderer={sortRenderer}
      onItemSelect={def => {
        const i = sort.findIndex(
          d => d.field === def.field && d.order === def.order
        );
        setSort(
          i < 0
            ? sort.concat([def])
            : sort.slice(0, i).concat(sort.slice(i + 1))
        );
      }}
      tagRenderer={(s: SortDefinition) => `${s.field} ${s.order}`}
      tagInputProps={{
        onRemove: (_, i) => setSort(sort.slice(0, i).concat(sort.slice(i + 1)))
      }}
      popoverProps={{ minimal: true, position: Position.BOTTOM }}
    ></MultiSelect>
  );
}
