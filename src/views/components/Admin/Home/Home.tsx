import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router';
import { useDauth } from 'dauth-context-react';
import { getIndexedDBVersionApi, updateIndexedDBVersionApi } from 'api/utils';
import { useCookies } from 'react-cookie';
import { Button, message, Modal } from 'antd';
import './Home.scss';

function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { user } = useDauth();
  const deleteCookies = () => {
    const getCookies = document.cookie.split(';');
    if (getCookies.length > 1) {
      for (let i = 0; i < getCookies.length; i++) {
        removeCookie(getCookies[i]);
      }
    }
    navigate(0);
  };
  return <RenderHome user={user} deleteCookies={deleteCookies} />;
}

function RenderHome(props: any) {
  const { deleteCookies, user } = props;
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
      title: 'Actualizando IndexedDB',
      content: `¿Estás seguro que quieres actualizar IndexedDB?`,
      okText: 'Actualizar',
      okType: 'primary',
      cancelText: 'Cancelar',
      onOk() {
        updateIndexedDBVersionApi()
          .then((res) => {
            if (res) {
              if (res.status !== 200) {
                message.warning(res.message);
              } else {
                message.success(res.message);
                setIdbVersion(res.indexedDBVersion);
              }
            } else {
              message.error('No hay respuesta al servidor.');
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
          {`Hola ${user ? user.name : 'Anónimo'}
        ${user ? user.lastname : ''}`}
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
