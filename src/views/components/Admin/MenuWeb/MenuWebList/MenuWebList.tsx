import React, { useState, memo } from 'react';
import { Switch, List, Button, Modal as ModalAntd } from 'antd';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Modal from 'views/components/UI/Modal';
import useContextMenu from 'hooks/contexts/useContextMenu';
import { IMenuItem } from 'api/endpoints/menu/menu.response.interface';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';
import { EditOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import './MenuWebList.scss';
const { confirm } = ModalAntd;

function MenuWebList() {
  const { menus, activateMenu, deleteMenu: deleteMenuAction, updateMenu } = useContextMenu();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [localMenus, setLocalMenus] = useState<IMenuItem[]>(menus);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Sync local state when context menus change
  React.useEffect(() => {
    setLocalMenus(menus);
  }, [menus]);

  const handleActivateMenu = (menuItem: IMenuItem, status: boolean) => {
    activateMenu(menuItem._id, status);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localMenus.findIndex((item) => item._id === active.id);
    const newIndex = localMenus.findIndex((item) => item._id === over.id);
    const reordered = arrayMove(localMenus, oldIndex, newIndex);
    setLocalMenus(reordered);

    reordered.forEach((item, index) => {
      updateMenu(item._id, { order: index });
    });
  };

  const handleDeleteMenu = (menuItem: IMenuItem) => {
    confirm({
      title: 'Eliminando menú',
      content: `¿Estás seguro que quieres eliminar el menú ${menuItem.title}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteMenuAction(menuItem._id);
      },
    });
  };

  return (
    <div className="menu-web-list">
      <AddMenuWebModal
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
      />
      <div className="menu-web-list__items">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={localMenus.map((item) => item._id)} strategy={verticalListSortingStrategy}>
            {localMenus.map((item) => (
              <SortableMenuItem
                key={item._id}
                item={item}
                activateMenu={handleActivateMenu}
                deleteMenu={handleDeleteMenu}
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

function AddMenuWebModal({
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
}: {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
}) {
  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo menú');
    setModalContent(<AddMenuWebForm setIsVisibleModal={setIsVisibleModal} />);
  };
  return (
    <div className="menu-web-list__header">
      <Button type="primary" onClick={addMenuWebModal}>
        Crear Menú
      </Button>
    </div>
  );
}

interface ISortableMenuItemProps {
  item: IMenuItem;
  activateMenu: (menu: IMenuItem, status: boolean) => void;
  deleteMenu: (menu: IMenuItem) => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
}

function SortableMenuItem({
  item,
  activateMenu,
  deleteMenu,
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
}: ISortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const editMenuWebModal = (menu: IMenuItem) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menu: ${menu.title}`);
    setModalContent(<EditMenuWebForm setIsVisibleModal={setIsVisibleModal} menu={menu} />);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <List.Item
        actions={[
          <span {...attributes} {...listeners} style={{ cursor: 'grab' }}>
            <HolderOutlined />
          </span>,
          <Switch
            defaultChecked={item.active}
            checkedChildren="on"
            unCheckedChildren="off"
            onChange={(e) => activateMenu(item, e)}
          />,
          <Button type="primary" onClick={() => editMenuWebModal(item)}>
            <EditOutlined />
          </Button>,
          <Button type="primary" danger onClick={() => deleteMenu(item)}>
            <DeleteOutlined />
          </Button>,
        ]}
      >
        <List.Item.Meta title={item.title} description={item.url} />
      </List.Item>
    </div>
  );
}

export default memo(MenuWebList);
