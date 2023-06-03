import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "views/components/UI/Modal";
import {
  getMenuApi,
  updateMenuApi,
  activateMenuApi,
  deleteMenuApi,
} from "api/menu";
import { getAccessTokenApi } from "api/auth";
import { notifDelay, notifDelayErr } from "utils/notifications";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./MenuWebList.scss";
import DragSortableList from "react-drag-sortable";
const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { reloadMenuWeb, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    let isMounted = true;
    getMenuApi().then((response) => {
      isMounted && setMenu(response.menu)
    });
    return () => { isMounted = false };
  }, [reloadMenuWeb]);
  useEffect(() => {
    let isMounted = true;
    const listItemsArray = [];
    menu && menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem
            item={item}
            activateMenu={activateMenu}
            deleteMenu={deleteMenu}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setReloadMenuWeb={setReloadMenuWeb}
          />
        ),
      });
    });
    isMounted && setListItems(listItemsArray)
    return () => { isMounted = false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);
  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();
    activateMenuApi(accessToken, menu._id, status).then((response) => {
      if (status === true) {
        notification["success"]({
          message: response.message,
          duration: notifDelay,
        });
      } else {
        notification["warning"]({
          message: response.message,
          duration: notifDelayErr,
        });
      }
    });
  };
  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();
    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accessToken, _id, { order });
    });
  };
  const deleteMenu = (menu) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando menú",
      content: `¿Estás seguro que quieres eliminar el menú ${menu.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMenuApi(accessToken, menu._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
              duration: notifDelay,
            });
            setReloadMenuWeb(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, inténtelo más tarde.",
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
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function AddMenuWebModal(props) {
  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadMenuWeb,
  } = props;
  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
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

function MenuItem(props) {
  const {
    item,
    activateMenu,
    deleteMenu,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadMenuWeb,
  } = props;
  const editMenuWebModal = (menu) => {
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
    <List.Item
      actions={[
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
  );
}
