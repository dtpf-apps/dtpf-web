import React, { useState, useEffect, memo } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification } from 'antd';
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
import { getMenuApi, updateMenuApi, activateMenuApi, deleteMenuApi } from 'api/menu';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';
import { EditOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import './MenuWebList.scss';
const { confirm } = ModalAntd;

interface IMenuWebListProps {
  reloadMenuWeb: boolean;
  setReloadMenuWeb: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuWebList({ reloadMenuWeb, setReloadMenuWeb }: IMenuWebListProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [menu, setMenu] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    let isMounted = true;
    getMenuApi().then((response) => {
      if (isMounted && response.menu) {
        setMenu(response.menu);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [reloadMenuWeb]);

  const activateMenu = (menuItem: any, status: any) => {
    activateMenuApi(menuItem._id, status).then((response) => {
      if (status === true) {
        notification['success']({
          message: response.message,
          duration: notifDelay,
        });
      } else {
        notification['warning']({
          message: response.message,
          duration: notifDelayErr,
        });
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = menu.findIndex((item) => item._id === active.id);
    const newIndex = menu.findIndex((item) => item._id === over.id);
    const reordered = arrayMove(menu, oldIndex, newIndex);
    setMenu(reordered);

    reordered.forEach((item, index) => {
      updateMenuApi(item._id, { order: index });
    });
  };

  const deleteMenu = (menuItem: any) => {
    confirm({
      title: 'Eliminando menú',
      content: `¿Estás seguro que quieres eliminar el menú ${menuItem.title}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteMenuApi(menuItem._id)
          .then((response) => {
            notification['success']({
              message: response.message,
              duration: notifDelay,
            });
            setReloadMenuWeb(true);
          })
          .catch(() => {
            notification['error']({
              message: 'Error del servidor, inténtelo más tarde.',
              duration: notifDelayErr,
            });
          });
      },
    });
  };

  return (
    <div className="menu-web-list">
      <AddMenuWebModal
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadMenuWeb={setReloadMenuWeb}
      />
      <div className="menu-web-list__items">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={menu.map((item) => item._id)} strategy={verticalListSortingStrategy}>
            {menu.map((item) => (
              <SortableMenuItem
                key={item._id}
                item={item}
                activateMenu={activateMenu}
                deleteMenu={deleteMenu}
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setReloadMenuWeb={setReloadMenuWeb}
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

function AddMenuWebModal(props: any) {
  const { setIsVisibleModal, setModalTitle, setModalContent, setReloadMenuWeb } = props;
  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo menú');
    setModalContent(
      <AddMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} />
    );
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
  item: any;
  activateMenu: (menu: any, status: any) => void;
  deleteMenu: (menu: any) => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
  setReloadMenuWeb: React.Dispatch<React.SetStateAction<boolean>>;
}

function SortableMenuItem({
  item,
  activateMenu,
  deleteMenu,
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
  setReloadMenuWeb,
}: ISortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const editMenuWebModal = (menu: any) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menu: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}
      />
    );
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
