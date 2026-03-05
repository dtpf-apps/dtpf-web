import { DB_DTPF_LS_NAME } from '../config';
import { StorageValid } from '../../utils/validations';
import { getIndexedDBVersionAPI } from 'api/endpoints/app/app.api';
import { message } from 'antd';

export default function setIndexedDBVersion(db: any) {
  setIdbVersion();
  const ls = localStorage.getItem(DB_DTPF_LS_NAME);
  function setIdbVersion() {
    getIndexedDBVersionAPI()
      .then(({ response, data }) => {
        if (response.status === 200 && data.indexedDBVersion) {
          StorageValid() && localStorage.setItem(DB_DTPF_LS_NAME, ls ? String(data.indexedDBVersion) : '1');
          if (data.indexedDBVersion === db.version + 1) {
            const reload = () => window.location.reload();
            message.info('Contenido nuevo. Actualizando la web', reload);
          }
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
}
