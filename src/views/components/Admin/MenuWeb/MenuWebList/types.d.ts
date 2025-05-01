declare module 'react-drag-sortable' {
  import React from 'react';

  export interface DragSortableListProps {
    items: Array<{ content: React.ReactNode }>;
    onSort: (sortedList: any[], dropEvent: DragEvent) => void;
    type?: 'vertical' | 'horizontal';
  }

  const DragSortableList: React.FC<DragSortableListProps>;

  export default DragSortableList;
}
