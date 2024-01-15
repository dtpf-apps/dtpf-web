import React, { useState, useEffect, memo } from "react";
import { useHistory } from "react-router";
import { checkUserLogin } from "providers/AuthProvider";
import {
  getIndexedDBVersionApi,
  updateIndexedDBVersionApi,
} from "api/utils";
import { useCookies } from "react-cookie";
import { Button, message, Modal } from "antd";
import "./Home.scss";

function Home(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const deleteCookies = () => {
    const getCookies = document.cookie.split(";");
    if (getCookies.length > 1) {
      for (let i = 0; i < getCookies.length; i++) {
        removeCookie(getCookies[i]);
      }
    }
    history.go(0);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    let isMounted = true;
    isMounted && checkUserLogin(setUser);
    return () => {
      isMounted = false;
    };
  }, []);
  return <RenderHome userData={user} deleteCookies={deleteCookies} />;
}

function RenderHome(props: any) {
  const { deleteCookies, userData } = props;
  const [idbVersion, setIdbVersion] = useState(null);
  const { confirm } = Modal;
  useEffect(() => {
    let isMounted = true;
    getIndexedDBVersionApi().then((res) => {
      res && isMounted && setIdbVersion(res.indexedDBVersion);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const showConfirm = () => {
    confirm({
      title: "Actualizando IndexedDB",
      content: `¿Estás seguro que quieres actualizar IndexedDB?`,
      okText: "Actualizar",
      okType: "primary",
      cancelText: "Cancelar",
      onOk() {
        updateIndexedDBVersionApi()
          .then((res) => {
            if (res) {
              if (res.status !== 200) {
                message.warn(res.message);
              } else {
                message.success(res.message);
                setIdbVersion(res.indexedDBVersion);
              }
            } else {
              message.error("No hay respuesta al servidor.");
            }
          })
          .catch((err) => {
            message.error(err.message);
          });
      },
    });
  };
  return (
    <div className="admin-home">
      <div className="admin-home__title">
        <h1>
          {`Hola ${userData ? userData.user.name : "Anónimo"}
        ${userData && userData.user.lastname}`}
        </h1>
      </div>
      <div className="admin-home__cookies">
        <Button type="primary" onClick={deleteCookies}>
          Borrar Cookies
        </Button>
      </div>
      <div className="admin-home__idb">
        <h1>
          IndexedDB Version <span>{idbVersion && idbVersion}</span>
        </h1>
        <Button type="primary" onClick={showConfirm}>
          Actulizar IndexedDB
        </Button>
      </div>
    </div>
  );
}

export default memo(Home);