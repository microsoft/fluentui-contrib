import { DataGridProps as OldDataGridProps, DataGridState as BaseDataGridState } from "@fluentui/react-components"
import { RefObject } from "react"
import { VariableSizeGrid, VariableSizeList } from "react-window"
export type DataGridProps = OldDataGridProps & {
  bodyRef?: RefObject<VariableSizeGrid>;
  headerRef?: RefObject<VariableSizeList>;
}

export type DataGridState = BaseDataGridState & Required<Pick<DataGridProps, 'bodyRef' | 'headerRef'>>;
