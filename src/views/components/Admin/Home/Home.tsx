import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router';
import { useDauth } from 'dauth-context-react';
import { getIndexedDBVersionAPI, updateIndexedDBVersionAPI } from 'api/endpoints/app/app.api';
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
  const [idbVersion, setIdbVersion] = useState<number | null>(null);
  const { confirm } = Modal;
  useEffect(() => {
    let isMounted = true;
    getIndexedDBVersionAPI()
      .then(({ response, data }) => {
        if (response.status === 200 && data.indexedDBVersion) {
          isMounted && setIdbVersion(data.indexedDBVersion);
        }
      })
      .catch(() => {});
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
        updateIndexedDBVersionAPI()
          .then(({ response, data }) => {
            if (response.status === 200) {
              message.success(data.message);
              setIdbVersion(data.indexedDBVersion);
            } else {
              message.warning(data.message);
            }
          })
          .catch(() => {
            message.error('No hay respuesta al servidor.');
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
