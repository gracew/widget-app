import { MenuItem, Position } from "@blueprintjs/core";
import { IItemRendererProps, MultiSelect } from "@blueprintjs/select";
import React from "react";
import { SortDefinition, SortOrder } from "../../../graphql/types";

interface ListOptionsProps {
  fieldNames: string[];
  sort: SortDefinition[];
  setSort: (sort: SortDefinition[]) => void;
  filter: string[];
  setFilter: (fields: string[]) => void;
}

export function ListOptions({
  fieldNames,
  sort,
  setSort,
  filter,
  setFilter
}: ListOptionsProps) {
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

  const filterRenderer = (
    field: string,
    { modifiers, handleClick }: IItemRendererProps
  ) => {
    const icon = filter.indexOf(field) < 0 ? "blank" : "tick";
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
    <div>
      <h4>Sort Options</h4>
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
          onRemove: (_, i) =>
            setSort(sort.slice(0, i).concat(sort.slice(i + 1)))
        }}
        popoverProps={{ minimal: true, position: Position.BOTTOM }}
      ></MultiSelect>

      <h4>Filter Options</h4>
      <MultiSelect
        items={fieldNames}
        selectedItems={filter}
        itemRenderer={filterRenderer}
        onItemSelect={name => {
          const i = filter.indexOf(name);
          setFilter(
            i < 0
              ? filter.concat([name])
              : filter.slice(0, i).concat(filter.slice(i + 1))
          );
        }}
        tagRenderer={(n: string) => n}
        tagInputProps={{
          onRemove: (_, i) =>
            setFilter(filter.slice(0, i).concat(filter.slice(i + 1)))
        }}
        popoverProps={{ minimal: true, position: Position.BOTTOM }}
      ></MultiSelect>
    </div>
  );
}
