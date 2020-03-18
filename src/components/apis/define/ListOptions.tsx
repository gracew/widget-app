import { MenuItem, Position } from "@blueprintjs/core";
import { IItemRendererProps, MultiSelect } from "@blueprintjs/select";
import React from "react";
import {
  ListDefinition,
  SortDefinition,
  SortOrder
} from "../../../graphql/types";
import "./DefineAPI.css";

interface ListOptionsProps {
  fieldNames: string[];
  list: ListDefinition;
  setList: (def: ListDefinition) => void;
}

export function ListOptions({ fieldNames, list, setList }: ListOptionsProps) {
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
    sort: SortDefinition,
    { modifiers, handleClick }: IItemRendererProps
  ) => {
    const icon = list.sort.indexOf(sort) >= 0 ? "tick" : "blank";
    const text = `${sort.field} ${sort.order}`;
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
    const icon = list.filter.indexOf(field) < 0 ? "blank" : "tick";
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
        selectedItems={list.sort}
        itemRenderer={sortRenderer}
        onItemSelect={sort => {
          const i = list.sort.indexOf(sort);
          setList({
            ...list,
            sort:
              i < 0
                ? list.sort.concat([sort])
                : list.sort.slice(0, i).concat(list.sort.slice(i + 1))
          });
        }}
        tagRenderer={(s: SortDefinition) => `${s.field} ${s.order}`}
        tagInputProps={{
          onRemove: (_, i) =>
            setList({
              ...list,
              sort: list.sort.slice(0, i).concat(list.sort.slice(i + 1))
            })
        }}
        popoverProps={{ minimal: true, position: Position.BOTTOM }}
      ></MultiSelect>

      <h4>Filter Options</h4>
      <MultiSelect
        items={fieldNames}
        selectedItems={list.filter}
        itemRenderer={filterRenderer}
        onItemSelect={name => {
          const i = list.filter.indexOf(name);
          setList({
            ...list,
            filter:
              i < 0
                ? list.filter.concat([name])
                : list.filter.slice(0, i).concat(list.filter.slice(i + 1))
          });
        }}
        tagRenderer={(n: string) => n}
        tagInputProps={{
          onRemove: (_, i) =>
            setList({
              ...list,
              filter: list.filter.slice(0, i).concat(list.filter.slice(i + 1))
            })
        }}
        popoverProps={{ minimal: true, position: Position.BOTTOM }}
      ></MultiSelect>
    </div>
  );
}
